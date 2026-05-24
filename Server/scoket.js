// socket.js
const UserSchema = require("../Server/Models/Auth");
const { client } = require("./conifg/Redis");

let io;


const users = {};

const initSocket = async (server) => {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  await
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
        await client.del("Team")

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

          console.log(
            "❌ Disconnected:",
            userId,
            socket.id
          );

          if (!users[userId]) return;

          // remove socket
          users[userId] = users[userId].filter(
            (id) => id !== socket.id
          );

          // fully offline
          if (users[userId].length === 0) {

            delete users[userId];

            // update DB
            const user =
              await UserSchema.findOneAndUpdate(
                {
                  userEmail: userId
                },
                {
                  isactive: false,
                  lastseen: new Date()
                },
                { new: true }
              );

            // delete old cache
            await client.del("Team");

            console.log(
              "🗑️ Team Cache Deleted"
            );

            // realtime status update
            io.emit("offlineUser", {
              userId: user,
              isactive: false,
              userEmail: user.userEmail,
            });

            console.log(
              "📡 Offline User Emitted"
            );
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