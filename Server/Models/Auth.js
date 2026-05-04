const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    userProfile: { type: String, required: true },
    Username: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true },
    userrole: { type: String, required: true, Enumerator: "Employee" | "Tl" | "Manager" },
    isactive: { type: Boolean, default: false }
})
module.exports = mongoose.model("User", UserSchema)