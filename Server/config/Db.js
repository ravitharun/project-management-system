const mongoose = require("mongoose")
const Db = process.env.envStatus == 'Prod' ? process.env.Db : 'mongodb://localhost:27017/ProjectManagementWebsite'
console.log(Db,'Db')
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(Db)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message, 'err mongodb')
    }
}

module.exports = connectDb