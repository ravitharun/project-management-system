const express = require("express")
const AnalytcsRouter = express.Router()
const AuthTokenVerification = require("../Middleware/AuthMiddleware")
const { ViewdAt, FetchView } = require("../controller/Analytics")
// AnalytcsRouter.post("/View", AuthTokenVerification,ViewdAt)
// AnalytcsRouter.post("/View", ViewdAt)

// /api/Analytcs/:projectId/summary
AnalytcsRouter.get("/:projectId/summary", FetchView)
module.exports = AnalytcsRouter