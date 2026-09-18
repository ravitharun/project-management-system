const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema(
  {
    MettingTitle: {
      type: String,
      required: true,
      trim: true,
    },

    MettingDate: {
      type: String,
      required: true,
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
    MettingCompleted: {
      type: Boolean,
      default: false
    },

    TeamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    attendeeCount: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: 0
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meetings", MeetingSchema);