let io;

const initSocket = (server) => {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });


  io.on("connection", (socket) => {




    console.log("🔗 Connected:", socket.id);
    socket.emit("join_room", "user");
    const Id = socket.handshake.query.userId
    // findById update ->status->true
    socket.on("disconnect", () => {
      // findById update ->status->false-->lastseenDate.now()
      console.log("❌ Disconnected:", socket.id);
    });
  });

  return io;
};

// ✅ Access anywhere
const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
module.exports = { initSocket, getIO }