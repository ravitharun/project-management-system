
const { AccessToken } = require("livekit-server-sdk")
const MeetingSchema = require("../Models/Meeting")
const getLiveKitToken = async (req, res) => {
    try {
        const { roomName, participantName, userID } = req.body;
        console.log(req.body, "req.bodyTharun");
        if (!userID) {

            return res.status(400).json({ message: "userID is missing.", status: false })
        }
        const isAdd = await MeetingSchema.findOne({ TeamMembers: userID });

        if (!isAdd) {
            return res.status(403).json({
                message: "You are not allowed to join this meeting.",
                status: false
            });
        }
        const token = new AccessToken(
            process.env.LIVEKIT_API_KEY,
            process.env.LIVEKIT_API_SECRET,
            {
                identity: participantName,
                name: participantName,
            }
        );

        token.addGrant({
            roomJoin: true,
            room: roomName,
            canPublish: true,
            canSubscribe: true,
        });

        const jwt = await token.toJwt();

        res.status(200).json({
            token: jwt,
            url: process.env.LIVEKIT_URL,
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            message: "Failed to generate LiveKit token",
        });
    }
};

module.exports = getLiveKitToken