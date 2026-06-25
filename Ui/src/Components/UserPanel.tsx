import { useContext, useRef, useState } from "react"
import {
    FaUser,
    FaMoon,
    FaSun,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa"

import bgthemeContext from "../Context/ThemeContext"
import { checkuser, getuserInfo } from "./LocalStorage"


function UserPanel() {

    const [IsopenTheme, setIsopenTheme] = useState<boolean>(false)

    const context: any = useContext(bgthemeContext)
    // console.log(theme
    const { theme, settheme } = context;
    const panelRef = useRef<HTMLDivElement | null>(null)
    // userProfile,userEmail,Username

    const profile = JSON.parse(getuserInfo).userProfile


    return (
        <>

            <div
                ref={panelRef}
                className={`
                    absolute top-14 right-0 w-[280px]
                    rounded-2xl overflow-hidden
                    border shadow-2xl z-50
                    backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200
                    ${theme === "Dark"
                        ? "bg-[#111827]/95 border-gray-800 text-white"
                        : "bg-white/95 border-gray-200 text-gray-900"
                    }
                `}
            >

                {/* HEADER */}

                <div
                    className={`
                        px-5 py-4 border-b
                        ${theme === "Dark"
                            ? "border-gray-800"
                            : "border-gray-200"
                        }
                    `}
                >

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                            <img src={profile} alt="" />
                        </div>

                        <div>
                            <h2 className="font-semibold text-sm">
                               {JSON.parse(getuserInfo).Username}
                            </h2>

                            <p
                                className={`
                                    text-xs
                                    ${theme === "Dark"
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                    }
                                `}
                            >
                                        {JSON.parse(getuserInfo).userEmail}
                            </p>
                        </div>

                    </div>

                </div>

                {/* MENU ITEMS */}

                <div className="p-2">

                    {/* PROFILE */}

                    <button
                        className={`
                            w-full flex items-center gap-3
                            px-4 py-3 rounded-xl transition-all
                            ${theme === "Dark"
                                ? "hover:bg-gray-800"
                                : "hover:bg-gray-100"
                            }
                        `}
                    >

                        <span className="text-lg">
                            <FaUser />
                        </span>

                        <span className="text-sm font-medium">
                            Profile
                        </span>

                    </button>

                    {/* SETTINGS */}

                    <button
                        className={`
                            w-full flex items-center gap-3
                            px-4 py-3 rounded-xl transition-all
                            ${theme === "Dark"
                                ? "hover:bg-gray-800"
                                : "hover:bg-gray-100"
                            }
                        `}
                    >

                        <span className="text-lg">
                            <FaCog />
                        </span>

                        <span className="text-sm font-medium">
                            Settings
                        </span>

                    </button>

                    {/* THEME */}

                    <div>

                        <button
                            onClick={() => setIsopenTheme((prev) => !prev)}
                            className={`
                                w-full flex items-center justify-between
                                px-4 py-3 rounded-xl transition-all
                                ${theme === "Dark"
                                    ? "hover:bg-gray-800"
                                    : "hover:bg-gray-100"
                                }
                            `}
                        >

                            <div className="flex items-center gap-3">

                                <span className="text-lg">
                                    {theme === "Dark"
                                        ? <FaMoon />
                                        : <FaSun />
                                    }
                                </span>

                                <span className="text-sm font-medium">
                                    Theme
                                </span>

                            </div>

                            <span
                                className={`
                                    text-xs px-2 py-1 rounded-lg
                                    ${theme === "Dark"
                                        ? "bg-gray-700 text-gray-300"
                                        : "bg-gray-200 text-gray-700"
                                    }
                                `}
                            >
                                {theme}
                            </span>

                        </button>

                        {/* THEME OPTIONS */}

                        {IsopenTheme && (


                            <div className="mt-2 px-2 flex flex-col gap-3">
                                {[
                                    {
                                        name: "Light",
                                        img: "https://jira-frontend-bifrost.prod-east.frontend.public.atl-paas.net/assets/light-mode.391a7bc2.svg",
                                    },
                                    {
                                        name: "Dark",
                                        img: "https://jira-frontend-bifrost.prod-east.frontend.public.atl-paas.net/assets/dark-mode.7b3d42a5.svg"
                                    },
                                ].map((themes, idx) => (
                                    <label
                                        key={idx}
                                        onClick={() => settheme(themes.name)}
                                        className={`
        flex items-center gap-4 cursor-pointer
        px-4 py-3 rounded-xl transition-all
        
        ${theme === themes.name
                                                ? "bg-blue-600 text-white border-blue-400"
                                                : "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-white"
                                            }
      `}
                                    >
                                        {/* radio */}
                                        <input
                                            type="radio"
                                            checked={theme === themes.name}
                                            readOnly
                                            className="accent-blue-500"
                                        />

                                        {/* IMAGE PREVIEW */}
                                        <img
                                            src={themes.img}
                                            alt={themes.name}
                                            className="w-12 h-12 rounded-lg object-cover border"
                                        />

                                        {/* TEXT */}
                                        <span className={`text-sm font-medium`}>
                                            {themes.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}

                    </div>

                </div>

                {/* FOOTER */}

                <div
                    className={`
                        p-2 border-t
                        ${theme === "Dark"
                            ? "border-gray-800"
                            : "border-gray-200"
                        }
                    `}
                >

                    <button
                        className={`
                            w-full flex items-center gap-3
                            px-4 py-3 rounded-xl text-red-500 transition-all
                            ${theme === "Dark"
                                ? "hover:bg-red-500/10"
                                : "hover:bg-red-50"
                            }
                        `}
                    >

                        <span>
                            <FaSignOutAlt />
                        </span>

                        <span className="text-sm font-medium" onClick={checkuser}>
                            Logout
                        </span>

                    </button>

                </div>

            </div>

        </>
    )
}

export default UserPanel