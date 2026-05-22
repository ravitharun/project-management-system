const express=require("express")
const FetchTeam = require("../controller/Team")
const FetchTeamRouter=express.Router()
FetchTeamRouter.get("/",FetchTeam)
module.exports=FetchTeamRouter