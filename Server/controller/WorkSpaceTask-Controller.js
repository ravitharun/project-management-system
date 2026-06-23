// const cloudinary = require("../config/Clounadry")
const cloudinary = require("../config/Clounadry")
const WorkSpaceTask = require("../Models/WorkSapceTask")
const Workspace = require("../Models/Workspace")

// const WorkspaceComments = require("../Models/Workspace-comments")
const AddcommentsSchema = require("../Models/Workspace-comments")
const AddWorkSpaceTask = async (req, res) => {
    try {
        console.log(req.body.TaskData)

        const Createtask = new WorkSpaceTask({
            ...req.body.TaskData,

        })
        await Createtask.save()

        console.log("workSpace Created")
        return res.status(201).json({ message: "WorkSpaceTask Created", data: req.body })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Server Error." })
    }

}


// fetch toasks


// /api//tasks
const FetchTasks = async (req, res, next) => {

    try {
        const { spaceid } = req.query
        console.log(spaceid, 'spaceid');
        // console.log(spaceid, 'spaceid');
        // const spaceid = "6a1e8587848d4471d14a554a"
        if (!spaceid) {
            const spaceid = new Error("spaceid is required to fetch tasks")
            spaceid.status = 404
            return spaceid
        }

        // check The Task Db
        const tasks = await WorkSpaceTask.find({ projectid: spaceid })


        console.log(tasks)


        if (tasks.length == 0) {
            return res.status(404).json({ message: "no taks found." })
        }




        return res.status(200).json({ message: tasks })
    } catch (error) {


        next(error)

    }
}

// checking the Addcomments
const Addcomments = async (req, res) => {
    try {

        console.log(req.body, "comment");
        let workSpaceId = req.body.workSpaceId
        let Taskid = req.body.Taskid

        console.log(Taskid, 'Taskid')
        console.log(workSpaceId, 'workSpaceId')

        const Isexits = await WorkSpaceTask.findOne({
            taskId: req.body.workSpaceId
        });


        console.log(Isexits, "Isexits");

        if (!Isexits) {
            return res.status(404).json({
                success: false,
                message: "Unable to comment on this task"
            });
        }


        const AddcommentsDb = new AddcommentsSchema({
            ...req.body
        });

        const savedComment = await AddcommentsDb.save();

        return res.status(201).json({
            success: true,
            message: "Comment Added Successfully",
            comment: savedComment
        });

    } catch (error) {

        console.log(error.message, 'errname');
        if (error.code == 11000) {
            console.log({ message: "duplicate key In ReplyToCommentId" })
            return res.status(500).json({ message: "duplicate key In ReplyToCommentId", err: error.message })
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};


// AddRelpys
const AddRelpys = async (req, res) => {
    try {
        console.log(req.body, 'replys')

        if (!req.body.TaskId) {
            return res.status(404).json({
                message: "TaskId is Missing"
            });
        }

        // check both together
        const taskExists = await AddcommentsSchema.findOne({
            Taskid: req.body.TaskId,
            workSpaceId: req.body.workSpaceId
        });



        if (!taskExists) {
            return res.status(404).json({
                message: "Task or Workspace not found"
            });
        }
        // push into the array comments
        taskExists.CommentsReply.push(req.body);

        await taskExists.save();


        console.log("db saved")
        return res.status(200).json({
            success: true,
            data: taskExists
        });

    } catch (error) {
        console.log(error.message, "Error From Reply");

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}



const AddSubTask = async (req, res, next) => {


    try {
        const { rowData, id } = req.body

        console.log({ rowData, id })


        const isexits = await WorkSpaceTask.findOneAndUpdate(
            { _id: id },
            {
                $push: {
                    SubTask: {
                        TaskId: rowData.taskid,
                        taskName: rowData.taskname,
                        taskPriority: rowData.priority,
                        SubTaskStatus: rowData.status,
                        AssiginMember: {
                            Name: rowData.createby.name,
                            Email: rowData.createby.email,
                        },
                    },
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );


        if (!isexits) {
            return res.status(404).json({ message: "No Workspce Foudn to Add subTasks." })
        }



        console.log(isexits, 'isexits')

        return res.status(201).json({ message: "Added the SubTask" })
    } catch (error) {
        console.log(error.message)
        next(error)

    }
}



const UploadSubTaskFile = async (req, res, next) => {
    try {
        console.log(req.body, 'body')
        console.log(req.file.path, 'file')


        const fileurl = await cloudinary.uploader.upload(req.file.path)
        console.log(fileurl.secure_url, 'fileurl')
        return res.status(201).json({ message: "File Uploaded", fileurl: fileurl })
    } catch (error) {
        next(error)
    }
}
module.exports = { AddWorkSpaceTask, Addcomments, AddRelpys, FetchTasks, AddSubTask, UploadSubTaskFile }