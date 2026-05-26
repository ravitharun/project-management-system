const { JsonWebTokenError } = require("jsonwebtoken");
const { client } = require("../conifg/Redis");
const project = require("../Models/Project");
const task = require("../Models/Task");
const Auth = require("../Models/Auth");

const Analytcs = async (req, res) => {
    try {
        const AnalytcsCache = await client.get("Analytcs")
        const month = ["jan", 'feb', 'march', 'april', 'may', 'june', 'juily', 'agust', "sept", "oct", "nov", "dec"]
        if (!AnalytcsCache) {

            const FetchProjects = await project.countDocuments();

            const fetchTask = await task.countDocuments();

            const projectstatus = await task.aggregate([
                {
                    $match: {
                        Taskstatus: {
                            $in: ["completed", "In Progress", "Pending"],
                        },
                    },
                },
                {
                    $group: {
                        _id: "$Taskstatus",
                        total: { $sum: 1 },
                    },
                },
            ]);
            const projectprority = await task.aggregate([
                {
                    $match: {
                        taskpriority: {
                            $in: ["High", "Medium", "Low"],
                        },
                    },
                },
                {
                    $group: {
                        _id: "$taskpriority",
                        total: { $sum: 1 },
                    },
                },
            ]);


            const ProjectsRevenue = await project.find({});

            const TotalRevenue = ProjectsRevenue.reduce((acc, curr) => {
                return acc + curr.budget.total;
            }, 0);




            const dataMonth = await project.aggregate([
                {
                    $match: {
                        month: { $in: month }
                    }
                }, {
                    $group: {
                        _id: "$month",
                        total: { $sum: 1 }
                    }
                }
            ])



            const MothwiseBudget = await project.aggregate([
                {
                    $match: {
                        month: { $in: month }
                    }
                }, {
                    $group: {
                        _id: '$month',
                        revenue: { $sum: "$budget.total" }
                    }
                }
            ])
            const Perfomance = await Auth.find({}, ["userEmail", 'Username'])
            const emails = Perfomance.map((email) => email.userEmail);
            const PerfomanceAggre = await task.aggregate([
                {

                    $match: {
                        assignToMember: { $in: emails }
                    },
                },

                {

                    $group: {
                        _id: "$assignToMember",
                        totaltask: { $sum: 1 }
                    }
                },
            ])




            const Data = {
                dataMonth,
                PerfomanceAggre,
                MothwiseBudget,
                FetchProjects,
                fetchTask,
                projectstatus,
                projectprority,
                TotalRevenue,
                // Perfomance
            }
            await client.setEx("Analytcs", 500, JSON.stringify(Data))
            return res.status(200).json({ message: Data, status: true, DataFrom: "Set Cache" });
        }
        return res.status(200).json({ message: JSON.parse(AnalytcsCache), status: true, DataFrom: "Cache" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Server Error",
        });
    }
};
module.exports = Analytcs;