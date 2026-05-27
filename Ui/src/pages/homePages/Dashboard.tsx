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
    FaSpinner,
    FaArrowUp,
    FaEquals,
    FaArrowDown,
} from "react-icons/fa";
import TaskBox from "../../Components/TaskBox";
import ProgressBar from "../../Components/ProgressBar";
import RecentActivity from "../../Components/RecentActivity";
import { useEffect, useState } from "react";
import { fetchProjects } from "../../services/ProjetcApi";
import { instance } from "../../services/apiservices";

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

    return (
        <div className="flex h-screen bg-gray-100">

            {/* SIDEBAR */}
            <Sidebar page="Dashboard" />

            {/* MAIN CONTENT */}
            <main className="flex-1 p-6 overflow-y-auto">

                {/* HEADER */}
                <h1 className="text-4xl font-extrabold mb-6 text-gray-800">
                    Dashboard
                </h1>

                {/* TOP CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">

                    <Card title="Projects" value={status?.FetchProjects || 0} icon={<FaProjectDiagram />} />
                    <Card title="Tasks" value={status?.fetchTask || 0} icon={<FaTasks />} />
                    <Card title="Completed" value={12} icon={<FaCheckCircle />} />
                    <Card title="Pending" value={12} icon={<FaClock />} />
                    {status?.projectpriority?.map((prj: any, idx: number) => (
                        <Card
                            key={idx}
                            title={prj?._id || 0}
                            value={prj?.total || 0}
                            icon={
                                prj?._id === "Medium"
                                    ? <FaEquals />
                                    : prj?._id === "Low"
                                        ? <FaArrowDown />
                                        : <FaArrowUp />
                            }
                        />

                    ))}

                    {status?.projectstatus?.map((prj: any, idx: number) => (

                        <Card
                            title={prj._id}
                            value={prj.total}
                            icon={
                                prj._id === 'In Progress'
                                    ? <FaSpinner />
                                    : prj._id === "completed"
                                        ? <FaCheckCircle />
                                        : <FaClock />
                            }
                            key={idx}
                        />))}
                    <Card title="Team" value={0} icon={<FaUsers />} />
                    <Card title="Budget" value={status?.TotalRevenue?.toLocaleString() || 0} icon={<FaMoneyBill />} />

                </div>

                {/* MIDDLE SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                    {/* PROJECT STATUS */}
                    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">

                        {/* Header with arrow */}
                        <div className="flex items-center justify-between mb-4">

                            <h2 className="font-bold text-lg text-gray-800">
                                Project Progress
                            </h2>

                            <div className="flex items-center gap-3">

                                {/* Prev */}
                                <FaChevronLeft
                                    onClick={() => setpage((prev) => Math.max(prev - 1, 1))}
                                    className={`w-5 h-5 cursor-pointer transition
        ${page === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-gray-900"}
      `}
                                />

                                {/* Page Info (optional) */}
                                <span className="text-sm text-gray-600">
                                    {page} / {totalpages}
                                </span>

                                {/* Next */}
                                <FaChevronRight
                                    onClick={() => setpage((prev) => Math.min(prev + 1, totalpages))}
                                    className={`w-5 h-5 cursor-pointer transition
        ${page === totalpages ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-gray-900"}
      `}
                                />

                            </div>
                        </div>
                        {projects.map((prj: any, idx: number) => (

                            <ProgressBar name={prj?.projectName || 0} key={idx} percent={prj?.progress || 0} />
                        ))}

                    </div>

                    <RecentActivity />

                </div>

                {/* TASK SUMMARY */}
                <div className="bg-white p-6 rounded-2xl shadow mt-8 hover:shadow-lg transition">
                    <h2 className="font-bold text-lg mb-4 text-gray-800">
                        Task Summary
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <TaskBox title="High Priority" count={5} />
                        <TaskBox title="Medium Priority" count={10} />
                        <TaskBox title="Low Priority" count={8} />
                    </div>
                </div>

            </main>
        </div>
    );
}

export default Dashboard;







