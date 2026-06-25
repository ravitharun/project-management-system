import { IoClose } from "react-icons/io5"
import { WorkSpaceIcon } from "../types/workspaceIcon"
import { useContext, useState } from "react"
import { instance } from "../services/apiservices"
import { toast } from "react-toastify"
import { checkuser, useremail } from "./LocalStorage"
import { allowedtype } from "../types/CustomUploadFormat"
import UploadingLoader from "./UploadingLoader"
import bgthemeContext from "../Context/ThemeContext"

function Chooseicon({
    close,
    id
}: any) {
    const [choosed, setchoosed] = useState("")

 const context = useContext(bgthemeContext);
    const { theme }: any = context
    const [isuploading, setisuploading] = useState<boolean>(false)
    const handleUpdateIcon = async () => {



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
            if (error.response.status == 401) {
             return   checkuser()
                // redirect("")

            }

        }

    }




    // /HandelUploadCustomUpload
    const HandelUploadCustomUpload = async (e: any) => {
        const file: any = e.target.files[0]

        if (!file) {

            return toast.info("fiel is rewuired.")


        }
        if (!allowedtype.includes(file.type)) { return toast.info("Only PNG and JPEG image formats are allowed.") }
        if (file.size > 5 * 1024 * 1024) {
            return toast.info(`File size must be less than 5MB. Uploaded file size: ${(file.size / (1024 * 1024)).toFixed(2)} MB`)
        }



        const formdata = new FormData()
        formdata.append("CustomUploadIcon", file)
        formdata.append("AddedBy", useremail)
        formdata.append("workspaceSpaceId", id)
        try {
            setisuploading(true);

            const responseUpload = await instance.put(
                "/api/WorkSpace/CustomUopload/Icon",
                formdata,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(responseUpload, "responseUpload");
            if (responseUpload?.status == 200) {
                return toast.success(responseUpload?.data.message)
            }

        } catch (error: any) {

            // console.error(error?.response?.data?.status, "error");
            if (error?.response?.status == 400) {

                return toast.info(error?.response?.data?.message)
            }
            if (error.response.status == 401) {
               return checkuser()
                // redirect("")

            }

        } finally {
            setisuploading(false);
        }


    }
    return (


        <>
            <>
                {isuploading && (
                    <UploadingLoader
                        type="Uploading Custom Workspace Icon"
                        useCase="Icon"
                    />
                )}

                <div className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

                    <div
                        className={`
                w-full max-w-2xl max-h-[85vh]
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
                    flex items-center justify-between px-6 py-5 border-b shrink-0

                    ${theme === "Dark"
                                    ? "border-gray-800 bg-[#0f172a]"
                                    : "border-gray-200 bg-gray-50"
                                }
                `}
                        >

                            <div>
                                <h2 className="text-xl font-semibold">
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
                                    Select or upload an icon for your workspace
                                </p>
                            </div>

                            <button
                                onClick={() => close(false)}
                                className={`
                        p-2 rounded-xl transition-all duration-200

                        ${theme === "Dark"
                                        ? "hover:bg-[#1e293b]"
                                        : "hover:bg-gray-200"
                                    }
                    `}
                            >
                                <IoClose size={22} />
                            </button>
                        </div>

                        {/* ================= BODY ================= */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">

                            {/* ================= ICON GRID ================= */}
                            <div>

                                <h3
                                    className={`
                            text-sm font-semibold mb-4 uppercase tracking-wide

                            ${theme === "Dark"
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                        }
                        `}
                                >
                                    Workspace Icons
                                </h3>

                                <div className="grid grid-cols-4 gap-4">

                                    {WorkSpaceIcon.map((itm: any) => (

                                        <div
                                            key={itm.id}
                                            onClick={() => setchoosed(itm.img)}
                                            className={`
                                    relative flex flex-col items-center justify-center
                                    p-4 rounded-2xl cursor-pointer border
                                    transition-all duration-300 group

                                    ${choosed === itm.img
                                                    ? "border-blue-500 shadow-lg shadow-blue-500/20 scale-[1.03]"
                                                    : theme === "Dark"
                                                        ? "border-gray-800 hover:border-gray-600 hover:bg-[#1e293b]"
                                                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                                                }
                                `}
                                        >

                                            {/* ICON BOX */}
                                            <div
                                                className={`
                                        w-16 h-16 rounded-2xl
                                        flex items-center justify-center
                                        overflow-hidden transition-all

                                        ${theme === "Dark"
                                                        ? "bg-[#0f172a]"
                                                        : "bg-gray-100"
                                                    }
                                    `}
                                            >
                                                <img
                                                    src={itm?.img}
                                                    alt={itm?.name}
                                                    className="w-9 h-9 object-contain group-hover:scale-110 transition duration-300"
                                                />
                                            </div>

                                            {/* NAME */}
                                            <p
                                                className={`
                                        text-[12px] text-center mt-3 font-medium line-clamp-2

                                        ${theme === "Dark"
                                                        ? "text-gray-300"
                                                        : "text-gray-700"
                                                    }
                                    `}
                                            >
                                                {itm?.name}
                                            </p>

                                            {/* SELECTED BADGE */}
                                            {choosed === itm.img && (
                                                <div className="absolute top-2 right-2">
                                                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-[11px]">
                                                        ✓
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    ))}

                                </div>
                            </div>

                            {/* ================= UPLOAD SECTION ================= */}
                            <div
                                className={`
                        rounded-3xl border p-5 transition-all duration-300

                        ${theme === "Dark"
                                        ? "bg-[#0f172a] border-gray-800"
                                        : "bg-gray-50 border-gray-200"
                                    }
                    `}
                            >

                                {/* TITLE */}
                                <div className="mb-5">

                                    <h3 className="text-lg font-semibold">
                                        Upload Custom Icon
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
                                        PNG, JPG or SVG supported
                                    </p>
                                </div>

                                {/* DROP AREA */}
                                <label
                                    htmlFor="UploadCustomIcon"
                                    className={`
                            group cursor-pointer flex flex-col items-center justify-center
                            border-2 border-dashed rounded-3xl p-10
                            transition-all duration-300 hover:scale-[1.01]

                            ${theme === "Dark"
                                            ? "border-gray-700 hover:border-blue-500 bg-[#111827]"
                                            : "border-gray-300 hover:border-blue-500 bg-white"
                                        }
                        `}
                                >

                                    {/* ICON */}
                                    <div
                                        className={`
                                w-20 h-20 rounded-full
                                flex items-center justify-center mb-5
                                transition-all duration-300

                                ${theme === "Dark"
                                                ? "bg-[#1e293b]"
                                                : "bg-blue-100"
                                            }
                            `}
                                    >
                                        <span className="text-4xl">📤</span>
                                    </div>

                                    {/* TEXT */}
                                    <p className="text-base font-semibold text-center">
                                        Click to Upload Icon
                                    </p>

                                    <span
                                        className={`
                                text-sm mt-2 text-center

                                ${theme === "Dark"
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                            }
                            `}
                                    >
                                        Drag & Drop your file here
                                    </span>

                                    {/* INPUT */}
                                    <input
                                        type="file"
                                        name="CustomIcon"
                                        id="UploadCustomIcon"
                                        onChange={HandelUploadCustomUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                        </div>

                        {/* ================= FOOTER ================= */}
                        <div
                            className={`
                    flex justify-end gap-3 px-6 py-5 border-t shrink-0

                    ${theme === "Dark"
                                    ? "border-gray-800 bg-[#0f172a]"
                                    : "border-gray-200 bg-gray-50"
                                }
                `}
                        >

                            <button
                                onClick={() => close(false)}
                                className={`
                        px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200

                        ${theme === "Dark"
                                        ? "bg-[#1e293b] hover:bg-[#263244]"
                                        : "bg-gray-200 hover:bg-gray-300"
                                    }
                    `}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => handleUpdateIcon()}
                                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-lg shadow-blue-500/20"
                            >
                                Save Icon
                            </button>

                        </div>

                    </div>
                </div>
            </>
        </>
    )
}

export default Chooseicon