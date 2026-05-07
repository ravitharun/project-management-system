import Sidebar from "../Components/Navbar";
import { FaPlus, FaSearch, FaFilter, FaUsers } from "react-icons/fa";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { barData, COLORS, lineData, pieData } from "../types/Charts";
import type { Kipcard } from "../types/Kipcard";
import { getuserInfo } from "../Components/LocalStorage";
import { useEffect, useState } from "react";
import AddTaskForm from "../Components/AddTaskForm";
import { fetchProjects } from "../services/ProjetcApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function Projects() {

    const [Projects, setprojects] = useState([])
    const Role: string = getuserInfo ? JSON.parse(getuserInfo)?.userrole : ""
    const requiredRoles: string[] = ["TeamLeader", "Manager", "tl"]
    const [Open, setopenform] = useState<boolean>(false)





    useEffect(() => {
        const FetchProjects = async () => {
            try {
                const response = await fetchProjects()
                console.log(JSON.parse(response.data.data), 'response')
                setprojects(JSON.parse(response.data.data))
            } catch (error: any) {
                toast.error(error)

            }
        }
        FetchProjects()
    }, [])

    const handelOpenTaskForm = () => {
        setopenform((prev) => !prev)
        console.log('first')
    }
    const naviagte = useNavigate()
    const handelProjectDetaile = (project: any) => {

        if (!project) {
            return toast.error("Some thing went wrong")
        }
        naviagte("/naviagte-ProjectDeatils", {
            state: {
                project
            }
        })
    }
    return (
        <>

            <div className="flex h-screen bg-gray-100 scroll-auto">

                {/* SIDEBAR */}
                <Sidebar page="Projects" />

                {/* MAIN CONTENT */}
                <main className="flex-1 p-6 overflow-y-auto hide-scrollbar">

                    {/* HEADER */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-4xl font-extrabold text-gray-800">
                            Projects Dashboard
                        </h1>

                        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={handelOpenTaskForm}>
                            <FaPlus /> Add Project
                        </button>
                    </div>

                    {/* KPI CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <KpiCard title="Total Projects" value="12" />
                        <KpiCard title="Active Tasks" value="48" />
                        <KpiCard title="Completed" value="30" />
                        <KpiCard title="Team Members" value="5" />
                    </div>

                    {/* SEARCH */}
                    <div className="flex flex-col md:flex-row gap-3 mb-6">

                        <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow w-full">
                            <FaSearch className="text-gray-500" />
                            <input
                                placeholder="Search projects..."
                                className="ml-2 w-full outline-none"
                            />
                        </div>

                        <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
                            <FaFilter /> Filter
                        </button>

                    </div>

                    {/* ================= ANALYTICS only for the Team Leaders Or Mangers can View these Analytics ================= */}
                    {!requiredRoles.includes(Role) ?
                        "" :
                        <div>


                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Analytics Overview
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    Real-time project insights
                                </p>
                            </div>

                            {/* CHARTS GRID */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

                                {/* LINE CHART */}
                                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                                    <h3 className="font-semibold mb-3">Project vs Tasks Growth</h3>

                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={lineData}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line dataKey="projects" stroke="#3B82F6" strokeWidth={3} />
                                            <Line dataKey="tasks" stroke="#22C55E" strokeWidth={3} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* PIE CHART */}
                                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                                    <h3 className="font-semibold mb-3">Project Status</h3>

                                    <ResponsiveContainer width="100%" height={250}>
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                dataKey="value"
                                                label
                                            >
                                                {pieData.map((_, i) => (
                                                    <Cell key={i} fill={COLORS[i]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                            </div>

                            {/* BAR CHART */}
                            <div className="bg-white p-5 rounded-2xl shadow mb-8">
                                <h3 className="font-semibold mb-3">Team Performance</h3>

                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={barData}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="tasks" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>


                    }
                    {/* PROJECT CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {Projects?.map((p: any, i: any) => (
                            <>

                                <div
                                    key={i}
                                    className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
                                    onClick={()=>handelProjectDetaile(p)}
                                >

                                    <h2 className="text-xl font-bold text-gray-800">
                                        {p?.projectName}
                                    </h2>

                                    <p className="text-gray-500 text-sm mt-1">
                                        {/* {p.?desc} */}
                                        {p?.description}
                                    </p>

                                    <span className={`inline-block mt-3 px-3 py-1 text-xs rounded-full
                ${p?.status === "Completed"
                                            ? "bg-green-100 text-green-600"
                                            : p?.status === "Active"
                                                ? "bg-blue-100 text-blue-600"
                                                : "bg-yellow-100 text-yellow-600"
                                        }`}
                                    >
                                        {p?.status}
                                    </span>

                                    {/* PROGRESS */}
                                    <div className="mt-4">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Progress</span>
                                            <span>{p?.progress}%</span>
                                        </div>

                                        <div className="w-full bg-gray-200 h-2 rounded-full">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full"
                                                style={{ width: `${p?.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* FOOTER */}
                                    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <FaUsers />{p?.totalMember || 0} members
                                        </span>
                                        <span>Due: {new Date(p?.endDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </main>
            </div>
            {Open &&
                <AddTaskForm onclick={handelOpenTaskForm}></AddTaskForm>
            }
        </>

    );
}

export default Projects;



function KpiCard({ title, value }: Kipcard) {
    return (
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
            <p className="text-gray-500 text-sm">{title}</p>
            <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
        </div>
    );
}