import { useContext, useState } from "react";
import {
    FiStar,

    FiEye,
    FiSearch,
} from "react-icons/fi";
import WorkspaceData from "../Context/workspaceData";
import { useremail } from "./LocalStorage";
import { toast } from "react-toastify";

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
        <div
            className={`min-h-screen px-6 py-8 ${theme === "Dark"
                ? " text-white"
                : "bg-gray-100 text-black"
                }`}
        >
            <div className="max-w-4xl mx-auto space-y-6">

                {/* HEADER */}
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold">
                        Your Workspaces
                    </h1>
                    <p className="text-sm opacity-60">
                        Select a workspace or explore recommended ones
                    </p>
                </div>

                {/* serach */}
                <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-md border ${theme === "Dark"
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-300 bg-white"
                        } 
                        
                        hover:cursor-not-allowed
                        
                        `}

                >
                    <FiSearch className="opacity-60" />
                    <input
                        placeholder="Search workspaces..."
                        className="bg-transparent w-full outline-none text-sm"
                        disabled
                    />
                </div>

                {/* filters */}
                <div className="flex flex-wrap gap-2 text-xs">
                    {filters.map((f, i) => (
                        <span
                            key={i}
                            className={`px-3 py-1 rounded-full border cursor-pointer transition text-xs font-medium
${theme === "Dark"
                                    ? "border-gray-800 hover:bg-gray-900 text-gray-200"
                                    : "border-gray-300 hover:bg-gray-100 text-gray-700"
                                }
${type === f
                                    ? theme === "Dark"
                                        ? "bg-blue-600 border-blue-500 text-white"
                                        : "bg-blue-500 border-blue-500 text-white"
                                    : ""
                                }`}
                            onClick={() => settype(f)}
                        >
                            {f}
                        </span>
                    ))}
                </div>

                {/* sections TITLE */}
                <div className="text-sm opacity-70">
                    Recommended spaces
                </div>

                {/* SPACES list */}
                <div className="space-y-3">
                    {SpaceJson.length === 0 ? (
                        <div
                            className={`flex items-center justify-center h-40 rounded-xl border text-sm
      ${theme === "Dark"
                                    ? "border-gray-800 bg-gray-900 text-gray-400"
                                    : "border-gray-200 bg-gray-50 text-gray-500"
                                }`}
                        >
                            No Workspace Found
                        </div>
                    ) : (
                        SpaceJson.map((w: any, i: number) => (
                            <div
                                key={i}
                                onMouseEnter={() => setid(i)}
                                onMouseLeave={() => setid(null)}
                                className={`
          group flex items-center justify-between
          p-3 rounded-xl border transition-all duration-200 cursor-pointer
          ${theme === "Dark"
                                        ? "border-gray-800 bg-[#111827] hover:bg-[#1a2234]"
                                        : "border-gray-200 bg-white hover:bg-gray-50"
                                    }
        `}
                            >
                                {/* left */}
                                <div className="flex items-center gap-3 min-w-0">
                                    <div
                                        className={`
              w-11 h-11 rounded-lg overflow-hidden flex items-center justify-center
              ${theme === "Dark"
                                                ? "bg-gray-800"
                                                : "bg-gray-100"
                                            }
            `}
                                    >
                                        <img
                                            src={w?.workspaceicon?.img}
                                            alt={w?.workspaceSetup?.workspaceDescription || "workspace"}
                                            className="w-7 h-7 object-contain"
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <h2 className="text-sm font-semibold truncate">
                                            {w?.workspaceSetup?.workspaceName}
                                        </h2>

                                        <p
                                            className={`text-xs truncate ${theme === "Dark"
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                                }`}
                                        >
                                            {w?.workspaceSetup?.createby?.userName || "User"} • Lead
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`flex items-center gap-3 transition-all duration-200
          ${id === i
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                                        }
          ${theme === "Dark"
                                            ? "text-gray-300"
                                            : "text-gray-600"
                                        }`}
                                >
                                    <div
                                        className={`
    p-2 rounded-lg transition-all duration-200 cursor-pointer
    ${w?.isStaredUsers?.userEmail === useremail
                                                ? "bg-yellow-400 text-white shadow-md"
                                                : theme === "Dark"
                                                    ? "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-yellow-400"
                                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-yellow-500"
                                            }
  `}
                                        title={
                                            w?.isStaredUsers?.userEmail == useremail
                                                ? "Remove from Favorites"
                                                : "Add to Favorites"
                                        }
                                    >
                                        <FiStar
                                            className={`
      transition-transform duration-200 hover:scale-110
      ${w?.isStaredUsers?.userEmail == useremail
                                                    ? "fill-current"
                                                    : ""
                                                }
    `}
                                        />
                                    </div>

                                    <FiEye
                                        className="hover:scale-110 transition"
                                        onClick={() => setwork(w)}
                                        title="Open Workspace"
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* FOOTER */}
                <div className="text-center pt-4 text-xs opacity-60">
                    View all spaces • Any recommended spaces will appear here
                </div>
            </div>
        </div>
    );
}

export default WorkspaceViwe;