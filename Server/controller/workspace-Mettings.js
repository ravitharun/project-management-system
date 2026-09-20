
const MeetingSchema = require("../Models/Meeting");
const { getIO } = require("../scoket");
const { Todays_mettings, Upcoming_mettings, Mettings_ } = require("../Utils/MettingsDate");
const AddMettings = async (req, res) => {


    try {
        const io = getIO()
        const { mettingInfo, Pid } = req.body;
        console.log(req.body, 'Pid')

        if (mettingInfo.TeamMembers.length == 0) {

            return res.status(400).json({ message: "Required TeamMembers ", status: false })
        }
        if (!mettingInfo) {


            return res.status(400).json({ message: "missing.." })
        }
        if (!Pid) {


            return res.status(400).json({ message: "Pid missing.." })
        }

        await MeetingSchema.create(mettingInfo);

        const response = await MeetingSchema.find({ PID: Pid })
        const todayMetting = Todays_mettings(response)
        const upcoming_mettings = Upcoming_mettings(response)
        const Mettings = Mettings_(response)
        const format = {

            "todayMetting": todayMetting,
            "upcoming_mettings": upcoming_mettings,
            "Mettings": Mettings,
        }
        console.log(format, 'formattharun')
        io.emit("MettingsList", format)

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
        console.log("hey")
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


const deleteMeeting = async (req, res) => {


    try {
        const data = req.query
        const io = getIO();

        if (!data.pid || !data.meet_id) {

            return res.status(400).json({ message: "Some Thing Went Wrong.", status: false })

        }

        await MeetingSchema.findByIdAndDelete({ _id: data.meet_id })
        res.status(200).json({ message: "meeting is Deleted", status: true })
        const response = await MeetingSchema.find({ PID: data.pid })
        const todayMetting = Todays_mettings(response)
        const upcoming_mettings = Upcoming_mettings(response)
        const Mettings = Mettings_(response)
        const format = {

            "todayMetting": todayMetting,
            "upcoming_mettings": upcoming_mettings,
            "Mettings": Mettings,
        }
        return io.emit("MettingsList", format)
        // io.emit("MettingsList")

    } catch (error) {
        return res.status(500).json({ message: "server error", status: false })
    }
}


const Meetingcompleted = async (req, res) => {

    const io = getIO()
    try {
        const { id, Pid } = req.body
        console.log(req.body, 'req.body')
        if (!id || !Pid) {

            return res.status(400).json({ message: "Some Thing Went Wrong.", status: false })
        }


        const Metting_info = await MeetingSchema.findByIdAndUpdate({ _id: id }, { MettingCompleted: true }, { returnDocument: "after" })

        const response = await MeetingSchema.find({ PID: Pid })
        const todayMetting = Todays_mettings(response)
        const upcoming_mettings = Upcoming_mettings(response)
        const Mettings = Mettings_(response)
        const format = {

            todayMetting,
            upcoming_mettings,
            Mettings,
        }
        io.emit("MettingsList", format)
        console.log(format + "format")
        return res.status(200).json({ message: "updated the metting Status", Updated_meetings: Metting_info, status: true })
    } catch (error) {
        console.log(error.message + "errorTharun")
        return res.status(500).json({ message: "server error" + error.message, status: false })
    }
}

module.exports = { AddMettings, fetchMettings, deleteMeeting, Meetingcompleted }