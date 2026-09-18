const express = require("express")
const { AddMettings, fetchMettings } = require("../controller/workspace-Mettings")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")

const mettings = express.Router()
mettings.post("/Add", AuthTokenVerification, AddMettings)
mettings.get("/", fetchMettings)
module.exports = mettings