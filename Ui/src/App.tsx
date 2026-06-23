import { useContext } from "react";

import SideBarContext from "./Context/SideBard";
import bgthemeContext from "./Context/ThemeContext";
import Sidebar from "./Components/Navbar";
import ViewWorkspace from "./Components/Task/TaskBoard/ViewWorkspace";




function App() {

  const sidebar = useContext(SideBarContext);
  const context = useContext(bgthemeContext);

  const { theme }: any = context;
  return (
    <>
      <div
        className={`
          min-h-screen w-full overflow-hidden
          ${theme === "Dark"
            ? "bg-[#020817]"
            : "bg-[#f4f6fb]"
          }
          `}
      >
        {/* SIDEBAR */}
        <Sidebar page="For You" />

        {/* MAIN */}
        <div
          className={`
            transition-all duration-300
            min-h-screen w-full
            pt-[72px]
            
            ${sidebar?.issidebaropen
              ? "md:ml-[260px]"
              : "md:ml-[88px]"
            }
            `}
        >
          {/* <main className="flex-1 overflow-hidden"> */}
          <main className=" w-full overflow-y-auto">
            <ViewWorkspace theme={theme} />


          </main>            </div>

      </div>
    </>
  )
}

export default App