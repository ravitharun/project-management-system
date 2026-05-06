const express = require("express")
const { CreateProjects, FetchProjects } = require("../controller/AddProjetcs")
const AuthUserTokeen = require("../Middleware/AuthMiddleware")
const ProjectsRoute = express.Router()
ProjectsRoute.post("/Create", AuthUserTokeen, CreateProjects)
ProjectsRoute.get("/Projects", AuthUserTokeen, FetchProjects)
module.exports = ProjectsRoute  