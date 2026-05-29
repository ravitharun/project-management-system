const Workspace = require("../Models/Workspace")

const CreateWorkSpace = async (req, res) => {
    try {
        const { data } = req.body
        console.log(data.Workspacename,data.Workspacedescription)

        const addWorkspace=new Workspace({
            
        })
        return res.status(200).json({ message: "workspace Created", status: true })

    } catch (error) {
        return res.status(500).json({ message: "server error", status: false })
    }
}


module.exports=CreateWorkSpace