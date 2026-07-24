const IsProjectExits = require("../Utils/IsprojectExits");
const User = require("../Models/Auth")
const handelProjectRole = async (req, res) => {
    try {
        // id:ProjectID
        console.log(req.params, ' req.params');
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


module.exports = handelProjectRole