const express = require("express")
const { CreateSprint, GetSprint, GetActiveSprint, UpdateSprintStatus, AddtaskInActiveSprint,stopActiveSprint } = require("../controller/Sprint")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")
const SprintRouter = express.Router()
// /api/sprints/sprints
SprintRouter.post("/sprints", AuthTokenVerification, CreateSprint)
SprintRouter.get("/:spaceid/sprint", AuthTokenVerification, GetSprint)
SprintRouter.get("/:spaceid/Activesprint", AuthTokenVerification, GetActiveSprint)
SprintRouter.put("/:spaceid/:ProjectId/Updatesprint", AuthTokenVerification, UpdateSprintStatus)
SprintRouter.put("/:TaskId/:Sprintid/:ProjectId/UpdateTasksprint", AuthTokenVerification, AddtaskInActiveSprint)
SprintRouter.get("/:Sprintid/:spaceid/UpdateTasksprint", AuthTokenVerification, stopActiveSprint)
module.exports = SprintRouter