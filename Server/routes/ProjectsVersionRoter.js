const express=require("express")
const CreateRealse = require("../controller/ProjectsVersionRealse")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")
const ProjectsVersionRoter=express.Router()
ProjectsVersionRoter.post("/:projectId/release-versions", AuthTokenVerification,CreateRealse)

module.exports=ProjectsVersionRoter