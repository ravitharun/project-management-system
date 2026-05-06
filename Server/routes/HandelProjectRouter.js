const express = require("express")
const {CreateProjects,FetchProjects} = require("../controller/AddProjetcs")
const ProjectsRoute = express.Router()
// /api/ManageProject/Create
ProjectsRoute.post("/Create", CreateProjects)
ProjectsRoute.get("/Projects", FetchProjects)
module.exports = ProjectsRoute