import { useContext, useState } from "react";
import {
    FiStar,

    FiEye,
    FiSearch,
} from "react-icons/fi";
import WorkspaceData from "../Context/workspaceData";
import { useremail } from "./LocalStorage";

function WorkspaceViwe({ theme, SpaceJson }: any) {
    const workSpaceData = useContext(WorkspaceData)

    const { setwork }: any = workSpaceData


    const [type, settype] = useState("Recommended")

    const [id, setid] = useState<number | null>(null)

    const filters = [
        "Recommended",
        "For you",
        "Assigned to me",
        "Starred",
        "Worked on",
        "Viewed",
    ];

    return (
        <>




            <div
                className={`min-h-screen px-4 sm:px-6 py-8 transition-colors duration-300
    ${theme === "Dark"
                        ? "bg-[#0B1120] text-white"
                        : "bg-[#F5F7FB] text-gray-900"
                    }`}
            >
                <div className="max-w-5xl mx-auto space-y-8">

                    {/* HEADER */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Your Workspaces
                            </h1>

                            <p
                                className={`mt-2 text-sm
            ${theme === "Dark"
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                    }`}
                            >
                                Manage your teams, projects, and recommended spaces
                            </p>
                        </div>

                        <button
                            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition"
                        >
                            + Create Workspace
                        </button>
                    </div>

                    {/* SEARCH */}
                    <div
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-sm transition
        ${theme === "Dark"
                                ? "bg-[#111827] border-gray-800"
                                : "bg-white border-gray-200 shadow-sm"
                            }`}
                    >
                        <FiSearch
                            className={`text-lg
          ${theme === "Dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }`}
                        />

                        <input
                            type="text"
                            placeholder="Search workspaces..."
                            className={`bg-transparent outline-none w-full text-sm
          ${theme === "Dark"
                                    ? "placeholder:text-gray-500"
                                    : "placeholder:text-gray-400"
                                }`}
                        />
                    </div>

                    {/* FILTERS */}
                    <div className="flex flex-wrap gap-3">
                        {filters.map((f, i) => (
                            <button
                                key={i}
                                onClick={() => settype(f)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
          
          ${type === f
                                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                        : theme === "Dark"
                                            ? "bg-[#111827] border-gray-800 text-gray-300 hover:bg-[#1E293B]"
                                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"
                                    }
          `}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* SECTION TITLE */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Recommended Spaces
                            </h2>

                            <p
                                className={`text-sm mt-1
            ${theme === "Dark"
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                    }`}
                            >
                                Discover and continue collaborating with your teams
                            </p>
                        </div>

                        <span
                            className={`text-sm font-medium
          ${theme === "Dark"
                                    ? "text-blue-400"
                                    : "text-blue-600"
                                }`}
                        >
                            {SpaceJson.length} Spaces
                        </span>
                    </div>

                    {/* WORKSPACE LIST */}
                    <div className="grid gap-4">
                        {SpaceJson.length === 0 ? (
                            <div
                                className={`h-56 rounded-3xl border flex flex-col items-center justify-center text-center p-6
            ${theme === "Dark"
                                        ? "bg-[#111827] border-gray-800 text-gray-400"
                                        : "bg-white border-gray-200 text-gray-500"
                                    }`}
                            >
                                <div className="text-5xl mb-3">📂</div>

                                <h3 className="font-semibold text-lg">
                                    No Workspaces Found
                                </h3>

                                <p className="text-sm mt-2 opacity-70">
                                    Try changing filters or create a new workspace
                                </p>
                            </div>
                        ) : (
                            SpaceJson.map((w: any, i: number) => (
                                <div
                                    key={i}
                                    onMouseEnter={() => setid(i)}
                                    onMouseLeave={() => setid(null)}
                                    className={`group relative overflow-hidden rounded-3xl border p-5 transition-all duration-300 cursor-pointer
              
              ${theme === "Dark"
                                            ? "bg-[#111827] border-gray-800 hover:border-blue-500/40 hover:bg-[#162033]"
                                            : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg"
                                        }
            `}
                                >
                                    <div className="flex items-center justify-between gap-5">

                                        {/* LEFT */}
                                        <div className="flex items-center gap-4 min-w-0">

                                            {/* ICON */}
                                            <div
                                                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0
                    ${theme === "Dark"
                                                        ? "bg-[#1E293B]"
                                                        : "bg-gray-100"
                                                    }`}
                                            >
                                                <img
                                                    src={w?.workspaceicon?.img}
                                                    alt="workspace"
                                                    className="w-8 h-8 object-contain"
                                                />
                                            </div>

                                            {/* INFO */}
                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-base truncate">
                                                    {w?.workspaceSetup?.workspaceName}
                                                </h3>

                                                <p
                                                    className={`text-sm truncate mt-1
                      ${theme === "Dark"
                                                            ? "text-gray-400"
                                                            : "text-gray-500"
                                                        }`}
                                                >
                                                    {w?.workspaceSetup?.createby?.userName || "User"} • Team Lead
                                                </p>

                                                <div className="flex items-center gap-2 mt-3 flex-wrap">

                                                    <span
                                                        className={`px-2.5 py-1 rounded-full text-xs font-medium
                        ${theme === "Dark"
                                                                ? "bg-[#1E293B] text-gray-300"
                                                                : "bg-gray-100 text-gray-600"
                                                            }`}
                                                    >
                                                        Active
                                                    </span>

                                                    <span
                                                        className={`px-2.5 py-1 rounded-full text-xs font-medium
                        ${theme === "Dark"
                                                                ? "bg-blue-500/10 text-blue-400"
                                                                : "bg-blue-50 text-blue-600"
                                                            }`}
                                                    >
                                                        Workspace
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ACTIONS */}
                                        <div
                                            className={`flex items-center gap-3 transition-all duration-300
                  ${id === i
                                                    ? "opacity-100 translate-x-0"
                                                    : "opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0"
                                                }`}
                                        >

                                            {/* STAR */}
                                            <button
                                                className={`p-3 rounded-2xl transition-all duration-200

                    ${w?.isStaredUsers?.userEmail === useremail
                                                        ? "bg-yellow-400 text-white shadow-lg shadow-yellow-300/30"
                                                        : theme === "Dark"
                                                            ? "bg-[#1E293B] text-gray-400 hover:text-yellow-400 hover:bg-[#243041]"
                                                            : "bg-gray-100 text-gray-500 hover:text-yellow-500 hover:bg-gray-200"
                                                    }
                  `}
                                                title={
                                                    w?.isStaredUsers?.userEmail === useremail
                                                        ? "Remove from Favorites"
                                                        : "Add to Favorites"
                                                }
                                            >
                                                <FiStar
                                                    className={`${w?.isStaredUsers?.userEmail === useremail
                                                        ? "fill-current"
                                                        : ""
                                                        }`}
                                                />
                                            </button>

                                            {/* VIEW */}
                                            <button
                                                onClick={() => setwork(w)}
                                                className={`p-3 rounded-2xl transition-all duration-200
                    ${theme === "Dark"
                                                        ? "bg-[#1E293B] text-gray-300 hover:bg-blue-600 hover:text-white"
                                                        : "bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white"
                                                    }
                  `}
                                                title="Open Workspace"
                                            >
                                                <FiEye />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* FOOTER */}
                    <div
                        className={`text-center pt-4 text-sm
        ${theme === "Dark"
                                ? "text-gray-500"
                                : "text-gray-400"
                            }`}
                    >
                        Explore all workspaces and collaborate efficiently
                    </div>
                </div>
            </div></>
    );
}

export default WorkspaceViwe;