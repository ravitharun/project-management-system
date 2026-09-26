const mongoose = require("mongoose")

const MeetingParticipantsSchema = new mongoose.Schema(
    {
        meetingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Meetings",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        joinedAt: {
            type: Date,
            default: Date.now,
        },
        LeftAt: {
            type: Date,
            default: null,
        },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "MeetingParticipants",
    MeetingParticipantsSchema
);