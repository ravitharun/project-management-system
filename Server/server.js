const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const http = require("http");

const AuthRouter = require("./routes/AuthRoutes");
const { initSocket } = require("./scoket");
const cors = require("cors");
const connectDb = require("./conifg/Db");
// Middleware
app.use(express.json());


// cors
const envStatusurl = process.env.envStatus == "Production" ? "http://localhost:5173" : process.env.LiveUI

app.use(cors({ origin: envStatusurl }));



// Routes
app.use("/api/auth", AuthRouter);

// Create server
const server = http.createServer(app);

// ✅ Initialize socket
initSocket(server);
connectDb()
// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});