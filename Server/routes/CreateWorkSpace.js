const express = require("express")
const { CreateWorkSpace, FetchWorkspace } = require("../controller/WorkSpace")
const CreateWorkSpaceRouter = express.Router()
CreateWorkSpaceRouter.get("/", FetchWorkspace)
CreateWorkSpaceRouter.post("/create", CreateWorkSpace)
module.exports = CreateWorkSpaceRouter