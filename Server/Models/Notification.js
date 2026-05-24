// import mongoose from "mongoose";
const mongoose = require("mongoose")

const NotificationSchema = new mongoose.Schema({
    userId: {
        default: "userid",
        type: String,
        // required: true,
    },

    message: {
        type: String,
        required: true,
    },
    // isRead: [
    //     {
    //         userid: { type: String },
    //     }
    // ],
    isRead: { type: Boolean, default: false },

    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Notification", NotificationSchema);