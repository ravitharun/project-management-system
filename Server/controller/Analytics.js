

const WorkspaceSchema = require("../Models/Workspace")
const WorkSpaceTask = require("../Models/WorkSapceTask")
const FetchView = async (req, res) => {



    try {
        const { projectId } = req.params
        console.log(projectId, 'projectId');

        const ProjectInfo = await WorkspaceSchema.findById({ _id: projectId }).populate('WorkSpacememebers.id')
        console.log(ProjectInfo, 'ProjectInfo');

        // const TeamMembers = ProjectInfo?.WorkSpacememebers.length


        const ProjectTask = await WorkSpaceTask.find({ projectid: projectId })
        console.log(ProjectTask, 'ProjectTask');
        const tasktodo = ProjectTask.filter((task) => task.ProjectTask == "todo")
        const taskCompleted = ProjectTask.filter((task) => task.ProjectTask == "Completed")
        const taskInProgress = ProjectTask.filter((task) => task.ProjectTask == "inprogress")
        const Taskreview = ProjectTask.filter((task) => task.ProjectTask == "review")
        const Summary = {
            ProjectInfo,
            "TotalTask": ProjectTask.length,
            "taskCompleted": taskCompleted.length,
            "taskInProgress": taskInProgress.length,
            "tasktodo": tasktodo.length,
            "TeamMembers": ProjectInfo?.WorkSpacememebers.length,
            "Taskreview":Taskreview.length


        }

        return res.status(200).json({ message: "Summary", data: Summary, status: true })
    } catch (error) {

        console.log(error.message);

        return res.status(500).json({ message: "Server Error" })
        // return res.status(200).json({ message: "Summary", data: ProjectInfo, status: true})

    }
}


module.exports = { FetchView }