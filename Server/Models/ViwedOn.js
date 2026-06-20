const mongoose = require("mongoose")

const WorkspaceViewedSchema = new mongoose.Schema(
    {
        
        UserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },


        viewedWorkspaces: [{
            WorkspaceId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Workspace",
                required: true,
            },

            ViewdAt: { type: Date, default: Date.now() }
        }]

    },
    {
        timestamps: true,
    }
);

// Prevent duplicate records for same user + workspace
WorkspaceViewedSchema.index(
    { UserId: 1, WorkspaceId: 1 },
    { unique: true }
);

module.exports = mongoose.model(
    "WorkspaceViewed",
    WorkspaceViewedSchema
);