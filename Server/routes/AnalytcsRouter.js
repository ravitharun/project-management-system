const express = require("express")
const AnalytcsRouter = express.Router()
const AuthTokenVerification = require("../Middleware/AuthMiddleware")
const { ViewdAt, FetchView } = require("../controller/Analytics")


// /api/Analytcs/:projectId/summary
AnalytcsRouter.get("/:projectId/:userid/summary", AuthTokenVerification,FetchView)
module.exports = AnalytcsRouter