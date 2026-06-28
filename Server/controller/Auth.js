const cloudinary = require("../config/Clounadry")
const UserSchema = require("../Models/Auth")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { GetEmpNameGenById } = require("../Utils/EmpIDGenrator");
const EmailQueue = require("../Queues/Producer");
const redis = require("../config/redis");
// const EmailQueue = require("../service/Producer");
const saltRounds = 10;
const AuthNewAccount = async (req, res) => {
    try {
        console.log(req.body, 'bdy')
        console.log(req.file, 'req.file')
        const isExits = await UserSchema.findOne({ userEmail: req.body.email })
        if (isExits) {
            console.log({ message: "Email is already exits." })
            return res.status(400).json({ message: "Email is already exits." })
        }
        const haspassowrd = await bcrypt.hash(req.body.type === 'firebase' ? "" : req.body.password, saltRounds)
        const result = req.body.type === 'firebase' ? "" : await cloudinary.uploader.upload(req.file.path);
        const EmpId = GetEmpNameGenById(req.body.name)
        const saveuser = await UserSchema({
            userID: EmpId,
            userProfile: req.body.type === 'firebase' ? req.body.profile : result.secure_url,
            Username: req.body.name,
            userEmail: req.body.email,
            userPassword: haspassowrd,
            logintype: req.body.logintype,
            type: req.body.type
        })
        await saveuser.save()
        // Queues system
        await EmailQueue.add("SendWelcomeEmail", req.body.email, {
            attempts: 3,
            backoff: {
                type: "fixed",
                delay: 1000,
            },
        })
        await redis.del("Analytcs")

        return res.status(201).json({ message: 'new user Created.' })
    } catch (error) {
        console.log(error.message, 'ere')
        return res.status(500).json({ message: error })
    }

}





const Login = async (req, res) => {
    try {
        // role, email, password
        const { email, password, type } = req.query
        console.log( email, password, type , 'req.query')
        console.log(req.query.type, 'req.query.type')
        const isExits = await UserSchema.findOne({ userEmail: email })
        if (!isExits) {
            console.log({ message: "Based on These Email User Not Found." })
            return res.status(400).json({ message: "Based on These Email User Not Found.", status: false })
        }
        const haspassowrdComp = type === 'firebase' ? true : await bcrypt.compare(password, isExits.userPassword)
        if (!haspassowrdComp) {
            console.log({ message: "Password is incorrect." })
            return res.status(403).json({ message: "Password is incorrect.", status: false })
        }

        const userinfo = { email }
        const token = jwt.sign({
            data: userinfo
        }, 'secret', { expiresIn: '1h' });
        console.log(token, 'token')

        // queues system
        await EmailQueue.add("SendWelcomEmail", email, {
            attempts: 3,

            backoff: {
                type: "exponential",
                delay: 3000,
            },
        })


        return res.status(200).json({ message: "userLogedin.", token: token, userinfo: isExits, status: true })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message })
    }

}
module.exports = { AuthNewAccount, Login }