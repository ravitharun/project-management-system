const ProjectRelease = require("../Models/ProjectRelease");
const { getIO } = require("../scoket");
const { IsProjectExits, GetProjects } = require("../Utils/IsprojectExits");

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



const Fetch__Version_Realses = async (req, res) => {


    try {


        const { projectId } = req.params
        console.log(projectId, 'ProjectId');


        if (!projectId) {


            return res.status(400).json({ message: "ProjectId is missing.." })

        }

        const GetAllRealses = await ProjectRelease.find({ projectId: projectId })

        return res.status(200).json({ message: "Version Realese", data: GetAllRealses, status: true })

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ message: "server error", status: false })

    }
}




const Delete__Version_Realses = async (req, res) => {


    try {
        // const io=GetIo()
        const io = getIO()
        const { projectId } = req.params
        console.log(projectId,'projectId tharun');
        
        if (!projectId) {

            return res.status(400).json({ message: "ProjectId is Missing..", status: false })
        }


        const IsprojectExits = await IsProjectExits(projectId)
        console.log(IsprojectExits,'IsprojectExits');
        
        // not exits
        if (!IsprojectExits) {

            return res.status(404).json({ message: "Project is Exits.", status: false })


        }
        // delte the version
        await ProjectRelease.findOneAndDelete({ projectId: projectId })
        // fetch the lates versions
        const Lates_version = await GetProjects(projectId)

        io.emit("HandelLatestVersion", Lates_version)
        return res.status(200).json({ message: "Version Delted.", status: true })
    } catch (error) {

        console.log(error.message,'err');
        
        return res.status(500).json({ message: "server error.", status: false })

    }
}

module.exports = { CreateRealse, Fetch__Version_Realses, Delete__Version_Realses }