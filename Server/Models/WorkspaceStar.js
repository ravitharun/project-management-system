const mongoose = require("mongoose")
const WorkspaceStarSchema = new mongoose.Schema({

    workspaceID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Workspace" },
    StarUsers: [
        {

            isstar: { type: Boolean, required: true },
            UserId: {type: mongoose.Schema.Types.ObjectId,required: true ,ref:"User"},
            emails: { type: String, required: true ,},
            Star_Time: { type: Date, default: Date.now() }
        }

    ],





})



module.exports = mongoose.model("StarWorkspace", WorkspaceStarSchema)