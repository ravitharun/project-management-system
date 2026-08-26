// require("dotenv").config();
// const express = require("express");
// const app = express();
// const http = require("http");
// const cron = require("node-cron")
// const AuthRouter = require("./routes/AuthRoutes");
// const { initSocket, getIO } = require("./scoket");
// const cors = require("cors");
// const connectDb = require("./config/Db");
// const { GetEmpNameGenById, TaskId, ProjetcId } = require("./Utils/EmpIDGenrator");
// const ProjectsRoute = require("./routes/HandelProjectRouter");
// const SprintRouter = require("./routes/SprintRouter");
// const ProjectsVersionRoter = require("./routes/ProjectsVersionRoter");
// const FileUploadRouter = require("./routes/FileUploadsProjectRouter");
// const Activity_Router = require("./routes/Activity-Router");
// const NotificatonsRouter = require("./routes/NotificatonsRouter");
// const FetchTeamRouter = require("./routes/FetchTeamRouter");
// const AnalytcsRouter = require("./routes/AnalytcsRouter");
// const handelProjectRoleRouter = require("./routes/handelProjectRole-Router");
// const { SendAccountCreationEmail, SendWelcomEmail, taskAssiginedEmail } = require("./service/Email");
// const redis = require("./config/redis");
// // Middleware
// app.use(express.json());
// const fs = require("fs");
// const CreateWorkSpaceRouter = require("./routes/CreateWorkSpace");
// const Workspace = require("./Models/Workspace");
// const Comments = require("./routes/Comments");
// const WorkSpaceTaskRouter = require("./routes/WorkSpaceTask_router");
// const limiter = require("./RateLimiter");
// const ErrorMiddleware = require("./Middleware/ErrorMiddleware");
// const AuthTokenVerification = require("./Middleware/AuthMiddleware");
// const { runBackup } = require("./backup");
// const createGoogleCalendarEvent = require("./service/google-Calendar.service");
// const FetchTaskCalendar = require("./routes/GetTaskCalendarRouter");
// const SaveActiviy = require("./controller/Activity-Controller");
// const check = `${process.env.envStatus === "Local"
//   ? "http://localhost:5000"
//   : "https://project-management-system-u091.onrender.com"
//   }/api/workspace/approve-workspace-invite/?workspaceid=spaceId&AcceptEmail=useremail`;

// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }
// const isProd = process.env.envStatus === "Prod";
// console.log(isProd, 'checkispord')

// // cors
// const envStatusurl = process.env.envStatus == "Local" ? "http://localhost:5173" : process.env.LiveUI
// //const Db = process.env.envStatus == 'Prod' ? process.env.Db : 'mongodb://localhost:27017/ProjectManagementWebsite'


// app.use(cors({ origin: [envStatusurl, 'https://taskora-system.netlify.app'] }));

// // app.use(limiter)
// // /api/ProjectfileUploads/upload
// // Routes
// app.use("/api/auth", AuthRouter);
// app.use("/api/ManageProject", ProjectsRoute);
// app.use("/api/ProjectfileUpload", FileUploadRouter)
// app.use("/api/Notificatons", NotificatonsRouter)
// app.use("/api/Team", FetchTeamRouter)
// // /api/Analytcs/View
// app.use("/api/Analytcs", AnalytcsRouter)
// app.use("/api/WorkSpace", CreateWorkSpaceRouter)
// app.use("/api/Task", WorkSpaceTaskRouter)
// app.use("/api/comments", Comments)
// app.use("/api/project-roles", handelProjectRoleRouter)

// app.use("/api/sprints", SprintRouter)
// app.use("/api/Calendar", FetchTaskCalendar)
// app.use("/api/Activity", Activity_Router)
// app.use('/api/projects', ProjectsVersionRoter)
// // /api/Task/AddWorkSpaceTask
// // client.connectRedis()
// app.use(ErrorMiddleware)

// redis.on("connect", () => {
//   console.log("Redis Connected");
// });
// // Create server
// const server = http.createServer(app);
// // Test server is Running
// app.get("/workspace/share", async (req, res) => {

//   try {

//     const { id } = req.query;

//     // console.log(id, 'shareid');

//     const spaceresponse = await Workspace.findById(id);

//     if (!spaceresponse) {
//       return res.status(404).json({
//         success: false,
//         message: "Workspace not found",
//       });
//     }

//     return res.status(200).json({
//       data: spaceresponse,
//     });

//   } catch (error) {

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }

// });

// app.get("/username", AuthTokenVerification, async (req, res, next) => {
//   try {

//     const username = "thaun";

//     if (!username) {

//       const error = new Error("Username Is required.");

//       error.status = 400;

//       return next(error);
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Username Found"
//     });

//   } catch (error) {

//     next(error);

//   }
// });

// app.get("/", (req, res) => {


//   return res.status(200).json({ message: "Server is Working" })
// })


// // app.get("/api/health", (req, res) => {

// //   const dt = new Date()

// //   console.log(dt.toTimeString(), 'hit evry 5 min');

// //   return res.status(200).json({ message: ` Server is running : ${dt.toTimeString()}` })
// // })

