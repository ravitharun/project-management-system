import { useContext, useState } from "react"
import bgthemeContext from "../../Context/ThemeContext"
import { IoClose } from "react-icons/io5"
import { checkuser, useremail } from "../LocalStorage"
import { instance } from "../../services/apiservices"
import { WorkSpaceIcon } from "../../types/workspaceIcon"

function TemplateSpace({ SettemplatesChoosed, templatename, templates }: any) {
    const context = useContext(bgthemeContext)
    const [type, settypeForm] = useState("workspaceform")
    const { theme }: any = context
    const [currpage, setcurrpage] = useState<number>(1)

    const [Statuses, setStatuses] = useState<string[]>(templates?.workspaceSetup?.statuses)
    const [WorkTypes, setWorkTypes] = useState<string[]>(templates?.columns)
    const [workspaceName, setworkspaceName] = useState<string>("")
    const [workspaceDescription, setworkspaceDescription] = useState("")
    const [error, seterror] = useState("")


    const handelAddinputsWorktypes = () => {
        setWorkTypes([...WorkTypes, ""])
    }


    const handelAddinputs = () => {
        setStatuses([
            ...Statuses,
            ""
        ])
    }


    const handelInputdata = (e: any, id: number) => {
        const inputdata = [...Statuses]
        inputdata[id] = e.target.value
        setStatuses(inputdata)
    }


    const handelGetWorktypes = (e: any, id: number) => {
        const Worktyp = [...WorkTypes]
        Worktyp[id] = e.target.value
        setWorkTypes(Worktyp)

    }

    const FormPage: number = 3;



    const handelCheckinputs = () => {

        if (!workspaceName) {
            return seterror("TO create Your workspace workspaceNameName is required.")
        }


        settypeForm("CreateWorkspace")
        setcurrpage(currpage + 1)
        // handelCheckinputs()   
    }


    const submit = async () => {

        const updatedData = {
            ...templates,
            workspaceName: workspaceName,
            workspaceicon:WorkSpaceIcon[0],
            workspaceDescription: workspaceDescription,
            createby: {
                userEmail: useremail
            }
        }


        if (templates.workspaceSetup.statuses != Statuses) {
            return updatedData.workspaceSetup.statuses = Statuses
            // console.log("updated with new Statsu")
        }
        if (templates.workspaceSetup.workTypes != WorkTypes) {
            return updatedData.workspaceSetup.workTypes = WorkTypes
            // console.log("updated with new workTypes")

        }



        try {

            const response = await instance.post("/api/WorkSpace/create", { updatedData })
            console.log(response.data.message)
            if (response.data.message == response.data.message) {
                // settypeForm("CreatingWorkspace")

                setTimeout(() => {
                    setcurrpage(FormPage)
                    settypeForm("Created")

                }, 2500);
            }
        } catch (error: any) {
               console.error(error.message)
                if (error.response.status == 401) {
                               return    checkuser()
                                   // redirect("")
               
                               }

        }


    }
    return (

        <div
            className={`fixed inset-0 z-50 flex flex-col overflow-hidden
    ${theme === "Dark"
                    ? "bg-[#0b1120]"
                    : "bg-[#F4F5F7]"
                }`}
        >
            {/* ================= TOPBAR ================= */}

            <div
                className={`sticky top-0 z-30 h-[72px] px-4 md:px-8 flex items-center justify-between border-b
        ${theme === "Dark"
                        ? "bg-[#0b1120] border-white/10"
                        : "bg-white border-[#E5E7EB]"
                    }`}
            >
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex w-11 h-11 rounded-2xl bg-blue-600 items-center justify-center">
                        <span className="text-white font-bold text-lg">
                            T
                        </span>
                    </div>

                    <div>
                        <h2
                            className={`text-[20px] md:text-[24px] font-bold capitalize
                    ${theme === "Dark"
                                    ? "text-white"
                                    : "text-[#172B4D]"
                                }`}
                        >
                            Create Workspace

                            <span
                                className={`ml-2 text-[16px] italic
                        ${theme === "Dark"
                                        ? "text-blue-400"
                                        : "text-blue-600"
                                    }`}
                            >
                                {templatename}
                            </span>
                        </h2>

                        <p
                            className={`text-[13px] mt-1
                    ${theme === "Dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }`}
                        >
                            Create your workspace and organize projects easily.
                        </p>
                    </div>
                </div>

                <button
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition
            ${theme === "Dark"
                            ? "hover:bg-white/10 text-gray-300"
                            : "hover:bg-gray-100 text-[#42526E]"
                        }`}
                    onClick={() => SettemplatesChoosed(false)}
                >
                    <IoClose size={22} />
                </button>
            </div>

            {/* ================= BODY ================= */}

            <div className="flex-1 overflow-hidden">
                <div className="h-full grid lg:grid-cols-[500px_1fr]">
                    {/* ================= LEFT SIDE ================= */}

                    <div
                        className={`h-full overflow-y-auto px-4 md:px-8 py-6 border-r
                ${theme === "Dark"
                                ? "border-white/10"
                                : "border-[#E5E7EB]"
                            }`}
                    >
                        <div
                            className={`w-full max-w-[470px] mx-auto rounded-3xl border overflow-hidden shadow-lg
                    ${theme === "Dark"
                                    ? "bg-[#111827] border-white/10"
                                    : "bg-white border-[#E5E7EB]"
                                }`}
                        >
                            {/* HEADER */}

                            <div
                                className={`px-6 py-6 border-b
                        ${theme === "Dark"
                                        ? "border-white/10"
                                        : "border-[#F1F5F9]"
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3
                                            className={`text-[22px] font-bold
                                    ${theme === "Dark"
                                                    ? "text-white"
                                                    : "text-[#172B4D]"
                                                }`}
                                        >
                                            {type === "workspaceform"
                                                ? "Workspace Details"
                                                : type === "CreateWorkspace"
                                                    ? "Setup Workspace"
                                                    : "Creating Workspace"}
                                        </h3>

                                        <p
                                            className={`mt-2 text-sm leading-6
                                    ${theme === "Dark"
                                                    ? "text-gray-400"
                                                    : "text-gray-500"
                                                }`}
                                        >
                                            Configure your workspace settings and workflow.
                                        </p>
                                    </div>

                                    <div
                                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold
                                ${theme === "Dark"
                                                ? "bg-blue-500/15 text-blue-400"
                                                : "bg-blue-50 text-blue-600"
                                            }`}
                                    >
                                        {currpage}
                                    </div>
                                </div>

                                {/* PROGRESS */}

                                <div className="mt-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <span
                                            className={`text-xs
                                    ${theme === "Dark"
                                                    ? "text-gray-400"
                                                    : "text-gray-500"
                                                }`}
                                        >
                                            Progress
                                        </span>

                                        <span className="text-xs text-blue-500 font-semibold">
                                            {currpage}/{FormPage}
                                        </span>
                                    </div>

                                    <div
                                        className={`h-2 rounded-full overflow-hidden
                                ${theme === "Dark"
                                                ? "bg-white/10"
                                                : "bg-gray-100"
                                            }`}
                                    >
                                        <div
                                            className="h-full bg-blue-600 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${(currpage / FormPage) * 100}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* ================= FORM BODY ================= */}

                            <div className="p-6">
                                {/* ================= PAGE 1 ================= */}

                                {type === "workspaceform" && (
                                    <div className="space-y-6">
                                        <div>
                                            <label
                                                className={`text-sm font-semibold block mb-2
                                        ${theme === "Dark"
                                                        ? "text-gray-200"
                                                        : "text-[#344563]"
                                                    }`}
                                            >
                                                Workspace Name <span className="text-red-500">*</span>
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Taskaro Workspace"
                                                className={`w-full h-[52px] px-4 rounded-2xl border outline-none
                                        ${theme == "Dark"
                                                        ? "bg-[#1e293b] border-white/10 text-white placeholder:text-gray-500"
                                                        : "bg-[#FAFBFC] border-[#DFE1E6] text-[#172B4D]"
                                                    }`}
                                                onChange={(e) => setworkspaceName(e.target.value)}
                                            />


                                            {error && <>


                                                <span className="text-red-500">{error}</span>
                                            </>}
                                        </div>

                                        <div>
                                            <label
                                                className={`text-sm font-semibold block mb-2
                                        ${theme === "Dark"
                                                        ? "text-gray-200"
                                                        : "text-[#344563]"
                                                    }`}
                                            >
                                                Description
                                            </label>

                                            <textarea
                                                rows={5}
                                                placeholder="Describe your workspace..."
                                                className={`w-full p-4 rounded-2xl border outline-none resize-none
                                        ${theme === "Dark"
                                                        ? "bg-[#1e293b] border-white/10 text-white placeholder:text-gray-500"
                                                        : "bg-[#FAFBFC] border-[#DFE1E6] text-[#172B4D]"
                                                    }`}
                                                onChange={(e) => setworkspaceDescription(e.target.value)}

                                            />
                                        </div>
                                        <button
                                            className={`w-full h-[52px] rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold ${!workspaceName ? "cursor-not-allowed" : "cursor-pointer"}`}
                                            // disabled={!workspaceName ? true : false}
                                            onClick={handelCheckinputs}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                )}

                                {/* ================= PAGE 2 ================= */}

                                {type === "CreateWorkspace" && (
                                    <div className="space-y-7">
                                        {/* WORK TYPES */}

                                        <div>
                                            <h4
                                                className={`font-semibold mb-4
                                        ${theme === "Dark"
                                                        ? "text-white"
                                                        : "text-[#172B4D]"
                                                    }`}
                                            >
                                                Work Types
                                            </h4>

                                            <div className="grid grid-cols-2 gap-3">

                                                {WorkTypes.map((inp: any, idx: number) => (
                                                    <input
                                                        type="text"
                                                        value={inp.name}
                                                        key={idx}
                                                        onChange={(e) => handelGetWorktypes(e, idx)}
                                                        className={`
            w-full h-[48px] px-4 rounded-xl border outline-none
            transition-all duration-200 mb-3
            ${theme === "Dark"
                                                                ? "bg-[#111827] border-[#374151] text-white placeholder:text-gray-400 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
                                                                : "bg-white border-[#D0D7DE] text-[#172B4D] placeholder:text-gray-400 focus:border-[#0C66E4] focus:ring-2 focus:ring-[#0C66E4]/20"
                                                            }
        `}
                                                    />
                                                ))}
                                            </div>

                                            <button
                                                className="mt-4 text-sm text-blue-500 font-medium"
                                                onClick={handelAddinputsWorktypes}
                                            >
                                                + Add Another
                                            </button>
                                        </div>

                                        {/* STATUS */}

                                        <div>
                                            <h4
                                                className={`font-semibold mb-4
                                        ${theme === "Dark"
                                                        ? "text-white"
                                                        : "text-[#172B4D]"
                                                    }`}
                                            >
                                                Statuses
                                            </h4>

                                            <div className="flex flex-wrap gap-3">
                                                {Statuses.map((inp: any, idx: number) => (
                                                    <input
                                                        key={idx}
                                                        type="text"
                                                        value={inp}
                                                        onChange={(e) => handelInputdata(e, idx)}
                                                        className={`
            w-full h-[48px] px-4 rounded-xl border outline-none
            transition-all duration-200 mb-3
            ${theme === "Dark"
                                                                ? "bg-[#111827] border-[#374151] text-white placeholder:text-gray-400 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
                                                                : "bg-white border-[#D0D7DE] text-[#172B4D] placeholder:text-gray-400 focus:border-[#0C66E4] focus:ring-2 focus:ring-[#0C66E4]/20"
                                                            }
        `}
                                                    />
                                                ))}
                                            </div>

                                            <button
                                                className="mt-4 text-sm text-blue-500 font-medium"
                                                onClick={handelAddinputs}
                                            >
                                                + Add Status
                                            </button>
                                        </div>

                                        {/* BUTTONS */}

                                        <div className="flex gap-4 pt-2">
                                            <button
                                                className={`flex-1 h-[50px] rounded-2xl border font-semibold
                                        ${theme === "Dark"
                                                        ? "border-white/10 text-white"
                                                        : "border-[#DFE1E6] text-[#172B4D]"
                                                    }`}
                                                onClick={() => {
                                                    settypeForm("workspaceform")
                                                    setcurrpage(currpage - 1)
                                                }}
                                            >
                                                Back
                                            </button>

                                            <button
                                                className="flex-1 h-[50px] rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                                                onClick={() => {
                                                    // settypeForm("CreatingWorkspace")
                                                    // setcurrpage(currpage + 1)
                                                    submit()
                                                }}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* ================= PAGE 3 ================= */}

                                {type === "CreatingWorkspace" && (
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <div className="relative">
                                            <div className="w-24 h-24 rounded-full border-[6px] border-blue-500/20" />

                                            <div className="absolute inset-0 w-24 h-24 rounded-full border-[6px] border-transparent border-t-blue-500 animate-spin" />
                                        </div>

                                        <h3
                                            className={`mt-8 text-2xl font-bold
                                    ${theme === "Dark"
                                                    ? "text-white"
                                                    : "text-[#172B4D]"
                                                }`}
                                        >
                                            Creating Workspace
                                        </h3>

                                        <p
                                            className={`mt-3 text-center max-w-[320px] leading-7
                                    ${theme === "Dark"
                                                    ? "text-gray-400"
                                                    : "text-gray-500"
                                                }`}
                                        >
                                            Setting up projects and workflow settings.
                                        </p>

                                        <button
                                            className={`mt-8 h-[48px] px-8 rounded-2xl border font-semibold
                                    ${theme === "Dark"
                                                    ? "border-white/10 text-white"
                                                    : "border-[#DFE1E6] text-[#172B4D]"
                                                }`}
                                            onClick={() => {
                                                settypeForm("CreateWorkspace")
                                                setcurrpage(currpage - 1)
                                            }}
                                        >
                                            Back
                                        </button>
                                    </div>
                                )}
                                {type === "Created" && (
                                    <div className="flex flex-col items-center justify-center py-12">

                                        <div className="relative">
                                            <div className="absolute w-10 h-10 bg-green-500 rounded-full animate-ping opacity-40"></div>

                                            <div className="relative w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                                <svg
                                                    className="w-6 h-6 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={3}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3
                                            className={`mt-8 text-2xl font-bold transition-all duration-300
            ${theme === "Dark" ? "text-white" : "text-[#172B4D]"}`}
                                        >
                                            Workspace Created Successfully
                                        </h3>

                                        {/* Description */}
                                        <p
                                            className={`mt-3 text-center max-w-[340px] leading-7
            ${theme === "Dark" ? "text-gray-400" : "text-gray-500"}`}
                                        >
                                            Your workspace is ready. You can now start creating projects, managing tasks, and collaborating with your team.
                                        </p>

                                        {/* Button */}
                                        <button
                                            className={`mt-8 h-[48px] px-8 rounded-2xl font-semibold transition
            ${theme === "Dark"
                                                    ? "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20"
                                                    : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                                                }`}
                                            onClick={() => {

                                                SettemplatesChoosed(false)

                                            }}
                                        >
                                            Go Back
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ================= RIGHT SIDE ================= */}

                    <div
                        className={`hidden lg:flex items-center justify-center relative overflow-hidden px-8
                ${theme === "Dark"
                                ? "bg-gradient-to-br from-[#111827] to-[#020617]"
                                : "bg-gradient-to-br from-[#EEF4FF] to-[#F8FAFC]"
                            }`}
                    >
                        {/* SIMPLE SCRUM */}

                        {templatename?.toLowerCase() === "scrum" && (
                            <div className="flex gap-4 scale-[0.88]">
                                {templates?.workspaceSetup?.workTypes.map((item: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className={`w-[150px] rounded-3xl p-4
                                ${theme === "Dark"
                                                ? "bg-[#111827] border border-white/10"
                                                : "bg-white border border-[#E5E7EB]"
                                            }`}
                                    >
                                        <h4
                                            className={`font-semibold text-sm mb-4
                                    ${theme === "Dark"
                                                    ? "text-white"
                                                    : "text-[#172B4D]"
                                                }`}
                                        >
                                            {item.name || item}
                                        </h4>

                                        <div className="space-y-3">
                                            {[1, 2, 3].map((card) => (
                                                <div
                                                    key={card}
                                                    className={`rounded-2xl p-3
                                            ${theme === "Dark"
                                                            ? "bg-[#1e293b]"
                                                            : "bg-[#F8FAFC]"
                                                        }`}
                                                >
                                                    <div className="h-3 rounded-full bg-gray-300/40 mb-2" />

                                                    <div className="h-3 rounded-full bg-gray-300/30 w-[70%]" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* SIMPLE KANBAN */}

                        {templatename?.toLowerCase() === "kanban" && (
                            <div
                                className={`w-full max-w-[700px] rounded-[30px] p-6
                        ${theme === "Dark"
                                        ? "bg-[#111827] border border-white/10"
                                        : "bg-white border border-[#E5E7EB]"
                                    }`}
                            >
                                <div className="grid grid-cols-4 gap-4">
                                    {[
                                        "To Do",
                                        "In Progress",
                                        "Blocked",
                                        "Done"
                                    ].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className={`rounded-2xl p-4
                                    ${theme === "Dark"
                                                    ? "bg-[#1e293b]"
                                                    : "bg-[#F8FAFC]"
                                                }`}
                                        >
                                            <h4
                                                className={`font-semibold text-sm mb-4
                                        ${theme === "Dark"
                                                        ? "text-white"
                                                        : "text-[#172B4D]"
                                                    }`}
                                            >
                                                {item}
                                            </h4>

                                            <div className="space-y-3">
                                                {[1, 2].map((card) => (
                                                    <div
                                                        key={card}
                                                        className={`rounded-2xl p-3
                                                ${theme === "Dark"
                                                                ? "bg-[#111827]"
                                                                : "bg-white"
                                                            }`}
                                                    >
                                                        <div className="h-3 rounded-full bg-gray-300/40 mb-2" />

                                                        <div className="h-3 rounded-full bg-gray-300/30 w-[70%]" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TemplateSpace