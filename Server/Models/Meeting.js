const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema(
  {
    MettingTitle: {
      type: String,
      required: true,
      trim: true,
    },

    MettingStartTime: {
      type: String,
      required: true,
    },

    MettingEndTime: {
      type: String,
      required: true,
    },

    PID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    CreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    TeamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meetings", MeetingSchema);