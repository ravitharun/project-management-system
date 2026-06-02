import { IoClose } from "react-icons/io5"
import bgthemeContext from "../Context/ThemeContext"
import { useContext, useState } from "react"
import { instance } from "../services/apiservices"
import { toast, ToastContainer } from "react-toastify"

function WorkspacePanel({ SetBackground, id }: any) {
    // console.log({ SetBackground, id })
    const themecontext = useContext(bgthemeContext)
    const { theme }:any = themecontext
    const [selectedImg, setSelectedImg] = useState<string | null>(null)

    const images = [
        "https://picsum.photos/id/1015/600/400",
        "https://picsum.photos/id/1016/600/400",
        "https://picsum.photos/id/1018/600/400",
        "https://picsum.photos/id/1020/600/400",
        "https://picsum.photos/id/1024/600/400",
        "https://picsum.photos/id/1035/600/400",
        "https://picsum.photos/id/1039/600/400",
        "https://picsum.photos/id/1043/600/400",
    ]


    const saveBackgroundWorksapce = async () => {
        try {
            console.log({
                "selectedImg": selectedImg,
                "id": id
            })

            if (!selectedImg) {



                return toast.info("Please select an image.")
            }
            const response = await instance.patch("/api/workspace/updateBackgroundspace", {
                selectedImg: selectedImg,
                id: id
            })
            console.log(response, 'response')
            if (response.data.message ==
                "Updated the workspaceBackground.") {
                return toast.success(
                    "Updated the workspaceBackground.")
            }

        } catch (error: any) {
            console.log(error.message, 'err')

        }
    }

    return (
        <>
            {/* ================= BACKDROP ================= */}
            {/* {SetBackground} */}
            <ToastContainer
                theme="light"
                position="top-center"
                autoClose={1000}
            />
            <div
                className={`
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[95%] md:w-[760px]
        max-h-[90vh] overflow-hidden
        rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]
        border z-[100] flex flex-col backdrop-blur-xl
        transition-all duration-300

        ${theme === "Dark"
                        ? "bg-[#0f172a]/95 border-gray-800 text-white"
                        : "bg-white/95 border-gray-200 text-gray-900"
                    }
    `}
                onClick={(e) => e.stopPropagation()}
            >

                {/* ================= HEADER ================= */}
                <div
                    className={`
            flex items-center justify-between px-6 py-5 border-b
            ${theme === "Dark"
                            ? "border-gray-800"
                            : "border-gray-200"
                        }
        `}
                >
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">
                            Workspace Background
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
                            Personalize your workspace appearance
                        </p>
                    </div>

                    <button
                        onClick={() => SetBackground(false)}
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
                <div className="p-6 overflow-y-auto space-y-7">

                    {/* TITLE */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-semibold">
                                Select Background
                            </h3>

                            <p
                                className={`
                        text-sm mt-1
                        ${theme === "Dark"
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                    }
                    `}
                            >
                                Choose one of the curated backgrounds
                            </p>
                        </div>
                    </div>

                    {/* IMAGE GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                        {images.map((img, i) => (
                            <div
                                key={i}
                                onClick={() => setSelectedImg(img)}
                                className={`
                        relative group overflow-hidden rounded-2xl
                        cursor-pointer border transition-all duration-300

                        ${selectedImg === img
                                        ? "border-blue-500 scale-[1.03] shadow-lg shadow-blue-500/20"
                                        : theme === "Dark"
                                            ? "border-gray-800 hover:border-gray-600"
                                            : "border-gray-200 hover:border-gray-400"
                                    }
                    `}
                            >

                                <img
                                    src={img}
                                    className="w-full h-36 object-cover group-hover:scale-110 transition duration-500"
                                />

                                {/* OVERLAY */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

                                {/* SELECTED */}
                                {selectedImg === img && (
                                    <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                                        Selected
                                    </div>
                                )}
                            </div>
                        ))}

                    </div>

                    {/* ================= UPLOAD SECTION ================= */}
                    <div
                        className={`
                rounded-3xl border p-6 transition

                ${theme === "Dark"
                                ? "border-gray-800 bg-[#111827]"
                                : "border-gray-200 bg-gray-50"
                            }
            `}
                    >

                        <div className="mb-5">
                            <h3 className="text-lg font-semibold">
                                Upload Custom Background
                            </h3>

                            <p
                                className={`
                        text-sm mt-1
                        ${theme === "Dark"
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                    }
                    `}
                            >
                                Add your own image to personalize the workspace
                            </p>
                        </div>

                        <label
                            htmlFor="backgroundUpload"
                            className={`
                    flex flex-col items-center justify-center
                    w-full h-52 rounded-2xl border-2 border-dashed
                    cursor-pointer transition-all duration-300

                    ${theme === "Dark"
                                    ? "border-gray-700 hover:border-blue-500 hover:bg-[#0f172a]"
                                    : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                                }
                `}
                        >

                            <div
                                className={`
                        w-16 h-16 rounded-2xl flex items-center justify-center mb-4
                        ${theme === "Dark"
                                        ? "bg-[#1e293b]"
                                        : "bg-white"
                                    }
                    `}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`
                            w-8 h-8
                            ${theme === "Dark"
                                            ? "text-gray-300"
                                            : "text-gray-500"
                                        }
                        `}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                                    />
                                </svg>
                            </div>

                            <p className="font-medium text-sm">
                                Click to upload or drag & drop
                            </p>

                            <span
                                className={`
                        text-xs mt-2
                        ${theme === "Dark"
                                        ? "text-gray-500"
                                        : "text-gray-400"
                                    }
                    `}
                            >
                                PNG, JPG or JPEG
                            </span>
                        </label>

                        <input
                            id="backgroundUpload"
                            type="file"
                            className="hidden"
                        />
                    </div>
                </div>

                {/* ================= FOOTER ================= */}
                <div
                    className={`
            px-6 py-5 border-t flex items-center justify-end gap-3

            ${theme === "Dark"
                            ? "border-gray-800 bg-[#0b1220]"
                            : "border-gray-200 bg-gray-50"
                        }
        `}
                >

                    <button
                        onClick={() => SetBackground(false)}
                        className={`
                px-5 py-2.5 rounded-xl font-medium transition

                ${theme === "Dark"
                                ? "bg-[#1e293b] hover:bg-[#273449]"
                                : "bg-gray-200 hover:bg-gray-300"
                            }
            `}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={saveBackgroundWorksapce}
                        className="
                px-5 py-2.5 rounded-xl font-medium
                bg-blue-600 text-white hover:bg-blue-700
                transition shadow-lg shadow-blue-500/20
            "
                    >
                        Save Background
                    </button>

                </div>
            </div>







        </>
    )
}

export default WorkspacePanel