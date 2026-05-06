const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const http = require("http");

const AuthRouter = require("./routes/AuthRoutes");
const { initSocket } = require("./scoket");
const cors = require("cors");
const connectDb = require("./conifg/Db");
const { GetEmpNameGenById, TaskId, ProjetcId } = require("./Utils/EmpIDGenrator");
const ProjectsRoute = require("./routes/HandelProjectRouter");
const FileUploadRouter = require("./routes/FileUploadsProjectRouter");
const client = require("../Server/conifg/Redis");
const Connect = require("../Server/conifg/Redis");
// Middleware
app.use(express.json());


// cors
const envStatusurl = process.env.envStatus == "Local" ? "http://localhost:5173" : process.env.LiveUI
console.log(envStatusurl)

app.use(cors({ origin: envStatusurl }));

console.log("--------- check the id's -----")
console.log("Task id :" + TaskId("Task"))
console.log("emp id : " + GetEmpNameGenById(""))
console.log("Project id : " + ProjetcId())

// /api/ProjectfileUploads/upload
// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/ManageProject", ProjectsRoute);
app.use("/api/ProjectfileUpload", FileUploadRouter)
client.connectRedis()
// Create server
const server = http.createServer(app);


// Test server is Running
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server Is Running..." })
})

// ✅ Initialize socket
initSocket(server);
connectDb()
// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});