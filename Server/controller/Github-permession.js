

const UserGithubSchema = require("../Models/GithubPermession")
const WorkspaceSchema = require("../Models/Workspace")
const axios = require("axios")
const IsLoginGithubPermession = async (req, res) => {

    try {
        const { pid, userid } = req.params

        console.log(req.params, 'req.params IsLoginGithubPermession');
        if (!pid || !userid) {
            return res.status(400).json({ message: " Missing..", status: false })


        }

        const check = await UserGithubSchema.findOne({
            userApplicationId: userid,
            pid: pid
        });
        if (!check) {
            console.log("first")
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
        console.log(error.message, 'err')
        return res.status(500).json({ message: "server error", status: false })
    }
}


const SaveGithubPermession = async (req, res) => {

    try {
        const { data, id } = req.body
        console.log("tharun user", req.body);
        if (!data.Pid) {

            return res.status(400).json({ message: "Missing..", status: false })
        }
        if (!id) {
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
            // save the workspace id isgithub:true

            const IsworkspaceConnectUpdate = await WorkspaceSchema.findByIdAndUpdate({ _id: data.Pid }, { isGithubConnected: true }, { returnDocument: "after" })
            console.log(IsworkspaceConnectUpdate, 'isworkspace')

            return res.status(201).json({
                message: "GitHub connection created successfully",
                data: response_premession._id,
                status: true
            });

        }
        else {
            const isExit = await UserGithubSchema.findByIdAndUpdate({ _id: id }, {
                githubAccessToken: data.user._tokenResponse.oauthAccessToken
            }, {
                returnDocument: "after"

            });

            return res.status(200).json({
                message: "GitHub connection Logined successfully",
                data: isExit._id,
                status: true
            });

        }

    } catch (error) {
        console.log(error.message, 'errtharun')
        return res.status(500).json({ message: "server error", status: false })

    }
}


const GithubReposelections = async (req, res) => {
    try {
        const { id } = req.query
        console.log(req.query, 'tharun');

        if (!id) {

            return res.status(400).json({ message: "Id is missing." })
        }
        const resp = await UserGithubSchema.findById({ _id: id })

        const response = await axios.get(
            "https://api.github.com/user",
            {
                headers: {
                    Authorization: `Bearer ${resp.githubAccessToken}`,
                    Accept: "application/vnd.github+json"
                }
            }
        );
        if (response.data.message == 'Bad credentials') {
            return res.status(401).json({ message: error?.response.data.message + "Github" })
        }


        res.status(200).json({ message: "repos", data: response.data.repos_url, status: true })

    } catch (error) {

        // console.log(error.response.data,'datata');
        if (error.response.data.status == 401) {


            return res.status(401).json({ message: error.response.data.message, status: false })
        }

        return res.status(500).json({ message: error.message, status: false })


    }
}
module.exports = { IsLoginGithubPermession, SaveGithubPermession, GithubReposelections }