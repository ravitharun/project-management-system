// import mongoose from "mongoose";
const mongoose = require("mongoose")

const NotificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        // required: true,
    },

    message: {
        type: String,
        required: true,
    },
    isRead: [
        {
            userid: { type: String, isread: Boolean, default: true }
        }
    ],

    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Notification", NotificationSchema);