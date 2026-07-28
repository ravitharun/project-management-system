const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    userID: { type: String, required: false, unique: true },
    userProfile: { type: String, required: true },
    UserRole: { type: String, enum: ["SUPER_ADMIN", "ADMIN", "TEAM_LEAD", "MEMBER"], default: "MEMBER" },
    Username: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    userPassword: { type: String, required: false },
    isactive: { type: Boolean, default: false },
    logintype: { type: String },
    type: { type: String },
    lastseen: { type: Date, default: Date.now() },
    Firbaseuid: { type: String },
    googleCalendarConnected: { type: Boolean,default:false},
    googleRefreshToken: { type: String,default:null}
})
module.exports = mongoose.model("User", UserSchema)