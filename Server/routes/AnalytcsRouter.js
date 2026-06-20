const express = require("express")
const AnalytcsRouter = express.Router()
const AuthTokenVerification = require("../Middleware/AuthMiddleware")
const { ViewdAt, FetchView } = require("../controller/Analytics")
// AnalytcsRouter.post("/View", AuthTokenVerification,ViewdAt)
AnalytcsRouter.post("/View", ViewdAt)
AnalytcsRouter.get("/", FetchView)
module.exports = AnalytcsRouter