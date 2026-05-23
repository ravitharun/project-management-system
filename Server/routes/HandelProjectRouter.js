const express = require("express")
const { CreateProjects, FetchProjects,ManageMembersProject } = require("../controller/AddProjetcs")
const AuthUserTokeen = require("../Middleware/AuthMiddleware")
const ProjectsRoute = express.Router()
ProjectsRoute.post("/Create", AuthUserTokeen, CreateProjects)
ProjectsRoute.get("/Projects", AuthUserTokeen, FetchProjects)
ProjectsRoute.put("/AddMembers", AuthUserTokeen, ManageMembersProject)
module.exports = ProjectsRoute  