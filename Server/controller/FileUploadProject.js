
const cloudinary = require("../conifg/Clounadry")
const ProjectFileUload=require("../Models/ProjectFile")
const UploadFiles = async (req, res) => {
    try {
        const data = req.body
        console.log(data.Username, 'body')
        const url = await cloudinary.uploader.upload(req.file.path)
        console.log(url.secure_url, 'url')

        const saveProjectFileUload = new ProjectFileUload({
            // originalname
            projectId : data.projectId,
            files :[{
                filename: req.file.originalname,
                fileUrl: url.secure_url,
                AddedBy: [
                    {
                        Empname: data.Username,
                        EmpId: data.userEmail,
                        EmpRole: data.userrole
                    }
                ]

            }]
        })
        await saveProjectFileUload.save()
        console.log("saved")
        return res.status(201).json({ message: 'File uploaded.' })
    } catch (error) {
        console.log(error)

    }
}
const FetchUploadFiles = async (req, res) => {
    try {
        console.log("first")
        return res.json("Fetch UploadFiles")

    } catch (error) {
        console.log(error)

    }
}

module.exports = { UploadFiles, FetchUploadFiles }