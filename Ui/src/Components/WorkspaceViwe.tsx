import { useState } from "react";
import {
    FiGrid,
    FiStar,

    FiEye,
    FiSearch,
} from "react-icons/fi";

function WorkspaceViwe({ theme }: any) {



    const [type, settype] = useState("Recommended")

    const [id, setid] = useState<number | null>(null)
    const spaces = ["mnk", "kkl", "check"];

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

                {/* SEARCH */}
                <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-md border ${theme === "Dark"
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-300 bg-white"
                        }`}
                >
                    <FiSearch className="opacity-60" />
                    <input
                        placeholder="Search workspaces..."
                        className="bg-transparent w-full outline-none text-sm"
                    />
                </div>

                {/* FILTERS */}
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

                {/* SECTIONS TITLE */}
                <div className="text-sm opacity-70">
                    Recommended spaces
                </div>

                {/* SPACES LIST */}
                <div className="space-y-3">
                    {spaces.map((w, i) => (
                        <div
                            key={i}
                            className={`flex items-center justify-between p-4 rounded-md border cursor-pointer transition ${theme === "Dark"
                                ? "border-gray-800 hover:bg-gray-900"
                                : "border-gray-200 hover:bg-white"
                                }`}


                            onMouseEnter={() => setid(i)}
                            onMouseLeave={() => setid(null)}
                        >
                            {/* LEFT */}
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-10 h-10 flex items-center justify-center rounded-md ${theme === "Dark"
                                        ? "bg-gray-800"
                                        : "bg-gray-200"
                                        }`}
                                >
                                    <FiGrid />
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium">
                                        {w}
                                    </h3>
                                    <p className="text-xs opacity-60">
                                        Tharun Ravi (space lead)
                                    </p>
                                </div>
                            </div>

                            {/* RIGHT ACTIONS */}
                            {id == i && <div className="flex items-center gap-3 opacity-70">
                                <FiStar />
                                <FiEye />
                            </div>}
                        </div>
                    ))}
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