import { IoClose } from "react-icons/io5";
import { FiStar, FiEye } from "react-icons/fi";
import { useEffect, useState } from "react";
import { instance } from "../services/apiservices";


function StartMenuList({
    setStarMenu,
    theme,
    // Workspace,
    useremail,
    handelSelectSpace,
}: any) {

    const [star, setstar] = useState<any[]>([])


    useEffect(() => {
        const FetchStarWorkspace = async () => {
            try {
                const response = await instance.get("/api/workspace/Star", {
                    params: {
                        email: useremail
                    }
                })
                console.log(response, 'star')
                setstar(response.data.Stardata)
            } catch (error: any) {
                console.log(error)

            }
        }
        FetchStarWorkspace()
    }, [])

    console.log(star, 'starstarstar')


    return (
        <div
            className={`
                fixed top-5 left-[90px] md:left-[280px]
                w-[320px] max-h-[500px]
                rounded-3xl border shadow-2xl z-[999]
                overflow-hidden animate-in fade-in zoom-in-95 duration-200

                ${theme === "Dark"
                    ? "bg-[#111827] border-gray-800 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }
            `}
        >

            {/* ================= HEADER ================= */}
            <div
                className={`
                    flex items-center justify-between
                    px-5 py-4 border-b

                    ${theme === "Dark"
                        ? "border-gray-800"
                        : "border-gray-200"
                    }
                `}
            >

                <div>
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        ⭐ Starred
                    </h2>

                    <p
                        className={`text-xs mt-1
                            ${theme === "Dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }
                        `}
                    >
                        Quick access favorite spaces
                    </p>
                </div>

                <button
                    onClick={() => setStarMenu(false)}
                    className={`
                        p-2 rounded-xl transition-all

                        ${theme === "Dark"
                            ? "hover:bg-[#1E293B]"
                            : "hover:bg-gray-100"
                        }
                    `}
                >
                    <IoClose size={18} />
                </button>
            </div>

            {/* ================= LIST ================= */}
            <div className="p-3 space-y-2 overflow-y-auto max-h-[420px]">

                {star.length === 0 ? (

                    <div className="flex flex-col items-center justify-center py-12 text-center">

                        <div className="text-5xl mb-3">
                            ⭐
                        </div>

                        <h3 className="font-semibold text-sm">
                            No Starred Workspace
                        </h3>

                        <p
                            className={`text-xs mt-2
                                ${theme === "Dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }
                            `}
                        >
                            Add workspaces to favorites
                        </p>
                    </div>

                ) : (

                    star.map((itm: any, idx: number) => (

                        <div
                            key={idx}
                            onClick={() => handelSelectSpace(itm?.workspaceID)}
                            className={`
                                group flex items-center justify-between
                                gap-3 p-3 rounded-2xl cursor-pointer
                                transition-all duration-200

                                ${theme === "Dark"
                                    ? "hover:bg-[#1E293B] bg-[#0F172A]"
                                    : "hover:bg-gray-100 bg-gray-50"
                                }
                            `}
                        >

                            {/* LEFT */}
                            <div className="flex items-center gap-3 min-w-0">

                                <div
                                    className={`
                                        w-11 h-11 rounded-xl flex items-center justify-center shrink-0

                                        ${theme === "Dark"
                                            ? "bg-[#1E293B]"
                                            : "bg-white"
                                        }
                                    `}
                                >
                                    <img
                                        src={itm?.workspaceID?.workspaceicon?.img}
                                        alt="Not Founf"
                                        className="w-6 h-6 object-cover rounded-md"
                                    />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-sm font-semibold truncate">
                                        {itm?.workspaceSetup?.workspaceName}
                                    </h3>

                                    <p
                                        className={`text-xs mt-1 truncate
                                            ${theme === "Dark"
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                            }
                                        `}
                                    >
                                        {itm?.workspaceID?.workspaceSetup?.workspaceName || "workspaceName"}
                                    </p>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="flex items-center gap-2">

                                <button
                                    className="
                                        p-2 rounded-xl
                                        bg-yellow-400 text-white
                                        shadow-md shadow-yellow-300/20
                                    "
                                >
                                    <FiStar
                                        className="fill-current"
                                        size={14}
                                    />
                                </button>

                                <button
                                    className={`
                                        p-2 rounded-xl transition-all

                                        ${theme === "Dark"
                                            ? "bg-[#1E293B] hover:bg-blue-600"
                                            : "bg-white hover:bg-blue-600 hover:text-white"
                                        }
                                    `}
                                     onClick={() => handelSelectSpace(itm?.workspaceID)}
                                >
                                    <FiEye size={14} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div >
    );
}

export default StartMenuList;