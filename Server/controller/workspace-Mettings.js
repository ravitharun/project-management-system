
const MeetingSchema = require("../Models/Meeting")
const AddMettings = async (req, res) => {


    try {
        const { mettingInfo } = req.body;
        console.log(mettingInfo)

        if (mettingInfo.TeamMembers.length == 0) {

            return res.status(400).json({ message: "Required TeamMembers ", status: false })
        }
        if (!mettingInfo) {


            return res.status(400).json({ message: "missing.." })
        }

        await MeetingSchema.create(mettingInfo);


        return res.status(201).json({ message: "mettingInfo", status: true })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Server Error", status: false })

    }
}

const fetchMettings = (req, res) => {
    try {
        const data = [
            {
                "MettingTitle": "Sprint Planning",
                "ProjectName": "E-Commerce Project",
                "MettingDate": "2026-09-18",
                "MettingStartTime": "10:30",
                "MettingEndTime": "11:30",
                "Participants": 5,
                "MeetingCompleted": true
            },
            {
                "MettingTitle": "Daily Standup",
                "ProjectName": "E-Commerce Project",
                "MettingDate": "2026-09-18",
                "MettingStartTime": "12:00",
                "MettingEndTime": "12:30",
                "Participants": 5,
                "MeetingCompleted": true
            },
            {
                "MettingTitle": "Backend API Discussion",
                "ProjectName": "E-Commerce Project",
                "MettingDate": "2026-09-18",
                "MettingStartTime": "14:00",
                "MettingEndTime": "15:00",
                "Participants": 4,
                "MeetingCompleted": false
            },
            {
                "MettingTitle": "UI/UX Review",
                "ProjectName": "E-Commerce Project",
                "MettingDate": "2026-09-18",
                "MettingStartTime": "16:00",
                "MettingEndTime": "17:00",
                "Participants": 6,
                "MeetingCompleted": false
            },
            {
                "MettingTitle": "Sprint Retrospective",
                "ProjectName": "E-Commerce Project",
                "MettingDate": "2026-09-18",
                "MettingStartTime": "18:00",
                "MettingEndTime": "19:00",
                "Participants": 5,
                "MeetingCompleted": false
            }
        ];

        // get tdy date
        const curDate = new Date().toISOString().split("T")[0];
        // in tdy date
        const filterMettings_curDate = data.filter((mettings) => mettings.MettingDate == curDate)
        // not in tdy date
        const Mettings_ = data.filter((mettings) => mettings.MeetingCompleted == true)
        return res.status(200).json({ message: "metting list", 'Meeting History': Mettings_, "Upcoming _mettngs": filterMettings_curDate, status: true })
    } catch (error) {
        return res.status(500).json({ message: "server error", data: [], status: false })

    }
}

module.exports = { AddMettings, fetchMettings }