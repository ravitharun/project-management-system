const express=require("express")
const {CreateRealse,Fetch__Version_Realses} = require("../controller/ProjectsVersionRealse")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")
const ProjectsVersionRoter=express.Router()
ProjectsVersionRoter.post("/:projectId/release-versions", AuthTokenVerification,CreateRealse)
ProjectsVersionRoter.get("/:projectId", AuthTokenVerification,Fetch__Version_Realses)

module.exports=ProjectsVersionRoter