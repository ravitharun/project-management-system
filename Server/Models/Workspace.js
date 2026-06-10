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



const starUsser = new mongoose.Schema([{
    userEmail: { type: String, required: true, default: false },
    userName: { type: String, default: "username" },

}], { timestamps: true })

const WorkspaceSchema = new mongoose.Schema({
    workspaceIcon: { type: String },
    workspaceBackground: { type: String, default: "https://picsum.photos/id/1015/600/400" },
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
    workspaceicon: {
        id: { type: String, required: true },
        name: { type: String, default: "Icon name" },
        img: { type: String, required: true },
    }
    ,
    Spacebackground: { type: String },
    isStaredUsers: starUsser,
    WorkSpacememebers: [{ type: String }],


    workspaceSetup: workspaceSetupSchema
}, {
    timestamps: true
});

module.exports = mongoose.model("Workspace", WorkspaceSchema);


