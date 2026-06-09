import { useContext, useState } from "react";
import { FaListUl } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import Button from "../../Button";
import ViewTask from "./ViewTask";
import bgthemeContext from "../../../Context/ThemeContext";
import MyTable from "./MyTable";
import { FiChevronLeft, FiChevronRight, FiGrid } from "react-icons/fi";

function SpaceList() {
    // console.log(ismaxAndMin,'space list')
    const contexttheme = useContext(bgthemeContext)
    const { theme }: any = contexttheme
    console.log(theme, 'theme')

    const [CurrentView, setCurrentView] = useState("grid");
    const [isworkspace, setisworkspace] = useState(true)
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
          p-1.5 rounded-md

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
                        Icon={<MdGridView className="text-[14px] sm:text-[16px]" />}
                    />

                    {/* LIST */}
                    <Button
                        type="button"
                        title="List View"
                        classaName={`
          p-1.5 rounded-md

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
                        Icon={<FaListUl className="text-[12px] sm:text-[14px]" />}
                    />

                </div>

            </div>

            {/* ================= LIST VIEW ================= */}
            {CurrentView === "list" && <MyTable theme={theme} />}

            {/* ================= GRID VIEW ================= */}
            {CurrentView === "grid" && (

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
                    {/* ================= LEFT PANEL (RESPONSIVE FIX) ================= */}
                    <div className="flex">

      {/* ================= SIDEBAR ================= */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          h-full lg:h-[560px]
          overflow-hidden

          ${isworkspace ? "w-[260px]" : "w-[60px]"}
          lg:block

          ${theme === "Dark"
            ? "bg-[#0b1220] border-white/10"
            : "bg-white border-gray-200"
          }
          border-r
        `}
      >

        {/* HEADER */}
        <div
          className={`
            flex items-center justify-between p-3 border-b
            ${theme === "Dark" ? "border-white/10" : "border-gray-200"}
          `}
        >

          {/* TITLE OR ICON ONLY */}
          {isworkspace && (
            <h2 className="text-xs font-semibold">Workspaces</h2>
          )}

          {/* TOGGLE BUTTON */}
          <button
            onClick={() => setisworkspace((prev) => !prev)}
            className={`
              p-1.5 rounded-md
              ${theme === "Dark"
                ? "bg-white/10 text-white"
                : "bg-gray-100 text-gray-800"
              }
            `}
          >
            {isworkspace ? <FiChevronLeft /> : <FiChevronRight    />}
          </button>
        </div>

        {/* ================= LIST ================= */}
        <div className="p-2 space-y-2">

          {TaskListView.map((itm, index) => (
            <div
              key={itm.id}
              className={`
                flex items-center gap-2 rounded-lg cursor-pointer
                px-2 py-2 transition-all

                ${isworkspace ? "justify-start" : "justify-center"}

                ${
                  index === 0
                    ? theme === "Dark"
                      ? "bg-white/10"
                      : "bg-blue-50"
                    : theme === "Dark"
                    ? "hover:bg-white/5"
                    : "hover:bg-gray-100"
                }
              `}
            >

              {/* ICON */}
              <div
                className={`
                  w-8 h-8 rounded-md flex items-center justify-center text-xs shrink-0
                  ${
                    index === 0
                      ? "bg-blue-500 text-white"
                      : theme === "Dark"
                      ? "bg-white/10 text-gray-300"
                      : "bg-gray-200 text-gray-700"
                  }
                `}
              >
                <FiGrid />
              </div>

              {/* TEXT (ONLY WHEN OPEN) */}
              {isworkspace && (
                <p
                  className={`text-xs truncate ${
                    theme === "Dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {itm.title}
                </p>
              )}

            </div>
          ))}

        </div>
      </div>

      {/* ================= RIGHT CONTENT ================= */}
      <div className="flex-1 p-4">
        {/* your main content here */}
      </div>

    </div>


                    {/* ================= RIGHT PANEL ================= */}
                    <div className="flex-1 min-w-0">
                        <ViewTask theme={theme} />
                    </div>

                </div>
            )}

        </>
    );
}

export default SpaceList;