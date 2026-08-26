

const mongoose = require("mongoose")
const ProjectReleaseSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },

    Version: {
        type: String,
        required: true,
        trim: true
    },

    RealseDescprition: {
        type: String,
        required: true,
        trim: true
    },

    RealseDescprition: {
        type: String,
        required: true,
        trim: true
    },

    Started: {
        type: Date,
        default: Date.now
    },

    plannedReleaseDate: {
        type: Date,
        default: null
    },

    releaseDate: {
        type: Date,
        default: null
    },

    ReleaseNotes: {
        type: String,
        trim: true,
        default: ""
    },

    Status: {
        type: String,
        enum: ["Planned", "In Progress", "Released", "Archived"],
        default: "Planned"
    },

    RealseBy_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

const ProjectRelease = mongoose.model(
    "ProjectRelease",
    ProjectReleaseSchema
);

module.exports = ProjectRelease;