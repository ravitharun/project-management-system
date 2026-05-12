// socket.js
const UserSchema = require("../Server/Models/Auth");

let io;


const users = {};

const initSocket = (server) => {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", async (socket) => {
    try {
      const userId = socket.handshake.auth?.userId;

      if (!userId) {
        console.log("❌ No userId provided");
        return;
      }

      console.log("✅ Connected:", userId, socket.id);

      // initialize user array
      if (!users[userId]) {
        users[userId] = [];
      }

      // add socket id
      users[userId].push(socket.id);

      const user = await UserSchema.findOneAndUpdate(
        { userEmail: userId },
        { isactive: true },
        { returnDocument: 'after' }
      );

      // emit to ALL users
      io.emit("onlineUser", {
        userId: user,
        isactive: true,
      });


      socket.on("disconnect", async () => {
        console.log("❌ Disconnected:", userId, socket.id);

        if (!users[userId]) return;

        // remove this socket
        users[userId] = users[userId].filter(
          (id) => id !== socket.id
        );

        // if no tabs left → user offline
        if (users[userId].length === 0) {
          delete users[userId];

          const user = await UserSchema.findOneAndUpdate(
            { userEmail: userId },
            {
              isactive: false,
              lastseen: new Date(),
            },
            { returnDocument: 'after' }
          );

          io.emit("offlineUser", {
            userId: user,
            isactive: false,
          });
          
        }
      });

    } catch (err) {
      console.error("Socket Error:", err.message);
    }
  });

  return io;
};

// optional getter
const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { initSocket, getIO };