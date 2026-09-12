const express = require("express")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")
const { IsLoginGithubPermession, SaveGithubPermession, GithubReposelection, GithubReposelections } = require("../controller/Github-permession")


const GithuPermessionRouter = express.Router()
// /api/github/pid/userid
GithuPermessionRouter.get("/:pid/:userid", AuthTokenVerification, IsLoginGithubPermession)
GithuPermessionRouter.post("/access-permission", AuthTokenVerification, SaveGithubPermession)
GithuPermessionRouter.get("/repositoryselection", AuthTokenVerification, GithubReposelections)


module.exports = GithuPermessionRouter