const express = require("express")
const { CreateSprint, GetSprint, GetActiveSprint, UpdateSprintStatus } = require("../controller/Sprint")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")
const SprintRouter = express.Router()
// /api/sprints/sprints
SprintRouter.post("/sprints", AuthTokenVerification, CreateSprint)
SprintRouter.get("/:spaceid/sprint", AuthTokenVerification, GetSprint)
SprintRouter.get("/:spaceid/Activesprint", AuthTokenVerification, GetActiveSprint)
SprintRouter.put("/:spaceid/:ProjectId/Updatesprint", AuthTokenVerification, UpdateSprintStatus)
module.exports = SprintRouter