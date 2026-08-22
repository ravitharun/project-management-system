const express=require("express")
const Activity_Router=express.Router()
const SaveActiviy=require("../controller/Activity-Controller")



Activity_Router.get("/",SaveActiviy)



module.exports=Activity_Router