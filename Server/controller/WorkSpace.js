const Workspace = require("../Models/Workspace")
const cloudinary = require("../config/Clounadry")
const CreateWorkSpace = async (req, res) => {
    try {
        const { updatedData } = req.body
        console.log(updatedData, 'updatedData')
        console.log(updatedData?.workspaceBackground, 'workspaceBackground')
        const saveWorkspace = new Workspace({
            ...updatedData,
            // detailedInfo: updatedData?.detailedInfo,
            workspaceSetup: {
                ...updatedData.workspaceSetup,
                workspaceName: updatedData?.workspaceName,
                workspaceDescription: updatedData?.workspaceDescription,

                createby: {
                    userEmail: updatedData?.createby?.userEmail
                }
            }
        });
        await saveWorkspace.save()
        return res.status(200).json({ message: "workspace Created", status: true })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message, status: false })
    }
}

const FetchWorkspace = async (req, res) => {
    try {
        const { useremail } = req.query
        console.log(useremail, 'useremail')
        if (!useremail) {
            console.log("useremail is missing to Fetch the Work space")
            return res.status(404).json({ message: "Some thing Went Wrong." })
        }

        const FetchWorkspace = await Workspace.find({ "workspaceSetup.createby.userEmail": useremail })
        console.log(FetchWorkspace, 'FetchWorkspace')
        return res.status(200).json({ data: FetchWorkspace })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "server Error" })
    }
}



const updateBackgroundspace = async (req, res) => {
    try {
        const { selectedImg, id } = req.body
        console.log(req.body, 'req.query');

        if (!selectedImg) {
            return res.status(404).json({ message: "SomeThing Went Wrong." })
        }

        const isexitisWorkspace = await Workspace.findById({ _id: id })
        if (!isexitisWorkspace) {
            return res.status(404).json({ message: "The Workspace iS not exitis." })

        }
        const UpdateSetWorkspaceBackground = await Workspace.findByIdAndUpdate({ _id: id }, { workspaceBackground: selectedImg }, { returnDocument: "after" })
        console.log(UpdateSetWorkspaceBackground, 'UpdateSetWorkspaceBackground')
        res.status(200).json({ message: "Updated the workspaceBackground." })
    } catch (error) {
        console.log(error.message, 'err')

        res.status(500).json({ message: "server Error" })
    }
}



const handelupdateSpaceIcon = async (req, res) => {
    try {
        const { data } = req.body
        console.log(data, 'data')
        if (!data) {
            return res.status(404).json({ message: "Data is empty" })
        }

        const isexitisWorkspace = await Workspace.findById({ _id: data.id })
        if (!isexitisWorkspace) {
            return res.status(404).json({ message: "NO workspace is Found  to Updte the workspace Icon " })
        }


        const UpdateSetWorkspaceIcon = await Workspace.findByIdAndUpdate({ _id: data.id }, { icon: data.choosed }, { returnDocument: "after" })
        console.log(UpdateSetWorkspaceIcon, 'UpdateSetWorkspaceIcon')
        res.status(200).json({ message: "Updated the UpdateSetWorkspaceIcon." })


    } catch (error) {

        res.status(500).json({ message: "server Error" })
    }
}


// DeleteWorkspace
const DeleteWorkspace = async (req, res) => {
    try {
        const { workspaceid } = req.query
        console.log(workspaceid, 'workspaceid')
        if (!workspaceid) { return res.status(404).json({ message: "Workspace ID is missing." }) }
        const isexitisWorkspace = await Workspace.findById({ _id: data.id })

        if (!isexitisWorkspace) {
            return res.status(404).json({ message: "NO workspace is Found  to Updated  the workspace Icon " })
        }
        const resposeDelete = await Workspace.findByIdAndDelete({ id: workspaceid })

        return res.status(200).json({ message: "Workspace removed successfully" });
    } catch (error) {

        console.log(error.message, 'err')

        return res.status(500).json({ message: "server error" })

    }
}


const handelCustomUoploadBackground = async (req, res) => {
    try {

        console.log(req.file)
        console.log(req.body.AddedEmail)
        console.log(req.body.updateSapceid)
        if (!req.body.updateSapceid || !req.body.AddedEmail) {
            return res.status(404).json({ message: "SomeThing went Wrong." })
        }
        const Uploaded_url = await cloudinary.uploader.upload(req.file.path)
        const isExitSpaceId = await Workspace.findByIdAndUpdate({ _id: req.body.updateSapceid }, { workspaceBackground: Uploaded_url?.secure_url }, { returnDocument: "after" })
        console.log(Uploaded_url?.secure_url, 'Uploaded_url')

        return res.status(200).json({ message: "Uploaded", Uploaded_url })
    } catch (error) {
        console.log(error.message, 'err')

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Workspace Id",
            });
        }
        return res.status(500).json({ message: "Server Error" })
    }
}
module.exports = { CreateWorkSpace, FetchWorkspace, updateBackgroundspace, handelupdateSpaceIcon, DeleteWorkspace, handelCustomUoploadBackground }