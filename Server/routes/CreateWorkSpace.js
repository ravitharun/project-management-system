const express=require("express")
const CreateWorkSpace = require("../controller/WorkSpace")
const CreateWorkSpaceRouter=express.Router()
CreateWorkSpaceRouter.post("/create",CreateWorkSpace)
module.exports=CreateWorkSpaceRouter