const mongosse = require("mongoose")
const Activity = new mongosse.Schema({
    ActivityId: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    ActivityCreatedAt: { type: Date, requird: true },
    FromActivityChanges: { type: String, required: true },
    ToActivityChanges: { type: String, required: true }
})


module.exports=mongosse.model("Activity",Activity)
