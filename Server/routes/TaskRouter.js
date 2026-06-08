const express = require("express")
const {AddTask,fetchTaskes, updatedProgress, fetchalltaskes, updatetask, DeleteTask} = require("../controller/AddTask")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")
const TaskRouter = express.Router()

// /api/Task/Addtask
TaskRouter.post("/AddTask",AuthTokenVerification,AddTask)
TaskRouter.get("/TaskBYPproject",AuthTokenVerification,fetchTaskes)
TaskRouter.patch("/TaskProgressUpdatet",AuthTokenVerification,updatedProgress)
TaskRouter.get("/fetchalltaskes",AuthTokenVerification,fetchalltaskes)
TaskRouter.patch("/taskUpdate",AuthTokenVerification,updatetask)
TaskRouter.delete("/DeleteTask",AuthTokenVerification,DeleteTask)
module.exports = TaskRouter