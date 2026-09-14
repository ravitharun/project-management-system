// import { useContext, useEffect, useState } from "react";

// import {
//     FiUser,
//     FiBell,
//     FiMoon,
//     FiShield,
//     FiLink,
//     FiBriefcase,
//     FiChevronRight,
//     FiMail,
//     FiLock,
//     FiGithub,
//     FiCalendar,
//     FiCheck,
//     FiEdit3,
//     FiSave,
//     FiChevronDown,
//     FiCheckCircle,
//     FiX,
// } from "react-icons/fi";

// import bgthemeContext from "../Context/ThemeContext";
// import Sidebar from "./Navbar";
// import SideBarContext from "../Context/SideBard";
// import { instance } from "../services/apiservices";
// import { ShowToast } from "./toastHelper";
// import { Toaster } from "sonner";
// import { userid } from "./LocalStorage";


// const Settings = () => {




//     const [notifications, setNotifications] = useState({
//         email: true,
//         taskAssigned: true,
//         mentions: true,
//         comments: false,
//     });
//     let user: any = localStorage.getItem("userinfo")





//     /* =========================
//        ACCOUNT
//     ========================= */
//     <Account isDark={isDark}></Account>



//     // /* =========================
//     //    NOTIFICATIONS
//     // ========================= */

//     // const renderNotifications = () => (
//     //     <>

//     //       
//     //     </>
//     // );

//     // /* =========================
//     //    APPEARANCE
//     // ========================= */

//     // const renderAppearance = () => (


//     // );


//     /* =========================
//        SECURITY
//     ========================= */


//     /* =========================
//        INTEGRATIONS
//     ========================= */
//     // function GoogleCalendarManage() {
//     //     return (
//     //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
//     //             <div
//     //                 className={`w-full max-w-lg overflow-hidden rounded-2xl border shadow-2xl ${isDark
//     //                     ? "border-gray-800 bg-[#111827] text-white"
//     //                     : "border-gray-200 bg-white text-gray-900"
//     //                     }`}
//     //             >
//     //                 {/* Header */}
//     //                 <div
//     //                     className={`flex items-center justify-between border-b px-5 py-4 ${isDark ? "border-gray-800" : "border-gray-200"
//     //                         }`}
//     //                 >
//     //                     <div className="flex items-center gap-3">
//     //                         <div
//     //                             className={`flex h-10 w-10 items-center justify-center rounded-lg ${isDark
//     //                                 ? "bg-blue-500/10 text-blue-400"
//     //                                 : "bg-blue-50 text-blue-600"
//     //                                 }`}
//     //                         >
//     //                             <FiCalendar size={20} />
//     //                         </div>

//     //                         <div>
//     //                             <h2 className="text-base font-semibold">
//     //                                 Google Calendar
//     //                             </h2>

//     //                             <p
//     //                                 className={`text-xs ${isDark
//     //                                     ? "text-gray-400"
//     //                                     : "text-gray-500"
//     //                                     }`}
//     //                             >
//     //                                 Manage your calendar connection
//     //                             </p>
//     //                         </div>
//     //                     </div>

//     //                     <button
//     //                         // onClick={onClose}
//     //                         className={`rounded-lg p-2 transition ${isDark
//     //                             ? "text-gray-400 hover:bg-gray-800 hover:text-white"
//     //                             : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
//     //                             }`}
//     //                     >
//     //                         <FiX size={19} />
//     //                     </button>
//     //                 </div>

//     //                 {/* Content */}
//     //                 <div className="space-y-5 p-5">
//     //                     {/* Connected Status */}
//     //                     <div
//     //                         className={`flex items-center gap-3 rounded-xl border p-4 ${isDark
//     //                             ? "border-green-500/20 bg-green-500/10"
//     //                             : "border-green-200 bg-green-50"
//     //                             }`}
//     //                     >
//     //                         <FiCheckCircle
//     //                             className="shrink-0 text-green-500"
//     //                             size={20}
//     //                         />

//     //                         <div>
//     //                             <p className="text-sm font-medium">
//     //                                 Connected
//     //                             </p>

//     //                             <p
//     //                                 className={`mt-0.5 text-xs ${isDark
//     //                                     ? "text-gray-400"
//     //                                     : "text-gray-500"
//     //                                     }`}
//     //                             >
//     //                                 Your Google Calendar is connected.
//     //                             </p>
//     //                         </div>
//     //                     </div>

//     //                     {/* Connected Account */}
//     //                     <div>
//     //                         <label
//     //                             className={`mb-2 block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"
//     //                                 }`}
//     //                         >
//     //                             Connected Account
//     //                         </label>

//     //                         <div
//     //                             className={`rounded-lg border px-3 py-2.5 text-sm ${isDark
//     //                                 ? "border-gray-700 bg-gray-900 text-gray-300"
//     //                                 : "border-gray-200 bg-gray-50 text-gray-700"
//     //                                 }`}
//     //                         >
//     //                             ravi@gmail.com
//     //                         </div>
//     //                     </div>

//     //                     {/* Calendar */}
//     //                     <div>
//     //                         <label
//     //                             className={`mb-2 block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"
//     //                                 }`}
//     //                         >
//     //                             Calendar
//     //                         </label>

