const express = require("express")
const { AuthNewAccount, Login, Google_CalndrLogin, Google_CalendarCallback } = require("../controller/Auth")
const { upload } = require("../config/mutler")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")
const createGoogleCalendarEvent = require("../service/google-Calendar.service")
const AuthRouter = express.Router()
AuthRouter.post("/register", upload.single("Profile"), AuthNewAccount)
AuthRouter.get("/Login", Login)
// AuthRouter.get("/google/callback", createGoogleCalendarEvent);
AuthRouter.get("/google", Google_CalndrLogin);
AuthRouter.get("/google/callback", Google_CalendarCallback);
module.exports = AuthRouter