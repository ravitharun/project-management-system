const cloudinary = require("../conifg/Clounadry")
const UserSchema = require("../Models/Auth")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { GetEmpNameGenById } = require("../Utils/EmpIDGenrator");
const saltRounds = 10;
const AuthNewAccount = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.file)
        const isExits = await UserSchema.findOne({ userEmail: req.body.email })
        if (isExits) {
            console.log({ message: "Email is already exits." })
            return res.status(400).json({ message: "Email is already exits." })
        }
        const haspassowrd = await bcrypt.hash(req.body.password, saltRounds,)

        const result = await cloudinary.uploader.upload(req.file.path);
        const EmpId = GetEmpNameGenById(req.body.name)
        console.log(EmpId,'EmpId')
        const saveuser = await UserSchema({
            userID:EmpId,
            userProfile: result.secure_url,
            Username: req.body.name,
            userEmail: req.body.email,
            userPassword: haspassowrd,
            userrole: req.body.role
        })
        await saveuser.save()
        return res.status(201).json({ message: 'new user Created.' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })
    }

}
const Login = async (req, res) => {
    try {
        // role, email, password
        const { role, email, password } = req.query
        const isExits = await UserSchema.findOne({ userEmail: email })
        if (!isExits) {
            console.log({ message: "Based on These Email User Not Found." })
            return res.status(400).json({ message: "Based on These Email User Not Found.", status: false })
        }
        const haspassowrdComp = await bcrypt.compare(password, isExits.userPassword)
        if (!haspassowrdComp) {
            console.log({ message: "Password is incorrect." })
            return res.status(403).json({ message: "Password is incorrect.", status: false })
        }
        if (isExits.userrole != role) {

            console.log({ message: "Role is incorrect." })
            return res.status(403).json({ message: "Role is incorrect." })
        }
        const userinfo = { role, email }
        const token = jwt.sign({
            data: userinfo
        }, 'secret', { expiresIn: '1h' });
        console.log(token, 'token')
        return res.status(200).json({ message: "userLogedin.", token: token, userinfo: isExits, status: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }

}
module.exports = { AuthNewAccount, Login }