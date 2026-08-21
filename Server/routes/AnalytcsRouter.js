const express = require("express")
const AnalytcsRouter = express.Router()
const AuthTokenVerification = require("../Middleware/AuthMiddleware")
const { ViewdAt, FetchView, Viewed } = require("../controller/Analytics")


// /api/Analytcs/:projectId/summary
AnalytcsRouter.get("/:projectId/:userid/summary", AuthTokenVerification,FetchView)
AnalytcsRouter.get("/api/Analytcs", AuthTokenVerification,Viewed)
module.exports = AnalytcsRouter