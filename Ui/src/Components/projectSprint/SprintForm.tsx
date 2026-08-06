import { useContext, useState } from "react";
import bgthemeContext from "../../Context/ThemeContext";

import {
    FaFlag,
    FaCalendarAlt,
    FaBullseye,
    FaClipboardList,
    FaChevronDown,
    FaSignal
} from "react-icons/fa";
import { checkuser, getuserInfo } from "../LocalStorage";
import { instance } from "../../services/apiservices";
import { useNavigate } from "react-router-dom";

const SprintForm = ({ spaceid, onClick, SprintPoupForm }: any) => {
    const redirect = useNavigate()
    const [SprintName, setSprintName] = useState<String | any>("")
    const [SprintGoal, setSprintGoal] = useState<String | any>("")
    const [SprintStartDate, setSprintStartDate] = useState<String | any>("")
    const [SprintEndDate, setSprintEndDate] = useState<String | any>("")
    const [SprintDescription, setSprintDescription] = useState<String | any>("")

    const [SprintStatus, setSprintStatus] = useState<String | any>("")
    if (!spaceid) {
        return
    }

    const { theme }: any = useContext(bgthemeContext);

    const isDark = theme === "Dark";
    const isInputCheck = !SprintName || !SprintEndDate || !SprintStatus || !SprintGoal || !SprintStartDate || !spaceid || !getuserInfo

    const HandelSprintCreation = async (e: any) => {
        e.preventDefault()
        if (isInputCheck) {

            return alert("Fill the SprintInformation")



        }

        if (SprintStartDate === SprintEndDate) {
            return alert("Sprint start date and end date should not be the same.");
        }

        if (new Date(SprintEndDate) < new Date(SprintStartDate)) {
            return alert("Sprint end date must be after the sprint start date.");
        }

        const Creation_sprint: any = {
            SprintName,
            SprintEndDate,
            SprintStartDate,
            SprintDescription,
            SprintStatus,
            SprintGoal,
            'ProjectId': spaceid,
            "Sprint_CreatedBy": JSON.parse(getuserInfo)._id




        }


        console.log(Creation_sprint, 'Creation_sprint');



        try {

            const response = await instance.post("/api/sprints/sprints", { Creation_sprint: Creation_sprint })
            console.log(response, 'response');
            if (response.status == 200) {
                alert("Sprint is Created")
                return onClick()
            }


        } catch (error: any) {
            const status = error.response.status
            if (status == 401) {

                return checkuser(redirect)
            }
        }





    }
    const Sprint_status: String[] | any = ["PLANNED", "ACTIVE", "COMPLETED"]


    return (
        <>
            {SprintPoupForm &&

                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3">

                    <div
                        className={`w-full max-w-xl rounded-xl shadow-2xl border overflow-hidden
        ${isDark
                                ? "bg-[#0F172A] border-gray-800 text-white"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                    >

                        {/* Header */}
                        <div
                            className={`px-5 py-4 border-b flex items-center justify-between
            ${isDark ? "border-gray-800" : "border-gray-200"}`}
                        >

                            <div>

                                <h2 className="text-xl font-bold">
                                    Create Sprint
                                </h2>

                                <p
                                    className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"
                                        }`}
                                >
                                    Plan your sprint and organize backlog tasks.
                                </p>

                            </div>

                            <button
                                className={`text-xl transition ${isDark
                                    ? "text-gray-400 hover:text-white"
                                    : "text-gray-500 hover:text-black"
                                    }`}
                                onClick={onClick}
                            >
                                ✕
                            </button>

                        </div>

                        {/* Body */}
                        <form >

                            <div className="p-5 space-y-4">

                                {/* Sprint Name */}
                                <div>

                                    <label className="text-sm font-medium flex items-center gap-2 mb-2">
                                        <FaFlag className="text-blue-500 text-sm" />
                                        Sprint Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Sprint 1"
                                        className={`w-full h-10 rounded-lg border px-3 text-sm outline-none
                    ${isDark
                                                ? "bg-[#1E293B] border-gray-700 placeholder:text-gray-500"
                                                : "bg-white border-gray-300"
                                            }`}
                                        required
                                        onChange={(e) => setSprintName(e.target.value)}
                                    />

                                </div>

                                {/* Sprint Goal */}
                                <div>

                                    <label className="text-sm font-medium flex items-center gap-2 mb-2">
                                        <FaBullseye className="text-green-500 text-sm" />
                                        Sprint Goal
                                    </label>

                                    <textarea
                                        rows={3}
                                        placeholder="Complete authentication module..."
                                        className={`w-full rounded-lg border px-3 py-2 text-sm resize-none outline-none
                    ${isDark
                                                ? "bg-[#1E293B] border-gray-700 placeholder:text-gray-500"
                                                : "bg-white border-gray-300"
                                            }`}
                                        required
                                        onChange={(e) => setSprintGoal(e.target.value)}
                                    />

                                </div>

                                {/* Sprint Status */}


                                <div>

                                    <label className="text-sm font-medium flex items-center gap-2 mb-2">
                                        <FaSignal className="text-green-500 text-sm" />
                                        Sprint Status
                                    </label>

                                    <div className="relative">

                                        <select
                                            name="SprintStatus"
                                            value={SprintStatus}
                                            onChange={(e) => setSprintStatus(e.target.value)}
                                            className={`w-full h-10 rounded-lg border px-3 pr-10 text-sm outline-none appearance-none transition
            ${isDark
                                                    ? "bg-[#1E293B] border-gray-700 text-white"
                                                    : "bg-white border-gray-300 text-gray-900"
                                                }`}
                                        >
                                            <option value="" disabled>Choose a Sprint Status</option>

                                            {Sprint_status.map((status: any) => (
                                                <option
                                                    key={status}
                                                    value={status}
                                                    className={isDark ? "bg-[#1E293B]" : "bg-white"}
                                                >
                                                    {status}
                                                </option>
                                            ))}

                                        </select>

                                        {/* Dropdown Icon */}
                                        <FaChevronDown
                                            className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none
            ${isDark ? "text-gray-400" : "text-gray-500"
                                                }`}
                                        />

                                    </div>

                                </div>

                                {/* Dates */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div>

                                        <label className="text-sm font-medium flex items-center gap-2 mb-2">
                                            <FaCalendarAlt className="text-orange-500 text-sm" />
                                            Start Date
                                        </label>

                                        <input
                                            type="date"
                                            className={`w-full h-10 rounded-lg border px-3 text-sm outline-none
                        ${isDark
                                                    ? "bg-[#1E293B] border-gray-700"
                                                    : "bg-white border-gray-300"
                                                }`}
                                            required
                                            onChange={(e) => setSprintStartDate(e.target.value)}
                                        />

                                    </div>

                                    <div>

                                        <label className="text-sm font-medium flex items-center gap-2 mb-2">
                                            <FaCalendarAlt className="text-red-500 text-sm" />
                                            End Date
                                        </label>

                                        <input
                                            type="date"
                                            className={`w-full h-10 rounded-lg border px-3 text-sm outline-none
                        ${isDark
                                                    ? "bg-[#1E293B] border-gray-700"
                                                    : "bg-white border-gray-300"
                                                }`}
                                            required
                                            onChange={(e) => setSprintEndDate(e.target.value)}
                                        />

                                    </div>

                                </div>

                                {/* Description */}
                                <div>

                                    <label className="text-sm font-medium flex items-center gap-2 mb-2">
                                        <FaClipboardList className="text-violet-500 text-sm" />
                                        Description
                                    </label>

                                    <textarea
                                        rows={2}
                                        placeholder="Optional description..."
                                        className={`w-full rounded-lg border px-3 py-2 text-sm resize-none outline-none
                    ${isDark
                                                ? "bg-[#1E293B] border-gray-700 placeholder:text-gray-500"
                                                : "bg-white border-gray-300"
                                            }`}
                                        onChange={(e) => setSprintDescription(e.target.value)}
                                    />

                                </div>

                            </div>
                            {/* Footer */}
                            <div
                                className={`px-5 py-4 border-t flex justify-end gap-3
            ${isDark ? "border-gray-800" : "border-gray-200"}`}
                            >

                                <button
                                    className={`px-4 py-2 rounded-lg border text-sm transition
                ${isDark
                                            ? "border-gray-700 bg-[#1E293B] hover:bg-[#334155]"
                                            : "border-gray-300 hover:bg-gray-100"
                                        }`}
                                >
                                    Cancel
                                </button>

                                {isInputCheck ? "" : <button disabled={isInputCheck} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition" onClick={(e) => HandelSprintCreation(e)}>
                                    Create Sprint
                                </button>}

                            </div>

                        </form>


                    </div>

                </div>
            }
        </>

    );
};

export default SprintForm;