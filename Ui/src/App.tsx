import { useContext, useState } from "react";

import SideBarContext from "./Context/SideBard";
import bgthemeContext from "./Context/ThemeContext";
import Sidebar from "./Components/Navbar";
import ViewWorkspace from "./Components/Task/TaskBoard/ViewWorkspace";
import { getuserInfo } from "./Components/LocalStorage";
import AcceptGoogleCalendar from "./Components/AcceptGoogleCalndra";

import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "sonner";
import { ReactGanttChart, type Task } from "@jaeungkim/gantt-chart";


function App() {

  const sidebaropen: any = useContext(SideBarContext);
  const context = useContext(bgthemeContext);

  const { theme }: any = context;

  const [_, setIsdelay] = useState(false)



  const handelPoup = () => {

    setIsdelay((prev) => !prev)
  }


  const tasks: Task[] = [
    {
      id: "1",
      name: "Project Kickoff",
      startDate: "2026-08-28T09:00:00Z",
      endDate: "2026-09-03T17:00:00Z",
      parentId: null,
      sequence: "1",
      dependencies: [],
    },
    {
      id: "2",
      name: "Requirements Gathering",
      startDate: "2026-09-04T09:00:00Z",
      endDate: "2026-09-10T17:00:00Z",
      parentId: null,
      sequence: "2",
      dependencies: [
        {
          targetId: "1",
          type: "FS",
        },
      ],
    },
  ];


  return (
    <>
      <SpeedInsights />
      <Analytics />
      <Toaster closeButton />

      {!JSON.parse(getuserInfo).googleCalendarConnected ? (
        <AcceptGoogleCalendar setOpen={handelPoup} />
      ) : null}

      <div
        className={`min-h-screen w-full overflow-hidden ${theme === "Dark"
          ? "bg-[#020817]"
          : "bg-[#f4f6fb]"
          }`}
      >
        {/* SIDEBAR */}
        <Sidebar page="For You" />

        {/* MAIN */}
        <div
          className={`
                min-h-screen w-full pt-[72px]
                transition-all duration-300
                ${sidebaropen.sidebaropen
              ? "md:ml-[260px]"
              : "md:ml-[88px]"
            }
            `}
        >
          <main className="w-full overflow-y-auto">

            {/* Workspace / Header */}
            <ViewWorkspace />

            <div
              className={`w-full min-w-0 p-6 ${theme === "Dark"
                  ? "bg-[#020817]"
                  : "bg-[#f4f6fb]"
                }`}
            >
              <div className="w-full min-w-0 overflow-x-auto">
                <ReactGanttChart
                  tasks={tasks}
                  height={600}
                  width="100%"
                  theme={theme === "Dark" ? "dark" : "light"}
                  defaultScale="month"
                  onTasksChange={(updated) => {
                    console.log("Tasks updated:", updated);
                  }}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default App
