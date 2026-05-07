const mongoose = require("mongoose")

const { TaskId } = require("../Utils/EmpIDGenrator")
const AssignTask = new mongoose.Schema({
    ProjectID: { type: String, required: true },
    TaskId: { type: String, unique: true },
    AddedBy: [{
        name: { type: String, required: true },
        userEmail: { type: String, required: true },
        userrole: { type: String, required: true }
    }],

    assignToMember: { type: String, required: true },
    TaskName: { type: String, required: true },
    Taskdescription: { type: String, required: true },
    TaskstartDate: { type: Date, default: Date.now() },
    TaskendDate: { type: Date, default: Date.now() },
    taskestimatedHours: { type: String, required: true },
    taskpriority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    TaskProgress: { type: Number },
    Taskstatus: {
        type: String,
        // enum: ['Pending', 'In Progress', 'Completed'],

        default: 'In Progress'
    }


}, {
    timestamps: true
})


module.exports = mongoose.model("AddTask", AssignTask)