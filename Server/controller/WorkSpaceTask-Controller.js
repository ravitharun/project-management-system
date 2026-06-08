const WorkSpaceTask = require("../Models/WorkSapceTask")
// const WorkspaceComments = require("../Models/Workspace-comments")
const AddcommentsSchema = require("../Models/Workspace-comments")
const AddWorkSpaceTask = async (req, res) => {
    try {
        console.log(req.body)

        const Createtask = new WorkSpaceTask({
            ...req.body,
            SubTask: req.body.SubTask,
            Files: req.body.Files,
            Links: req.body.Links
        })

        await Createtask.save()
        return res.status(201).json({ message: "WorkSpaceTask Created", data: req.body })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Server Error." })
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
module.exports = { AddWorkSpaceTask, Addcomments, AddRelpys }