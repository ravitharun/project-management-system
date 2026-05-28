const mongoose = require("mongoose")
const connectDb = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/ProjectManagementWebsite")
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message, 'err mongodb')
    }
}

module.exports = connectDb