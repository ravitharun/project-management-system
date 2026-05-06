
const { Socket } = require("socket.io")
const AddProject = require("../Models/Project")
const { getIO } = require("../scoket")
const { ProjetcId } = require("../Utils/EmpIDGenrator")
const CreateProjects = async (req, res) => {
    try {
        const io = getIO()
        const { data } = req.body

        const Id = ProjetcId()
        // // projectId
        const tags = data.tags
        const teamMembers = data.teamMembers

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
            }

        })
        await saveAddProject.save()
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

module.exports = CreateProjects