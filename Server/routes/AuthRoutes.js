const express=require("express")
const {AuthNewAccount,Login} = require("../controller/Auth")
const {upload} = require("../config/mutler")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")
const AuthRouter=express.Router()
AuthRouter.post("/register",upload.single("Profile"),AuthTokenVerification,AuthNewAccount)
AuthRouter.get("/Login",Login)
module.exports=AuthRouter