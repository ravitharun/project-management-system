const mongoose = require("mongoose")
const AddProject = new mongoose.Schema({
    projectId: { type: String, required: true },
    projectName: { type: String, required: true },
    description: { type: String, default: "Project description Default" },
    owner: { userId: { type: String, required: true }, name: { type: String, required: true }, email: { type: String, required: true }, },
    teamMembers: [{ type: String, required: true }],
    status: { type: String, default: "Not Started" },
    priority: { type: String, default: "Medium" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { total: { type: Number, required: true }, spent: { type: Number, required: true }, currency: { type: String, default: "INR" }, },
    tags: [{ type: String, required: true }],
    data: {
        username: { type: String, required: true },
        userEmail: { type: String, required: true },
        userrole: { type: String, required: true }
    }
}, {
    timeseries: true
})

module.exports = mongoose.model("Project", AddProject)