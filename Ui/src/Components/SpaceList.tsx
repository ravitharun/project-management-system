import { useContext, useState } from "react";
import { FaListUl } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import Button from "./Button";
import ViewTask from "./ViewTask";
import bgthemeContext from "../Context/ThemeContext";
import MyTable from "./MyTable";

function SpaceList() {
    const contexttheme = useContext(bgthemeContext)
    const { theme }: any = contexttheme
    console.log(theme, 'theme')

    const [CurrentView, setCurrentView] = useState("grid");

    const TaskListView = [
        {
            id: 1,
            title: "Frontend Dashboard",
            desc: "React + Tailwind Workspace UI",
        },
        {
            id: 2,
            title: "Backend API",
            desc: "Node.js + Express Server",
        },
        {
            id: 3,
            title: "Socket Connection",
            desc: "Realtime Collaboration Feature",
        },
        {
            id: 4,
            title: "Workspace Theme",
            desc: "Dark and Light Theme Setup",
        },
    ];

    return (
        <>

            {/* ================= TOPBAR ================= */}
            <div className="flex items-center justify-between mb-5">



                {/* TOGGLE BUTTON */}
                <div
                    className={`
                        flex items-center gap-1 px-1.5 py-1 rounded-lg border w-fit

                        ${theme === "Dark"
                            ? "border-gray-700 bg-[#111827] text-white"
                            : "border-gray-300 bg-white text-black"
                        }
                    `}
                >

                    {/* GRID */}
                    <Button
                        type="button"
                        title="Grid View"
                        classaName={`
                            p-1.5 rounded-md transition-all duration-200

                            ${CurrentView === "grid"
                                ? theme === "Dark"
                                    ? "text-blue-400"
                                    : "text-blue-600"
                                : theme === "Dark"
                                    ? "text-gray-400 hover:text-white"
                                    : "text-gray-500 hover:text-black"
                            }
                        `}
                        OnclickEvent={() => setCurrentView("grid")}
                        Icon={
                            <MdGridView className="text-[14px] sm:text-[16px]" />
                        }
                    />

                    {/* LIST */}
                    <Button
                        type="button"
                        title="List View"
                        classaName={`
                            p-1.5 rounded-md transition-all duration-200

                            ${CurrentView === "list"
                                ? theme === "Dark"
                                    ? "text-blue-400"
                                    : "text-blue-600"
                                : theme === "Dark"
                                    ? "text-gray-400 hover:text-white"
                                    : "text-gray-500 hover:text-black"
                            }
                        `}
                        OnclickEvent={() => setCurrentView("list")}
                        Icon={
                            <FaListUl className="text-[12px] sm:text-[14px]" />
                        }
                    />

                </div>

            </div>

            {CurrentView === "list" && (

                <>

                    <MyTable theme={theme}></MyTable>
                </>
            )}


            {CurrentView === 'grid' &&


                <div
                    className={`
    w-full max-w-[1000px]
    rounded-[28px] border overflow-hidden
    flex flex-col lg:flex-row
    shadow-[0_10px_40px_rgba(0,0,0,0.06)]
    min-h-screen lg:min-h-[560px]

    ${theme === "Dark"
                            ? "bg-[#0f172a] border-white/10"
                            : "bg-white border-gray-200"
                        }
  `}
                >

                    {/* ================= LEFT PANEL ================= */}
                    <div
                        className={`
      w-full lg:w-[350px] xl:w-[380px]
      lg:h-[560px]
      max-h-[40vh] lg:max-h-none
      overflow-y-auto lg:border-r shrink-0

      ${theme === "Dark"
                                ? "bg-[#0b1220] border-white/10"
                                : "bg-gray-50/80 border-gray-200"
                            }
    `}
                    >

                        {/* Header */}
                        <div
                            className={`
        sticky top-0 z-10 px-4 sm:px-5 py-3 sm:py-4 border-b backdrop-blur-md
        ${theme === "Dark"
                                    ? "bg-[#0b1220]/95 border-white/10"
                                    : "bg-white/90 border-gray-200"
                                }
      `}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <h2 className={`text-sm font-semibold ${theme === "Dark" ? "text-white" : "text-gray-900"}`}>
                                        Workspaces
                                    </h2>
                                    <p className={`text-xs mt-1 truncate ${theme === "Dark" ? "text-gray-400" : "text-gray-500"}`}>
                                        Manage active project spaces
                                    </p>
                                </div>

                                <button
                                    className={`
            h-9 px-3.5 rounded-xl text-xs font-medium shrink-0
            ${theme === "Dark"
                                            ? "bg-white/10 text-white hover:bg-white/15"
                                            : "bg-gray-900 text-white hover:bg-black"
                                        }
          `}
                                >
                                    + New
                                </button>
                            </div>
                        </div>

                        {/* List */}
                        <div className="p-3 sm:p-4 space-y-3">
                            {TaskListView.map((itm, index) => (
                                <div
                                    key={itm.id}
                                    className={`
            rounded-2xl border p-3 sm:p-4 cursor-pointer transition-all duration-200
            hover:-translate-y-0.5

            ${index === 0
                                            ? theme === "Dark"
                                                ? "bg-[#111c2e] border-blue-500/30"
                                                : "bg-blue-50 border-blue-200"
                                            : theme === "Dark"
                                                ? "bg-white/[0.03] border-white/10 hover:bg-white/[0.05]"
                                                : "bg-white border-gray-200 hover:bg-gray-50"
                                        }
          `}
                                >

                                    <div className="flex items-start gap-3">
                                        {/* Icon */}
                                        <div
                                            className={`
                w-10 h-10 sm:w-11 sm:h-11 rounded-2xl shrink-0
                flex items-center justify-center text-base
                ${index === 0
                                                    ? "bg-gradient-to-br from-blue-500 to-cyan-400 text-white"
                                                    : theme === "Dark"
                                                        ? "bg-[#1e293b] text-gray-200"
                                                        : "bg-gray-100 text-gray-700"
                                                }
              `}
                                        >
                                            📁
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0">
                                                    <h3 className={`text-sm font-semibold truncate ${theme === "Dark" ? "text-white" : "text-gray-900"}`}>
                                                        {itm.title}
                                                    </h3>
                                                    <p className={`text-xs mt-1 line-clamp-2 ${theme === "Dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                        {itm.desc}
                                                    </p>
                                                </div>

                                                <span className={`
                  text-[10px] px-2 py-1 rounded-full shrink-0
                  ${theme === "Dark"
                                                        ? "bg-green-500/15 text-green-400"
                                                        : "bg-green-100 text-green-700"
                                                    }
                `}>
                                                    Active
                                                </span>
                                            </div>

                                            {/* tags */}
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                <span className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-300">
                                                    React
                                                </span>
                                                <span className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-300">
                                                    Tailwind
                                                </span>
                                                <span className="text-[10px] px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                                    UI
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ================= RIGHT PANEL ================= */}
                    <ViewTask theme={theme}></ViewTask>
                </div>


            }
        </>
    );
}

export default SpaceList;