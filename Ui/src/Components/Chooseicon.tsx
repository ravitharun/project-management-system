import { IoClose } from "react-icons/io5"
import { WorkSpaceIcon } from "../types/workspaceIcon"
import { useState } from "react"
import { instance } from "../services/apiservices"
import { toast } from "react-toastify"

function Chooseicon({
    selectedIcon,
    theme,
    close,
    id
}: any) {
    const [choosed, setchoosed] = useState("")
    const handleUpdateIcon = async () => {
        console.log(choosed, id)



        const data = {
            choosed,
            id
        }


        try {
            const response = await instance.patch("/api/workspace/updateSpaceIcon", { data: data })



            if (response.status == 200) {
                return toast.success("Workspace icons updated successfully");
            }

        } catch (error: any) {
   console.error(error.message)

        }
    }
    return (

        <>


            <div className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

                <div
                    className={`
                    w-full max-w-2xl max-h-[70vh]
                    rounded-3xl shadow-2xl border
                    overflow-hidden flex flex-col

                    ${theme === "Dark"
                            ? "bg-[#111827] border-gray-800 text-white"
                            : "bg-white border-gray-200 text-black"
                        }
                `}
                >

                    {/* ================= HEADER ================= */}
                    <div
                        className={`
                        flex items-center justify-between px-5 py-4 border-b shrink-0

                        ${theme === "Dark"
                                ? "border-gray-800"
                                : "border-gray-200"
                            }
                    `}
                    >

                        <div>
                            <h2 className="text-lg font-semibold">
                                Choose Workspace Icon
                            </h2>

                            <p
                                className={`
                                text-sm mt-1
                                ${theme === "Dark"
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                    }
                            `}
                            >
                                Select an icon for your workspace
                            </p>
                        </div>

                        <button
                            onClick={() => close(false)}
                            className={`
                            p-2 rounded-xl transition

                            ${theme === "Dark"
                                    ? "hover:bg-[#1e293b]"
                                    : "hover:bg-gray-100"
                                }
                        `}
                        >
                            <IoClose size={20} />
                        </button>
                    </div>

                    {/* ================= BODY ================= */}
                    <div className="p-5 overflow-y-auto flex-1">

                        <div className="grid grid-cols-4 gap-4">

                            {WorkSpaceIcon.map((itm: any) => (

                                <div
                                    key={itm.id}
                                    className={`
                                    relative flex flex-col items-center justify-center
                                    p-4 rounded-2xl cursor-pointer border
                                    transition-all duration-200 group
${choosed == itm.img && "shadow-lg shadow-blue-500/20 border-2 border-green-900"}
                                    ${selectedIcon === itm?.img
                                            ? "border-blue-500 shadow-lg shadow-blue-500/20"
                                            : theme === "Dark"
                                                ? "border-gray-800 hover:border-gray-600 hover:bg-[#1e293b]"
                                                : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                                        }
                                `}
                                    onClick={() => setchoosed(itm.img)}
                                >
                                    <div>
                                        {/* {selectedIcon == itm?.img ? "true" : "false"} */}
                                    </div>
                                    {/* ICON */}
                                    <div
                                        className={`
                                        w-14 h-14 rounded-2xl
                                        flex items-center justify-center
                                        overflow-hidden transition

                                        ${theme === "Dark"
                                                ? "bg-[#0f172a]"
                                                : "bg-gray-100"
                                            }
                                    `}
                                    >
                                        <img
                                            src={itm?.img}
                                            alt={itm?.name}
                                            className="w-8 h-8 object-contain group-hover:scale-110 transition duration-300"
                                        />
                                    </div>

                                    {/* NAME */}
                                    <p
                                        className={`
                                        text-[11px] text-center mt-3 font-medium line-clamp-2

                                        ${theme === "Dark"
                                                ? "text-gray-300"
                                                : "text-gray-700"
                                            }
                                    `}
                                    >
                                        {itm?.name}
                                    </p>

                                    {/* SELECTED BADGE */}
                                    {selectedIcon?.id === itm?.id && (
                                        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-blue-500" />
                                    )}

                                </div>
                            ))}

                        </div>
                    </div>

                    {/* ================= FOOTER ================= */}
                    <div
                        className={`
                        flex justify-end gap-3 px-5 py-4 border-t shrink-0

                        ${theme === "Dark"
                                ? "border-gray-800 bg-[#0b1220]"
                                : "border-gray-200 bg-gray-50"
                            }
                    `}
                    >

                        <button
                            onClick={() => close(false)}
                            className={`
                            px-4 py-2 rounded-xl text-sm font-medium transition

                            ${theme === "Dark"
                                    ? "bg-[#1e293b] hover:bg-[#263244]"
                                    : "bg-gray-200 hover:bg-gray-300"
                                }
                        `}
                        >
                            Cancel
                        </button>

                        <button
                            className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition"
                            onClick={() => handleUpdateIcon()}
                        >
                            Save Icon
                        </button>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Chooseicon