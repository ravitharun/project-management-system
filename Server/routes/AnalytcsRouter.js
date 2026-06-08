const express = require("express")
const AnalytcsRouter = express.Router()
const Analytcs = require("../controller/Analytics")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")
AnalytcsRouter.get("/", AuthTokenVerification,Analytcs)
module.exports = AnalytcsRouter