const express=require("express")
const {handelProjectRole,RemoveTeamMembers} = require("../controller/handel-projectsRole")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")

const handelProjectRoleRouter=express.Router()

// /api/project-roles
handelProjectRoleRouter.patch("/:id/:ProjectID/:Role",AuthTokenVerification,handelProjectRole)
handelProjectRoleRouter.delete("/:id/:ProjectID",AuthTokenVerification,RemoveTeamMembers)
module.exports=handelProjectRoleRouter