const Sprint = require("../Models/Sprint");
const SprintSchema = require("../Models/Sprint");
const WorkSpaceTask = require("../Models/WorkSapceTask");
const { getIO } = require("../scoket");

const CreateSprint = async (req, res) => {



    try {
        const { Creation_sprint } = req.body


        console.log(req.body, 'Creation_sprint');
        const saveSprintSchema = await SprintSchema.create(Creation_sprint)

        return res.status(200).json({ message: "Sprint Created", status: true })
    } catch (error) {

        console.log(error.message);

        return res.status(500).json({ message: "server error", status: false })
    }
}



const GetSprint = async (req, res) => {


    try {



        const { spaceid } = req.params


        console.log(req.params);
        if (!spaceid) {


            return res.status(404).json({ message: "SomeThing Went Wrong." })
        }


        const Sprints = await SprintSchema.find({ ProjectId: spaceid })
        console.log(Sprints.length, 'Sprintslen');



        if (Sprint.length == 0) {


            return res.status(404).json({ message: "No Sprints Created" })
        }

        return res.status(200).json({ message: "Sprints", data: Sprints, status: true })



    } catch (error) {
        return res.status(500).json({ message: 'server error', status: false })
    }
}



const GetActiveSprint = async (req, res) => {



    try {
        const { spaceid } = req.params

        if (!spaceid) { return res.status(404).json({ message: "ProjectID is missing ...." }) }
        const ActiveSprint = await SprintSchema.find({
            $and: [{ ProjectId: spaceid },
            {
                SprintActive: true
            }]
        })
        console.log(ActiveSprint, "ActiveSprint")
        if (!ActiveSprint) { return res.status(404).json({ message: "No ActiveSprints." }) }
        return res.status(200).json({ message: "ActiveSprint", data: ActiveSprint, status: true })
    } catch (error) {


        console.log(error.message);

        return res.status(500).json({ message: "server error F", status: false })

    }
}



const UpdateSprintStatus = async (req, res) => {

    try {

        const io = getIO()


        const { spaceid, ProjectId } = req.params

        if (!spaceid) { return res.status(404).json({ message: "ProjectID is missing ...." }) }



        const checkisAnySpint = await SprintSchema.find({ ProjectId: ProjectId }, { SprintActive: true, })


        console.log(checkisAnySpint, 'checkisAnySpint');
        if (checkisAnySpint) {

            return res.status(400).json({
                message: "Cannot start a new sprint while another sprint is active in this project."
            });
        }

        const ActiveSprint = await SprintSchema.findByIdAndUpdate({ _id: spaceid }, {
            SprintActive: true,
            SprintStatus: "ACTIVE"
        }, { returnDocument: "after" })
        if (!ActiveSprint) { return res.status(404).json({ message: "No ActiveSprints." }) }


        const getActiveSprint = await SprintSchema.find({ ProjectId: ProjectId })

        io.emit("ActvieSprint", getActiveSprint)
        return res.status(200).json({ message: "Started New Sprint", data: ActiveSprint, status: true })
    } catch (error) {


        console.log(error.message);

        return res.status(500).json({ message: "server error ", status: false })

    }

}



const AddtaskInActiveSprint = async (req, res) => {


    try {

        const io = getIO()


        const { TaskId, Sprintid, ProjectId } = req.params

        console.log(req.params, 'req.params');

        if (!Sprintid || !TaskId) { return res.status(400).json({ message: "Sprintid &&  TaskId is missing ...." }) }



        const checkisAnySpint = await WorkSpaceTask.findByIdAndUpdate({ _id: TaskId }, { SprintId: Sprintid }, { returnDocument: "after" })
        const getActiveSprint = await WorkSpaceTask.find({ $and: [

            { projectid: ProjectId },
            { SprintId: null }
        ]
        })

    io.emit("UpdatedActvieSprint", getActiveSprint)
console.log(getActiveSprint, 'getActiveSprint');

return res.status(200).json({ message: "Started New Sprint", data: [], status: true })
    } catch (error) {


    console.log(error.message);

    return res.status(500).json({ message: "server error ", status: false })

}



}

module.exports = { CreateSprint, GetSprint, GetActiveSprint, UpdateSprintStatus, AddtaskInActiveSprint }