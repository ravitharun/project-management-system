const cloudinary = require("../conifg/Clounadry")
const UserSchema = require("../Models/Auth")

const AuthNewAccount = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.file)
        const isExits = await UserSchema.findOne({ userEmail: req.body.email })
        if (isExits) {
            console.log({ message: "Email is already exits." })
            return res.status(400).json({ message: "Email is already exits." })
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result)
        const saveuser = await UserSchema({
            userProfile: result.secure_url,
            Username: req.body.name,
            userEmail: req.body.email,
            userPassword: req.body.password,
            userrole: req.body.role
        })
        await saveuser.save()
        return res.status(201).json({ message: 'new user Created.' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })
    }

}

module.exports = AuthNewAccount