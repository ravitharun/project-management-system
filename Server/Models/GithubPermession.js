const mongoose = require("mongoose")


const UserGithubSchema = new mongoose.Schema({
    pid: {
        type: String,
        required: true
    },

    userApplicationId: {
        type: String,
        required: true
    },

    githubUserId: {
        type: String,
        required: true
    },

    githubUsername: {
        type: String,
        required: true
    },

    githubAccessToken: {
        type: String,
        required: true
    },
    githubId: {
        type: String,
        required: true
    },
    connectedAt: {
        type: Date,
        default: Date.now
    }
});

UserGithubSchema.index(
    { pid: 1, userApplicationId: 1 },
    { unique: true }
);

    module.exports = mongoose.model("GithubConnection", UserGithubSchema)