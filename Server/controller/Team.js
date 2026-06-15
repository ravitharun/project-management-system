

const redis = require("../config/Ioredi")
const UserSchema = require("../Models/Auth")
const { getIO } = require("../scoket")
const FetchTeam = async (req, res) => {
    try {
        const io = getIO()
        const TeamCache = await redis.get("Team")
        console.log(TeamCache, 'TeamCache')
        if (!TeamCache) {

            const GetTeam = await UserSchema.find({}, ["Username", "userEmail", "userProfile", "isactive", 'lastseen', "_id", "userrole", "userID", "dept"])
            if (GetTeam.length == 0) {
                return res.status(404).json({ message: "No team Memebers Found." })
            }
            const usereamil = GetTeam.map(e => e.userEmail);

            const result = await AssignTask.aggregate([
                {
                    $match: {
                        assignToMember: { $in: usereamil }
                    }
                },
                {
                    $group: {
                        _id: "$assignToMember",
                        total: { $sum: 1 }
                    }
                }
            ]);


            const taskMap = new Map(result.map(r => [r._id, r.total]));


            const newdata = GetTeam.map(member => ({
                ...member.toObject(),
                totalTask: taskMap.get(member.userEmail) || 0
            }));
            await redis.setex("Team", 500, JSON.stringify(newdata))
            io.emit("Teamdata", newdata)
            return res.status(200).json({ message: newdata, status: true, data: "SetCache" })
        }
        console.log('first')
        io.emit("Teamdata", TeamCache)
        console.log("emit done...")
        return res.status(200).json({ message: JSON.parse(TeamCache), status: true, data: "Cache" })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "server Error" })
    }
}

module.exports = FetchTeam