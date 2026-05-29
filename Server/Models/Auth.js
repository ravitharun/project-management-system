const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    userID: { type: String, required: false, unique: true },
    userProfile: { type: String, required: true },
    Username: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    userPassword: { type: String, required: false },
    isactive: { type: Boolean, default: false },
    logintype: { type: String },
    type: { type: String },
    lastseen: { type: Date, default: Date.now() }
})
module.exports = mongoose.model("User", UserSchema)