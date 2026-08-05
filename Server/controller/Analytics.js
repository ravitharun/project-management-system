

const WorkspaceSchema = require("../Models/Workspace")
const WorkSpaceTask = require("../Models/WorkSapceTask")
const FetchView = async (req, res) => {



    try {
        const { projectId,userid } = req.params
        console.log(req.params, 'projectId');
        const ProjectInfo = await WorkspaceSchema.findById({ _id: projectId }).populate('WorkSpacememebers.id')
        console.log(ProjectInfo, 'ProjectInfo');
        const ProjectTask = await WorkSpaceTask.find({ projectid: projectId })
        const GetuseridTask=await WorkSpaceTask.find({ assignTo: userid })
        console.log(GetuseridTask, 'GetuseridTask');
        const tasktodo = ProjectTask.filter((task) => task.ProjectTask == "todo")
        const taskCompleted = ProjectTask.filter((task) => task.ProjectTask == "Completed")
        const taskInProgress = ProjectTask.filter((task) => task.ProjectTask == "inprogress")
        const Taskreview = ProjectTask.filter((task) => task.ProjectTask == "review")
        const TaskLow = ProjectTask.filter((task) => task.Priority == "Low")
        const TaskMedium = ProjectTask.filter((task) => task.Priority == "Medium")
        const TaskHigh = ProjectTask.filter((task) => task.Priority == "High")
        const Summary = {
            ProjectInfo,
            "GetuseridTask":GetuseridTask,
            "TotalTask": ProjectTask.length,
            "taskCompleted": taskCompleted.length,
            "taskInProgress": taskInProgress.length,
            "tasktodo": tasktodo.length,
            "TeamMembers": ProjectInfo?.WorkSpacememebers.length,
            "Taskreview": Taskreview.length,
            "TaskLow": TaskLow.length,
            "Taskhigh": TaskHigh.length,
            "Taskmedium": TaskMedium.length


        }
        console.log(Summary, 'SummaryTharun');


        return res.status(200).json({ message: "Summary", data: Summary, status: true })
    } catch (error) {

        console.log(error.message,'tharun');

        return res.status(500).json({ message: "Server Error" })
        // return res.status(200).json({ message: "Summary", data: ProjectInfo, status: true})

    }
}


module.exports = { FetchView }