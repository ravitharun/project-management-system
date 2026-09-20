const express = require("express")
const { AddMettings, fetchMettings, deleteMeeting, Meetingcompleted } = require("../controller/workspace-Mettings")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")

const mettings = express.Router()
mettings.post("/Add", AuthTokenVerification, AddMettings)
mettings.get("/", AuthTokenVerification, fetchMettings)
mettings.delete("/delete", AuthTokenVerification, deleteMeeting)
mettings.put("/completed", AuthTokenVerification, Meetingcompleted)
module.exports = mettings