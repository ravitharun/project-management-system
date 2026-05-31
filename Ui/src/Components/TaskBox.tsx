import { FaTasks } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { BsFlagFill } from "react-icons/bs";
import { useContext } from "react";
import bgthemeContext from "../Context/ThemeContext";

type TaskBoxProps = {
    title: string;
    count: number;
};

export default function TaskBox({ title, count }: TaskBoxProps) {
    const context = useContext(bgthemeContext)
    const { theme }: any = context;

    const getIcon = () => {

        switch (title) {

            case "High":
                return <BsFlagFill className="text-2xl text-red-500" />;

            case "Medium":
                return <MdPendingActions className="text-2xl text-orange-500" />;

            case "Low":
                return <IoCheckmarkDoneCircle className="text-2xl text-green-500" />;

            default:
                return <FaTasks className="text-2xl text-blue-500" />;
        }
    };

    const getBg = () => {

        switch (title) {

            case "High":
                return theme === "Dark"
                    ? "bg-red-500/10 border-red-500/20"
                    : "bg-red-50 border-red-100";

            case "Medium":
                return theme === "Dark"
                    ? "bg-orange-500/10 border-orange-500/20"
                    : "bg-orange-50 border-orange-100";

            case "Low":
                return theme === "Dark"
                    ? "bg-green-500/10 border-green-500/20"
                    : "bg-green-50 border-green-100";

            default:
                return theme === "Dark"
                    ? "bg-blue-500/10 border-blue-500/20"
                    : "bg-blue-50 border-blue-100";
        }
    };

    return (

        <div
            className={`
                rounded-2xl border p-4
                transition-all duration-300
                hover:scale-[1.02]
                ${getBg()}
            `}
        >

            <div className="flex items-center justify-between">

                {/* LEFT */}

                <div>

                    <h3
                        className={`
                            text-sm font-medium
                            ${theme === "Dark"
                                ? "text-gray-300"
                                : "text-gray-600"
                            }
                        `}
                    >
                        Task {title} Total
                    </h3>

                    <p
                        className={`
                            text-3xl font-bold mt-2
                            ${theme === "Dark"
                                ? "text-white"
                                : "text-gray-900"
                            }
                        `}
                    >
                        {count}
                    </p>

                </div>

                {/* RIGHT ICON */}

                <div
                    className={`
                        w-14 h-14 rounded-2xl
                        flex items-center justify-center
                        backdrop-blur-md
                        ${theme === "Dark"
                            ? "bg-white/5"
                            : "bg-white"
                        }
                    `}
                >
                    {getIcon()}
                </div>

            </div>

        </div>
    );
}