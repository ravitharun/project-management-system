const express=require("express")
const FetchTeam = require("../controller/Team")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")
const FetchTeamRouter=express.Router()
FetchTeamRouter.get("/",AuthTokenVerification,FetchTeam)
module.exports=FetchTeamRouter