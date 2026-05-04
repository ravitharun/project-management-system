const cloudinary = require("../conifg/Clounadry")

const AuthNewAccount = async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    console.log("first")
    const result = await cloudinary.uploader.upload(req.file.path); 
    console.log(result)
    return res.json({ message: "ok" })

}

module.exports = AuthNewAccount