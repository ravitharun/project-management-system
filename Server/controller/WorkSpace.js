const Workspace = require("../Models/Workspace")

const CreateWorkSpace = async (req, res) => {
    try {
        const { updatedData } = req.body
        console.log(updatedData, 'updatedData')
        // return "hi"
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
module.exports = { CreateWorkSpace, FetchWorkspace }