require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");

const AuthRouter = require("./routes/AuthRoutes");
const { initSocket, getIO } = require("./scoket");
const cors = require("cors");
const connectDb = require("./config/Db");
const { GetEmpNameGenById, TaskId, ProjetcId } = require("./Utils/EmpIDGenrator");
const ProjectsRoute = require("./routes/HandelProjectRouter");
const FileUploadRouter = require("./routes/FileUploadsProjectRouter");
const NotificatonsRouter = require("./routes/NotificatonsRouter");
const FetchTeamRouter = require("./routes/FetchTeamRouter");
const AnalytcsRouter = require("./routes/AnalytcsRouter");
const { SendAccountCreationEmail, SendWelcomEmail, taskAssiginedEmail } = require("./service/Email");
const redis = require("./config/Ioredi");
// Middleware
app.use(express.json());
const fs = require("fs");
const CreateWorkSpaceRouter = require("./routes/CreateWorkSpace");
const Workspace = require("./Models/Workspace");
const WorkSpaceTaskRouter = require("./routes/WorkSpaceTask_router");
const limiter = require("./RateLimiter");
const ErrorMiddleware = require("./Middleware/ErrorMiddleware");
const AuthTokenVerification = require("./Middleware/AuthMiddleware");
const check = `${process.env.envStatus === "Local"
    ? "http://localhost:5000"
    : "https://project-management-system-u091.onrender.com"
  }/api/workspace/approve-workspace-invite/?workspaceid=spaceId&AcceptEmail=useremail`;
console.log(check, 'check Email')

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
console.log(process.env.envStatus, 'process.env.envStatus')

// cors
const envStatusurl = process.env.envStatus == "Local" ? "http://localhost:5173" : process.env.LiveUI
const Db = process.env.envStatus == 'Prod' ? process.env.Db : 'mongodb://localhost:27017/ProjectManagementWebsite'


app.use(cors({ origin: [envStatusurl,'https://devserver-testing--taskora-system.netlify.app','https://project-management-system-weld-eight.vercel.app'] }));

console.log("--------- check the id's -----")
console.log(envStatusurl,'envStatusurl')
console.log("Task id :" + TaskId("Task"))
console.log("emp id : " + GetEmpNameGenById(""))
console.log("Project id : " + ProjetcId())
app.use(limiter)
// /api/ProjectfileUploads/upload
// Routes

app.use("/api/auth", AuthRouter);
app.use("/api/ManageProject", ProjectsRoute);
app.use("/api/ProjectfileUpload", FileUploadRouter)
app.use("/api/Notificatons", NotificatonsRouter)
app.use("/api/Team", FetchTeamRouter)
app.use("/api/Analytcs", AnalytcsRouter)
app.use("/api/WorkSpace", CreateWorkSpaceRouter)
app.use("/api/Task", WorkSpaceTaskRouter)
// /api/Task/AddWorkSpaceTask
// client.connectRedis()
app.use(ErrorMiddleware)

redis.on("connect", () => {
  console.log("Redis Connected");
});
// Create server
const server = http.createServer(app);
// Test server is Running
app.get("/workspace/share", async (req, res) => {

  try {

    const { id } = req.query;

    console.log(id, 'shareid');

    const spaceresponse = await Workspace.findById(id);
    console.log(spaceresponse, 'spaceresponsespaceresponsespaceresponsespaceresponsespaceresponsespaceresponse')

    if (!spaceresponse) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }
    console.log({
      success: true,
      data: spaceresponse,
    }, 'heytharun')
    return res.status(200).json({
      data: spaceresponse,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

app.get("/username", AuthTokenVerification, async (req, res, next) => {
  try {

    const username = "thaun";

    if (!username) {

      const error = new Error("Username Is required.");

      error.status = 404;

      return next(error);
    }

    return res.status(200).json({
      success: true,
      message: "Username Found"
    });

  } catch (error) {

    next(error);

  }
});


// ✅ Initialize socket
initSocket(server);
connectDb()
// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});