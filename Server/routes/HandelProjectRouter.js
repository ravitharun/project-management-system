const express = require("express")
const { CreateProjects, FetchProjects, ManageMembersProject, UpdateProjectStatus } = require("../controller/AddProjetcs")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")
const ProjectsRoute = express.Router()
ProjectsRoute.post("/Create", AuthTokenVerification, CreateProjects)
ProjectsRoute.get("/Projects", AuthTokenVerification, FetchProjects)
ProjectsRoute.put("/AddMembers", AuthTokenVerification, ManageMembersProject)
ProjectsRoute.put("/UpdateProjectStatus", AuthTokenVerification, UpdateProjectStatus)

module.exports = ProjectsRoute  