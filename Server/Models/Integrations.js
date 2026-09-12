const mongoose = require("mongoose");
const IntegrationsSchema = new mongoose.Schema(
    {
        github: {
            type: Boolean,
            default: false,
        },

        googleCalendar: {
            type: Boolean,
            default: false,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Integrations", IntegrationsSchema);