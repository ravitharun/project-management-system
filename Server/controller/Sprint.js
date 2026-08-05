const Sprint = require("../Models/Sprint");
const SprintSchema = require("../Models/Sprint")

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
        console.log(Sprints.length,'Sprintslen');
        


        if (Sprint.length == 0) {


            return res.status(404).json({ message: "No Sprints Created" })
        }

        return res.status(200).json({ message: "Sprints", data: Sprints, status: true })



    } catch (error) {
        return res.status(500).json({ message: 'server error', status: false })
    }
}

module.exports = { CreateSprint, GetSprint }