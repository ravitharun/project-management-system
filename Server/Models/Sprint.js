// import mongoose from "mongoose";
const mongoose = require("mongoose")

const SprintSchema = new mongoose.Schema(
    {
        ProjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true,
        },

        SprintName: {
            type: String,
            required: true,
            trim: true,
        },

        SprintGoal: {
            type: String,
            required: true,
            trim: true,
        },
        SprintTasks: {
            type: String,
            default: "0"
        },

        SprintDescription: {
            type: String,
            default: "",
            trim: true,
        },
        SprintProgress: {
            type: String,
            default: "0",
        },

        SprintStartDate: {
            type: Date,
            required: true,
        },

        SprintEndDate: {
            type: Date,
            required: true,
        },

        SprintStatus: {
            type: String,
            enum: ["PLANNED", "ACTIVE", "COMPLETED"],
            default: "PLANNED",
        },

        SprintOrder: {
            type: Number,
            default: 1,
        },
        SprintActive: {
            type: Boolean,
            default: false
        },

        Sprint_CreatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Sprint", SprintSchema);