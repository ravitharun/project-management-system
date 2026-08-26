const ProjectRelease = require("../Models/ProjectRelease");
const { getIO } = require("../scoket");

const CreateRealse = async (req, res) => {

    try {
        const io = getIO()


        const { Project_Realse } = req.body;
        const { projectId } = req.params


        const VersionRegx = /^v\d+\.\d+\.\d+$/



        if (!VersionRegx.test(Project_Realse.Version)) {


            return res.status(400).json({ message: "Version Format is Not a Valid .." })
        }

        if (!projectId || !Project_Realse.RealseBy_id) {
            return res.status(400).json({
                message: "Unable to identify the project."
            });
        }




        if (

            !Project_Realse.RealseDescprition ||
            !Project_Realse.RealseName ||
            !Project_Realse.Started ||
            !Project_Realse.releaseDate ||
            !Project_Realse.Status || !Project_Realse.Version
        ) {
            return res.status(400).json({
                message: "All required fields must be provided."
            });
        }



        await ProjectRelease.create({ projectId: projectId, ...Project_Realse })


        const GetAllRealses = await ProjectRelease.find({ projectId: projectId })
        io.emit("releases:all", GetAllRealses);

        return res.status(201).json({ message: "New Version Realsed.." })

    }

    catch (err) {
        console.log(err.message, 'err');

        return res.status(500).json({ message: "server error.." })
    }
}



module.exports = CreateRealse