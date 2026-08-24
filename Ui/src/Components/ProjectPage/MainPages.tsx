

import {
    Activity,
    FileText,
    Rocket,
    Target,
    Users,
    Zap,
    ArrowRight,
    LayoutGrid,


} from "lucide-react";
import { useContext, useState } from "react";
import bgthemeContext from "../../Context/ThemeContext";
import ActivityPages from "./ActivityPages";
import DocumentPages from "./DocumentPages";
import RealesPages from "./RealesPages";
import MileStonespages from "./MileStonespages";
import Automation from "./Automation";
import WorkLoadPages from "./WorkLoadPages";
import Settings from "../Settings";

const pages = [
    {
        title: "Activity",
        description: "View project activity",
        icon: Activity,
        stats: [
            "24 Activities",
            "8 Tasks Updated",
            "5 Comments",
        ],
    },
    {
        title: "Documents",
        description: "Manage project documents",
        icon: FileText,
        stats: [
            "18 Documents",
            "12 Files",
            "6 Notes",
        ],
    },
    {
        title: "Releases",
        description: "Track project releases",
        icon: Rocket,
        stats: [
            "3 Releases",
            "1 In Progress",
            "5 Features",
        ],
    },
    {
        title: "Milestones",
        description: "Track important milestones",
        icon: Target,
        stats: [
            "6 Milestones",
            "3 Completed",
            "2 In Progress",
        ],
    },
    {
        title: "Workload",
        description: "View team workload",
        icon: Users,
        stats: [
            "8 Team Members",
            "32 Active Tasks",
            "72% Capacity",
        ],
    },
    {
        title: "Automation",
        description: "Automate repetitive tasks",
        icon: Zap,
        stats: [
            "8 Rules",
            "6 Active",
            "2 Disabled",
        ],
    },
    {
        title: "Show All",
        description: "View all project tools",
        icon: LayoutGrid,
        stats: [
            "11 Project Tools",
            "View All Pages",
            "Quick Access",
        ],
    },
];

const Pages = () => {


    const { theme }: any = useContext(bgthemeContext)
    const isTheme = theme === "Dark";



    const [Access, setaccess] = useState("Activity")
    console.log(Access, 'Access');


    return (
        <>


            <div
                className={`min-h-screen p-6 transition-colors ${isTheme
                    ? "bg-[#020817] text-gray-100"
                    : "bg-gray-50 text-gray-900"
                    }`}
            >

                {/* Header */}
                <div className="mb-6">
                    <h1
                        className={`text-2xl font-semibold ${isTheme ? "text-white" : "text-gray-900"
                            }`}
                    >
                        Pages
                    </h1>

                    <p
                        className={`mt-1 text-sm ${isTheme ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        Quick access to your project tools
                    </p>
                </div>


                {/* Page Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    {pages.map((page: any) => {
                        const Icon = page.icon;

                        return (
                            <div
                                key={page.title}
                                onClick={() => setaccess(page.title)}
                                className={`group cursor-pointer rounded-xl border p-5 transition-all hover:-translate-y-1 ${isTheme
                                    ? `bg-gray-900 ${Access == page.title
                                        ? "border-gray-500 shadow-lg shadow-black/20"
                                        : "border-gray-800 hover:border-gray-700"
                                    }`
                                    : `bg-white ${Access == page.title
                                        ? "border-gray-400 shadow-md"
                                        : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                                    }`
                                    }`}
                            >


                                {/* Icon */}
                                <div
                                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg ${isTheme
                                        ? "bg-gray-800"
                                        : "bg-gray-100"
                                        }`}
                                >
                                    <Icon
                                        size={21}
                                        className={
                                            isTheme
                                                ? "text-gray-200"
                                                : "text-gray-700"
                                        }
                                    />
                                </div>


                                {/* Content */}
                                <div className="flex items-center justify-between">

                                    <div>
                                        <h2
                                            className={`font-medium ${isTheme
                                                ? "text-white"
                                                : "text-gray-900"
                                                }`}
                                        >
                                            {page.title}
                                        </h2>

                                        <p
                                            className={`mt-1 text-sm ${isTheme
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                                }`}
                                        >
                                            {page.description}
                                        </p>
                                    </div>

                                    <ArrowRight
                                        size={18}
                                        className={`transition group-hover:translate-x-1 ${isTheme
                                            ? "text-gray-500 group-hover:text-white"
                                            : "text-gray-400 group-hover:text-gray-700"
                                            }`}
                                    />

                                </div>
                            </div>
                        );
                    })}



                </div>


                {/* ================= ACTIVITY ================= */}
                {Access == "Activity" &&
                    <ActivityPages isTheme={isTheme}></ActivityPages>
                }


                {/* ================= DOCUMENTS ================= */}
                {Access == "Documents" &&
                    <DocumentPages isTheme={isTheme}></DocumentPages>

                }
                {/* ================= RELEASES ================= */}
                {Access == "Releases" &&
                    <RealesPages isTheme={isTheme}></RealesPages>
                }
                {/* ================= MILESTONES ================= */}
                {Access == "Milestones" &&
                    <MileStonespages isTheme={isTheme}></MileStonespages>

                }

                {/* ================= WORKLOAD ================= */}
                {Access == "Workload" &&
                    <WorkLoadPages isTheme={isTheme}></WorkLoadPages>

                }
                {/* ================= AUTOMATION ================= */}
                {Access == "Automation" &&
                    <Automation isTheme={isTheme}></Automation>
                }


                {Access == "Show All" &&


                    <>


                        <ActivityPages isTheme={isTheme}></ActivityPages>
                        <DocumentPages isTheme={isTheme}></DocumentPages>
                        <RealesPages isTheme={isTheme}></RealesPages>
                        <MileStonespages isTheme={isTheme}></MileStonespages>
                        <WorkLoadPages isTheme={isTheme}></WorkLoadPages>
                        <Automation isTheme={isTheme}></Automation>


                    </>

                }
            </div>
        </>
    );
};

export default Pages;