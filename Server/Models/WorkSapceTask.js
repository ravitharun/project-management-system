const { default: mongoose } = require("mongoose")
const mongosse = require("mongoose")

const TaskToAssiginMemeber = new mongosse.Schema({
    Name: { type: String, required: true },
    Email: {
        type: String, required: true, index: true
    },

})

// const Subatask = new mongosse.Schema([{
//     TaskId: {
//         type: String,
//         unique: true,
//         sparse: true
//     },
//     taskName: { type: String, },
//     taskPriority: { type: String, },
//     AssiginMember: TaskToAssiginMemeber,
//     SubTaskStatus: { type: String, default: "In progress" },

// }])
const Subatask = new mongosse.Schema({
    TaskId: {
        type: String,
        // unique: true,
        sparse: true
    },
    taskName: String,
    taskPriority: String,

    AssiginMember: TaskToAssiginMemeber,

    SubTaskStatus: {
        type: String,
        default: "In progress"
    }
});

const WorkSpaceTask = new mongosse.Schema({
    projectid: { type: String, required: true, index: true },
    TaskStatus: {
        type: String,
        enum: ["todo", "inprogress", "review", "completed"],
        default: "todo"
    },
    isTicketOpen: {
        type: Boolean,
        default: true
    },
    isDuplicateTaskId: { type: String, default: "" },
    Taskid: { type: String, required: true, index: true },
    TaskWallpaper: { type: String, default: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e" },
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    SubTask: [Subatask],
    Files: [{
        fileurl: { type: String },
        userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        uploadedAt: { type: Date, default: Date.now() }
    }],
    Links: [{
        Link: { type: String },
        LinkName: { type: String },

    }],

}, {
    timestamps: true
})



module.exports = new mongosse.model("WorkSpaceTasks", WorkSpaceTask)