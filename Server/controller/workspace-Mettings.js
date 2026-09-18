
const MeetingSchema = require("../Models/Meeting");
const { getIO } = require("../scoket");
const { Todays_mettings, Upcoming_mettings, Mettings_ } = require("../Utils/MettingsDate");
const AddMettings = async (req, res) => {


    try {
        const io = getIO()
        const { mettingInfo } = req.body;
        console.log(mettingInfo)

        if (mettingInfo.TeamMembers.length == 0) {

            return res.status(400).json({ message: "Required TeamMembers ", status: false })
        }
        if (!mettingInfo) {


            return res.status(400).json({ message: "missing.." })
        }

        await MeetingSchema.create(mettingInfo);
        io.emit("MettingsList", fetchMettings())

        return res.status(201).json({ message: "mettingInfo", status: true })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Server Error", status: false })

    }
}

const fetchMettings = async (req, res) => {
    try {

        const { Pid } = req.query

        if (!Pid) {
            return res.status(400).json({ message: "Pid is Missing", status: false })
        }
        const FetchMettings = await MeetingSchema.find({ PID: Pid })
        const todayMetting = Todays_mettings(FetchMettings)
        const upcoming_mettings = Upcoming_mettings(FetchMettings)
        const Mettings = Mettings_(FetchMettings)
        return res.status(200).json({ message: "metting list", 'Meeting_History': Mettings, "Todays_mettngs": todayMetting, "Upcoming_mettings": upcoming_mettings, status: true })
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ message: "server error", data: [], status: false })

    }
}

module.exports = { AddMettings, fetchMettings }