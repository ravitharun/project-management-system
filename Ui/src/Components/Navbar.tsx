import { useContext, useEffect, useRef, useState } from "react";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
// import { CiMenuKebab } from "react-icons/ci";

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
import { Link, useNavigate } from "react-router-dom";
import { checkuser, Token } from "./LocalStorage";
import SideBarContext from "../Context/SideBard";
import bgthemeContext from "../Context/ThemeContext";
import UserPanel from "./UserPanel";
import TemplatesUi from "./Summary-Templates/TemplatesUi";
import { fetchworkspace } from "../services/Workspaceapi";
import { IoClose } from "react-icons/io5";
import { FaGear } from "react-icons/fa6";
import SetWork from "./SetWork";
import { instance } from "../services/apiservices";
import { toast } from "react-toastify";
import WorkspaceMenu from "./WorkspaceMenu";
// import WorkspaceProvider from "../Provider/WorkspaceProvider";
import WorkspaceData from "../Context/workspaceData";
import CreatedspaceData from "../Context/CreatedWorkspace";

type Props = {
    page: string;
};

export type theme = "Dark" | "Ligth";

function Sidebar({ page }: Props) {
    const [open, setOpen] = useState(false);
    const [isOpenPanelItems, setisOpenPanelItems] = useState<boolean>(false);
    const [issidebaropen, setisSidebaropen] = useState<boolean>(true);
    const [openSpace, setOpenSpace] = useState(true);
    const [isworkspace, setisworkspace] = useState<boolean>(false);
    const [isSetBackground, SetBackground] = useState<boolean>(false);
    const [Workspace, setworkspace] = useState<any[]>([]);
    const sidebar = useContext(SideBarContext);
    const context = useContext(bgthemeContext);
    const CreatedSpaceJson = useContext(CreatedspaceData)
    const workSpaceData = useContext(WorkspaceData)
    const { setwork }: any = workSpaceData
    const { theme }: any = context || {};
    const { setspacejson }: any = CreatedSpaceJson

    const userPanelRef = useRef<HTMLDivElement | null>(null);
    const workspaceMenuRef = useRef<HTMLDivElement | null>(null);
    // const backgroundPanelRef = useRef<HTMLDivElement | null>(null);

    const menuItems = [
        { name: "Dashboard", icon: <FaTachometerAlt />, href: "/" },
        { name: "Space", icon: <FaLayerGroup />, href: "/projects" },
        { name: "Tasks", icon: <FaTasks />, href: "/Tasks" },
        { name: "Team", icon: <FaUsers />, href: "/Team" },
        { name: "Calendar", icon: <FaCalendarAlt />, href: "/Calendar" },
        { name: "Analytics", icon: <FaChartLine />, href: "/Analytics" },
    ];

    const handelpoupSpace = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setisworkspace((prev) => !prev);
    };

    useEffect(() => {
        sidebar?.setisSidebaropen(issidebaropen);
    }, [issidebaropen, sidebar]);

    useEffect(() => {
        const Fetchapi = async () => {
            try {
                const response = await fetchworkspace();
                console.log(response, 'response')
                setworkspace(response?.data?.data || []);
                setspacejson(response?.data?.data || []);
            } catch (error: any) {
                console.log(error);
            }
        };

        Fetchapi();
    }, []);
    const [openproject, setopenProjects] = useState<string | null>(null);
    const [selectedWorkspace, setSelectedWorkspace] = useState<any | null>(null);

    const HandelOpenCloseSideBar = () => {
        setisSidebaropen((prev) => !prev);
    };
    const navigate = useNavigate()
    const handleProjectSetting = (CreatedWorkSpace: any) => {

        console.log(CreatedWorkSpace)

        if (!CreatedWorkSpace) {
            return
        }
        return navigate("/projectSettings", {
            state: {
                CreatedWorkSpace
            }
        })
    }

    // setSelectSpace
    const handelSelectSpace = (data: any) => {
        setwork(data)
    }

    // handelDeleteWorkspace
    const handelDeleteWorkspace = async (id: number) => {
        try {
            const response = await instance.delete("/api/Workspace/DeleteWorkspace", { params: { workspaceid: id } })
            if (response.status == 200) {
                return toast.info("Workspace deleted successfully");
            }
        } catch (error: any) {
            console.log(error.message)

        }
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
                    <button
                        onClick={() => setOpen(true)}
                        className={`
              md:hidden p-2 rounded-xl transition-all
              ${theme === "Dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"}
            `}
                    >
                        <LuPanelLeftOpen className="text-2xl" />
                    </button>

                    <button
                        onClick={HandelOpenCloseSideBar}
                        className={`
              hidden md:flex p-2 rounded-xl transition-all
              ${theme === "Dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"}
            `}
                    >
                        {issidebaropen ? (
                            <LuPanelLeftClose className="text-2xl" title="Close The SideBar" />
                        ) : (
                            <LuPanelLeftOpen className="text-2xl" title="Open The SideBar" />
                        )}
                    </button>

                    <Link to="/">
                        <h1 className="font-bold text-lg tracking-wide">Taskaro</h1>
                    </Link>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3 relative">
                    <button
                        className={`
              p-2 rounded-xl relative transition-all
              ${theme === "Dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"}
            `}
                    >
                        <FaBell className="text-lg" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] px-1.5 py-[1px] rounded-full text-white">
                            3
                        </span>
                    </button>

                    <div ref={userPanelRef} className="relative">
                        <div
                            className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-semibold text-white cursor-pointer"
                            onClick={() => setisOpenPanelItems((prev) => !prev)}
                            onMouseEnter={() => setisOpenPanelItems(true)}
                        >
                            T
                        </div>

                        {isOpenPanelItems && (
                            <div className="absolute right-0 top-12 z-[70]">
                                <UserPanel />
                            </div>
                        )}
                    </div>
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
          fixed top-16 left-0 h-[calc(100vh-64px)]
          flex flex-col transition-all duration-300 z-50
          ${theme === "Dark"
                        ? "bg-[#111827] border-r border-gray-800 text-white"
                        : "bg-white border-r border-gray-200 text-gray-900"
                    }
          w-[270px]
          ${issidebaropen ? "md:w-[270px]" : "md:w-[85px]"}
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
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
                  flex items-center justify-between gap-2 p-3 rounded-xl cursor-pointer transition-all
                  ${page === item.name
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : theme === "Dark"
                                            ? "hover:bg-gray-800"
                                            : "hover:bg-gray-100"
                                    }
                `}
                                onClick={() => {
                                    if (item.name === "Space") {
                                        setOpenSpace((prev) => !prev);
                                    } else {
                                        setOpen(false);
                                        setopenProjects(null);
                                        SetBackground(false);
                                    }
                                }}
                            >
                                <Link
                                    to={item.name === "Space" ? "#" : item.href}
                                    className="flex items-center gap-3 flex-1 min-w-0"
                                >
                                    <span className="text-xl shrink-0">{item.icon}</span>

                                    {(issidebaropen || open) && (
                                        <span className="truncate text-sm md:text-base font-medium">
                                            {item.name}
                                        </span>
                                    )}
                                </Link>

                                {(issidebaropen || open) && item.name === "Space" && (
                                    <div
                                        className="flex items-center gap-3"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <FaPlus
                                            className={`cursor-pointer text-xs transition-all ${theme === "Dark"
                                                ? "text-gray-300 hover:text-blue-400"
                                                : "text-gray-500 hover:text-blue-600"
                                                }`}
                                            onClick={handelpoupSpace}
                                        />
                                        <span
                                            className={`text-sm ${theme === "Dark" ? "text-gray-300" : "text-gray-500"
                                                }`}
                                        >
                                            {openSpace ? <FaArrowCircleDown /> : <FaArrowCircleRight />}
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
                      ${theme === "Dark" ? "border-gray-700" : "border-gray-300"}
                    `}
                                    >
                                        {Workspace.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                                <h2
                                                    className={`text-sm font-semibold ${theme === "Dark" ? "text-white" : "text-gray-900"
                                                        }`}
                                                >
                                                    No Workspace
                                                </h2>

                                                <p
                                                    className={`text-xs mt-1 ${theme === "Dark" ? "text-gray-400" : "text-gray-500"
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
                            relative group flex items-center justify-between
                            px-2 py-2 rounded-lg transition-all cursor-pointer
                            ${theme === "Dark"
                                                            ? "hover:bg-gray-800"
                                                            : "hover:bg-gray-100"
                                                        }
                          `}
                                                    onClick={() => handelSelectSpace(itm)}

                                                >
                                                    {/* LEFT SIDE */}
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <img
                                                            src={itm?.icon}
                                                            alt="not found"
                                                            className="w-5 h-5 rounded object-cover shrink-0"
                                                        />
                                                        <span
                                                            className={`text-sm truncate ${theme === "Dark"
                                                                ? "text-gray-300"
                                                                : "text-gray-700"
                                                                }`}



                                                        >
                                                            {itm?.workspaceSetup?.workspaceName}
                                                        </span>
                                                    </div>

                                                    <div className="flex gap-2 text-xs">
                                                        <WorkspaceMenu setopenProjects={setopenProjects} SetBackground={SetBackground} openproject={openproject} itm={itm} />
                                                    </div>

                                                    {/* ================= MENU ================= */}
                                                    {openproject === itm?._id && (
                                                        <div
                                                            ref={workspaceMenuRef}
                                                            className={`
            fixed top-24 left-[290px] md:left-[320px]
            w-64 z-[999]
            rounded-xl border shadow-2xl py-2 overflow-hidden
            transition-all duration-200

            ${theme === "Dark"
                                                                    ? "bg-[#111827] border-gray-800 text-white"
                                                                    : "bg-white border-gray-200 text-gray-900 shadow-lg"
                                                                }
        `}
                                                            onClick={(e) => e.stopPropagation()}
                                                        >

                                                            {/* SET BACKGROUND */}
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedWorkspace(itm);
                                                                    SetBackground(true);
                                                                }}
                                                                className={`
    w-full flex items-center gap-3 px-4 py-2.5 text-sm
    rounded-xl transition-all duration-200 hover:cursor-pointer

    ${theme === "Dark"
                                                                        ? "hover:bg-[#1e293b] hover:text-white"
                                                                        : "hover:bg-blue-200 hover:text-black"
                                                                    }
`}
                                                            >
                                                                <span className="text-base">🖼️</span>
                                                                Set Space Background
                                                            </button>

                                                            {/* SETTINGS */}
                                                            <button
                                                                className={`
    w-full flex items-center gap-3 px-4 py-2.5 text-sm
    rounded-xl transition-all duration-200 hover:cursor-pointer

    ${theme === "Dark"
                                                                        ? "hover:bg-[#1e293b] hover:text-white"
                                                                        : "hover:bg-blue-200 hover:text-black"
                                                                    }
`}


                                                                onClick={() => handleProjectSetting(itm)}
                                                            >
                                                                <FaGear className="text-sm" />
                                                                Project Settings
                                                            </button>

                                                            {/* DIVIDER */}
                                                            <div className="my-1 border-t border-gray-200 dark:border-gray-700" />

                                                            {/* DELETE */}
                                                            <button
                                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm
            text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
            transition"



                                                                onClick={() => handelDeleteWorkspace(itm._id)}
                                                            >
                                                                🗑️ Delete
                                                            </button>

                                                            {/* CLOSE */}
                                                            <button
                                                                onClick={() => {
                                                                    setopenProjects(null);
                                                                    SetBackground(false);
                                                                }}
                                                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                                                            >
                                                                <IoClose size={16} />
                                                            </button>
                                                        </div>
                                                    )}
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
            ${theme === "Dark" ? "border-gray-800" : "border-gray-200"}
          `}
                >
                    <button
                        onClick={checkuser}
                        className={`
              flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-300
              ${theme === "Dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"}
            `}
                    >
                        <span className="text-lg">
                            {Token ? <FaSignOutAlt /> : <FaSignInAlt />}
                        </span>

                        {(issidebaropen || open) && (
                            <span className="text-sm font-medium">
                                {Token ? "Logout" : "Login"}
                            </span>
                        )}
                    </button>
                </div>
            </aside>

            {/* BACKGROUND MODAL */}
            {isSetBackground && (
                <SetWork
                    SetBackground={SetBackground}
                    id={selectedWorkspace._id}

                    theme={theme}
                />
            )}
            {isworkspace && <TemplatesUi setisworkspace={setisworkspace} />}
        </>
    );
}

export default Sidebar;