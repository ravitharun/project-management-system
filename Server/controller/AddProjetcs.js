
const { Socket } = require("socket.io")
const AddProject = require("../Models/Project")
const { getIO } = require("../scoket")
const { ProjetcId } = require("../Utils/EmpIDGenrator")
const  redis  = require("../config/redis")
const { json } = require("express")
const NotificationSchema = require("../Models/Notification")
const CreateProjects = async (req, res) => {
    try {
        const io = getIO()
        const { data } = req.body

        const Id = ProjetcId()
        // // projectId
        const tags = data.tags
        const teamMembers = data.teamMembers
        const GetCache = await redis.del("Projects")

        const saveAddProject = await new AddProject({
            projectId: Id,
            projectName: data.projectName,
            description: data.description,
            teamMembers: teamMembers,
            status: data.status,
            priority: data.priority,
            startDate: data.startDate,
            endDate: data.endDate,
            tags: tags,
            budget: {
                total: data.budget.total,
                spent: data.budget.spent, currency: data.budget.currency,
            },
            owner: {
                userId: data.owner.userId || "ownwer 11",
                name: data.owner.name,
                email: data.owner.email
            },
            data: {
                username: data.data.username,
                userEmail: data.data.userEmail,
                userrole: data.data.userrole
            },
            totalMember: teamMembers.length

        })
        await saveAddProject.save()
        const NotificationFormatData = {
            userId: "userId", message: `${data.data.username} created a new project`, isRead: false

        }
        await redis.del("Notificatons")
        await redis.del("Analytics")
        await NotificationSchema.create(NotificationFormatData)
        io.emit(
            "AddedNewProject",
            `🚀 ${data.data.username} created a new project`
        );
        return res.status(201).json({ message: "Project Created", Projected_Created: true })
    } catch (error) {
        console.log(error.message, "err Project Adding..")
        return res.status(500).json({ message: error.message })

    }
}

const FetchProjects = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        console.log(req.query, 'req.query')
        const limit = 6;
        const skip = (Number(page) - 1) * limit;

        const cacheKey = `Projects:page:${page}`;

        // 1. Check cache
        const cachedData = await redis.get(cacheKey);

        // await redis.del(cacheKey)


        if (cachedData) {
            console.log("Cache hit");

            return res.status(200).json({
                data: JSON.parse(cachedData),
                status: true,
            });
        }

        console.log("Cache miss - DB fetch");

        // 2. Fetch projects from DB
        const projects = await AddProject.find({})
            .skip(skip)
            .limit(limit);

        if (projects.length === 0) {
            return res.status(404).json({
                message: "No projects Found",
                status: false,
            });
        }

        // 3. Total count for pagination
        const totalCount = await AddProject.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);

        // 4. Create response object
        const responseData = {
            projects,
            currpage: Number(page),
            totalPages,
        };

        // 5. Save to Redis cache (5 minutes)
        await redis.setex(cacheKey, 300, JSON.stringify(responseData));

        return res.status(200).json({
            data: responseData,
            status: true,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "server error",
            status: false,
        });
    }
};

const ManageMembersProject = async (req, res) => {
    try {
        const io = getIO()
        const { data } = req.body
        await redis.DEL("Projects")
        console.log(data.userid, data.projectsid)
        if (!data.projectsid) {
            return res.status(404).json({ message: "Something went Wrong" })
        }
        if (data.userid.length == 0) {
            return res.status(404).json({ message: "More Than 1 Members are required to added in these project" })
        }
        const NotificationFormatData = {
            userId: "userId", message: `${data.projectsid}  New ${data.userid.length <= 1 ? "Members" : "Member"} Added`, isRead: false
        }


        const GetprojectByProjId = await AddProject.findOneAndUpdate({ projectId: data.projectsid }, {
            $addToSet: {
                teamMembers: data.userid
            }
        }, {
            returnDocument: "after"
        })

        await redis.del("Notificatons")
        await NotificationSchema.create(NotificationFormatData)
        io.emit(
            "AddProjectMembers",
            `${data.userid.length > 1 ? "New members have" : "A new member has"} been added to project ${data.projectsid}`
        );
        return res.status(200).json({ message: "Added", status: true })
    } catch (error) {
        return res.status(500).json({ message: "server Error", status: false })

    }
}


const UpdateProjectStatus = async (req, res) => {
    try {
        const io = getIO()
        console.log(req.body.prjid, req.body.status)
        const CheckProject = await AddProject.findOneAndUpdate({ projectId: req.body.prjid }, { status: req.body.status }, { returnDocument: "after" })
        await redis.del("Projects")
        console.log(CheckProject, 'check')
        if (!CheckProject) {
            return res.status(404).json({ message: 'Based on the ProjectID Project is not found.' })
        }

        const Notification = {
            message: `SomeOne has Updated the   project  Status Project: ${req.body.prjid} `
        }
        await NotificationSchema.create(Notification)
        await redis.del("Analytics")

        io.emit("handelprojectStatus", `SomeOne has Updated the   project  Status Project: ${req.body.prjid}`)
        const data = await build();
        io.emit("Analytics", data)
        return res.status(200).json({ message: "Project Status Updated ." })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Server Error." })

    }
}
module.exports = { CreateProjects, FetchProjects, ManageMembersProject, UpdateProjectStatus }
