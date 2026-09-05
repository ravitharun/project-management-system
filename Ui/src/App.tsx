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




function App() {

  const sidebaropen: any = useContext(SideBarContext);
  const context = useContext(bgthemeContext);

  const { theme }: any = context;

  const [_, setIsdelay] = useState(false)



  const handelPoup = () => {

    setIsdelay((prev) => !prev)
  }





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

          </main>
        </div>
      </div>
    </>
  )
}

export default App
