const mongoose = require("mongoose")


const automationRuleSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WorkSpaceTasks",
        required: true
    },

    ruleName: {
        type: String,
        required: true,
        trim: true
    },

    trigger: {
        type: String,
        enum: [
            "TASK_CREATED",
            "TASK_ASSIGNED",
            "TASK_STATUS_CHANGED",
            "TASK_UPDATED",
            "COMMENT_ADDED",
            "TASK_COMPLETED"
        ],
        required: true
    },

    condition: {
        field: {
            type: String,
            enum: [
                "priority",
                "status",
                "assignee",
                "taskType"
            ],
            required: true
        },

        operator: {
            type: String,
            enum: [
                "equals",
                "not_equals",
                "contains"
            ],
            required: true
        },

        value: {
            type: String,
            required: true
        }
    },

    action: {
        type: String,
        enum: [
            "SEND_EMAIL",
            "SEND_NOTIFICATION",
            "CHANGE_STATUS",
            "MOVE_TASK",
            "ASSIGN_TASK",
            "ADD_COMMENT"
        ],
        required: true
    },

    actionValue: {
        type: String,
        default: null
    },

    active: {
        type: Boolean,
        default: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("AutomationRule", automationRuleSchema)