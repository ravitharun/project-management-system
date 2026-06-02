const mongoose = require("mongoose");

const workspaceSetupSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },

    workTypes: [{
        id: { type: String, required: true },
        name: { type: String, required: true }
    }],

    statuses: [{ type: String, required: true }],
    views: [{ type: String, required: true }],


    features: [{ type: String, required: true }],



    workspaceName: { type: String, required: true },

    workspaceDescription: {
        type: String,
        default: "Organize projects, manage tasks, collaborate with teams, and track progress efficiently in one centralized workspace."
    },

    bestFor: [{ type: String, required: true }],
    keyFeatures: [{ type: String, required: true }],
    trackItems: [{ type: String, required: true }],

    createby: {
        userEmail: { type: String, required: true }
    }
});

const WorkspaceSchema = new mongoose.Schema({
    workspaceIcon: { type: String },
    defaultView: { type: String, required: true },
    id: { type: String, required: true },
    name: { type: String, required: true },
    badge: { type: String, required: true },
    image: { type: String, required: true },
    icon: { type: String, required: true },
    detailedInfo: { type: String, required: true },
    product: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true }, columns: [{
        id: { type: String, required: true },
        name: { type: String, required: true }
    }],


    workspaceSetup: workspaceSetupSchema
}, {
    timestamps: true
});

module.exports = mongoose.model("Workspace", WorkspaceSchema);