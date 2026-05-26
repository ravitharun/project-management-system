const Auth = require("../Models/Auth");
const Project = require("../Models/Project");
const Task = require("../Models/Task");

const build = async () => {

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


    const FetchProjects = await Project.countDocuments();

    const fetchTask = await Task.countDocuments();

    // task status
    const projectstatus = await Task.aggregate([
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
    const projectpriority = await Task.aggregate([
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
    const ProjectsRevenue = await Project.find({});

    const TotalRevenue = ProjectsRevenue.reduce((acc, curr) => {
        return acc + curr.budget.total;
    }, 0);

    // monthwise projects
    const dataMonth = await Project.aggregate([
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
    const MonthwiseBudget = await Project.aggregate([
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

    const PerformanceAggre = await Task.aggregate([
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
    return Data


}

module.exports=build