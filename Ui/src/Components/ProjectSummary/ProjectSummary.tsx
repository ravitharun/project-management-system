// import React from "react";
import {
    FaPlus,
    FaUserPlus,
    FaChartLine,
    FaCalendarDay,
    FaFileAlt,

    FaDownload,
    FaArrowRight,
} from "react-icons/fa";
import {
    FaBell,
    FaClipboardCheck,
    FaCommentAlt,
    // FaArrowUp,
    FaFire,
} from "react-icons/fa";
import {
    FaTasks,
    FaCheckCircle,
    FaClock,
    FaUsers,
    FaExclamationTriangle,
    FaCalendarAlt,
    FaRegCalendarCheck,
    FaFlag,
    FaBullseye,
    FaRocket,
} from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";

import { useContext, useEffect, useState } from "react";
import bgthemeContext from "../../Context/ThemeContext";
import TaskForm from "../Task/CreateTask/TaskForm";
import AddPeopleWorkspace from "../Task/AddPeople-workspace/AddPeopleWorkspace";

const ProjectSummary = ({ data, setCurrentView }: any) => {
    console.log(data, 'hcheck');

    const [_, setQuickAction] = useState<String | any>("")


    const [isTaskOpen, setistaskOpen] = useState<Boolean>(false)

    const [inviteMember, setinviteMember] = useState<Boolean>(false)

    const { theme }: any = useContext(bgthemeContext)
    useEffect(() => {



        const FetchSummery = async () => {


            try {

                console.log("/api/Analytcs/:projectId/summary");


            }


            catch (error: any) {


                console.log(error);

            }
        }
        FetchSummery()
    }, [])

    const assignedTasks = [
        {
            title: "Implement Login API",
            priority: "High",
            due: "Today",
            progress: 90,
        },
        {
            title: "Create Dashboard UI",
            priority: "Medium",
            due: "Tomorrow",
            progress: 60,
        },
        {
            title: "Calendar Integration",
            priority: "Low",
            due: "08 Aug",
            progress: 25,
        },
    ];

    const notifications = [
        "Akash assigned you a new task.",
        "Sprint 12 ends in 3 days.",
        "2 tasks are overdue.",
        "New comment on Authentication API.",
    ];

    const comments = [
        {
            user: "Sneha",
            message: "Authentication API looks good 👍",
            time: "15 min ago",
        },
        {
            user: "Rahul",
            message: "Found one validation issue.",
            time: "45 min ago",
        },
        {
            user: "Akash",
            message: "Dashboard design has been updated.",
            time: "Yesterday",
        },
    ];



    const quickActions = [
        {
            title: "Create Task",
            icon: <FaPlus />,
            color: "bg-blue-500",
        },
        {
            title: "Invite Member",
            icon: <FaUserPlus />,
            color: "bg-green-500",
        },
        {
            title: "View Reports",
            icon: <FaChartLine />,
            color: "bg-purple-500",
        },
        {
            title: "Open Calendar",
            icon: <FaCalendarDay />,
            color: "bg-orange-500",
        },
    ];

    const recentActivity = [
        {
            user: "Ravi",
            action: "created Authentication API",
            time: "10 mins ago",
            color: "bg-blue-500",
        },
        {
            user: "Akash",
            action: "completed Dashboard UI",
            time: "25 mins ago",
            color: "bg-green-500",
        },
        {
            user: "Sneha",
            action: "commented on Task #24",
            time: "1 hour ago",
            color: "bg-purple-500",
        },
        {
            user: "Rahul",
            action: "uploaded Requirements.pdf",
            time: "Yesterday",
            color: "bg-orange-500",
        },
    ];

    const deadlines = [
        {
            task: "Authentication Module",
            due: "Tomorrow",
            priority: "High",
        },
        {
            task: "Dashboard UI",
            due: "05 Aug",
            priority: "Medium",
        },
        {
            task: "Calendar Integration",
            due: "08 Aug",
            priority: "Low",
        },
    ];

    const files = [
        {
            name: "Requirements.pdf",
            size: "2.4 MB",
        },
        {
            name: "Wireframe.fig",
            size: "5.1 MB",
        },
        {
            name: "API Documentation.docx",
            size: "800 KB",
        },
    ];
    const project = {
        name: "College LMS",
        description:
            "Learning Management System for colleges to manage students, faculty, attendance and assessments.",
        status: "Active",
        projectLead: "Ravi Tharun",
        startDate: "01 Aug 2026",
        dueDate: "30 Nov 2026",
        created: "25 Jul 2026",
    };

    const stats = [
        {
            title: "Total Tasks",
            value: 50,
            icon: <FaTasks />,
            color: "bg-blue-500",
        },
        {
            title: "Completed",
            value: 40,
            icon: <FaCheckCircle />,
            color: "bg-green-500",
        },
        {
            title: "In Progress",
            value: 8,
            icon: <FaClock />,
            color: "bg-yellow-500",
        },
        {
            title: "To Do",
            value: 2,
            icon: <MdPendingActions />,
            color: "bg-indigo-500",
        },
        {
            title: "Overdue",
            value: 2,
            icon: <FaExclamationTriangle />,
            color: "bg-red-500",
        },
        {
            title: "Team Members",
            value: 10,
            icon: <FaUsers />,
            color: "bg-purple-500",
        },
    ];

    const taskStatus = [
        { label: "Completed", value: 40, color: "bg-green-500" },
        { label: "In Progress", value: 8, color: "bg-yellow-500" },
        { label: "To Do", value: 2, color: "bg-blue-500" },
    ];

    const priorities = [
        { label: "High", value: 12, color: "bg-red-500" },
        { label: "Medium", value: 25, color: "bg-yellow-500" },
        { label: "Low", value: 13, color: "bg-green-500" },
    ];

    const weeklyProgress = [
        { day: "Mon", value: 30 },
        { day: "Tue", value: 45 },
        { day: "Wed", value: 55 },
        { day: "Thu", value: 70 },
        { day: "Fri", value: 85 },
        { day: "Sat", value: 95 },
        { day: "Sun", value: 80 },
    ];
    const sprint = {
        name: "Sprint 12",
        goal: "Complete Authentication & Dashboard Modules",
        progress: 72,
        start: "01 Aug 2026",
        end: "15 Aug 2026",
        completed: 18,
        total: 25,
    };

    const teamMembers = [
        {
            name: "Ravi Tharun",
            role: "Project Lead",
            avatar: "RT",
            status: "Online",
            color: "bg-blue-500",
        },
        {
            name: "Akash",
            role: "Frontend",
            avatar: "AK",
            status: "Online",
            color: "bg-green-500",
        },
        {
            name: "Sneha",
            role: "Backend",
            avatar: "SN",
            status: "Away",
            color: "bg-purple-500",
        },
        {
            name: "Rahul",
            role: "QA Engineer",
            avatar: "RA",
            status: "Offline",
            color: "bg-orange-500",
        },
    ];

    const milestones = [
        {
            title: "Authentication Module",
            due: "Tomorrow",
            status: "High Priority",
        },
        {
            title: "Dashboard UI",
            due: "05 Aug",
            status: "In Progress",
        },
        {
            title: "Calendar Integration",
            due: "08 Aug",
            status: "Pending",
        },
        {
            title: "Testing Phase",
            due: "12 Aug",
            status: "Upcoming",
        },
    ];


    // HandelQuickActions


    const HandelQuickActions = (title: any) => {

        setQuickAction(title)



        switch (title) {
            case "Create Task":


                setistaskOpen((prev) => !prev)



                break;
            case "Invite Member":

                setinviteMember(true)


                break;
            case "Open Calendar":
                console.log(title);
                setCurrentView('Calendar')


                break;

            default:
                console.log(title);
                setCurrentView('Reports')

                break;
        }
    }



    return (
        <>
            {isTaskOpen && <TaskForm AddedBy={data.workspace.workspaceSetup.createby} projectid={data.workspace._id} onclose={() => setistaskOpen((prev) => !prev)} maximizeParent={data.ismaxAndMin} CreateTask={isTaskOpen} />}
            {inviteMember && <AddPeopleWorkspace closesetAddMembers={() => setinviteMember(false)} workspace={data} />}
            <div
                className={`
        min-h-screen p-6
        ${theme === "Dark"
                        ? "bg-[#020817] text-white"
                        : "bg-[#f4f6fb] text-slate-800"
                    }
    `}
            >

                {/* Header */}

                <div
                    className={`
        rounded-2xl shadow-sm p-6 mb-6
        ${theme === "Dark"
                            ? "bg-[#0f172a]"
                            : "bg-gray-200"
                        }
    `}
                >

                    <div className="flex flex-col lg:flex-row lg:justify-between gap-6">


                        {/* Project Details */}

                        <div className="flex items-start gap-4">


                            {/* Project Image */}

                            <img
                                src="https://images.unsplash.com/photo-1556761175-b413da4baf72"
                                alt="Project"
                                className="w-16 h-16 rounded-xl object-cover shadow-sm"
                            />


                            <div>


                                {/* Project Name */}

                                <div className="flex flex-wrap items-center gap-3">

                                    <h1
                                        className={`
                        text-3xl font-bold
                        ${theme === "Dark"
                                                ? "text-white"
                                                : "text-slate-800"
                                            }
                        `}
                                    >
                                        {project.name}
                                    </h1>


                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                        {project.status}
                                    </span>


                                </div>



                                {/* User Profile */}

                                <div className="flex items-center gap-3 mt-3">


                                    <img
                                        src="https://randomuser.me/api/portraits/men/32.jpg"
                                        alt="John Doe"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />


                                    <div className="flex items-center gap-2">


                                        <p
                                            className={`
                            text-sm
                            ${theme === "Dark"
                                                    ? "text-slate-400"
                                                    : "text-slate-500"
                                                }
                            `}
                                        >
                                            Managed by
                                        </p>


                                        <span
                                            className={`
                            font-semibold
                            ${theme === "Dark"
                                                    ? "text-white"
                                                    : "text-slate-700"
                                                }
                            `}
                                        >
                                            John Doe
                                        </span>


                                        <span className="text-sm text-slate-400">
                                            • Project Lead
                                        </span>


                                    </div>


                                </div>



                                <p
                                    className={`
                    mt-3 max-w-3xl
                    ${theme === "Dark"
                                            ? "text-slate-400"
                                            : "text-slate-500"
                                        }
                    `}
                                >
                                    {project.description}
                                </p>


                            </div>


                        </div>



                        <button
                            className="
            h-11 px-6 rounded-xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-medium
            "
                        >
                            Edit Project
                        </button>


                    </div>



                    {/* Info Cards */}


                    <div className="grid md:grid-cols-4 gap-6 mt-8">


                        {
                            [
                                {
                                    icon: <FaUsers size={20} />,
                                    title: "Project Lead",
                                    value: "John Doe",
                                    color: "bg-blue-100 text-blue-600"
                                },
                                {
                                    icon: <FaCalendarAlt size={20} />,
                                    title: "Start Date",
                                    value: project.startDate,
                                    color: "bg-green-100 text-green-600"
                                },
                                {
                                    icon: <FaRegCalendarCheck size={20} />,
                                    title: "Due Date",
                                    value: project.dueDate,
                                    color: "bg-red-100 text-red-600"
                                },
                                {
                                    icon: <FaCalendarAlt size={20} />,
                                    title: "Created",
                                    value: project.created,
                                    color: "bg-purple-100 text-purple-600"
                                }
                            ].map((item) => (

                                <div className="flex items-center gap-4">


                                    <div className={`${item.color} p-3 rounded-xl`}>
                                        {item.icon}
                                    </div>


                                    <div>

                                        <p
                                            className={
                                                theme === "Dark"
                                                    ? "text-slate-400 text-sm"
                                                    : "text-slate-500 text-sm"
                                            }
                                        >
                                            {item.title}
                                        </p>


                                        <h3 className="font-semibold">
                                            {item.value}
                                        </h3>

                                    </div>


                                </div>

                            ))
                        }


                    </div>



                </div>





                {/* Stats */}


                <div
                    className="
grid
grid-cols-1
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
xl:grid-cols-5
gap-5
"
                >


                    {
                        stats.map((item) => (

                            <div
                                key={item.title}
                                className={`
rounded-2xl shadow-sm p-5 hover:shadow-md transition

${theme === "Dark"
                                        ? "bg-[#0f172a]"
                                        : "bg-gray-200"
                                    }
`}
                            >


                                <div
                                    className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center text-xl`}
                                >
                                    {item.icon}
                                </div>


                                <h2 className="text-3xl font-bold mt-4">
                                    {item.value}
                                </h2>


                                <p
                                    className={
                                        theme === "Dark"
                                            ? "text-slate-400 mt-1"
                                            : "text-slate-500 mt-1"
                                    }
                                >
                                    {item.title}
                                </p>


                            </div>

                        ))
                    }



                    {/* Progress Card */}

                    <div
                        className={`
rounded-2xl shadow-sm p-5
${theme === "Dark"
                                ? "bg-[#0f172a]"
                                : "bg-gray-200"
                            }
`}
                    >
                        <h1>Progress Card</h1>


                    </div>


                </div>


            </div>
            {/* Charts Section */}
            {/* page2 */}
            <div className="grid xl:grid-cols-3 gap-6 mt-8">


                {/* Task Status */}

                <div
                    className={`
rounded-2xl p-6 shadow-sm

${theme === "Dark"
                            ? "bg-[#0f172a]"
                            : "bg-gray-200"
                        }
`}
                >

                    <h2
                        className={`
text-lg font-semibold mb-5

${theme === "Dark"
                                ? "text-white"
                                : "text-slate-800"
                            }
`}
                    >
                        Task Status
                    </h2>



                    <div className="flex justify-center">

                        <div className="relative w-48 h-48">


                            <div
                                className="w-full h-full rounded-full"
                                style={{
                                    background:
                                        "conic-gradient(#22c55e 0% 80%, #facc15 80% 96%, #3b82f6 96% 100%)",
                                }}
                            />



                            <div
                                className={`
absolute inset-5 rounded-full 
flex flex-col justify-center items-center

${theme === "Dark"
                                        ? "bg-[#020817]"
                                        : "bg-gray-200"
                                    }
`}
                            >


                                <h1 className="text-3xl font-bold">
                                    50
                                </h1>


                                <p
                                    className={
                                        theme === "Dark"
                                            ? "text-slate-400"
                                            : "text-gray-500"
                                    }
                                >
                                    Total
                                </p>


                            </div>


                        </div>


                    </div>



                    <div className="space-y-4 mt-8">


                        {
                            taskStatus.map((item) => (

                                <div
                                    key={item.label}
                                    className="flex justify-between items-center"
                                >


                                    <div className="flex items-center gap-3">


                                        <span
                                            className={`w-4 h-4 rounded-full ${item.color}`}
                                        />


                                        <span
                                            className={
                                                theme === "Dark"
                                                    ? "text-slate-300"
                                                    : "text-slate-700"
                                            }
                                        >
                                            {item.label}
                                        </span>


                                    </div>


                                    <span className="font-semibold">
                                        {item.value}
                                    </span>


                                </div>

                            ))
                        }


                    </div>


                </div>





                {/* Priority */}


                <div
                    className={`
rounded-2xl p-6 shadow-sm

${theme === "Dark"
                            ? "bg-[#0f172a]"
                            : "bg-gray-200"
                        }
`}
                >


                    <h2
                        className="
text-xl 
font-semibold 
mb-6
"
                    >
                        Priority Distribution
                    </h2>



                    <div className="space-y-6">


                        {
                            priorities.map((item) => (

                                <div key={item.label}>


                                    <div className="flex justify-between mb-2">


                                        <span>
                                            {item.label}
                                        </span>


                                        <span>
                                            {item.value}
                                        </span>


                                    </div>



                                    <div
                                        className={`
w-full h-3 rounded-full

${theme === "Dark"
                                                ? "bg-slate-700"
                                                : "bg-gray-300"
                                            }
`}
                                    >


                                        <div

                                            className={`${item.color} h-3 rounded-full`}

                                            style={{
                                                width: `${(item.value / 25) * 100}%`
                                            }}

                                        />


                                    </div>



                                </div>

                            ))
                        }


                    </div>


                </div>





                {/* Weekly Progress */}


                <div
                    className={`
rounded-2xl p-6 shadow-sm

${theme === "Dark"
                            ? "bg-[#0f172a]"
                            : "bg-gray-200"
                        }
`}
                >


                    <h2
                        className="
text-xl 
font-semibold 
mb-6
"
                    >
                        Weekly Progress
                    </h2>



                    <div className="flex justify-between items-end h-64">


                        {
                            weeklyProgress.map((item) => (

                                <div
                                    key={item.day}
                                    className="flex flex-col items-center gap-3"
                                >


                                    <div
                                        className="
bg-blue-500 
rounded-t-lg 
w-10 
hover:bg-blue-600 
transition-all
"
                                        style={{
                                            height: `${item.value * 2}px`
                                        }}
                                    />



                                    <span
                                        className={
                                            `
text-sm

${theme === "Dark"
                                                ? "text-slate-400"
                                                : "text-gray-600"
                                            }
`
                                        }
                                    >
                                        {item.day}
                                    </span>


                                </div>

                            ))
                        }


                    </div>


                </div>


            </div>
            {/* pag3 */}
            {/* ====================== */}
            {/* Sprint + Team Section */}
            {/* ====================== */}

            <div className="grid xl:grid-cols-3 gap-5 mt-8">


                {/* Sprint */}

                <div
                    className={`
xl:col-span-2 rounded-2xl shadow-sm p-5

${theme === "Dark"
                            ? "bg-[#0f172a]"
                            : "bg-gray-200"
                        }
`}
                >


                    <div className="flex justify-between items-center mb-5">


                        <h2 className="text-lg font-bold">
                            Current Sprint
                        </h2>


                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                            Active
                        </span>


                    </div>




                    <div className="grid md:grid-cols-2 gap-6">



                        <div>


                            <h3 className="text-xl font-bold">
                                {sprint.name}
                            </h3>



                            <p
                                className={`
text-sm mt-2

${theme === "Dark"
                                        ? "text-slate-400"
                                        : "text-gray-500"
                                    }
`}
                            >
                                {sprint.goal}
                            </p>





                            <div className="mt-5">


                                <div className="flex justify-between text-xs mb-2">

                                    <span>
                                        Sprint Progress
                                    </span>


                                    <span>
                                        {sprint.progress}%
                                    </span>

                                </div>




                                <div
                                    className={`
h-2.5 rounded-full

${theme === "Dark"
                                            ? "bg-slate-700"
                                            : "bg-gray-300"
                                        }
`}
                                >


                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{
                                            width: `${sprint.progress}%`
                                        }}
                                    />


                                </div>


                            </div>


                        </div>





                        <div className="grid grid-cols-2 gap-4">



                            <div
                                className={`
rounded-xl p-4

${theme === "Dark"
                                        ? "bg-[#020817]"
                                        : "bg-slate-100"
                                    }
`}
                            >


                                <FaRocket className="text-blue-600 text-xl mb-2" />


                                <p
                                    className={
                                        theme === "Dark"
                                            ? "text-xs text-slate-400"
                                            : "text-xs text-gray-500"
                                    }
                                >
                                    Completed
                                </p>


                                <h2 className="text-2xl font-bold">
                                    {sprint.completed}
                                </h2>


                            </div>





                            <div
                                className={`
rounded-xl p-4

${theme === "Dark"
                                        ? "bg-[#020817]"
                                        : "bg-slate-100"
                                    }
`}
                            >


                                <FaBullseye className="text-green-600 text-xl mb-2" />


                                <p
                                    className={
                                        theme === "Dark"
                                            ? "text-xs text-slate-400"
                                            : "text-xs text-gray-500"
                                    }
                                >
                                    Total Tasks
                                </p>


                                <h2 className="text-2xl font-bold">
                                    {sprint.total}
                                </h2>


                            </div>






                            <div
                                className={`
rounded-xl p-4

${theme === "Dark"
                                        ? "bg-[#020817]"
                                        : "bg-slate-100"
                                    }
`}
                            >


                                <p
                                    className={
                                        theme === "Dark"
                                            ? "text-xs text-slate-400"
                                            : "text-xs text-gray-500"
                                    }
                                >
                                    Start
                                </p>


                                <h3 className="text-sm font-semibold mt-2">
                                    {sprint.start}
                                </h3>


                            </div>





                            <div
                                className={`
rounded-xl p-4

${theme === "Dark"
                                        ? "bg-[#020817]"
                                        : "bg-slate-100"
                                    }
`}
                            >


                                <p
                                    className={
                                        theme === "Dark"
                                            ? "text-xs text-slate-400"
                                            : "text-xs text-gray-500"
                                    }
                                >
                                    End
                                </p>


                                <h3 className="text-sm font-semibold mt-2">
                                    {sprint.end}
                                </h3>


                            </div>



                        </div>


                    </div>


                </div>







                {/* Team */}


                <div
                    className={`
rounded-2xl shadow-sm p-5

${theme === "Dark"
                            ? "bg-[#0f172a]"
                            : "bg-gray-200"
                        }
`}
                >


                    <h2 className="text-lg font-bold mb-5">
                        Team Members
                    </h2>



                    <div className="space-y-4">


                        {
                            teamMembers.map((member) => (


                                <div
                                    key={member.name}
                                    className="flex items-center justify-between"
                                >



                                    <div className="flex items-center gap-3">



                                        <div
                                            className={`
${member.color}
w-10 h-10
rounded-full
text-black
flex items-center justify-center
text-sm
font-bold
`}
                                        >
                                            {member.avatar}
                                        </div>





                                        <div>


                                            <h4 className="text-sm font-semibold">
                                                {member.name}
                                            </h4>


                                            <p
                                                className={`
text-xs

${theme === "Dark"
                                                        ? "text-slate-400"
                                                        : "text-gray-500"
                                                    }
`}
                                            >
                                                {member.role}
                                            </p>


                                        </div>


                                    </div>





                                    <span
                                        className={`
text-xs px-2.5 py-1 rounded-full

${member.status === "Online"
                                                ? "bg-green-100 text-green-600"
                                                : member.status === "Away"
                                                    ? "bg-yellow-100 text-yellow-600"
                                                    : "bg-gray-200 text-gray-600"
                                            }
`}
                                    >
                                        {member.status}
                                    </span>




                                </div>


                            ))
                        }



                    </div>


                </div>



            </div>

            {/* ====================== */}
            {/* Milestones */}
            {/* ====================== */}

            <div
                className={`
rounded-2xl shadow-sm p-5 mt-8

${theme === "Dark"
                        ? "bg-[#0f172a]"
                        : "bg-gray-200"
                    }
`}
            >


                <div className="flex justify-between items-center mb-5">


                    <h2 className="text-lg font-bold">
                        Upcoming Milestones
                    </h2>



                    <button
                        className="
text-blue-600 
text-sm
font-medium
hover:text-blue-700
"
                    >
                        View All
                    </button>


                </div>





                <div className="grid md:grid-cols-2 gap-4">


                    {
                        milestones.map((item) => (


                            <div
                                key={item.title}

                                className={`
rounded-xl p-4
border
transition

hover:border-blue-500

${theme === "Dark"
                                        ? "border-slate-700"
                                        : "border-gray-300"
                                    }
`}
                            >


                                <div className="flex justify-between">



                                    <div>


                                        <h3 className="text-sm font-semibold">
                                            {item.title}
                                        </h3>



                                        <p
                                            className={`
text-xs mt-2

${theme === "Dark"
                                                    ? "text-slate-400"
                                                    : "text-gray-500"
                                                }
`}
                                        >
                                            Due: {item.due}
                                        </p>


                                    </div>




                                    <FaFlag
                                        className="
text-red-500 
text-lg
"
                                    />



                                </div>





                                <span
                                    className={`
inline-block mt-4
px-3 py-1
rounded-full
text-xs

${theme === "Dark"
                                            ? "bg-slate-800 text-slate-300"
                                            : "bg-slate-100 text-slate-700"
                                        }
`}
                                >
                                    {item.status}
                                </span>




                            </div>


                        ))
                    }


                </div>



            </div>



            {/* pg4 */}{/* ========================================== */}
            {/* Activity + Quick Actions */}
            {/* ========================================== */}
            <div className="grid xl:grid-cols-3 gap-5 mt-8">


                {/* Recent Activity */}

                <div
                    className={`
xl:col-span-2
rounded-2xl
shadow-sm
p-5

${theme === "Dark"
                            ? "bg-[#0f172a]"
                            : "bg-gray-200"
                        }
`}
                >


                    <div className="flex justify-between items-center mb-6">


                        <h2 className="text-lg font-bold">
                            Recent Activity
                        </h2>



                        <button
                            className="
text-blue-600
text-sm
flex items-center
gap-2
"
                        >

                            View All

                            <FaArrowRight size={14} />

                        </button>


                    </div>





                    <div className="space-y-5">


                        {
                            recentActivity.map((item) => (


                                <div
                                    key={item.action}
                                    className="flex gap-3"
                                >


                                    <div
                                        className={`
${item.color}
w-10 h-10
rounded-full
flex items-center
justify-center
text-black
text-sm
font-bold
`}
                                    >
                                        {item.user[0]}
                                    </div>




                                    <div className="flex-1">


                                        <h4 className="text-sm font-semibold">


                                            {item.user}


                                            <span
                                                className={`
font-normal

${theme === "Dark"
                                                        ? "text-slate-400"
                                                        : "text-gray-500"
                                                    }
`}
                                            >

                                                {" "}
                                                {item.action}

                                            </span>


                                        </h4>




                                        <p
                                            className={`
text-xs mt-1

${theme === "Dark"
                                                    ? "text-slate-500"
                                                    : "text-gray-400"
                                                }
`}
                                        >
                                            {item.time}
                                        </p>



                                    </div>


                                </div>


                            ))
                        }



                    </div>


                </div>








                {/* Quick Actions */}

                <div
                    className={`rounded-2xl p-5 shadow-sm border transition-colors ${theme === "Dark"
                        ? "bg-slate-900 border-slate-800"
                        : "bg-white border-gray-200"
                        }`}
                >
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-semibold">Quick Actions</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {quickActions.map((item) => (
                            <button
                                key={item.title}
                                onClick={() => HandelQuickActions(item.title)}
                                className={`group rounded-xl p-4 border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${theme === "Dark"
                                    ? "border-slate-700 bg-slate-800/60 hover:bg-slate-800"
                                    : "border-gray-200 bg-gray-50 hover:bg-white"
                                    }`}
                            >
                                <div
                                    className={`w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-105 ${item.color}`}
                                >
                                    {item.icon}
                                </div>

                                <h4
                                    className={`text-sm font-medium text-center ${theme === "Dark" ? "text-slate-200" : "text-gray-700"
                                        }`}
                                >
                                    {item.title}
                                </h4>
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* ========================================== */}
            {/* Deadlines + Files */}
            {/* ========================================== */}
            <div className="grid xl:grid-cols-2 gap-5 mt-8">


                {/* Upcoming Deadlines */}


                <div
                    className={`
rounded-2xl
shadow-sm
p-5

${theme === "Dark"
                            ? "bg-[#0f172a]"
                            : "bg-gray-200"
                        }
`}
                >


                    <h2 className="text-lg font-bold mb-5">
                        Upcoming Deadlines
                    </h2>




                    <div className="space-y-4">


                        {
                            deadlines.map((item) => (


                                <div
                                    key={item.task}

                                    className={`
flex 
justify-between 
items-center 
pb-3
border-b

${theme === "Dark"
                                            ? "border-slate-700"
                                            : "border-gray-300"
                                        }
`}
                                >



                                    <div>


                                        <h4 className="text-sm font-semibold">
                                            {item.task}
                                        </h4>




                                        <p
                                            className={`
text-xs mt-1

${theme === "Dark"
                                                    ? "text-slate-400"
                                                    : "text-gray-500"
                                                }
`}
                                        >
                                            Due: {item.due}
                                        </p>


                                    </div>





                                    <span
                                        className={`
px-3
py-1
rounded-full
text-xs


${item.priority === "High"
                                                ? "bg-red-100 text-red-600"

                                                : item.priority === "Medium"
                                                    ? "bg-yellow-100 text-yellow-600"

                                                    : "bg-green-100 text-green-600"
                                            }

`}
                                    >

                                        {item.priority}

                                    </span>



                                </div>


                            ))
                        }



                    </div>


                </div>







                {/* Recent Files */}


                <div
                    className={`
rounded-2xl
shadow-sm
p-5

${theme === "Dark"
                            ? "bg-[#0f172a]"
                            : "bg-gray-200"
                        }
`}
                >



                    <h2 className="text-lg font-bold mb-5">
                        Recent Files
                    </h2>




                    <div className="space-y-4">


                        {
                            files.map((file) => (


                                <div
                                    key={file.name}

                                    className={`
flex
justify-between
items-center
rounded-xl
p-3
border
transition
hover:border-blue-500


${theme === "Dark"
                                            ? "border-slate-700"
                                            : "border-gray-300"
                                        }
`}
                                >



                                    <div className="flex items-center gap-3">


                                        <div className="bg-blue-100 p-2.5 rounded-lg">

                                            <FaFileAlt className="text-blue-600 text-sm" />

                                        </div>




                                        <div>


                                            <h4 className="text-sm font-semibold">
                                                {file.name}
                                            </h4>




                                            <p
                                                className={`
text-xs mt-1

${theme === "Dark"
                                                        ? "text-slate-400"
                                                        : "text-gray-500"
                                                    }
`}
                                            >
                                                {file.size}
                                            </p>



                                        </div>


                                    </div>





                                    <button
                                        className="
text-gray-500
hover:text-blue-600
"
                                    >

                                        <FaDownload size={14} />

                                    </button>



                                </div>


                            ))
                        }



                    </div>


                </div>



            </div>



            {/* pg5 */}

            {/* =============================== */}
            {/* Assigned + Notifications + Comments */}
            {/* =============================== */}

            <div className="grid xl:grid-cols-3 gap-5 mt-8">


                {/* Assigned To Me */}

                <div
                    className={`
rounded-2xl
shadow-sm
p-5

${theme === "Dark"
                            ? "bg-[#0f172a]"
                            : "bg-gray-200"
                        }
`}
                >


                    <div className="flex justify-between items-center mb-5">


                        <h2 className="text-lg font-bold">
                            Assigned To Me
                        </h2>


                        <FaClipboardCheck className="text-blue-600" size={18} />


                    </div>




                    <div className="space-y-4">


                        {
                            assignedTasks.map(task => (


                                <div
                                    key={task.title}

                                    className={`
border
rounded-xl
p-4
transition
hover:border-blue-500

${theme === "Dark"
                                            ? "border-slate-700"
                                            : "border-gray-300"
                                        }
`}
                                >


                                    <div className="flex justify-between gap-2">


                                        <h4 className="text-sm font-semibold">
                                            {task.title}
                                        </h4>



                                        <span
                                            className={`
text-xs
px-2
py-1
rounded-full

${task.priority === "High"
                                                    ? "bg-red-100 text-red-600"

                                                    : task.priority === "Medium"
                                                        ? "bg-yellow-100 text-yellow-600"

                                                        : "bg-green-100 text-green-600"
                                                }

`}
                                        >
                                            {task.priority}
                                        </span>


                                    </div>





                                    <p
                                        className={`
text-xs mt-2

${theme === "Dark"
                                                ? "text-slate-400"
                                                : "text-gray-500"
                                            }
`}
                                    >
                                        Due {task.due}
                                    </p>




                                    <div
                                        className={`
rounded-full
h-2
mt-4

${theme === "Dark"
                                                ? "bg-slate-700"
                                                : "bg-gray-300"
                                            }
`}
                                    >


                                        <div
                                            className="
bg-blue-600
h-2
rounded-full
"
                                            style={{
                                                width: `${task.progress}%`
                                            }}
                                        />


                                    </div>




                                </div>


                            ))
                        }



                    </div>


                </div>







                {/* Notifications */}



                <div
                    className={`
rounded-2xl
shadow-sm
p-5

${theme === "Dark"
                            ? "bg-[#0f172a]"
                            : "bg-gray-200"
                        }
`}
                >



                    <div className="flex justify-between items-center mb-5">


                        <h2 className="text-lg font-bold">
                            Notifications
                        </h2>


                        <FaBell className="text-orange-500" size={18} />


                    </div>




                    <div className="space-y-4">


                        {
                            notifications.map((item, index) => (


                                <div
                                    key={index}
                                    className="flex gap-3 items-start"
                                >


                                    <div className="mt-1">
                                        <FaFire className="text-orange-500" size={14} />
                                    </div>



                                    <p
                                        className={`
text-sm

${theme === "Dark"
                                                ? "text-slate-300"
                                                : "text-gray-600"
                                            }
`}
                                    >
                                        {item}
                                    </p>



                                </div>


                            ))
                        }



                    </div>


                </div>







                {/* Recent Comments */}



                <div
                    className={`
rounded-2xl
shadow-sm
p-5

${theme === "Dark"
                            ? "bg-[#0f172a]"
                            : "bg-gray-200"
                        }
`}
                >



                    <div className="flex justify-between items-center mb-5">


                        <h2 className="text-lg font-bold">
                            Recent Comments
                        </h2>



                        <FaCommentAlt className="text-green-600" size={18} />



                    </div>




                    <div className="space-y-4">


                        {
                            comments.map(comment => (


                                <div
                                    key={comment.user}

                                    className={`
border
rounded-xl
p-4

${theme === "Dark"
                                            ? "border-slate-700"
                                            : "border-gray-300"
                                        }
`}
                                >


                                    <div className="flex justify-between">


                                        <h4 className="text-sm font-semibold">
                                            {comment.user}
                                        </h4>



                                        <span
                                            className={`
text-xs

${theme === "Dark"
                                                    ? "text-slate-400"
                                                    : "text-gray-500"
                                                }
`}
                                        >
                                            {comment.time}
                                        </span>


                                    </div>





                                    <p
                                        className={`
text-sm mt-2

${theme === "Dark"
                                                ? "text-slate-300"
                                                : "text-gray-600"
                                            }
`}
                                    >
                                        {comment.message}
                                    </p>



                                </div>


                            ))
                        }



                    </div>



                </div>



            </div>



        </>
    );
};

export default ProjectSummary;