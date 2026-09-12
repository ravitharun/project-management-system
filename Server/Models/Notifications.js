const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema(
    {
        EmailNotifications: {
            type: Boolean,
            default: false
        },
        TaskAssignments: {
            type: Boolean,
            default: false
        },
        Mentions: {
            type: Boolean,
            default: false
        },
        Comments: {
            type: Boolean,
            default: false
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Application-Notifications", NotificationsSchema);