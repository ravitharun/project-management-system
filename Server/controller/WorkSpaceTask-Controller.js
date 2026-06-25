const cloudinary = require("../config/Clounadry")
const WorkSpaceTask = require("../Models/WorkSapceTask")
const Workspace = require("../Models/Workspace")

const AddcommentsSchema = require("../Models/Workspace-comments")
const AddWorkSpaceTask = async (req, res) => {
    try {
        const { TaskData, assignTo } = req.body;
        console.log(req.body,'req.body')
        console.log(TaskData,'TaskData')
        console.log(TaskData.assignTo,'assignTo')

        const Createtask = new WorkSpaceTask({
            ...TaskData,
            assignTo: TaskData.assignTo || null,
            SubTask: [],
            Files: [],
            Links: []
        });

        await Createtask.save();

        return res.status(201).json({
            message: "WorkSpaceTask Created",
            data: Createtask
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message:error.message });
    }
};


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
        const tasks = await WorkSpaceTask.find({ projectid: spaceid }).populate("Files.userid")


        console.log(tasks, "tasks")


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

        if (!req.file.path) {
            const FileNotFoundTask = new Error("File is required")
            FileNotFoundTask.status = 404
            return next(FileNotFoundTask)
        }
        const Isexitstask = await WorkSpaceTask.findOne({ Taskid: req.body.Taskid })

        if (!Isexitstask) {
            const NotFoundTask = new Error("Task Not Found")
            NotFoundTask.status = 404
            return next(NotFoundTask)
        }
        console.log(Isexitstask, 'Isexitstask')

        const fileurl = await cloudinary.uploader.upload(req.file.path)


        Isexitstask.Files.push({
            fileurl: fileurl.secure_url,
            userid: req.body.UploadedBy
        })
        await Isexitstask.save()
        return res.status(201).json({ message: "File Uploaded", fileurl: fileurl })
    } catch (error) {
        next(error)
    }
}


const UpdateTaskWallpaper = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        // const { selectedWallpaper, uplodtype } = req.body;
        console.log(req.body.selectedWallpaper);
        console.log(req.body.uplodtype);
        console.log(req.params, ' req.params')
        let Customurl = ""
        if (req.body.uplodtype == "Custom") {

            const url = await cloudinary.uploader.upload(req.file.path)
            Customurl = url.secure_url
        }

        if (!taskId) {
            const IDNotFound = new Error("Task Id is To Update the wallpaper")
            IDNotFound.status = 404
            return next(IDNotFound)
        }



        const isexitsupdate = await WorkSpaceTask.findOneAndUpdate({ Taskid: taskId }, { TaskWallpaper: req.body.uplodtype == "Custom" ? Customurl : req.body.selectedWallpaper }, { returnDocument: "after" })
        console.log(isexitsupdate, 'isexitsupdate updated .')
        if (isexitsupdate == null) {
            return res.status(404).json({ message: "Taskid Not found" })
        }
        return res.status(200).json({ message: "Wallpaper is Updated." })
    } catch (error) {

        console.log("err", error.message)
        return next(error)

    }
}


const DeleteTask = async (req, res, next) => {

    try {
        const { taskid } = req.params
        console.log(taskid, 'taskid')
        if (!taskid) {
            const taskidNotFound = new Error("taskid is missing.")
            taskidNotFound.status = 404
            return next(taskidNotFound)
        }


        const IsexitstaskDeleted = await WorkSpaceTask.findOneAndDelete({ Taskid: taskid })
        if (IsexitstaskDeleted == null) {
            return res.status(404).json({ message: "Task is not Found to Delete it" })
        }

        console.log(IsexitstaskDeleted)


        return res.status(200).json({ message: "Task deleted successfully" })
    } catch (error) {
        console.log(error.message)
        next(error)
    }

}


// Duplicate Task
const DuplicateTask = async (req, res, next) => {
    try {
        const { taskid } = req.params;

        if (!taskid) {
            return res.status(404).json({ message: "TaskId is missing to duplicate" });
        }

        const IsduplicateTask = await WorkSpaceTask.findOne({ Taskid: taskid });

        if (!IsduplicateTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (!req.body.NewTaskid) {
            return res.status(400).json({ message: "NewTaskid is required" });
        }

        const { _id, ...taskData } = IsduplicateTask.toObject();
        console.log({ _id, ...taskData })

        const Add = new WorkSpaceTask({
            ...taskData,
            Taskid: req.body.NewTaskid,
            isDuplicateTaskId: IsduplicateTask.Taskid,
            SubTask: [],
            Files: [],
            Links: []
        });

        await Add.save();

        return res.status(200).json({
            message: "Task duplicated successfully. You can now edit the copied task."
        });

    } catch (error) {
        console.log(error.message);
        next(error);
    }
};


module.exports = { DuplicateTask, DeleteTask, AddWorkSpaceTask, Addcomments, AddRelpys, FetchTasks, AddSubTask, UploadSubTaskFile, UpdateTaskWallpaper }