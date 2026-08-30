const express = require("express")
const CreateAutomation_rule = require("../controller/Automation-Rule")
const CreateAutomation_Router = express.Router()



CreateAutomation_Router.post("/rules", CreateAutomation_rule)

module.exports = CreateAutomation_Router