//     //                         <button
//     //                             type="button"
//     //                             className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition ${isDark
//     //                                 ? "border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-600"
//     //                                 : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
//     //                                 }`}
//     //                         >
//     //                             <span>My Calendar</span>
//     //                             <FiChevronDown size={17} />
//     //                         </button>
//     //                     </div>

//     //                     {/* Sync */}
//     //                     <div
//     //                         className={`flex items-center justify-between rounded-xl border p-4 ${isDark
//     //                             ? "border-gray-800 bg-gray-900/50"
//     //                             : "border-gray-200 bg-gray-50"
//     //                             }`}
//     //                     >
//     //                         <div className="pr-4">
//     //                             <p className="text-sm font-medium">
//     //                                 Sync project events
//     //                             </p>

//     //                             <p
//     //                                 className={`mt-1 text-xs leading-5 ${isDark
//     //                                     ? "text-gray-400"
//     //                                     : "text-gray-500"
//     //                                     }`}
//     //                             >
//     //                                 Automatically sync project events with your
//     //                                 Google Calendar.
//     //                             </p>
//     //                         </div>

//     //                         {/* Toggle */}
//     //                         <button
//     //                             type="button"
//     //                             className="relative flex h-6 w-11 shrink-0 items-center rounded-full bg-blue-600"
//     //                         >
//     //                             <span className="absolute right-0.5 h-5 w-5 rounded-full bg-white shadow-sm" />
//     //                         </button>
//     //                     </div>
//     //                 </div>

//     //                 {/* Footer */}
//     //                 <div
//     //                     className={`flex flex-col-reverse gap-2 border-t px-5 py-4 sm:flex-row sm:justify-end ${isDark ? "border-gray-800" : "border-gray-200"
//     //                         }`}
//     //                 >
//     //                     <button
//     //                         type="button"
//     //                         className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${isDark
//     //                             ? "text-red-400 hover:bg-red-500/10"
//     //                             : "text-red-600 hover:bg-red-50"
//     //                             }`}
//     //                     >
//     //                         Disconnect
//     //                     </button>

//     //                     <button
//     //                         type="button"
//     //                         // onClick={onClose}
//     //                         className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
//     //                     >
//     //                         Done
//     //                     </button>
//     //                 </div>
//     //             </div>
//     //         </div>
//     //     );
//     // }





//     /* =========================
//        WORKSPACE
//     ========================= */

//     const renderWorkspace = () => (
//         <div className="space-y-5 lg:space-y-6">

//             <div>
//                 <h2
//                     className={`text-xl font-semibold lg:text-2xl ${isDark ? "text-white" : "text-gray-900"
//                         }`}
//                 >
//                     Workspace
//                 </h2>

//                 <p
//                     className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-500"
//                         }`}
//                 >
//                     Manage your workspace information.
//                 </p>
//             </div>

//             <div
//                 className={`rounded-xl border p-4 sm:p-5 lg:p-6 ${isDark
//                     ? "border-gray-800 bg-[#111827]"
//                     : "border-gray-200 bg-white"
//                     }`}
//             >

//                 <label
//                     className={`mb-2 block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"
//                         }`}
//                 >
//                     Workspace Name
//                 </label>

//                 <input
//                     type="text"
//                     defaultValue="My Workspace"
//                     className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500 ${isDark
//                         ? "border-gray-700 bg-[#1e293b] text-white"
//                         : "border-gray-300 bg-white text-gray-900"
//                         }`}
//                 />

//                 <button className="mt-5 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
//                     <FiSave size={16} />
//                     Save Workspace
//                 </button>

//             </div>
//         </div>
//     );

//     /* =========================
//        CONTENT SWITCH
//     ========================= */





//    
// };


// /* =====================================================
//    NOTIFICATION ITEM
// ===================================================== */
// 


// /* =====================================================
//    TOGGLE
// ===================================================== */

// const Toggle = ({
//     enabled,
//     onChange,
//     isDark,
// }: any) => {

//     return (
//         <button
//             type="button"
//             onClick={onChange}
//             aria-label="Toggle setting"
//             className={`relative flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${enabled
//                 ? "bg-blue-600"
//                 : isDark
//                     ? "bg-gray-700"
//                     : "bg-gray-300"
//                 }`}
//         >
//             <span
//                 className={`absolute h-5 w-5 rounded-full bg-white shadow-sm transition-all ${enabled
//                     ? "right-0.5"
//                     : "left-0.5"
//                     }`}
//             />
//         </button>
//     );
// };


// /* =====================================================
//    SECURITY ITEM
// ===================================================== */



// /* =====================================================
//    THEME CARD
// ===================================================== */



// /* =====================================================
//    INTEGRATION CARD
// ===================================================== */



// export default Settings;



import { useContext, useState } from "react";
import SideBarContext from "../Context/SideBard";
import bgthemeContext from "../Context/ThemeContext";

