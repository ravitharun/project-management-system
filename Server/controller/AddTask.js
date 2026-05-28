

const AssignTask = require("../Models/Task")
const { getIO } = require("../scoket")
const { v4: uuidv4 } = require('uuid');
const NotificationSchema = require("../Models/Notification");
const AddProject = require("../Models/Project");
const redis  = require("../config/Ioredi");

const AddTask = async (req, res) => {
    try {
        let TaskId = uuidv4()
        const io = getIO()
        const { TaskData } = req.body
        // err handling last

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
        await redis.del("Notificatons")
                await redis.del("Analytcs")
        
        const NotificationFormatData = {
            userId: "userId", message: ` ${TaskData.AddedBy.name} created a new Task`,

        }
        await NotificationSchema.create(NotificationFormatData)
        console.log(`${TaskData.AddedBy.name} created a new project`, NotificationFormatData)
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
        console.log(projectId, 'projectId ftech')
        if (!projectId) {
            return res.status(404).json({ message: "Something Went Wrong." })
        }
        const fetchByProjectId = await AssignTask.find({ ProjectID: projectId })

        if (fetchByProjectId.length == 0) {
            return res.status(200).json({ message: "No Task Added in these Project.", status: true })
        }


        return res.status(200).json({ message: fetchByProjectId, status: true })
    } catch (error) {
        console.log(error, 'err')
        return res.status(500).json({ message: "server Error.", status: false })
    }
}










const updatedProgress = async (req, res) => {
    try {

        await redis.del("Projects");

        const { projectId, num, ProjectIs } = req.query;

        if (!ProjectIs) {
            return res.status(404).json({
                message: "Project Id is missing"
            });
        }

        if (!projectId) {
            return res.status(404).json({
                message: "Task Id is missing"
            });
        }

        // Update Current Task
        const UpdateProgress = await AssignTask.findOneAndUpdate(
            { _id: projectId },
            {
                TaskProgress: Number(num)
            },
            {
                returnDocument: "after"
            }
        );

        if (!UpdateProgress) {
            return res.status(404).json({ message: 'task Not Found' })

        }

        return res.status(200).json({ message: "Progresss Task Is updated..." })


    } catch (error) {
        return res.status(500).json({ message: "server Error" })

    }
};










const fetchalltaskes = async (req, res) => {
    try {



        // const cache=await redis
        const fetchtaskall = await AssignTask.find({})
        console.log(fetchtaskall.length)
        if (fetchtaskall.length == 0) {
            return res.status(404).json({ message: "no task Found", status: true })
        }
        return res.status(200).json({ message: fetchtaskall, status: true })
    } catch (error) {
        return res.status(500).json({ message: 'server error', status: false })

    }

}




const updatetask = async (req, res) => {



    try {

        const io = getIO();
        const { TaskId, TaskstartDate, TaskendDate } = req.body
        console.log({ TaskId, TaskstartDate, TaskendDate }, 'data')
        const updateTask = await AssignTask.findOneAndUpdate(
            { TaskId: TaskId },
            {
                TaskendDate: TaskstartDate,
                TaskstartDate: TaskendDate
            },
            { returnDocument: "after" }
        )


        const NotificationFormatData = {
            userId: "userId", message: "A task deadline has been updated", isRead: false

        }
        await redis.del("Notificatons")
        await redis.del("Analytcs")

        await NotificationSchema.create(NotificationFormatData)
        io.emit("updateTaskdate", "A task deadline has been updated")
        return res.status(200).json({ message: "updated", status: true })
    } catch (error) {
        console.log(error.message, 'err')
        return res.status(500).json({ message: "server error", status: false })

    }
}



// delete api request
const DeleteTask = async (req, res) => {
    try {
        const { TaskId, getuserInfo, UserRole } = req.query
        console.log({ TaskId, UserRole, getuserInfo }, 'user')
        const io = getIO()
        console.log(TaskId, 'TaskId')
        if (!TaskId) {
            return res.status(404).json({ message: "some thing went wrong.", status: true })

        }






        const getresponsedelet = await AssignTask.findOneAndDelete({ TaskId: TaskId })

        if (getresponsedelet) {
            const NotificationFormatData = {
                userId: "userId", message: `${getuserInfo | "User"},${UserRole | "Employee"} has deleted task`, isRead: false
            }
            await redis.del("Notificatons")

            await NotificationSchema.create(NotificationFormatData)
                    await redis.del("Analytcs")
            
            io.emit("HandelDeleteUser", `${getuserInfo | "User"},${UserRole | "Employee"} has deleted task`)
            return res.status(200).json({ messaage: "task Deleted", status: true })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ messaage: "Server Error", status: false })
    }
}
module.exports = { AddTask, fetchTaskes, updatedProgress, fetchalltaskes, updatetask, DeleteTask }