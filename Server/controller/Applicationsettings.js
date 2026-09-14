
const ProfileSchema = require("../Models/Profile")
const ApplicationProfile = async (req, res) => {
    try {
        const { Uid } = req.query
        console.log(req.query, 'req.query')
        if (!Uid) {


            return res.status(400).json({ message: "Uid IS missing.", status: false })
        }

        const response_profile = await ProfileSchema.find({ userId: Uid })
        console.log(response_profile, 'response_profile');


        if (response_profile.length == 0) {
            return res.status(400).json({ message: "UserProfile Not Created.", status: true, data: response_profile })
        }
        return res.status(200).json({ message: "Ok", status: true, data: [] })


    } catch (error) {

        return res.status(200).json({ message: 'ServerError', status: false })
    }
}

module.exports = ApplicationProfile