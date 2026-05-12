const express = require("express")
const {AddTask,fetchTaskes, updatedProgress} = require("../controller/AddTask")
const TaskRouter = express.Router()

// /api/Task/Addtask
TaskRouter.post("/AddTask",AddTask)
TaskRouter.get("/TaskBYPproject",fetchTaskes)
TaskRouter.patch("/TaskProgressUpdatet",updatedProgress)
module.exports = TaskRouter