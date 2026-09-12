const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        Role: {
            type: String,
            enum: ["SUPER_ADMIN", "ADMIN", "TEAM_LEAD", "MEMBER"], default: "MEMBER"
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

module.exports = mongoose.model("Profile", ProfileSchema);