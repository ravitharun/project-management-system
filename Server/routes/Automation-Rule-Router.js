const express = require("express")
const { CreateAutomation_rule, FetchAutomationRules } = require("../controller/Automation-Rule")
const CreateAutomation_Router = express.Router()



CreateAutomation_Router.post("/rules", CreateAutomation_rule)
CreateAutomation_Router.get("/:projectID/rules", FetchAutomationRules)

module.exports = CreateAutomation_Router