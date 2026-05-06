
const cloudinary = require("../conifg/Clounadry")
const ProjectFileUload = require("../Models/ProjectFile")
const UploadFiles = async (req, res) => {
    try {
        const data = req.body
        console.log(data.Username, 'body')
        const url = await cloudinary.uploader.upload(req.file.path)
        console.log(url.secure_url, 'url')

        const saveProjectFileUload = new ProjectFileUload({
            // originalname
            projectId: data.projectId,
            files: [{
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
        const { projectsid } = req.query
        console.log(projectsid,'projectsid')
        if (!projectsid) {
            return res.status(404).json({ message: "Prj Id is Missing." })

        }
        const getByPrjId=await ProjectFileUload.find({projectId:projectsid})
        console.log(getByPrjId,'getByPrjId')
        if(!getByPrjId){
            return res.status(200).json({data:null,message:"Not Files Added In These Project.."})
        }

        return res.status(200).json({ data: getByPrjId , status: true })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ data: "Server Error", status: false })

    }
}

module.exports = { UploadFiles, FetchUploadFiles }