// // runBackup Db Automated @12am evryday
// cron.schedule("0 0 * * *", () => {

//   runBackup();
// });



// // ✅ Initialize socket
// initSocket(server);
// connectDb()
// // Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const cron = require("node-cron");
const cors = require("cors");
const fs = require("fs");

// Routes
const AuthRouter = require("./routes/AuthRoutes");
const ProjectsRoute = require("./routes/HandelProjectRouter");
const SprintRouter = require("./routes/SprintRouter");
const ProjectsVersionRoter = require("./routes/ProjectsVersionRoter");
const FileUploadRouter = require("./routes/FileUploadsProjectRouter");
const Activity_Router = require("./routes/Activity-Router");
const NotificatonsRouter = require("./routes/NotificatonsRouter");
const FetchTeamRouter = require("./routes/FetchTeamRouter");
const AnalytcsRouter = require("./routes/AnalytcsRouter");
const handelProjectRoleRouter = require("./routes/handelProjectRole-Router");
const CreateWorkSpaceRouter = require("./routes/CreateWorkSpace");
const Comments = require("./routes/Comments");
const WorkSpaceTaskRouter = require("./routes/WorkSpaceTask_router");
const FetchTaskCalendar = require("./routes/GetTaskCalendarRouter");

// Config / Middleware
const { initSocket } = require("./scoket");
const connectDb = require("./config/Db");
const redis = require("./config/redis");
const ErrorMiddleware = require("./Middleware/ErrorMiddleware");
const AuthTokenVerification = require("./Middleware/AuthMiddleware");
const Workspace = require("./Models/Workspace");

// --------------------------------------------------
// Environment
// --------------------------------------------------

const isVercel = process.env.VERCEL === "1";
const isProd = process.env.envStatus === "Prod";

console.log("isProd:", isProd);
console.log("isVercel:", isVercel);

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(express.json());

const envStatusurl =
  process.env.envStatus === "Local"
    ? "http://localhost:5173"
    : process.env.LiveUI;

app.use(
  cors({
    origin: [
      envStatusurl,
      "https://taskora-system.netlify.app",
    ],
  })
);

// --------------------------------------------------
// Local uploads folder
// Don't create filesystem folders on Vercel
// --------------------------------------------------

if (!isVercel) {
  if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
    console.log("uploads folder created");
  }
}

// --------------------------------------------------
// Routes
// --------------------------------------------------

app.use("/api/auth", AuthRouter);

app.use("/api/ManageProject", ProjectsRoute);

app.use("/api/ProjectfileUpload", FileUploadRouter);

app.use("/api/Notificatons", NotificatonsRouter);

app.use("/api/Team", FetchTeamRouter);

app.use("/api/Analytcs", AnalytcsRouter);

app.use("/api/WorkSpace", CreateWorkSpaceRouter);

app.use("/api/Task", WorkSpaceTaskRouter);

app.use("/api/comments", Comments);

app.use("/api/project-roles", handelProjectRoleRouter);

app.use("/api/sprints", SprintRouter);

app.use("/api/Calendar", FetchTaskCalendar);

app.use("/api/Activity", Activity_Router);

app.use("/api/projects", ProjectsVersionRoter);

// --------------------------------------------------
// Redis
// --------------------------------------------------

redis.on("connect", () => {
  console.log("Redis Connected");
});

// --------------------------------------------------
// Create HTTP Server
// --------------------------------------------------

const server = http.createServer(app);

// --------------------------------------------------
// Workspace Share
// --------------------------------------------------

app.get("/workspace/share", async (req, res) => {
  try {
    const { id } = req.query;

    const spaceresponse = await Workspace.findById(id);

    if (!spaceresponse) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

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

// --------------------------------------------------
// Username
// --------------------------------------------------

app.get("/username", AuthTokenVerification, async (req, res, next) => {
  try {
    const username = "thaun";

    if (!username) {
      const error = new Error("Username Is required.");
      error.status = 400;
      return next(error);
    }

    return res.status(200).json({
      success: true,
      message: "Username Found",
    });
  } catch (error) {
    next(error);
  }
});

// --------------------------------------------------
// Health Check
// --------------------------------------------------

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Server is Working",
  });
});

// --------------------------------------------------
// Error Middleware
// --------------------------------------------------

app.use(ErrorMiddleware);

// --------------------------------------------------
// Database
// --------------------------------------------------

connectDb();

// --------------------------------------------------
// Backup
// IMPORTANT:
// Only run backup locally.
// Never load backup.js on Vercel.
// --------------------------------------------------

if (!isVercel) {
  const { runBackup } = require("./backup");

  cron.schedule("0 0 * * *", () => {
    console.log("Running database backup...");
    runBackup();
  });

  console.log("Local backup cron enabled");
} else {
  console.log("Vercel detected - backup cron disabled");
}

// --------------------------------------------------
// Socket.IO
// --------------------------------------------------

initSocket(server);

// --------------------------------------------------
// Start Server
// --------------------------------------------------

// Vercel doesn't need server.listen()
// For local development, start the server normally.

if (!isVercel) {
  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// --------------------------------------------------
// Export for Vercel
// --------------------------------------------------

module.exports = app;