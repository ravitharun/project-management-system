

const WorkspaceSchema=require("../Models/Workspace")
const FetchView = async (req, res) => {



    try {
        const { projectId } = req.params
        console.log(projectId, 'projectId');

        const ProjectInfo = await WorkspaceSchema.findById({ _id:projectId }).populate('WorkSpacememebers.id')




        const Summary = {
            ProjectInfo

        }

        return res.status(200).json({ message: "Summary", data: ProjectInfo, status: true})
    } catch (error) {
        
        console.log(error.message);
        
        return res.status(500).json({ message: "Server Error" })
        // return res.status(200).json({ message: "Summary", data: ProjectInfo, status: true})

    }
}


module.exports = { FetchView }