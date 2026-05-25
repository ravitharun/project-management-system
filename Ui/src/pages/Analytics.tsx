import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    LineChart,
    Line,
    AreaChart,
    Area,
    RadialBarChart,
    RadialBar,
    Legend,
} from "recharts";

import {
    CheckCircle2,
    Clock3,

    Users,
    DollarSign,
    Bell,
    CalendarDays,
    TrendingUp,
    Activity,
    // Sidebar,
} from "lucide-react";
import Sidebar from "../Components/Navbar"
import Card from "../Components/Card";
import { useEffect, useState } from "react";
import { instance } from "../services/apiservices";
import {  FaCheckCircle, FaMoneyBillWave, FaProjectDiagram, FaTasks } from "react-icons/fa";

function Analytics() {

    const [Stats, setStats] = useState<any>([])


    const pieData: any[] = [
        { name: "Completed", value: 12 },
        { name: "Pending", value: 7 },
        { name: "In Progress", value: 5 },
    ];

    const COLORS = ["#22c55e", "#eab308", "#8b5cf6"];

    const priorityData: any[] = [
        { name: "High", projects: 8 },
        { name: "Medium", projects: 10 },
        { name: "Low", projects: 6 },
    ];

    const monthlyData: any[] = [
        { month: "Jan", projects: 4 },
        { month: "Feb", projects: 6 },
        { month: "Mar", projects: 8 },
        { month: "Apr", projects: 5 },
        { month: "May", projects: 10 },
        { month: "Jun", projects: 7 },
    ];

    const budgetData: any[] = [
        { month: "Jan", budget: 4000 },
        { month: "Feb", budget: 7000 },
        { month: "Mar", budget: 5000 },
        { month: "Apr", budget: 9000 },
        { month: "May", budget: 11000 },
    ];

    const radialData: any[] = [
        {
            name: "Progress",
            value: 75,
            fill: "#3b82f6",
        },
    ];

    const teamData: any[] = [
        { name: "Ravi", tasks: 22 },
        { name: "Alex", tasks: 16 },
        { name: "John", tasks: 10 },
    ];

    const recentProjects :any[]= [
        {
            name: "LMS Website",
            status: "Completed",
            progress: 100,
        },
        {
            name: "Project Management App",
            status: "In Progress",
            progress: 75,
        },
        {
            name: "Movie Platform",
            status: "Pending",
            progress: 35,
        },
    ];

    const activities = [
        "New project created",
        "Task completed successfully",
        "Budget updated",
        "New team member joined",
    ];


    useEffect(() => {
        const FetchAna = async () => {
            try {
                const response = await instance.get("/api/Analytcs/")

                setStats(response.data.message)

            } catch (error: any) {
                console.log(error)

            }
        }
        FetchAna()
    }, [])
    console.log(Stats, 'Stats')

    return (
        <>



            <div className="flex h-screen bg-gray-100">

                {/* SIDEBAR */}
                <Sidebar page="Analytics" />
                {/* MAIN CONTENT */}
                <main className="flex-1 p-6 overflow-y-auto">

                    {/* HEADER */}
                    <div className="min-h-screen bg-gray-100 p-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-800">
                                        Analytics Dashboard
                                    </h1>
                                    <p className="text-gray-500 mt-2">
                                        Project Management Analytics Overview
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button className="relative bg-white p-3 rounded-2xl shadow-md">
                                        <Bell className="w-6 h-6 text-gray-700" />
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                            3
                                        </span>
                                    </button>

                                    <button className="bg-blue-500 text-white px-5 py-3 rounded-2xl shadow-md hover:bg-blue-600 transition">
                                        Export Report
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                <Card
                                    icon={<FaProjectDiagram className="text-blue-500 text-2xl" />}
                                    title="Total Projects"
                                    value={Stats?.FetchProjects || 0}
                                />

                                <Card
                                    icon={<FaTasks className="text-green-500 text-2xl" />}
                                    title="Total Task"
                                    value={Stats?.fetchTask || 0}
                                />

                                <Card
                                    icon={<FaMoneyBillWave className="text-yellow-500 text-2xl" />}
                                    title="Total Revenue"
                                    value={Stats?.TotalRevenue?.toLocaleString() || 0}
                                />

                            

                                {Stats?.projectstatus?.map((itm:any, idx:any) => (
                                    <Card
                                        key={idx}
                                        icon={<FaCheckCircle className="text-red-500 text-2xl" />}
                                        title={`Project Status ${itm._id}`}
                                        value={itm.total}
                                    />
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white rounded-3xl shadow-md p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold">Project Status</h2>
                                        <Activity className="text-blue-500" />
                                    </div>

                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                dataKey="value"
                                                outerRadius={110}
                                                innerRadius={60}
                                                paddingAngle={5}
                                            >
                                                {pieData.map((index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={COLORS[index % COLORS.length]}
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="bg-white rounded-3xl shadow-md p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold">Priority Analytics</h2>
                                        <TrendingUp className="text-green-500" />
                                    </div>

                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={priorityData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="projects" fill="#3b82f6" radius={[10, 10, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white rounded-3xl shadow-md p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold">Monthly Growth</h2>
                                        <CalendarDays className="text-purple-500" />
                                    </div>

                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={monthlyData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line
                                                type="monotone"
                                                dataKey="projects"
                                                stroke="#8b5cf6"
                                                strokeWidth={4}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="bg-white rounded-3xl shadow-md p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold">Budget Analytics</h2>
                                        <DollarSign className="text-emerald-500" />
                                    </div>

                                    <ResponsiveContainer width="100%" height={300}>
                                        <AreaChart data={budgetData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Area
                                                type="monotone"
                                                dataKey="budget"
                                                stroke="#10b981"
                                                fill="#6ee7b7"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white rounded-3xl shadow-md p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold">Project Completion</h2>
                                        <CheckCircle2 className="text-blue-500" />
                                    </div>

                                    <ResponsiveContainer width="100%" height={300}>
                                        <RadialBarChart
                                            cx="50%"
                                            cy="50%"
                                            innerRadius="30%"
                                            outerRadius="100%"
                                            barSize={18}
                                            data={radialData}
                                        >
                                            <RadialBar dataKey="value" />
                                            <Legend />
                                            <Tooltip />
                                        </RadialBarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="bg-white rounded-3xl shadow-md p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold">Team Performance</h2>
                                        <Users className="text-pink-500" />
                                    </div>

                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={teamData} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis type="number" />
                                            <YAxis dataKey="name" type="category" />
                                            <Tooltip />
                                            <Bar dataKey="tasks" fill="#ec4899" radius={[0, 10, 10, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white rounded-3xl shadow-md p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold">Recent Activity</h2>
                                        <Activity className="text-orange-500" />
                                    </div>

                                    <div className="space-y-4">
                                        {activities.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl"
                                            >
                                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                                <p className="text-gray-700">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl shadow-md p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold">Upcoming Deadlines</h2>
                                        <Clock3 className="text-red-500" />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-red-50 p-4 rounded-2xl flex justify-between">
                                            <div>
                                                <h3 className="font-semibold">ERP Dashboard</h3>
                                                <p className="text-sm text-gray-500">Due Tomorrow</p>
                                            </div>
                                            <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm">
                                                High
                                            </span>
                                        </div>

                                        <div className="bg-yellow-50 p-4 rounded-2xl flex justify-between">
                                            <div>
                                                <h3 className="font-semibold">AI Project</h3>
                                                <p className="text-sm text-gray-500">Due in 3 Days</p>
                                            </div>
                                            <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm">
                                                Medium
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-md p-6 overflow-x-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold">Recent Projects</h2>

                                    <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-xl">
                                        View All
                                    </button>
                                </div>

                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b text-left text-gray-500">
                                            <th className="pb-4">Project Name</th>
                                            <th className="pb-4">Status</th>
                                            <th className="pb-4">Progress</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {recentProjects.map((project, index) => (
                                            <tr
                                                key={index}
                                                className="border-b hover:bg-gray-50 transition"
                                            >
                                                <td className="py-5 font-medium">{project.name}</td>

                                                <td>
                                                    <span
                                                        className={`px-4 py-1 rounded-full text-sm text-white ${project.status === "Completed"
                                                            ? "bg-green-500"
                                                            : project.status === "Pending"
                                                                ? "bg-yellow-500"
                                                                : "bg-purple-500"
                                                            }`}
                                                    >
                                                        {project.status}
                                                    </span>
                                                </td>

                                                <td className="w-72">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                                            <div
                                                                className="bg-blue-500 h-full rounded-full"
                                                                style={{ width: `${project.progress}%` }}
                                                            ></div>
                                                        </div>

                                                        <p className="text-sm font-medium">
                                                            {project.progress}%
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>

            </div>

        </>

    );
}

export default Analytics;
