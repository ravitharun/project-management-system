const express = require("express")
const { CreateWorkSpace, FetchWorkspace, updateBackgroundspace, handelupdateSpaceIcon, DeleteWorkspace } = require("../controller/WorkSpace")
const CreateWorkSpaceRouter = express.Router()
CreateWorkSpaceRouter.get("/", FetchWorkspace)
CreateWorkSpaceRouter.post("/create", CreateWorkSpace)
CreateWorkSpaceRouter.patch("/updateBackgroundspace", updateBackgroundspace)
CreateWorkSpaceRouter.patch("/updateSpaceIcon", handelupdateSpaceIcon)
CreateWorkSpaceRouter.delete("/DeleteWorkspace",DeleteWorkspace)
module.exports = CreateWorkSpaceRouter