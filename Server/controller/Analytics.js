const { client } = require("../conifg/Redis");
const project = require("../Models/Project");
const task = require("../Models/Task");
const Auth = require("../Models/Auth");
const { getIO } = require("../scoket");

const Analytics = async (req, res) => {
    try {
        const io = getIO();

        // cache
        const AnalyticsCache = await client.get("Analytics");

        const month = [
            "jan",
            "feb",
            "march",
            "april",
            "may",
            "june",
            "juily",
            "agust",
            "sept",
            "oct",
            "nov",
            "dec",
        ];

        // ================= CACHE MISS =================
        if (!AnalyticsCache) {

            const FetchProjects = await project.countDocuments();

            const fetchTask = await task.countDocuments();

            // task status
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

            // task priority
            const projectpriority = await task.aggregate([
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

            // revenue
            const ProjectsRevenue = await project.find({});

            const TotalRevenue = ProjectsRevenue.reduce((acc, curr) => {
                return acc + curr.budget.total;
            }, 0);

            // monthwise projects
            const dataMonth = await project.aggregate([
                {
                    $match: {
                        month: { $in: month },
                    },
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: 1 },
                    },
                },
            ]);

            // monthwise revenue
            const MonthwiseBudget = await project.aggregate([
                {
                    $match: {
                        month: { $in: month },
                    },
                },
                {
                    $group: {
                        _id: "$month",
                        revenue: { $sum: "$budget.total" },
                    },
                },
            ]);

            // performance
            const Performance = await Auth.find({}, ["userEmail", "Username"]);

            const emails = Performance.map((email) => email.userEmail);

            const PerformanceAggre = await task.aggregate([
                {
                    $match: {
                        assignToMember: { $in: emails },
                    },
                },
                {
                    $group: {
                        _id: "$assignToMember",
                        totaltask: { $sum: 1 },
                    },
                },
            ]);

            // final data
            const Data = {
                dataMonth,
                PerformanceAggre,
                MonthwiseBudget,
                FetchProjects,
                fetchTask,
                projectstatus,
                projectpriority,
                TotalRevenue,
            };

            // save cache
            await client.setEx(
                "Analytics",
                500,
                JSON.stringify(Data)
            );

            console.log("Analytics emitted");

            // socket emit
            io.emit("Analytics", Data);

            return res.status(200).json({
                message: Data,
                status: true,
                DataFrom: "Set Cache",
            });
        }

        // ================= CACHE HIT =================

        const ParsedData = JSON.parse(AnalyticsCache);

        console.log("Analytics emitted from cache");

        io.emit("Analytics", ParsedData);

        return res.status(200).json({
            message: ParsedData,
            status: true,
            DataFrom: "Cache",
        });

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = Analytics;