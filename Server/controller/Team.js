

const { client } = require("../conifg/Redis")
const UserSchema = require("../Models/Auth")
const FetchTeam = async (req, res) => {
    try {   
        const TeamCache = await client.get("Team")

        if (!TeamCache) {

            const GetTeam = await UserSchema.find({}).select(["Username", "userEmail", "userProfile", "isactive", 'lastseen', "_id", "userrole", "userID"])
            console.log(GetTeam)
            if (GetTeam.length == 0) {
                return res.status(404).json({ message: "No team Memebers Found." })
            }
            await client.setEx("Team", 500, JSON.stringify(GetTeam))
            return res.status(200).json({ message: GetTeam, status: true, data: "SetCache" })
            console.log(GetTeam)
        }
        return res.status(200).json({ message: JSON.parse(TeamCache), status: true, data: "Cache" })

    } catch (error) {
        return res.status(500).json({ message: "server Error" })
    }
}

module.exports = FetchTeam