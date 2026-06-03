import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { IoArrowBack, IoGridOutline } from "react-icons/io5"
import bgthemeContext from "../Context/ThemeContext"
import Chooseicon from "./Chooseicon"

function ProjectSettings() {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [chooseIcon, setchooseIcon] = useState()
    console.log(chooseIcon,'chooseIcon')
    // console.log(chooseIcon,'chooseIcon')
    const [close, setclose] = useState(false)

    const data = state?.CreatedWorkSpace

    const themeContext = useContext(bgthemeContext)
    const { theme }: any = themeContext
    

    return (
        <>


            {close && <Chooseicon  close={setclose} theme={theme} selectedIcon={data?.workspaceicon?.img}/>}
            <div
                className={`
                min-h-screen w-full transition-all duration-300
                ${theme === "Dark"
                        ? "bg-[#0f172a] text-white"
                        : "bg-[#f5f7fb] text-black"
                    }
            `}
            >

                {/* ================= HERO SECTION ================= */}
                <div
                    className="relative h-[280px] w-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${data?.workspaceBackground})`
                    }}
                >

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* CONTENT */}
                    <div className="relative z-10 h-full px-6 md:px-12 flex flex-col justify-between py-6">

                        {/* TOP */}
                        <div className="flex items-center justify-between">

                            <button
                                onClick={() => navigate(-1)}
                                className="
                                flex items-center gap-2
                                px-4 py-2 rounded-xl
                                bg-white/10 backdrop-blur-md
                                text-white hover:bg-white/20 transition
                            "
                            >
                                <IoArrowBack size={18} />
                                Back
                            </button>

                            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500 text-white shadow-lg">
                                Last Created
                            </span>
                        </div>

                        {/* BOTTOM */}
                        <div className="flex items-end justify-between flex-wrap gap-5">

                            <div className="flex items-center gap-4">

                                <div className="w-20 h-20 rounded-3xl overflow-hidden bg-white shadow-xl" onClick={() => {
                                    setchooseIcon(data?.workspaceicon?.img)


                                    setclose(true)
                                }}>
                                    <img
                                        src={data?.workspaceicon?.img}
                                        alt="workspace"
                                        className="w-full h-full object-cover"

                                    />
                                </div>

                                <div>
                                    <h1 className="text-3xl font-bold text-white">
                                        {data?.workspaceName}
                                    </h1>

                                    <p className="text-gray-200 mt-1 max-w-xl text-sm">
                                        {data?.description}
                                    </p>

                                    <div className="flex items-center gap-2 mt-3">
                                        <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white">
                                            {data?.type}
                                        </span>

                                        <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white">
                                            {data?.defaultView}
                                        </span>

                                        <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white">
                                            {data?.product}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* ================= BODY ================= */}
                <div className="px-6 md:px-12 py-8">

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* LEFT SIDE */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* ABOUT */}
                            <div
                                className={`
                                rounded-3xl p-6 border

                                ${theme === "Dark"
                                        ? "bg-[#111827] border-gray-800"
                                        : "bg-white border-gray-200"
                                    }
                            `}
                            >
                                <h2 className="text-xl font-semibold mb-4">
                                    About Workspace
                                </h2>

                                <p
                                    className={`
                                    leading-7 text-sm
                                    ${theme === "Dark"
                                            ? "text-gray-300"
                                            : "text-gray-600"
                                        }
                                `}
                                >
                                    {data?.detailedInfo}
                                </p>
                            </div>

                            {/* BOARD COLUMNS */}
                            <div
                                className={`
                                rounded-3xl p-6 border

                                ${theme === "Dark"
                                        ? "bg-[#111827] border-gray-800"
                                        : "bg-white border-gray-200"
                                    }
                            `}
                            >

                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-xl font-semibold">
                                        Workflow Columns
                                    </h2>

                                    <div className="flex items-center gap-2 text-sm text-blue-500">
                                        <IoGridOutline />
                                        Board Structure
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3">

                                    {data?.columns?.map((itm: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className={`
                                            px-4 py-3 rounded-2xl border text-sm font-medium transition

                                            ${theme === "Dark"
                                                    ? "bg-[#0f172a] border-gray-700 hover:border-blue-500"
                                                    : "bg-gray-50 border-gray-200 hover:border-blue-400"
                                                }
                                        `}
                                        >
                                            {itm?.name}
                                        </div>
                                    ))}

                                </div>
                            </div>

                        </div>

                        {/* RIGHT SIDE */}
                        <div className="space-y-6">

                            {/* QUICK INFO */}
                            <div
                                className={`
                                rounded-3xl p-6 border

                                ${theme === "Dark"
                                        ? "bg-[#111827] border-gray-800"
                                        : "bg-white border-gray-200"
                                    }
                            `}
                            >
                                <h2 className="text-lg font-semibold mb-5">
                                    Workspace Info
                                </h2>

                                <div className="space-y-4">

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Created By
                                        </p>

                                        <h3 className="font-medium mt-1">
                                            {data?.workspaceSetup?.createby?.userEmail}
                                        </h3>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Default View
                                        </p>

                                        <h3 className="font-medium mt-1">
                                            {data?.defaultView}
                                        </h3>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Workspace Type
                                        </p>

                                        <h3 className="font-medium mt-1 capitalize">
                                            {data?.type}
                                        </h3>
                                    </div>

                                </div>
                            </div>

                            {/* AVAILABLE VIEWS */}
                            <div
                                className={`
                                rounded-3xl p-6 border

                                ${theme === "Dark"
                                        ? "bg-[#111827] border-gray-800"
                                        : "bg-white border-gray-200"
                                    }
                            `}
                            >
                                <h2 className="text-lg font-semibold mb-5">
                                    Available Views
                                </h2>

                                <div className="flex flex-wrap gap-2">

                                    {data?.workspaceSetup?.views?.map((view: any, idx: number) => (
                                        <span
                                            key={idx}
                                            className={`
                                            px-3 py-2 rounded-xl text-xs font-medium

                                            ${theme === "Dark"
                                                    ? "bg-[#0f172a] text-gray-300"
                                                    : "bg-gray-100 text-gray-700"
                                                }
                                        `}
                                        >
                                            {view}
                                        </span>
                                    ))}

                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>

    )
}

export default ProjectSettings