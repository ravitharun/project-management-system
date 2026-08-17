

const Workspace = require("../Models/Workspace")
const workspacetask = require("../Models/WorkSapceTask")
const GetTaskCalendar = async (req, res) => {



    try {




        const { ProjectId } = req.params



        if (!ProjectId) {

            return res.status(400).json({ message: "ProjectId is missing..", status: true })

        }


        const isprojectExits = await Workspace.findById({_id: ProjectId })

        if (!isprojectExits) {

            return res.status(400).json({ message: "ProjectId is missing..", status: true })


        }




        const GettasksByProj_id = await workspacetask.find({ projectid: ProjectId })

        if (!GettasksByProj_id) {

            return res.status(400).json({ message: "No Tasks", status: true })

        }
        console.log(GettasksByProj_id, 'GettasksByProj_id');

        return res.status(200).json({ message: "ok", data: GettasksByProj_id, status: true })
    }


    catch (err) {
        console.log(err)

        return res.status(500).json({ message: "server error", status: false })
    }
}

module.exports = GetTaskCalendar