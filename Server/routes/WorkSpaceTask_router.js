const express = require("express")
const { AddWorkSpaceTask, Addcomments, AddRelpys, FetchTasks, AddSubTask } = require("../controller/WorkSpaceTask-Controller")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")
const WorkSpaceTaskRouter = express.Router()

WorkSpaceTaskRouter.get("/", AuthTokenVerification, FetchTasks)
WorkSpaceTaskRouter.post("/AddWorkSpaceTask", AuthTokenVerification, AddWorkSpaceTask)
WorkSpaceTaskRouter.post("/Addcomments", AuthTokenVerification, Addcomments)
WorkSpaceTaskRouter.put("/AddRelpys", AuthTokenVerification, AddRelpys)
WorkSpaceTaskRouter.post("/AddSubTasks", AuthTokenVerification, AddSubTask)
module.exports = WorkSpaceTaskRouter