import Card from "../../Components/Card";
import Sidebar from "../../Components/Navbar";
import {
    FaProjectDiagram,
    FaTasks,
    FaCheckCircle,
    FaClock,
    FaUsers,
    FaMoneyBill,
    FaChevronRight,
    FaChevronLeft,
    FaArrowUp,
    FaEquals,
    FaArrowDown,
} from "react-icons/fa";
import TaskBox from "../../Components/TaskBox";
import ProgressBar from "../../Components/ProgressBar";
import RecentActivity from "../../Components/RecentActivity";
import { useContext, useEffect, useState } from "react";
import { fetchProjects } from "../../services/ProjetcApi";
import { instance } from "../../services/apiservices";
// import { Link } from "react-router-dom";
import ProjectsNotfound from "../../Components/ProjectsNotfound";
import SideBarContext from "../../Context/SideBard";
import bgthemeContext from "../../Context/ThemeContext";


function Dashboard() {
    const [page, setpage] = useState<number>(1)
    const [totalpages, settotalPages] = useState<number>(1)
    const [projects, setprojects] = useState<any>([])

    const [status, setStatus] = useState<any>({});
    useEffect(() => {
        const FetchAna = async () => {
            try {
                const response = await instance.get("/api/Analytcs/")
                console.log(response.data.message)
                setStatus(response.data.message)
                // setProjectStatus(response.data.message.projectstatus)

            } catch (error: any) {
                console.log(error)

            }
        }
        FetchAna()
    }, [])
    console.log(status, 'status')
    useEffect(() => {
        const FetchProjects = async () => {
            try {
                const response = await fetchProjects(page)
                // console.log(response.data.data.totalPages==page, 'prj')
                setprojects(response.data.data.projects)
                settotalPages(response.data.data.totalPages)

            } catch (error: any) {
                console.log(error)

            }
        }
        FetchProjects()
    }, [page])
    const sidebar = useContext(SideBarContext);
    console.log(sidebar?.issidebaropen, 'sidebar')
    const context = useContext(bgthemeContext)
    const { theme }: any = context;
    return (
        <>

            {/* ligth */}
            <div className={`${theme == "Dark" ? "bg-[#0b1120]" : "bg-[#f3f3f4]"}  overflow-x-hidden
    overflow-y-auto mt-5`}>



                {/* ================= SIDEBAR ================= */}

                <Sidebar page="Dashboard" />

                {/* ================= MAIN WRAPPER ================= */}

                <div
                    className={`
        transition-all duration-300
        pt-16 min-h-screen

        ${sidebar?.issidebaropen
                            ? "md:ml-[270px]"
                            : "md:ml-[88px]"
                        }
    `}
                >

                    {/* ================= HEADER ================= */}

                    <header
                        className={`sticky top-16 z-30 h-16 transition-all duration-300
    ${theme === "Dark"
                                ? "bg-[#0f172a] border-b border-gray-800 shadow-md"
                                : "bg-[#f8fafc] border-b border-gray-300 shadow-sm"
                            }`}
                    >

                        <div className="h-full px-4 md:px-8 flex items-center justify-between">

                            {/* LEFT */}

                            <div>

                                <h1 className={`text-2xl md:text-3xl font-bold ${theme == "Dark" ? "text-white" : "text-black"}`}>
                                    Dashboard
                                </h1>

                                <p className="text-sm text-gray-400 hidden md:block">
                                    Manage projects, monitor tasks and track team progress.
                                </p>

                            </div>

                            {/* RIGHT */}
                            {/* 
                            <div className="flex items-center gap-3">

                                <button
                                    className="
                        hidden md:flex
                        items-center gap-2
                        bg-gray-800 hover:bg-gray-700
                        border border-gray-700
                        transition px-4 py-2
                        rounded-xl text-sm text-white
                    "
                                >
                                    Export
                                </button>

                                <button
                                    className="
                        bg-blue-600 hover:bg-blue-700
                        transition
                        px-4 py-2
                        rounded-xl
                        text-sm text-white font-medium
                    "
                                >
                                    Create Project
                                </button>

                            </div> */}

                        </div>

                    </header>

                    {/* ================= CONTENT ================= */}

                    <main className="p-4 md:p-8">

                        {/* ================= STATS ================= */}

                        <div
                            className={`
    grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-5
`}
                        >

                            <Card
                                title="Projects"
                                value={status?.FetchProjects || 0}
                                icon={<FaProjectDiagram />}
                                theme={theme}
                            />

                            <Card
                                title="Tasks"
                                value={status?.fetchTask || 0}
                                icon={<FaTasks />}
                                theme={theme}
                            />

                            <Card
                                title="Completed"
                                value={status?.completed || 0}
                                icon={<FaCheckCircle />}
                                theme={theme}
                            />

                            <Card
                                title="Pending"
                                value={status?.pending || 0}
                                icon={<FaClock />}
                                theme={theme}
                            />

                            <Card
                                title="Team"
                                value={status?.Team || 0}
                                icon={<FaUsers />}
                                theme={theme}
                            />

                            <Card
                                title="Budget"
                                value={status?.TotalRevenue?.toLocaleString() || 0}
                                icon={<FaMoneyBill />}
                                theme={theme}
                            />

                        </div>

                        {/* ================= SECOND ROW ================= */}

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

                            {/* ================= PRIORITY ================= */}

                            <div
                                className={`
    xl:col-span-1
    rounded-2xl
    p-6
    transition-all duration-300
    ${theme === "Dark"
                                        ? "bg-[#111827] border border-gray-800"
                                        : "bg-white border border-gray-200 shadow-sm"
                                    }
`}
                            >

                                <div className="mb-6">

                                    <h2
                                        className={`text-lg font-semibold ${theme === "Dark"
                                            ? "text-white"
                                            : "text-gray-900"
                                            }`}
                                    >
                                        Priority Overview
                                    </h2>

                                    <p
                                        className={`text-sm mt-1 ${theme === "Dark"
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        Distribution of task priorities.
                                    </p>

                                </div>

                                <div className="space-y-4">

                                    {status?.projectpriority?.map((prj: any, idx: number) => (

                                        <div
                                            key={idx}
                                            className={`
                flex items-center justify-between
                rounded-xl
                p-4
                transition-all duration-300
                ${theme === "Dark"
                                                    ? "bg-[#0f172a] border border-gray-800 hover:border-gray-700"
                                                    : "bg-gray-50 border border-gray-200 hover:border-gray-300"
                                                }
            `}
                                        >

                                            {/* LEFT */}

                                            <div className="flex items-center gap-3">

                                                <div
                                                    className={`
                        w-11 h-11
                        rounded-xl
                        flex items-center justify-center
                        ${theme === "Dark"
                                                            ? "bg-gray-800 text-white"
                                                            : "bg-white border border-gray-200 text-gray-700"
                                                        }
                    `}
                                                >

                                                    {prj?._id === "Medium"
                                                        ? <FaEquals />
                                                        : prj?._id === "Low"
                                                            ? <FaArrowDown />
                                                            : <FaArrowUp />
                                                    }

                                                </div>

                                                <div>

                                                    <h3
                                                        className={`font-medium ${theme === "Dark"
                                                            ? "text-white"
                                                            : "text-gray-900"
                                                            }`}
                                                    >
                                                        {prj?._id}
                                                    </h3>

                                                    <p
                                                        className={`text-sm ${theme === "Dark"
                                                            ? "text-gray-400"
                                                            : "text-gray-500"
                                                            }`}
                                                    >
                                                        Active Tasks
                                                    </p>

                                                </div>

                                            </div>

                                            {/* RIGHT */}

                                            <span
                                                className={`text-2xl font-bold ${theme === "Dark"
                                                    ? "text-white"
                                                    : "text-gray-900"
                                                    }`}
                                            >
                                                {prj?.total || 0}
                                            </span>

                                        </div>

                                    ))}

                                </div>

                            </div>

                            {/* ================= PROJECT PROGRESS ================= */}
                            <div
                                className={`
    xl:col-span-2
    rounded-2xl
    p-6
    transition-all duration-300
    ${theme === "Dark"
                                        ? "bg-[#111827] border border-gray-800"
                                        : "bg-white border border-gray-200 shadow-sm"
                                    }
`}
                            >

                                {/* HEADER */}

                                <div className="flex items-center justify-between mb-6">

                                    <div>

                                        <h2
                                            className={`text-lg font-semibold ${theme === "Dark"
                                                ? "text-white"
                                                : "text-gray-900"
                                                }`}
                                        >
                                            Project Progress
                                        </h2>

                                        <p
                                            className={`text-sm mt-1 ${theme === "Dark"
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                                }`}
                                        >
                                            Track ongoing project completion.
                                        </p>

                                    </div>

                                    {projects.length !== 0 && (

                                        <div className="flex items-center gap-3">

                                            <button
                                                onClick={() => setpage((prev) => Math.max(prev - 1, 1))}
                                                className={`
                    w-10 h-10
                    rounded-xl
                    flex items-center justify-center
                    transition-all duration-300
                    ${theme === "Dark"
                                                        ? "bg-gray-800 hover:bg-gray-700"
                                                        : "bg-gray-100 hover:bg-gray-200 border border-gray-200"
                                                    }
                `}
                                            >
                                                <FaChevronLeft
                                                    className={`text-sm ${theme === "Dark"
                                                        ? "text-white"
                                                        : "text-gray-700"
                                                        }`}
                                                />
                                            </button>

                                            <span
                                                className={`text-sm ${theme === "Dark"
                                                    ? "text-gray-300"
                                                    : "text-gray-600"
                                                    }`}
                                            >
                                                {page} / {totalpages}
                                            </span>

                                            <button
                                                onClick={() => setpage((prev) => Math.min(prev + 1, totalpages))}
                                                className={`
                    w-10 h-10
                    rounded-xl
                    flex items-center justify-center
                    transition-all duration-300
                    ${theme === "Dark"
                                                        ? "bg-gray-800 hover:bg-gray-700"
                                                        : "bg-gray-100 hover:bg-gray-200 border border-gray-200"
                                                    }
                `}
                                            >
                                                <FaChevronRight
                                                    className={`text-sm ${theme === "Dark"
                                                        ? "text-white"
                                                        : "text-gray-700"
                                                        }`}
                                                />
                                            </button>

                                        </div>

                                    )}

                                </div>

                                {/* BODY */}

                                {projects.length === 0 ? (

                                    <ProjectsNotfound
                                        title="No Project Progress Found"
                                        message="Start creating projects to track progress."
                                    />

                                ) : (

                                    <div className="space-y-5">

                                        {projects.map((prj: any, idx: number) => (

                                            <ProgressBar
                                                key={idx}
                                                name={prj?.projectName || "Untitled"}
                                                percent={prj?.progress || 0}
                                            />

                                        ))}

                                    </div>

                                )}

                            </div>
                        </div>

                        {/* ================= THIRD ROW ================= */}

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

                            {/* ================= RECENT ACTIVITY ================= */}

                            <div
                                className={` xl:col-span-2
                    ${theme == "Dark" ? "bg-[#111827]" : "bg-[#ffffff]"}
                            rounded-2xl
                    p-6`}
                            >

                                <div className="mb-6">

                                    <h2 className="text-lg font-semibold text-black">
                                        Recent Activity
                                    </h2>

                                    <p className="text-sm text-gray-400 mt-1">
                                        Latest updates from projects and tasks.
                                    </p>

                                </div>

                                <RecentActivity />

                            </div>

                            {/* ================= TASK SUMMARY ================= */}

                            <div
                                className={`
        rounded-2xl
        p-6 border transition-all duration-300
        ${theme === "Dark"
                                        ? "bg-[#111827] border-gray-800 text-white"
                                        : "bg-white border-gray-200 text-black shadow-sm"
                                    }
    `}
                            >

                                <div className="mb-6">

                                    <h2
                                        className={`
                text-lg font-semibold
                ${theme === "Dark"
                                                ? "text-white"
                                                : "text-gray-900"
                                            }
            `}
                                    >
                                        Task Summary
                                    </h2>

                                    <p
                                        className={`
                text-sm mt-1
                ${theme === "Dark"
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                            }
            `}
                                    >
                                        Tasks grouped by priority.
                                    </p>

                                </div>

                                <div className="space-y-4">

                                    {status?.projectpriority?.map((prj: any, idx: number) => (

                                        <TaskBox
                                            key={idx}
                                            title={prj?._id || 0}
                                            count={prj?.total || 0}
                                        />

                                    ))}

                                </div>

                            </div>

                        </div>

                    </main>

                </div >

            </div >
        </>
    );
}

export default Dashboard;







