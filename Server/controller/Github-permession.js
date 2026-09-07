

const UserGithubSchema = require("../Models/GithubPermession")
const IsLoginGithubPermession = async (req, res) => {


    try {
        const { pid, userid } = req.params

        console.log(req.params, 'req.params');

        const check = await UserGithubSchema.findOne({
            userApplicationId: userid,
            pid: pid
        });
        if (!check) {
            return res.status(404).json({   
                message: "GitHub connection required",
                status: false
            });
        }

        return res.status(200).json({
            message: "GitHub connection exists",
            status: true
        });

    } catch (error) {
        return res.status(500).json({ message: "server error", status: false })
    }
}


const SaveGithubPermession = async (req, res) => {

    try {
        const { data } = req.body
        console.log("tharun user", data.user);
        // data._tokenResponse.screenName
        // 
        console.log(data.user._tokenResponse.screenName, ' data._tokenResponse.screenName');
        console.log(data?.user?.stsTokenManager, ' data?.user.accessToken');

        const response_premession = new UserGithubSchema({
            pid: data.Pid,

            userApplicationId: data.userid,

            githubUserId: data.user._tokenResponse.rawUserInfo
                ? JSON.parse(data.user._tokenResponse.rawUserInfo).id
                : null,

            githubUsername: data.user._tokenResponse.screenName,

            githubAccessToken: data.user._tokenResponse.oauthAccessToken,

            githubId: data.user._tokenResponse.federatedId
        });
        await response_premession.save();
        return res.status(201).json({
            message: "GitHub connection created successfully",
            status: true
        });

    } catch (error) {
        console.log(error.message, 'errtharun')
        return res.status(500).json({ message: "server error", status: false })

    }
}

module.exports = { IsLoginGithubPermession, SaveGithubPermession }