import Account from "./ApplicationSettings/Account";
import { FiBell, FiLink, FiMoon, FiShield, FiUser } from "react-icons/fi";
import Sidebar from "./Navbar";
import RenderNotifications from "./ApplicationSettings/RenderNotifications";
import RenderAppearance from "./ApplicationSettings/RenderAppearance";
import RenderSecurity from "./ApplicationSettings/RenderSecurity";
import RenderIntegrations from "./ApplicationSettings/RenderIntegrations";


function Settings() {


    const { theme }: any = useContext(bgthemeContext);
    const { sidebaropen }: any = useContext(SideBarContext);
    const [activeTab, setActiveTab] = useState("Account");
    const isDark = theme === "Dark";
    const settings = [
        {
            name: "Account",
            description: "Manage your profile and account information",
            icon: <FiUser />,
        },
        {
            name: "Notifications",
            description: "Control how you receive notifications",
            icon: <FiBell />,
        },
        {
            name: "Appearance",
            description: "Customize the look and feel of your workspace",
            icon: <FiMoon />,
        },
        {
            name: "Security",
            description: "Manage your password and account security",
            icon: <FiShield />,
        },
        {
            name: "Integrations",
            description: "Connect external applications and services",
            icon: <FiLink />,
        },
        // {
        //     name: "Workspace",
        //     description: "Manage your workspace information",
        //     icon: <FiBriefcase />,
        // },
    ];
    const mainMargin: any = sidebaropen
        ? "lg:ml-[276px]"
        : "lg:ml-[80px]";
    return (



        <>
            <div
                className={`min-h-screen ${isDark
                    ? "bg-[#020617]"
                    : "bg-gray-50"
                    }`}
            >

                {/* SIDEBAR */}
                <Sidebar></Sidebar>

                {/* <Sidebar /> */}

                {/* MAIN CONTENT */}

                <main
                    className={`
                    min-h-screen
                    pt-[80px]
                    // ${mainMargin}
                    transition-all
                    duration-300
                    ease-in-out
                `}
                >

                    <div
                        className="
                        mx-auto
                        w-full
                        max-w-[1400px]
                        px-3
                        py-5
                        sm:px-5
                        sm:py-6
                        md:px-6
                        lg:px-8
                        lg:py-8
                        xl:px-10
                    "
                    >

                        {/* HEADER */}

                        <div className="mb-6 lg:mb-8">

                            <h1
                                className={`text-2xl font-bold sm:text-3xl ${isDark
                                    ? "text-white"
                                    : "text-gray-900"
                                    }`}
                            >
                                Settings
                            </h1>

                            <p
                                className={`mt-1 text-sm sm:text-base ${isDark
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                    }`}
                            >
                                Manage your account and application preferences.
                            </p>

                        </div>

                        {/* SETTINGS LAYOUT */}
                        <div
                            className="
        grid
        min-w-0
        grid-cols-1
        gap-5
        lg:grid-cols-[240px_minmax(0,1fr)]
        lg:gap-6
        xl:grid-cols-[260px_minmax(0,1fr)]
    "
                        >
                            {/* SETTINGS MENU */}

                            <aside
                                className={`
            min-w-0
            h-fit
            rounded-xl
            border
            p-2
            ${isDark
                                        ? "border-gray-800 bg-[#111827]"
                                        : "border-gray-200 bg-white"
                                    }
        `}
                            >
                                <div
                                    className="
                flex
                flex-col
                gap-1
            "
                                >
                                    {settings.map((item) => (
                                        <button
                                            key={item.name}
                                            onClick={() => setActiveTab(item.name)}
                                            className={`
                        flex
                        w-full
                        min-w-0
                        items-start
                        gap-3
                        rounded-lg
                        px-3
                        py-3
                        text-left
                        transition

                        ${activeTab === item.name
                                                    ? isDark
                                                        ? "bg-blue-500/10 text-blue-400"
                                                        : "bg-blue-50 text-blue-600"
                                                    : isDark
                                                        ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                }
                    `}
                                        >
                                            {/* ICON */}

                                            <span className="mt-0.5 shrink-0 text-lg">
                                                {item.icon}
                                            </span>

                                            {/* TEXT */}

                                            <span className="min-w-0 flex-1">
                                                <span className="block truncate text-sm font-medium">
                                                    {item.name}
                                                </span>

                                                <span
                                                    className={`
                                mt-1
                                block
                                break-words
                                text-xs
                                leading-4
                                ${activeTab === item.name
                                                            ? isDark
                                                                ? "text-blue-400/70"
                                                                : "text-blue-600/70"
                                                            : "text-gray-400"
                                                        }
                            `}
                                                >
                                                    {item.description}
                                                </span>
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </aside>

                            {/* SETTINGS CONTENT */}

                            <section className="min-w-0">
                                {activeTab == "Account" && <Account isDark={isDark} />}
                                {activeTab == "Notifications" && <RenderNotifications isDark={isDark} />}
                                {activeTab == "Appearance" && <RenderAppearance isDark={isDark} />}
                                {activeTab == "Security" && <RenderSecurity isDark={isDark} />}
                                {activeTab == "Integrations" && <RenderIntegrations isDark={isDark} />}

                            </section>
                        </div>

                    </div>

                </main>

            </div>



        </>
    )
}

export default Settings