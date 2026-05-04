import Card from "../../Components/Card";
import Sidebar from "../../Components/Navbar";
import {
    FaProjectDiagram,
    FaTasks,
    FaCheckCircle,
    FaClock,
    FaUsers,
    FaMoneyBill,
} from "react-icons/fa";
import TaskBox from "../../Components/TaskBox";
import ProgressBar from "../../Components/ProgressBar";
import RecentActivity from "../../Components/RecentActivity";

function Dashboard() {
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

                    <Card title="Projects" value="12" icon={<FaProjectDiagram />} />
                    <Card title="Tasks" value="48" icon={<FaTasks />} />
                    <Card title="Completed" value="30" icon={<FaCheckCircle />} />
                    <Card title="Pending" value="18" icon={<FaClock />} />
                    <Card title="Team" value="5" icon={<FaUsers />} />
                    <Card title="Budget" value="₹2L" icon={<FaMoneyBill />} />

                </div>

                {/* MIDDLE SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                    {/* PROJECT STATUS */}
                    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                        <h2 className="font-bold text-lg mb-4 text-gray-800">
                            Project Progress
                        </h2>

                        <ProgressBar name="E-Commerce App" percent={70} />
                        <ProgressBar name="LMS System" percent={40} />
                        <ProgressBar name="Portfolio Website" percent={90} />
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







