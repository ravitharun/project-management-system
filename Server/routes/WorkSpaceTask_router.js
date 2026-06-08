const express = require("express")
const {AddWorkSpaceTask,Addcomments, AddRelpys} = require("../controller/WorkSpaceTask-Controller")
const WorkSpaceTaskRouter = express.Router()

WorkSpaceTaskRouter.post("/AddWorkSpaceTask", AddWorkSpaceTask)
WorkSpaceTaskRouter.post("/Addcomments", Addcomments)
WorkSpaceTaskRouter.put("/AddRelpys", AddRelpys)
module.exports = WorkSpaceTaskRouter