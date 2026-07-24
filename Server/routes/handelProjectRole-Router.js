const express=require("express")
const handelProjectRole = require("../controller/handel-projectsRole")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")

const handelProjectRoleRouter=express.Router()

// /api/project-roles
handelProjectRoleRouter.patch("/:id/:ProjectID/:Role",handelProjectRole)
module.exports=handelProjectRoleRouter