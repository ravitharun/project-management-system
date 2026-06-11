




const { Server } = require("socket.io");
const UserSchema = require("../Server/Models/Auth");
const redis = require("./config/Ioredi");

let io;

// track user sockets
const users = {};

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://taskora-system.netlify.app","https://devserver-testing--taskora-system.netlify.app/"
      ],
    },
  });

  io.on("connection", async (socket) => {
    const userId = socket.handshake.auth?.userId;

    if (!userId) {
      console.log("❌ No userId provided");
      return;
    }

    console.log("🟢 Connected:", userId, socket.id);

    // =========================
    // 1. JOIN PROJECT ROOM
    // =========================
    socket.on("join_project", (projectId) => {
      console.log(projectId, 'projectIds')
      socket.join(projectId);
      console.log(`👥 ${userId} joined project: ${projectId}`);
    });

    // =========================
    // 2. TASK UPDATE (PROJECT ONLY)
    // =========================

    socket.on("task_updated", (data) => {
      console.log(data, 'data')


      io.to(data.prjid).emit("task_updated", {
        prjid: data.prjid,
        num: data.num
      });
      console.log('emitted')
    });

    // =========================
    // 3. TRACK USER SOCKETS
    // =========================
    if (!users[userId]) {
      users[userId] = [];
    }

    users[userId].push(socket.id);

    // clear caches (your logic)
    await redis.del("Team");
    await redis.del("Analytcs");

    // mark user online
    const user = await UserSchema.findOneAndUpdate(
      { userEmail: userId },
      { isactive: true },
      { new: true }
    );

    // global online event (OK for status)
    io.emit("onlineUser", {
      userId: user,
      isactive: true,
    });

    // =========================
    // 4. DISCONNECT
    // =========================
    socket.on("disconnect", async () => {
      console.log("❌ Disconnected:", userId, socket.id);

      if (!users[userId]) return;

      // remove socket
      users[userId] = users[userId].filter(
        (id) => id !== socket.id
      );

      // if no more sockets → offline
      if (users[userId].length === 0) {
        delete users[userId];

        const user = await UserSchema.findOneAndUpdate(
          { userEmail: userId },
          {
            isactive: false,
            lastseen: new Date(),
          },
          { new: true }
        );

        await redis.del("Team");
        await redis.del("Analytcs");

        // global offline event
        io.emit("offlineUser", {
          userId: user,
          isactive: false,
          userEmail: user.userEmail,
        });

        console.log("🔴 User went offline:", userId);
      }
    });
  });

  return io;
};

// getter
const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { initSocket, getIO };