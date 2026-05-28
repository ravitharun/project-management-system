require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");

const AuthRouter = require("./routes/AuthRoutes");
const { initSocket } = require("./scoket");
const cors = require("cors");
const connectDb = require("./config/Db");
const { GetEmpNameGenById, TaskId, ProjetcId } = require("./Utils/EmpIDGenrator");
const ProjectsRoute = require("./routes/HandelProjectRouter");
const FileUploadRouter = require("./routes/FileUploadsProjectRouter");
const TaskRotuer = require("../Server/routes/TaskRouter")
const TaskRouter = require("../Server/routes/TaskRouter");
const NotificatonsRouter = require("./routes/NotificatonsRouter");
const FetchTeamRouter = require("./routes/FetchTeamRouter");
const AnalytcsRouter = require("./routes/AnalytcsRouter");
const { SendAccountCreationEmail, SendWelcomEmail, taskAssiginedEmail } = require("./service/Email");
const redis = require("./config/Ioredi");
// Middleware
app.use(express.json());


// cors
const envStatusurl = process.env.envStatus == "Local" ? "http://localhost:5173" : process.env.LiveUI
console.log(envStatusurl, 'envStatusurl')

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
app.use("/api/Task", TaskRouter)
app.use("/api/Notificatons", NotificatonsRouter)
app.use("/api/Team", FetchTeamRouter)
app.use("/api/Analytcs", AnalytcsRouter)

// client.connectRedis()


redis.on("connect", () => {
  console.log("Redis Connected");
});
// Create server
const server = http.createServer(app);
// Test server is Running
app.get("/", (req, res) => {
  SendAccountCreationEmail()
  SendWelcomEmail()
  console.log(SendWelcomEmail())
  taskAssiginedEmail()
  return res.status(200).json({ message: "Server Is Running...", email: SendWelcomEmail() })
})

// ✅ Initialize socket
initSocket(server);
connectDb()
// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});