
const mongoose=require("mongoose")
const activitySchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    entityType: {
      type: String,
      required: true,
    },

    entityId: {
      type: String,
      required: true,
    },

    entityName: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

module.exports=mongoose.model("Projectactivity",activitySchema)