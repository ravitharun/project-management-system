const ProjectRelease = require("../Models/ProjectRelease")
const Workspace = require("../Models/Workspace")

const IsProjectExits = async (ProjectID) => {



    const response = await Workspace.findById({ _id: ProjectID })


    if (!response) {

        return null
    }
    return response
}



const GetProjects = async (id) => {


    if (!id) {
        return "id is missing"


    }
    const response = await ProjectRelease.find({ projectId: id })
    console.log(response.length,'response');
    

    return response


}
module.exports = { IsProjectExits, GetProjects }