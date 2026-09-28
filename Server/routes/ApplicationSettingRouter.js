const express=require("express");
const ApplicationProfile = require("../controller/Applicationsettings");
const AuthTokenVerification = require("../Middleware/AuthMiddleware");
const Application_Settings_Profile=express.Router();
Application_Settings_Profile.get("/Profile",AuthTokenVerification,ApplicationProfile)
module.exports=Application_Settings_Profile