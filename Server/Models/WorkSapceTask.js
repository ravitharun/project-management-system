const mongoose = require("mongoose");

// SubTask Schema
const SubTaskSchema = new mongoose.Schema({
    TaskId: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(), // or crypto.randomUUID()
    },

    taskName: String,

    taskPriority: String,

    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    SubTaskStatus: {
        type: String,
        default: "In progress",
    },
});

// WorkSpace Task Schema
const WorkSpaceTask = new mongoose.Schema(
    {
        projectid: { type: String, required: true, index: true },

        TaskStatus: {
            type: String,
            enum: ["todo", "inprogress", "review", "Completed"],
            default: "todo",
        },

        reminder: {
            enabled: {
                type: Boolean,
                default: false
            },

            reminderBefore: {
                type: Number,
                default: 30
            },

            reminderType: {
                type: String,
                enum: ["popup", "email"],
                default: "popup",
                min:1
            }
        },

        googleCalendar: {
            eventId: {
                type: String,
                default: null
            },

            calendarId: {
                type: String,
                default: "primary"
            },

            syncStatus: {
                type: String,
                enum: ["pending", "synced", "failed"],
                default: "pending"
            }
        },



        isTicketOpen: {
            type: Boolean,
            default: true,
        },

        isDuplicateTaskId: {
            type: String,
            default: "",
        },

        TaskId: {
            type: String,
            default: () => new mongoose.Types.ObjectId().toString(),
            required: true,
        },

        TaskWallpaper: {
            type: String,
            default:
                "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
        },

        taskName: { type: String, required: true },

        description: { type: String, required: true },

        startDate: { type: Date, default: Date.now},

        endDate: { type: Date, default: Date.now},
        SubTask: [SubTaskSchema],

        assignTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        Files: [
            {
                fileurl: String,
                userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                uploadedAt: { type: Date, default: Date.now },
            },
        ],

        Links: [
            {
                Link: String,
                LinkName: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Export model
module.exports = mongoose.model("WorkSpaceTasks", WorkSpaceTask);