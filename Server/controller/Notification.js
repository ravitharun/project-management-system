

const { client } = require("../conifg/Redis")
const Notificationschema = require("../Models/Notification")
const FetchNotification = async (req, res) => {
    try {
        const notificationCache = await client.get("Notificatons")
        console.log(notificationCache)
        if (!notificationCache) {
            console.log('no cache for notification')
            const GetNotifaction = await Notificationschema.find({})
            console.log(GetNotifaction, 'GetNotifaction')
            await client.setEx("Notificatons", 500, JSON.stringify(GetNotifaction))

            return res.status(200).json({ message: GetNotifaction,data:"set Cache", status: true })

        }

        return res.status(200).json({ message: JSON.parse(notificationCache), data:"cache",status: true })

    }
    catch (err) {
        return res.status(500).json({ message: "server error" })
    }
}


module.exports=FetchNotification