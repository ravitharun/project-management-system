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
      enum: ["todo", "inprogress", "review", "completed"],
      default: "todo",
    },

    isTicketOpen: {
      type: Boolean,
      default: true,
    },

    isDuplicateTaskId: {
      type: String,
      default: "",
    },

    Taskid: {
      type: String,
      required: true,
      index: true,
    },

    TaskWallpaper: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
    },

    taskName: { type: String, required: true },

    description: { type: String, required: true },

    startDate: { type: Date, required: true },

    endDate: { type: Date, required: true },

    SubTask: [SubTaskSchema],

    assignTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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