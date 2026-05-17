

const AssignTask = require("../Models/Task")
const { getIO } = require("../scoket")
const { v4: uuidv4 } = require('uuid');

const AddTask = async (req, res) => {
    try {
        let TaskId = uuidv4()
        const io = getIO()
        const { TaskData } = req.body
        // err handling last

        console.log(TaskData)
        const AddAssignTask = new AssignTask({
            ProjectID: TaskData.projectid,
            // TaskId: { type: String, default: TaskId("task"), unique: true },
            AddedBy: [{
                name: TaskData.AddedBy.name,
                userEmail: TaskData.AddedBy.userEmail,
                userrole: TaskData.AddedBy.userrole
            }],
            TaskId: TaskId,
            assignToMember: TaskData.assignTo,
            TaskName: TaskData.taskName,
            Taskdescription: TaskData.description,
            TaskstartDate: TaskData.startDate,
            TaskendDate: TaskData.endDate,
            taskestimatedHours: TaskData.estimatedHours,
            taskpriority: TaskData.priority,
            TaskProgress: TaskData.progress | 0,
            Taskstatus: TaskData.progress,
        })
        await AddAssignTask.save()

        io.emit("NewTask", {
            message: `Team update: New task added to project ${TaskData.projectid}`,
            taskAddedBy: `${TaskData.AddedBy.name} to ${TaskData.assignTo}`
        })

        return res.status(201).json({ message: "Task Created.", status: true })
    } catch (error) {
        console.log(error.message, 'err')
        return res.status(500).json({ message: "server error", status: false })

    }
}

const fetchTaskes = async (req, res) => {
    try {

        const { projectId } = req.query
        console.log(projectId, 'projectId')
        if (!projectId) {
            console.log("projectId")
            return res.status(404).json({ message: "Something Went Wrong." })
        }
        const fetchByProjectId = await AssignTask.find({ ProjectID: projectId })
        if (fetchByProjectId.length == 0) {
            return res.status(200).json({ message: "No Task Added in these Project.", status: true })
        }

        return res.status(200).json({ message: fetchByProjectId, status: true })
    } catch (error) {
        return res.status(500).json({ message: "server Error.", status: false })
    }
}
const updatedProgress = async (req, res) => {
    try {
        const { projectId,num } = req.query
        console.log(typeof(num),'num')
        if (!projectId) {
            console.log({ message: "task Id is missing .." })
            return res.status(404).json({ message: "task Id is missing .." })
        }

        const UpdateProgress = await AssignTask.findByIdAndUpdate({ _id: projectId }, {
            TaskProgress: num
        }, {
            new: true
        })
        //  UpdateProgress.TaskProgress=100
        console.log(UpdateProgress,'UpdateProgress')
        if (!UpdateProgress) {
            return res.status(404).json({ message: 'task Not Found' })

        }

        return res.status(200).json({ message: "Progresss Task Is updated..." })


    } catch (error) {
        return res.status(500).json({ message: "server Error" })

    }
}
module.exports = { AddTask, fetchTaskes, updatedProgress }