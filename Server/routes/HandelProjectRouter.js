const express = require("express")
const CreateProjects = require("../controller/AddProjetcs")
const ProjectsRoute = express.Router()
// /api/ManageProject/Create
ProjectsRoute.post("/Create", CreateProjects)
module.exports = ProjectsRoute