import { useState } from "react";
import {
    FaTachometerAlt,
    FaTasks,
    FaUsers,
    FaCalendarAlt,
    FaChartLine,
    FaUser,
    FaBell,
    FaBars,
    FaTimes,
    FaSignOutAlt,
    FaSignInAlt,
    FaLayerGroup,
    FaPlus,
    FaArrowCircleDown,
    FaArrowCircleRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { checkuser, Token } from "./LocalStorage";
import { toast } from "react-toastify";

type Props = {
    page: string;
};

function Sidebar({ page }: Props) {

    const [open, setOpen] = useState(false);
    const [Bigscreen, setBigscreen] = useState(true);
    const [openSpace, setOpenSpace] = useState(false);
    const [isworkspace, setisworkspace] = useState<boolean>(false)
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [Workspacename, setWorkspacename] = useState<any>("")

    const menuItems = [
        { name: "Dashboard", icon: <FaTachometerAlt />, href: "/" },
        { name: "Space", icon: <FaLayerGroup />, href: "/projects" },
        { name: "Tasks", icon: <FaTasks />, href: "/Tasks" },
        { name: "Team", icon: <FaUsers />, href: "/Team" },
        { name: "Calendar", icon: <FaCalendarAlt />, href: "/Calendar" },
        { name: "Analytics", icon: <FaChartLine />, href: "/Analytics" },
        { name: "Profile", icon: <FaUser />, href: "/Profile" },
    ];
    // [
    //         "Frontend Team",
    //         "Devops Team",
    //         "Backend Team",
    //         "Design Team",
    //     ]
    const [space, setSpace] = useState<string[]>([]);
    const handelpoupSpace = () => { setisworkspace((prev) => !prev) }
    const handelSpace = (e?: any) => {

        if (!Workspacename) {
            return toast.error("required  to create the workspace")
        }

        e?.stopPropagation();


        setSpace(prev => [...prev, Workspacename]);

        toast.success("Workspace Created");
    };

    const deleteWorkspace = (idx: number) => {
        setSpace(prev => prev.filter((_, i) => i !== idx));
        toast.success("Workspace Deleted");
    };

    return (
        <>
            {/* ================= MOBILE TOP BAR ================= */}

            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-gray-900 border-b border-gray-800 text-white flex items-center justify-between px-4 z-50">

                <h1 className="font-bold text-base truncate">
                    ProjectHub
                </h1>

                <button
                    onClick={() => setOpen(true)}
                    className="text-2xl"
                >
                    <FaBars />
                </button>

            </div>

            {/* ================= OVERLAY ================= */}

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                />
            )}

            {/* ================= SIDEBAR ================= */}

            <aside
                className={`
                fixed md:static top-0 left-0 h-screen bg-gray-900 text-white flex flex-col z-50
                transition-transform duration-300 ease-in-out
                ${Bigscreen
                        ? "w-[290px] md:w-[320px]"
                        : "w-[240px] md:w-[260px]"
                    }
                ${open
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                    }
            `}
            >

                {/* ================= HEADER ================= */}

                <div className="p-5 border-b border-gray-800 flex items-center justify-between">

                    <h1 className="font-bold text-lg">
                        ProjectHub
                    </h1>

                    <div className="flex items-center gap-3">

                        <button
                            onClick={() => setBigscreen(!Bigscreen)}
                            className="hidden md:block text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded-md"
                        >
                            {Bigscreen ? "Shrink" : "Expand"}
                        </button>

                        <button
                            className="md:hidden text-xl"
                            onClick={() => setOpen(false)}
                        >
                            <FaTimes />
                        </button>

                    </div>

                </div>

                {/* ================= MENU ================= */}

                <div className="flex-1 overflow-y-auto px-2 md:px-3 py-20 md:py-4 space-y-2">

                    {menuItems.map((item, i) => (

                        <div
                            key={i}
                            className="space-y-1"
                            onMouseEnter={() => item.name === "Space" && setOpenSpace(true)}
                            onMouseLeave={() => item.name === "Space" && setOpenSpace(false)}
                        >

                            {/* ================= PARENT ITEM ================= */}

                            <div
                                className={`
                                flex items-center justify-between gap-2
                                p-2.5 md:p-3 rounded-xl cursor-pointer
                                transition-all duration-200
                                ${page === item.name
                                        ? "bg-blue-600 shadow-lg"
                                        : "hover:bg-gray-800"
                                    }
                            `}
                                onClick={() => {
                                    if (item.name === "Space") {
                                        setOpenSpace(prev => !prev);
                                    } else {
                                        setOpen(false);
                                    }
                                }}
                            >

                                <Link
                                    to={item.name === "Space" ? "#" : item.href}
                                    className="flex items-center gap-3 flex-1 min-w-0"
                                >

                                    <span className="text-lg shrink-0">
                                        {item.icon}
                                    </span>

                                    <span
                                        className={`truncate ${Bigscreen
                                            ? "text-sm md:text-base"
                                            : "text-xs md:text-sm"
                                            }`}
                                    >
                                        {item.name}
                                    </span>

                                </Link>

                                {/* ================= SPACE ACTIONS ================= */}

                                {item.name === "Space" && (

                                    <div className="flex items-center gap-3">

                                        {/* Create Workspace */}

                                        <div
                                            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                                            onClick={handelpoupSpace}
                                        >

                                            <span className="hidden md:block">
                                                Create
                                            </span>

                                            <FaPlus className="cursor-pointer text-xs hover:text-blue-400" />

                                        </div>

                                        <span className="text-gray-300 text-sm transition-transform duration-200">
                                            {openSpace
                                                ? <FaArrowCircleDown className="text-base" />
                                                : <FaArrowCircleRight className="text-base" />
                                            }
                                        </span>
                                    </div>
                                )}

                            </div>

                            {/* ================= TREE ================= */}

                            {item.name === "Space" && openSpace && (

                                <div className="ml-6 md:ml-10 mt-1 space-y-1 border-l border-gray-700 pl-3">

                                    {space.length == 0 ?
                                        <>
                                            <div className="flex flex-col items-center justify-center py-10 text-center">
                                                <h2 className="text-lg font-semibold text-white">
                                                    No Workspace Found
                                                </h2>

                                                <p className="text-sm text-gray-400 mt-1">
                                                    Create your first workspace to get started.
                                                </p>

                                                <button
                                                    onClick={() => setisworkspace(true)}
                                                    className="mt-4 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-sm"
                                                >
                                                    Create Workspace
                                                </button>

                                            </div>

                                        </>
                                        : space.map((itm, idx) => (

                                            <div
                                                key={idx}
                                                className="group flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-800 transition"
                                                onMouseEnter={() => setHoveredId(idx)}
                                                onMouseLeave={() => setHoveredId(null)}
                                            >

                                                {/* Workspace Name */}

                                                <div className="flex items-center gap-2 min-w-0">

                                                    {/* Workspace Icon */}
                                                    <FaLayerGroup className="text-sm text-gray-400 shrink-0" />

                                                    {/* Workspace Name */}
                                                    <span className="text-sm text-gray-300 truncate">
                                                        {itm}
                                                    </span>

                                                </div>

                                                {/* Actions */}

                                                {hoveredId === idx && (

                                                    <div className="hidden md:flex gap-2 text-xs">

                                                        <button
                                                            className="text-blue-400 hover:text-blue-200"
                                                            onClick={() => toast.info(`Edit ${itm}`)}
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="text-red-400 hover:text-red-200"
                                                            onClick={() => deleteWorkspace(idx)}
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>
                                                )}

                                            </div>

                                        ))}

                                    <button
                                        onClick={() => toast.success("Opening Workspaces")}
                                        className="text-sm text-gray-400 hover:text-white text-left pt-1"
                                    >
                                        View Workspaces
                                    </button>

                                </div>

                            )}

                        </div>

                    ))}

                    {/* ================= AUTH ================= */}

                    <div className="pt-3 border-t border-gray-700 mt-3">

                        <button
                            onClick={checkuser}
                            className="flex items-center gap-3 p-3 w-full rounded-xl hover:bg-gray-800 transition"
                        >

                            <span className="text-lg">
                                {Token
                                    ? <FaSignOutAlt />
                                    : <FaSignInAlt />
                                }
                            </span>

                            <span className="text-sm md:text-base">
                                {Token ? "Logout" : "Login"}
                            </span>

                        </button>

                    </div>

                </div>

                {/* ================= FOOTER ================= */}

                <div className="p-4 border-t border-gray-800">

                    <Link to="/Notifications">

                        <div className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 transition p-3 rounded-xl">

                            <span className="flex items-center gap-2 text-sm md:text-base">
                                <FaBell />
                                Notifications -{isworkspace ? "true open" : "o"}
                            </span>

                            <span className="bg-red-500 text-xs px-2 py-1 rounded-full">
                                3
                            </span>

                        </div>

                    </Link>

                </div>

            </aside>
            {isworkspace ?
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"

                    />

                    {/* Popup */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">

                        <div className="w-full max-w-md bg-gray-900 text-white rounded-2xl shadow-2xl border border-gray-800 p-6 relative">

                            {/* Close Button */}
                            <button

                                className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg"
                                onClick={handelpoupSpace}
                            >
                                ✕
                            </button>

                            {/* Heading */}
                            <h2 className="text-xl font-semibold mb-5">
                                Create Workspace
                            </h2>

                            {/* Input */}
                            <div className="space-y-4">

                                <input
                                    type="text"
                                    placeholder="Enter workspace name"
                                    onChange={(e) => setWorkspacename(e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                                />

                                {/* Submit Button */}
                                <button
                                    className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-medium"
                                    onClick={handelSpace}
                                >
                                    Create Workspace
                                </button>

                            </div>

                        </div>

                    </div>
                </>
                : ""}
        </>
    );
}

export default Sidebar;