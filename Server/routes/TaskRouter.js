const express = require("express")
const {AddTask,fetchTaskes} = require("../controller/AddTask")
const TaskRouter = express.Router()

// /api/Task/Addtask
TaskRouter.post("/AddTask",AddTask)
TaskRouter.get("/TaskBYPproject",fetchTaskes)
module.exports = TaskRouter