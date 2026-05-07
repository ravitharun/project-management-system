

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
        console.log(TaskData, 'TaskData')

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



module.exports = AddTask