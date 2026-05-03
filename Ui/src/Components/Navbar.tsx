import { useState } from "react";
import {
    FaTachometerAlt,
    FaProjectDiagram,
    FaTasks,
    FaUsers,
    FaCalendarAlt,
    FaChartLine,
    FaCog,
    FaUser,
    FaBell,
    FaBars,
    FaTimes,
} from "react-icons/fa";

type Props = {
    page: string;
};

function Sidebar({ page }: Props) {
    const [open, setOpen] = useState(false);
    const [Bigscreen, setBigscreen] = useState(true);

    const menuItems = [
        { name: "Dashboard", icon: <FaTachometerAlt /> },
        { name: "Projects", icon: <FaProjectDiagram /> },
        { name: "Tasks", icon: <FaTasks /> },
        { name: "Team", icon: <FaUsers /> },
        { name: "Calendar", icon: <FaCalendarAlt /> },
        { name: "Analytics", icon: <FaChartLine /> },
        { name: "Settings", icon: <FaCog /> },
        { name: "Profile", icon: <FaUser /> },
    ];

    return (
        <>
            {/* ================= MOBILE TOP BAR ================= */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white flex items-center justify-between px-4 py-3 z-50">
                <h1 className="font-bold text-lg">ProjectHub</h1>

                <div className="flex items-center gap-3">


                    {/* Open sidebar */}
                    <button onClick={() => setOpen(true)} className="text-2xl">
                        <FaBars />
                    </button>
                </div>
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
          fixed md:static top-0 left-0 h-full bg-gray-900 text-white flex flex-col z-50 transition-all duration-300
          ${Bigscreen ? "w-80" : "w-64"}
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
            >
                {/* HEADER */}
                <div className="p-5 text-xl font-bold border-b border-gray-800 flex justify-between items-center">
                    ProjectHub

                    
                    <div className="flex items-center gap-3">
                        {/* Bigscreen toggle */}
                        <button
                            onClick={() => setBigscreen(!Bigscreen)}
                            className="text-xs bg-gray-700 px-2 py-1 rounded"
                        >
                            {Bigscreen ? "Shrink" : "Expand"}
                        </button>

                        {/* close mobile */}
                        <button
                            className="md:hidden text-xl"
                            onClick={() => setOpen(false)}
                        >
                            <FaTimes />
                        </button>
                    </div>

                </div>

                {/* MENU */}
                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                    {menuItems.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => setOpen(false)}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
              ${page === item.name ? "bg-blue-600" : "hover:bg-gray-800"}`}
                        >
                            {item.icon}
                            <span className={`${Bigscreen ? "text-base" : "text-sm"}`}>
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* FOOTER */}
                <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                        <span className="flex items-center gap-2">
                            <FaBell /> Notifications
                        </span>
                        <span className="bg-red-500 text-xs px-2 py-1 rounded-full">
                            3
                        </span>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;