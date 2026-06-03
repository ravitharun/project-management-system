import { useContext } from "react";
import SideBarContext from "../../Context/SideBard";
import bgthemeContext from "../../Context/ThemeContext";
import Sidebar from "../../Components/Navbar";
import ViewWorkspace from "../../Components/ViewWorkspace";



function Dashboard() {
    const sidebar = useContext(SideBarContext);
    console.log(sidebar?.issidebaropen, 'sidebar')
    const context = useContext(bgthemeContext)
    const { theme }: any = context;
    return (
        <>

            {/* ligth */}
            <div className={`${theme == "Dark" ? "bg-[#0b1120]" : "bg-[#f3f3f4]"}  overflow-x-hidden
    overflow-y-auto mt-5`}>



                {/* ================= SIDEBAR ================= */}

                <Sidebar page="Dashboard" />

                {/* ================= MAIN WRAPPER ================= */}

                <div
                    className={`
        transition-all duration-300
        pt-16 min-h-screen

        ${sidebar?.issidebaropen
                            ? "md:ml-[270px]"
                            : "md:ml-[88px]"
                        }
    `}
                >




                    {/* ================= CONTENT ================= */}

                    <main className="p-4 md:p-8">

                        <ViewWorkspace theme={theme}></ViewWorkspace>

                    </main>

                </div >

            </div >


        </>
    );
}

export default Dashboard;







