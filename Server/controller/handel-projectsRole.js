const IsProjectExits = require("../Utils/IsprojectExits");
const User = require("../Models/Auth");
const Workspace = require("../Models/Workspace");
const handelProjectRole = async (req, res) => {
    try {

        const { id, ProjectID, Role } = req.params

        if (!id || !ProjectID) {
            return res.status(400).json({
                message: "Required information is missing. Please try again."
            });
        }

        const Ischeck = await IsProjectExits(ProjectID)
        console.log(Ischeck, 'Ischeck');
        if (!Ischeck) {


            return res.status(404).json({ message: "Project Not Found To Update The User ROle." })
        }
        const UpdateUserRole = await User.findOneAndUpdate({ _id: id }, { UserRole: Role }, { returnDocument: "after" })


        if (!UpdateUserRole) {
            return res.status(404).json({ message: "User Not Found" })
        }

        return res.status(200).json({ message: "Role Updated", status: true })


    } catch (error) {
        console.log(error.message, 'rr');

        return res.status(500).json({ message: "server Error", status: false })
    }
}




const RemoveTeamMembers = async (req, res) => {


    try {

        const { ProjectID, id } = req.params

        console.log({ ProjectID, id }, '{ id, ProjectID }');


        if (!ProjectID || !id) {

            return res.status(400).json({
                message: "Required information is missing. Please try again."
            });
        }

        const Ischeck = await IsProjectExits(ProjectID)

        if (!Ischeck) {


            return res.status(404).json({ message: "Project Not Found To Delete The Team Member." })
        }


        const updatedWorkspace = await Workspace.findByIdAndUpdate(
            ProjectID,
            {
                $pull: {
                    WorkSpacememebers: { id: id }
                }
            },
            { returnDocument: "after" }
        );
     

        return res.status(200).json({ message: "Team Member is  Removed", status: true, updatedWorkspace: updatedWorkspace })

    } catch (error) {
        console.log(error.message, 'rr');

        return res.status(500).json({ message: "server Error", status: false })

    }
}

module.exports = { handelProjectRole, RemoveTeamMembers }