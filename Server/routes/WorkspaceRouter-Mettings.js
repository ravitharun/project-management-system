const express = require("express")
const { AddMettings, fetchMettings, deleteMeeting } = require("../controller/workspace-Mettings")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")

const mettings = express.Router()
mettings.post("/Add", AuthTokenVerification, AddMettings)
mettings.get("/", AuthTokenVerification, fetchMettings)
mettings.delete("/delete", AuthTokenVerification, deleteMeeting)
module.exports = mettings