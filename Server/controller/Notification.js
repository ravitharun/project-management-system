

const redis = require("../config/Ioredi")
const Notificationschema = require("../Models/Notification")
const { getIO } = require("../scoket")


const FetchNotification = async (req, res) => {
    try {
        const io=getIO()
        const notificationCache = await redis.get("Notificatons")
   

        if (!notificationCache) {
            console.log('no cache for notification')
            const GetNotifaction = await Notificationschema.find({})
            console.log(GetNotifaction, 'GetNotifaction')
            await redis.setex("Notificatons", 500, JSON.stringify(GetNotifaction))

            return res.status(200).json({ message: GetNotifaction, data: "set Cache", status: true })

        }

        return res.status(200).json({ message: JSON.parse(notificationCache), data: "cache", status: true })

    }
    catch (err) {
        return res.status(500).json({ message: "server error" })
    }
}


module.exports = FetchNotification