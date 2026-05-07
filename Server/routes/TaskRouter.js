const express = require("express")
const AddTask = require("../controller/AddTask")
const TaskRouter = express.Router()

// /api/Task/Addtask
TaskRouter.post("/AddTask",AddTask)
module.exports = TaskRouter