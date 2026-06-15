import { useEffect, useState } from "react"
import {
    FaTasks,
    FaUser,
    FaAlignLeft,
    FaFlag,
    FaSpinner,
    FaCalendarAlt,
    FaClock,
    FaTag,
    FaLayerGroup,
    FaChartLine,
    FaTimes,
    FaPlus,
    FaExpand,
    FaCompress,
} from "react-icons/fa"

import toast, { Toaster } from "react-hot-toast"

import Button from "../../Button"
import { checkuser } from "../../LocalStorage"
import { instance } from "../../../services/apiservices"
import Input from "../../Input"
import Loader from "../../Loader"
import GlobalToast from "../../GlobalToast"

type Props = {
    AddedBy?: string | null
    projectid?: string
    onclose?: () => void
    theme?: "Dark" | "Light",
    maximizeParent?: boolean
}

function TaskForm({
    onclose,
    AddedBy = "me",
    projectid,
    theme,
    maximizeParent
}: Props) {


    console.log(projectid, 'projectid')
    const [maximize, setMaximize] = useState(false)
    const [assignOpen, setAssignOpen] = useState(false)
    const [taskName, setTaskName] = useState("")
    const [description, setDescription] = useState("")
    const [assignTo, setAssignTo] = useState("")
    const [priority, setPriority] = useState("Medium")
    const [status, setStatus] = useState("Pending")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [tags, setTags] = useState("")
    const [estimatedHours, setEstimatedHours] = useState("")
    const [progress, setProgress] = useState(0)

    const [Members, setMembers] = useState([])

    const [loadr, setloader] = useState(false)


    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                setloader(true)
                console.log("first", projectid)
                const response = await instance.get("/api/WorkSpace/TeamMembers", {
                    params: {
                        projectid: projectid
                    }
                })

                setMembers(response.data.message)
                console.log(response.data.message, 'res')
                setloader(false)
            } catch (error: any) {


                console.log(error.response.data.message)

            }
        }
        fetchTeamMembers()
    }, [])

    useEffect(() => {

        const handleKeyDown = (e: any) => {
            if (e.key === "o") {
                return setMaximize(true);
            }
            else if (e.key === 'i' || e.key == "I") {

                return setMaximize(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);


    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);


    const selectedMember: any = Members.find((m: any) => m?.id === assignTo)

    const isDark = theme === "Dark"

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const TaskData = {
            taskName,
            description,
            assignTo,
            priority,
            status,
            startDate,
            endDate,
            tags,
            estimatedHours,
            progress,
            AddedBy,
            projectid,
        }

        try {
            const response = await instance.post("/api/Task/AddWorkSpaceTask", { TaskData })
            alert(response?.status)
            if (response?.status === 201) {
                return  GlobalToast("Task Created Successfully", "success");
            }
        }
        catch (error: any) {


            console.log(error?.response?.data.message)
            toast.error(
                error?.response?.data?.message || error?.message || "Something went wrong"
            )

            if (error?.response?.status === 401) {
                checkuser()
            }
        }
    }

    const labelClass = `flex items-center gap-2 text-sm font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"
        }`

    const inputClass = `w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500 ${isDark
        ? "bg-gray-900 border-gray-700 text-white placeholder:text-gray-400"
        : "bg-white border-gray-300 text-gray-700 placeholder:text-gray-400"
        }`

    const cardClass = isDark
        ? "bg-[#0f172a] text-white border border-gray-800"
        : "bg-white text-gray-800 border border-gray-200"

    return (
        <>
            <Toaster />

            {loadr && <>

                <Loader></Loader>

            </>}
            <div
                className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6"
                style={{
                    zIndex: maximizeParent ? 999999 : 99999,
                }}
            >



                <div
                    className={`relative z-[100000] w-full overflow-hidden rounded-3xl border shadow-[0_25px_80px_rgba(0,0,0,0.4)] transition-all duration-500 ease-in-out ${cardClass} ${maximizeParent
                        ? maximize
                            ? "max-w-5xl h-[85vh] mx-auto"
                            : "max-w-2xl h-[60vh] mx-auto"
                        : maximize
                            ? "max-w-5xl h-[85vh] ml-80 mt-20"
                            : "max-w-2xl h-[60vh] ml-20"
                        }`}
                >

                    {/* Header */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-white">
                        <div>
                            <h1 className="flex items-center gap-2 text-lg sm:text-xl font-semibold">
                                <FaTasks className="text-base" />
                                Create New Task
                            </h1>

                            <p className="mt-1 text-xs sm:text-sm text-blue-100">
                                Manage your workflow efficiently
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setMaximize(prev => !prev)}
                                className="rounded-full bg-white/15 p-2.5 hover:bg-white/25 transition-all duration-300"
                            >
                                {maximize ? (
                                    <FaCompress size={14} title="me it close" />
                                ) : (
                                    <FaExpand size={14} title="me it Expand" />
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={onclose}
                                className="rounded-full bg-white/15 p-2.5 hover:bg-red-500 transition"
                            >
                                <FaTimes size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-6 overflow-y-auto ${maximize
                            ? "h-[calc(85vh-72px)]"
                            : "h-[calc(60vh-72px)]"
                            }`}
                    >

                        <div>
                            <label className={labelClass}>
                                <FaTasks className="text-blue-500" />
                                Task Name
                            </label>
                            <Input
                                type="text"
                                required={true}
                                placeholder="Enter task name"
                                value={taskName}
                                onChange={(e: any) => setTaskName(e.target.value)}
                                classNameStyle={inputClass}
                            />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>
                                <FaUser className="text-purple-500" />
                                Assign To
                            </label>

                            <button
                                type="button"
                                onClick={() => setAssignOpen((prev) => !prev)}
                                className={`w-full rounded-xl border px-3 py-2.5 text-sm flex items-center justify-between transition focus:ring-2 focus:ring-blue-500 ${isDark
                                    ? "bg-gray-900 border-gray-700 text-white"
                                    : "bg-white border-gray-300 text-gray-700"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    {selectedMember ? (
                                        <>
                                            <img
                                                src={selectedMember?.id?.userProfile}
                                                alt={selectedMember?.id?.Username}
                                                className="h-9 w-9 rounded-full object-cover"
                                            />
                                            <span>{selectedMember?.id?.Username}</span>
                                        </>
                                    ) : (
                                        <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                                            Select team member
                                        </span>
                                    )}
                                </div>

                                <span
                                    className={`transition-transform duration-200 ${assignOpen ? "rotate-180" : ""
                                        }`}
                                >
                                    ▼
                                </span>
                            </button>

                            {assignOpen && (
                                <div
                                    className={`absolute left-0 top-full mt-2 w-full rounded-xl border shadow-lg overflow-hidden z-50 ${isDark
                                        ? "bg-gray-900 border-gray-700"
                                        : "bg-white border-gray-200"
                                        }`}
                                >
                                    {Members.length == 0 ?

                                        <div className="flex flex-col items-center justify-center py-10 text-center">
                                            <div className="mb-3 rounded-full bg-gray-100 p-4">
                                                👥
                                            </div>

                                            <h3 className="text-lg font-semibold text-gray-700">
                                                No Members Found
                                            </h3>

                                            <p className="mt-1 max-w-sm text-sm text-gray-500">
                                                There are currently no members in this workspace.
                                                Invite team members to start collaborating.
                                            </p>
                                        </div>


                                        : Members.map((member: any) => (
                                            <button
                                                key={member.id}
                                                type="button"
                                                onClick={() => {
                                                    setAssignTo(member.id)
                                                    setAssignOpen(false)
                                                }}
                                                className={`w-full flex items-center gap-3 px-3 py-3 text-left transition ${isDark
                                                    ? "hover:bg-gray-800 text-white"
                                                    : "hover:bg-gray-50 text-gray-800"
                                                    }`}
                                            >
                                                <img
                                                    src={member?.id?.userProfile}
                                                    alt={member?.id?.Username}
                                                    className="h-9 w-9 rounded-full object-cover"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{member?.id?.Username}</span>
                                                    <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                                        Team member
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                </div>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className={labelClass}>
                                <FaAlignLeft className="text-green-500" />
                                Description
                            </label>
                            <textarea
                                placeholder="Enter task description..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={`${inputClass} min-h-[96px] resize-none`}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                <FaFlag className="text-red-500" />
                                Priority
                            </label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className={inputClass}
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>

                        <div>
                            <label className={labelClass}>
                                <FaSpinner className="text-orange-500" />
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className={inputClass}
                            >
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>
                        </div>

                        <div>
                            <label className={labelClass}>
                                <FaCalendarAlt className="text-indigo-500" />
                                Start Date
                            </label>
                            <Input
                                type="date"
                                required={true}
                                value={startDate}
                                onChange={(e: any) => setStartDate(e.target.value)}
                                classNameStyle={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                <FaClock className="text-pink-500" />
                                End Date
                            </label>
                            <Input
                                type="date"
                                required={true}
                                value={endDate}
                                onChange={(e: any) => setEndDate(e.target.value)}
                                classNameStyle={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                <FaTag className="text-cyan-500" />
                                Tags
                            </label>
                            <Input
                                type="text"
                                required={true}
                                placeholder="React, Node.js"
                                value={tags}
                                onChange={(e: any) => setTags(e.target.value)}
                                classNameStyle={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                <FaLayerGroup className="text-yellow-500" />
                                Estimated Hours
                            </label>
                            <Input
                                type="number"
                                required={true}
                                placeholder="10"
                                value={estimatedHours}
                                onChange={(e: any) => setEstimatedHours(e.target.value)}
                                classNameStyle={inputClass}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <div className="mb-2 flex items-center justify-between">
                                <label className={labelClass + " mb-0"}>
                                    <FaChartLine className="text-green-500" />
                                    Progress
                                </label>
                                <span className="text-sm font-semibold text-blue-500">
                                    {progress}%
                                </span>
                            </div>

                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={progress}
                                onChange={(e) => setProgress(Number(e.target.value))}
                                className="w-full cursor-pointer accent-blue-600"
                            />

                            <div
                                className={`mt-3 h-2.5 w-full overflow-hidden rounded-full ${isDark ? "bg-gray-800" : "bg-gray-200"
                                    }`}
                            >
                                <div
                                    className="h-full rounded-full bg-green-500 transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        <div
                            className={`md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t ${isDark ? "border-gray-800" : "border-gray-200"
                                }`}
                        >
                            <Button
                                Btnname={
                                    <span className="flex items-center gap-2">
                                        <FaTimes />
                                        Close
                                    </span>
                                }
                                classaName={`px-5 py-2.5 rounded-xl transition ${isDark
                                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    }`}
                                type="button"
                                OnclickEvent={onclose}
                            />

                            <Button
                                Btnname={
                                    <span className="flex items-center gap-2">
                                        <FaPlus />
                                        Add Task
                                    </span>
                                }
                                classaName="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-md transition"
                                type="submit"
                                OnclickEvent={() => { }}
                            />
                        </div>

                    </form>
                </div>
            </div >
        </>
    )
}

export default TaskForm



