const express = require("express")
const AnalytcsRouter = express.Router()
const Analytcs = require("../controller/Analytics")
AnalytcsRouter.get("/", Analytcs)
module.exports = AnalytcsRouter