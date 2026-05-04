const express=require("express")
const AuthNewAccount = require("../controller/Auth")
const upload = require("../conifg/mutler")
const AuthRouter=express.Router()
AuthRouter.post("/register",upload.single("Profile"),AuthNewAccount)
module.exports=AuthRouter