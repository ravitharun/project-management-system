import { useContext, useEffect, useState } from "react";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { CiMenuKebab } from "react-icons/ci";
// import summaryTemplates from "./Summary-Templates/TemplatesUi"
import {
    FaTachometerAlt,
    FaTasks,
    FaUsers,
    FaCalendarAlt,
    FaChartLine,
    FaBell,
    FaSignOutAlt,
    FaSignInAlt,
    FaLayerGroup,
    FaPlus,
    FaArrowCircleDown,
    FaArrowCircleRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { checkuser, Token } from "./LocalStorage";
// import { toast } from "react-toastify";
import SideBarContext from "../Context/SideBard";
import bgthemeContext from "../Context/ThemeContext";
import UserPanel from "./UserPanel";
import TemplatesUi from "./Summary-Templates/TemplatesUi";
import { fetchworkspace } from "../services/Workspaceapi";

type Props = {
    page: string;
};

export type theme = "Dark" | "Ligth"
function Sidebar({ page }: Props) {

    const [open, setOpen] = useState(false);
    const [isOpenPanelItems, setisOpenPanelItems] = useState<boolean>(false)
    const [issidebaropen, setisSidebaropen] = useState<boolean>(true)
    // const [Bigscreen, setBigscreen] = useState(true);
    const [openSpace, setOpenSpace] = useState(false);
    const [isworkspace, setisworkspace] = useState<boolean>(false)
    console.log(isworkspace, 'isworkspace')
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    // const [UserTheme, setusertheme] = useState<theme>('Dark')
    const menuItems = [
        { name: "Dashboard", icon: <FaTachometerAlt />, href: "/" },
        { name: "Space", icon: <FaLayerGroup />, href: "/projects" },
        { name: "Tasks", icon: <FaTasks />, href: "/Tasks" },
        { name: "Team", icon: <FaUsers />, href: "/Team" },
        { name: "Calendar", icon: <FaCalendarAlt />, href: "/Calendar" },
        { name: "Analytics", icon: <FaChartLine />, href: "/Analytics" },
    ];
    // const [space, setSpace] = useState<string[]>([]);
    const handelpoupSpace = () => { setisworkspace((prev) => !prev) }

    const sidebar = useContext(SideBarContext);
    sidebar?.setisSidebaropen(issidebaropen)
    const context = useContext(bgthemeContext)
    const { theme }: any = context;
    // fetchworkspace


    const [Workspace, setworkspace] = useState<any[]>([])

    useEffect(() => {
        const Fetchapi = async () => {

            try {

                const response = await fetchworkspace()
                console.log(response.data.data, 'response')
                setworkspace(response.data.data)
            } catch (error: any) {
                console.log(error)

            }
        }
        Fetchapi()
    }, [])


    // Sibar Fucntion open/close
    const HandelOpenCloseSideBar = () => {
        setisSidebaropen((prev) => !prev)
    }



    // const deleteWorkspace = (idx: number) => {
    //     setSpace(prev => prev.filter((_, i) => i !== idx));
    //     toast.success("Workspace Deleted");
    // };

    const [openproject, setopenProjects] = useState(false)
    // const navigate = useNavigate()
    const handelMenuOpen = (id: number) => {

        if (!id) {
            return
        }


        // navigate("/workspace/edit")
        setopenProjects(true)
        console.log(id, 'id')

    }
    return (

        <>
            {/* ================= NAVBAR ================= */}

            <div
                className={`
        fixed top-0 left-0 right-0 h-16
        flex items-center justify-between
        px-4 z-50 border-b transition-all duration-300

        ${theme === "Dark"
                        ? "bg-[#111827] border-gray-800 text-white"
                        : "bg-white border-gray-200 text-gray-900 shadow-sm"
                    }
    `}
            >

                {/* LEFT */}

                <div className="flex items-center gap-3">

                    {/* MOBILE MENU */}

                    <button
                        onClick={() => setOpen(true)}
                        className={`
                md:hidden
                p-2 rounded-xl transition-all
                ${theme === "Dark"
                                ? "hover:bg-gray-800"
                                : "hover:bg-gray-100"
                            }
            `}
                    >
                        <LuPanelLeftOpen className="text-2xl" />
                    </button>

                    {/* DESKTOP SIDEBAR */}

                    <button
                        onClick={HandelOpenCloseSideBar}
                        className={`
                hidden md:flex
                p-2 rounded-xl transition-all
                ${theme === "Dark"
                                ? "hover:bg-gray-800"
                                : "hover:bg-gray-100"
                            }
            `}
                    >
                        {issidebaropen ? (
                            <LuPanelLeftClose className="text-2xl" title="Close The SideBar" />
                        ) : (
                            <LuPanelLeftOpen className="text-2xl" title="Open The SideBar" />
                        )}
                    </button>
                    <Link to="/">
                        <h1 className="font-bold text-lg tracking-wide">
                            Taskaro
                        </h1>
                    </Link>

                </div>

                {/* RIGHT */}

                <div className="flex items-center gap-3">

                    <button
                        className={`
                p-2 rounded-xl relative transition-all
                ${theme === "Dark"
                                ? "hover:bg-gray-800"
                                : "hover:bg-gray-100"
                            }
            `}
                    >

                        <FaBell className="text-lg" />

                        <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] px-1.5 py-[1px] rounded-full">
                            3
                        </span>

                    </button>

                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-semibold text-white" onClick={() => setisOpenPanelItems((prev) => !prev)} onMouseEnter={() => setisOpenPanelItems(true)} >

                        T
                    </div>


                    {isOpenPanelItems && <>



                        <UserPanel ></UserPanel>
                    </>}

                </div>

            </div>

            {/* ================= MOBILE OVERLAY ================= */}

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                />
            )}

            {/* ================= SIDEBAR ================= */}

            <aside
                className={`
        fixed top-16 left-0
        h-[calc(100vh-64px)]
        flex flex-col
        transition-all duration-300 z-50

        ${theme === "Dark"
                        ? "bg-[#111827] border-r border-gray-800 text-white"
                        : "bg-white border-r border-gray-200 text-gray-900"
                    }

        /* MOBILE */
        w-[270px]

        /* DESKTOP */
        ${issidebaropen ? "md:w-[270px]" : "md:w-[85px]"}

        ${open
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                    }
    `}
            >

                {/* ================= MENU ================= */}

                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2">

                    {menuItems.map((item, i) => (

                        <div key={i} className="space-y-1">

                            {/* MENU ITEM */}

                            <div
                                title={item.name}
                                className={`
                        flex items-center justify-between
                        gap-2 p-3 rounded-xl
                        cursor-pointer transition-all duration-200
                        

                        ${page === item.name
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : theme === "Dark"
                                            ? "hover:bg-gray-800"
                                            : "hover:bg-gray-100"
                                    }
                    `}
                                onClick={() => {
                                    // setOpen(true)

                                    if (item.name === "Space") {
                                        setOpenSpace(prev => !prev);
                                    } else {
                                        setOpen(false);
                                    }
                                }}
                            >

                                {/* LEFT */}

                                <Link
                                    to={item.name === "Space" ? "#" : item.href}
                                    className="flex items-center gap-3 flex-1 min-w-0"
                                >

                                    <span className="text-xl shrink-0">
                                        {item.icon}
                                    </span>

                                    {(issidebaropen || open) && (

                                        <span className="truncate text-sm md:text-base font-medium">
                                            {item.name}
                                        </span>

                                    )}

                                </Link>

                                {/* SPACE ACTIONS */}

                                {(issidebaropen || open) && item.name === "Space" && (

                                    <div className="flex items-center gap-3">

                                        <FaPlus
                                            className={`
                                    cursor-pointer text-xs transition-all
                                    ${theme === "Dark"
                                                    ? "text-gray-300 hover:text-blue-400"
                                                    : "text-gray-500 hover:text-blue-600"
                                                }
                                `}
                                            onClick={handelpoupSpace}
                                        />

                                        <span
                                            className={`
                                    text-sm
                                    ${theme === "Dark"
                                                    ? "text-gray-300"
                                                    : "text-gray-500"
                                                }
                                `}
                                        >

                                            {openSpace
                                                ? <FaArrowCircleDown />
                                                : <FaArrowCircleRight />
                                            }

                                        </span>

                                    </div>

                                )}

                            </div>

                            {/* ================= WORKSPACES ================= */}

                            {(issidebaropen || open) &&
                                item.name === "Space" &&
                                openSpace && (

                                    <div
                                        className={`
                                ml-8 mt-1 space-y-1 border-l pl-3
                                ${theme === "Dark"
                                                ? "border-gray-700"
                                                : "border-gray-300"
                                            }
                            `}
                                    >

                                        {Workspace.length === 0 ? (

                                            <div className="flex flex-col items-center justify-center py-8 text-center">

                                                <h2
                                                    className={`text-sm font-semibold ${theme === "Dark"
                                                        ? "text-white"
                                                        : "text-gray-900"
                                                        }`}
                                                >
                                                    No Workspace
                                                </h2>

                                                <p
                                                    className={`text-xs mt-1 ${theme === "Dark"
                                                        ? "text-gray-400"
                                                        : "text-gray-500"
                                                        }`}
                                                >
                                                    Create your first workspace
                                                </p>

                                                <button
                                                    onClick={() => setisworkspace(true)}
                                                    className="mt-3 bg-blue-600 hover:bg-blue-700 transition px-3 py-2 rounded-lg text-sm text-white"
                                                >
                                                    Create
                                                </button>

                                            </div>

                                        ) : (

                                            Workspace.map((itm: any, idx: number) => (

                                                <div
                                                    key={idx}
                                                    className={`
                                            group flex items-center justify-between
                                            px-2 py-2 rounded-lg transition-all

                                            ${theme === "Dark"
                                                            ? "hover:bg-gray-800"
                                                            : "hover:bg-gray-100"
                                                        }
                                        `}
                                                    onMouseEnter={() => setHoveredId(idx)}
                                                    onMouseLeave={() => setHoveredId(null)}
                                                >

                                                    <div className="flex items-center gap-2 min-w-0">

                                                        <FaLayerGroup
                                                            className={`
                                                    text-sm shrink-0
                                                    ${theme === "Dark"
                                                                    ? "text-gray-400"
                                                                    : "text-gray-500"
                                                                }
                                                `}
                                                        />

                                                        <span
                                                            className={`
                                                    text-sm truncate
                                                    ${theme === "Dark"
                                                                    ? "text-gray-300"
                                                                    : "text-gray-700"
                                                                }
                                                `}

                                                        >
                                                            {itm?.workspaceSetup?.workspaceName}
                                                        </span>

                                                    </div>

                                                    {hoveredId === idx && (

                                                        <div className="flex gap-2 text-xs">

                                                            <CiMenuKebab onClick={() => handelMenuOpen(itm?._id)} />
                                                        </div>
                                                    )}
                                                        {openproject && <>
                                                        <button onClick={()=>setopenProjects(false)}>Close</button>
                                                        </>}
                                                </div>

                                            ))

                                        )}

                                    </div>

                                )}

                        </div>

                    ))}

                </div>

                {/* ================= FOOTER ================= */}

                <div
                    className={`
            p-3 border-t
            ${theme === "Dark"
                            ? "border-gray-800"
                            : "border-gray-200"
                        }
        `}
                >

                    <button
                        onClick={checkuser}
                        className={`
                flex items-center gap-3
                w-full p-3 rounded-xl
                transition-all duration-300

                ${theme === "Dark"
                                ? "hover:bg-gray-800"
                                : "hover:bg-gray-100"
                            }
            `}
                    >

                        <span className="text-lg">
                            {Token
                                ? <FaSignOutAlt />
                                : <FaSignInAlt />
                            }
                        </span>

                        {(issidebaropen || open) && (

                            <span className="text-sm font-medium">
                                {Token ? "Logout" : "Login"}
                            </span>

                        )}

                    </button>

                </div>

            </aside>
            {isworkspace && <>


                <TemplatesUi setisworkspace={setisworkspace}></TemplatesUi>
            </>}
        </>
    );
}

export default Sidebar;
