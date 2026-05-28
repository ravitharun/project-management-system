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
const Db = process.env.envStatus == 'Prod' ? process.env.Db : 'mongodb://localhost:27017/ProjectManagementWebsite'
console.log(envStatusurl, 'envStatusurl')
console.log(Db, 'Db In prod')
console.log("=== ENV CONFIG ===");
const isProd = process.env.envStatus === "Prod";
console.log(isProd, 'isProd')
console.log("PORT:", process.env.PORT);
console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
console.log("CLOUD_KEY:", process.env.CLOUD_KEY ? "SET ✅" : "NOT SET ❌");
console.log("CLOUD_SECRET:", process.env.CLOUD_SECRET ? "SET ✅" : "NOT SET ❌");

console.log("LiveUI:", process.env.LiveUI);
console.log("envStatus:", process.env.envStatus);

console.log("RESEND_API:", process.env.RESEND_API ? "SET ✅" : "NOT SET ❌");

console.log("REDIS_URL:", process.env.REDIS_URL ? "SET ✅" : "NOT SET ❌");
console.log("REDIS_PORT:", process.env.REDIS_PORT);

console.log("Db:", process.env.Db ? "SET ✅" : "NOT SET ❌");

console.log("=== END ENV ===");
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
  console.log("=== ENV CONFIG ===");

  console.log("PORT:", process.env.PORT);
  console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
  console.log("CLOUD_KEY:", process.env.CLOUD_KEY ? "SET ✅" : "NOT SET ❌");
  console.log("CLOUD_SECRET:", process.env.CLOUD_SECRET ? "SET ✅" : "NOT SET ❌");

  console.log("LiveUI:", process.env.LiveUI);
  console.log("envStatus:", process.env.envStatus);

  console.log("RESEND_API:", process.env.RESEND_API ? "SET ✅" : "NOT SET ❌");

  console.log("REDIS_URL:", process.env.REDIS_URL ? "SET ✅" : "NOT SET ❌");
  console.log("REDIS_PORT:", process.env.REDIS_PORT);

  console.log("Db:", process.env.Db ? "SET ✅" : "NOT SET ❌");

  console.log("=== END ENV ===");
  return res.status(200).json({ message: "Server Is Running...", })
})

// ✅ Initialize socket
initSocket(server);
connectDb()
// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});