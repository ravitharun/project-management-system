import {
    FaPlusCircle,
    FaTasks,
    FaMoneyBill,
    FaCheckCircle,
} from "react-icons/fa";

import bgthemeContext from "../Context/ThemeContext";
import { useContext } from "react";

function RecentActivity() {
    const context = useContext(bgthemeContext)
    const { theme }: any = context;

    const activities = [
        {
            text: "Ravi created new project",
            icon: <FaPlusCircle />,
            status: "green",
            statusTitle: "Completed"
        },
        {
            text: "Task assigned to team",
            icon: <FaTasks />,
            status: "blue",
            statusTitle: "In Progress"
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
            statusTitle: "Completed"
        },
        {
            text: "New task added",
            icon: <FaTasks />,
            status: "blue",
            statusTitle: "In Progress"
        },
        {
            text: "Deployment successful",
            icon: <FaCheckCircle />,
            status: "green",
            statusTitle: "Completed"
        },
    ];

    const statusColor: any = {
        green: {
            dot: "bg-green-500",
            card: theme === "Dark"
                ? "bg-green-500/10 border-green-500/20"
                : "bg-green-50 border-green-100"
        },

        blue: {
            dot: "bg-blue-500",
            card: theme === "Dark"
                ? "bg-blue-500/10 border-blue-500/20"
                : "bg-blue-50 border-blue-100"
        },

        yellow: {
            dot: "bg-yellow-500",
            card: theme === "Dark"
                ? "bg-yellow-500/10 border-yellow-500/20"
                : "bg-yellow-50 border-yellow-100"
        },
    };

    return (

        <div
            className={`
                rounded-2xl transition-all duration-300
                ${theme === "Dark"
                    ? "text-white"
                    : "text-gray-900"
                }
            `}
        >

            <h2
                className={`
                    font-bold text-lg mb-5
                    ${theme === "Dark"
                        ? "text-white"
                        : "text-gray-900"
                    }
                `}
            >
                Recent Activity
            </h2>

            <ul className="space-y-4">

                {activities.map((item, index) => (

                    <li
                        key={index}
                        className={`
                            relative flex items-start gap-4
                            p-4 rounded-2xl border
                            transition-all duration-300
                            hover:scale-[1.01]
                            ${statusColor[item.status].card}
                        `}
                    >

                        {/* TIMELINE */}

                        <div className="relative flex flex-col items-center">

                            {/* LIVE DOT */}

                            <span
                                className={`
                                    w-3 h-3 rounded-full animate-pulse
                                    ${statusColor[item.status].dot}
                                `}
                                title={item.statusTitle}
                            ></span>

                            {/* LINE */}

                            {index !== activities.length - 1 && (

                                <span
                                    className={`
                                        absolute top-4 w-[2px] h-16
                                        ${theme === "Dark"
                                            ? "bg-gray-700"
                                            : "bg-gray-200"
                                        }
                                    `}
                                ></span>

                            )}

                        </div>

                        {/* ICON */}

                        <div
                            className={`
                                w-11 h-11 rounded-xl
                                flex items-center justify-center
                                text-lg shrink-0
                                ${theme === "Dark"
                                    ? "bg-white/5"
                                    : "bg-white shadow-sm"
                                }
                            `}
                        >
                            {item.icon}
                        </div>

                        {/* TEXT */}

                        <div className="flex-1">

                            <p
                                className={`
                                    text-sm font-medium
                                    ${theme === "Dark"
                                        ? "text-gray-200"
                                        : "text-gray-700"
                                    }
                                `}
                            >
                                {item.text}
                            </p>

                            <span
                                className={`
                                    inline-block mt-2 text-xs px-3 py-1 rounded-full
                                    ${theme === "Dark"
                                        ? "bg-black/20 text-gray-300"
                                        : "bg-white text-gray-600 border"
                                    }
                                `}
                            >
                                {item.statusTitle}
                            </span>

                        </div>

                    </li>

                ))}

            </ul>

        </div>
    );
}

export default RecentActivity;