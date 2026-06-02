const express = require("express")
const { CreateWorkSpace, FetchWorkspace, updateBackgroundspace } = require("../controller/WorkSpace")
const CreateWorkSpaceRouter = express.Router()
CreateWorkSpaceRouter.get("/", FetchWorkspace)
CreateWorkSpaceRouter.post("/create", CreateWorkSpace)
CreateWorkSpaceRouter.patch("/updateBackgroundspace", updateBackgroundspace)
module.exports = CreateWorkSpaceRouter