const express = require("express")
const {AddTask,fetchTaskes, updatedProgress, fetchalltaskes, updatetask, DeleteTask} = require("../controller/AddTask")
const TaskRouter = express.Router()

// /api/Task/Addtask
TaskRouter.post("/AddTask",AddTask)
TaskRouter.get("/TaskBYPproject",fetchTaskes)
TaskRouter.patch("/TaskProgressUpdatet",updatedProgress)
TaskRouter.get("/fetchalltaskes",fetchalltaskes)
TaskRouter.patch("/taskUpdate",updatetask)
TaskRouter.delete("/DeleteTask",DeleteTask)
module.exports = TaskRouter