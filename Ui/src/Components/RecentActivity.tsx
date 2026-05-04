import {
    FaPlusCircle,
    FaTasks,
    FaMoneyBill,
    FaCheckCircle,
} from "react-icons/fa";

function RecentActivity() {
    const activities = [
        {
            text: "Ravi created new project",
            icon: <FaPlusCircle />,
            status: "green",
            statusTitle: "complted"
        },
        {
            text: "Task assigned to team",
            icon: <FaTasks />,
            status: "blue",
            statusTitle: "In progress"
        },
        {
            text: "Budget updated for LMS",
            icon: <FaMoneyBill />,
            status: "yellow",
            statusTitle: "Pending"
        },
        {
            text: "Project marked completed",
            icon: <FaCheckCircle />,
            status: "green",
            statusTitle: "completed"
        },
        {
            text: "New task added",
            icon: <FaTasks />,
            status: "blue",
            statusTitle: "In progress"
        },
        {
            text: "Deployment successful",
            icon: <FaCheckCircle />,
            status: "green",
            statusTitle: "completed"
        },
    ];

    const statusColor:any = {
        green: "bg-green-500",
        blue: "bg-blue-500",
        yellow: "bg-yellow-500",
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">

            <h2 className="font-bold text-lg mb-4 text-gray-800">
                Recent Activity
            </h2>

            <ul className="space-y-4">

                {activities.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-start gap-3 text-sm text-gray-600 hover:text-gray-900 transition"
                    >

                        {/* LIVE DOT + ICON */}
                        <div className="relative flex items-center">

                            {/* live dot */}
                            <span
                                className={`w-2.5 h-2.5 rounded-full ${statusColor[item.status]} animate-pulse`}
                                title={item.statusTitle}
                            ></span>

                            {/* vertical line (timeline effect) */}
                            {index !== activities.length - 1 && (
                                <span className="absolute top-4 left-1.5 w-px h-full bg-gray-200"></span>
                            )}
                        </div>

                        {/* ICON */}
                        <span className="text-lg text-gray-700">
                            {item.icon}
                        </span>

                        {/* TEXT */}
                        <span>{item.text}</span>

                    </li>
                ))}

            </ul>
        </div>
    );
}

export default RecentActivity;