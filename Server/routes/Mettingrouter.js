const express = require("express")

const Mettingrouter = express.Router()
const getLiveKitToken = require("../controller/Metting")

Mettingrouter.post("/livekit-token", getLiveKitToken);

module.exports = Mettingrouter;