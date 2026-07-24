const Workspace = require("../Models/Workspace")

const IsProjectExits = async (ProjectID) => {



    const response = await Workspace.findById({ _id: ProjectID })
    console.log(response,'response');
    

    if (!response) {

        return null
    }
    return response
}

module.exports = IsProjectExits