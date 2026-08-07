import { useContext, useEffect, useState } from "react";
import MyTable from "../Task/TaskList/MyTable";
import bgthemeContext from "../../Context/ThemeContext";
import SprintForm from "./SprintForm";
import Sprints from "./SprintsTable";
import { instance } from "../../services/apiservices";
import { checkuser } from "../LocalStorage";
import { useNavigate } from "react-router-dom";
import { DueDate, GetDateFormat, GetDueDays } from "../DateFormat";

const Backlog = ({ workspaceid }: any) => {
    const [SprintPoupForm, setSprintPoupForm] = useState<boolean>(false)
    const { theme }: any = useContext(bgthemeContext);
    const redirect = useNavigate()
    const isDark = theme === "Dark";
    const handelSprintForm = () => {

        setSprintPoupForm((prev) => !prev)

    }


    const [ActiveSprint, setActiveSprint] = useState<any>()
    console.log(ActiveSprint, 'ActiveSprint');

    useEffect(() => {


        const fetchActiveSprint = async () => {

            try {
                const response = await instance.get(`/api/sprints/${workspaceid._id}/Activesprint`)
                console.log(response.data.data[0], 'ActiveSprintActiveSprint');
                setActiveSprint(response.data.data[0])

            } catch (error: any) {


                const status = error.response.status;


                if (status == 401) { return checkuser(redirect) }

            }
        }


        fetchActiveSprint()
    }, [workspaceid])

    return (
        <>
            <SprintForm spaceid={workspaceid._id} SprintPoupForm={SprintPoupForm} onClick={handelSprintForm} />
            <div className="p-6">

                {/* Page Header */}
                <div className="mb-6">
                    <h1 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                        Backlog
                    </h1>

                    <p className={`mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        Manage unassigned tasks and organize them into sprints.
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                    {/* ================= Left Section ================= */}
                    <div
                        className={`xl:col-span-3 rounded-2xl border shadow-sm transition-all duration-300
                    ${isDark
                                ? "bg-[#0F172A] border-gray-800 text-white"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                    >

                        {/* Header */}
                        <div
                            className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-5 border-b
                        ${isDark ? "border-gray-800" : "border-gray-200"}`}
                        >

                            <div>
                                <h2 className="text-xl font-semibold">
                                    Backlog Tasks
                                </h2>

                                <p
                                    className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"
                                        }`}
                                >
                                    Tasks that are not assigned to any sprint.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">

                                {/* Sprint Button */}
                                <button
                                    className={`px-4 py-2 rounded-xl border transition-all duration-300 font-medium
                                ${isDark
                                            ? "border-gray-700 bg-[#1E293B] hover:bg-[#334155] text-gray-200"
                                            : "border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700"
                                        }`}


                                    onClick={handelSprintForm}
                                >
                                    + Create Sprint
                                </button>

                                {/* Task Button */}
                                <button
                                    className={`px-4 py-2 rounded-xl transition-all duration-300 shadow-md font-medium
                                ${isDark
                                            ? "bg-blue-600 hover:bg-blue-500 text-white"
                                            : "bg-slate-900 hover:bg-black text-white"
                                        }`}
                                >
                                    + Create Task
                                </button>

                            </div>

                        </div>

                        {/* Table */}
                        <div className="p-5">
                            <MyTable />
                        </div>

                    </div>

                    {/* ================= Right Section ================= */}
                    <div
                        className={`rounded-2xl border shadow-sm h-fit sticky top-6 transition-all duration-300
                    ${isDark
                                ? "bg-[#0F172A] border-gray-800 text-white"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                    >

                        <div
                            className={`p-5 border-b ${isDark ? "border-gray-800" : "border-gray-200"
                                }`}
                        >

                            <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                                Active Sprint
                            </span>

                            <h2 className="text-2xl font-bold mt-2">
                                {ActiveSprint?.SprintName || "Sprint Name"}
                            </h2>

                            <p
                                className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"
                                    }`}
                            >
                                {ActiveSprint?.SprintDescription || "Sprint Description"}
                            </p>

                        </div>

                        <div className="p-5 space-y-5">

                            {/* Status */}
                            <div className="flex justify-between items-center">

                                <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                                    Status
                                </span>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium
                                ${isDark
                                            ? "bg-green-900/30 text-green-400"
                                            : "bg-green-100 text-green-700"
                                        }`}
                                >
                                    {!ActiveSprint?.ActiveSprint ? "Active" : "Not Active"}
                                </span>

                            </div>

                            {/* Duration */}
                            <div className="flex justify-between">

                                <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                                    Duration
                                </span>

                                <span>  {GetDateFormat(ActiveSprint?.SprintStartDate)} - {GetDateFormat(ActiveSprint?.SprintEndDate)} <p
                                    className={
                                        GetDueDays(ActiveSprint?.SprintEndDate) <= 1
                                            ? "text-red-500"
                                            : "text-green-500"
                                    }
                                >
                                    {DueDate(ActiveSprint?.SprintEndDate)}
                                </p></span>

                            </div>

                            {/* Tasks */}
                            <div className="flex justify-between">

                                <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                                    Tasks
                                </span>

                                <span>8</span>

                            </div>

                            {/* Progress */}
                            <div>

                                <div className="flex justify-between text-sm mb-2">

                                    <span>Progress</span>

                                    <span>{ActiveSprint?.SprintProgress || 0}%</span>

                                </div>

                                <div
                                    className={`w-full rounded-full h-3 ${isDark ? "bg-gray-700" : "bg-gray-200"
                                        }`}
                                >

                                    <div className={`bg-blue-500 h-3 rounded-full w-[${Number(ActiveSprint?.SprintProgress) || 0}%]`} />

                                </div>

                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-3">

                                <div
                                    className={`rounded-xl border p-3 text-center
                                ${isDark
                                            ? "bg-[#1E293B] border-gray-700"
                                            : "bg-gray-50 border-gray-200"
                                        }`}
                                >
                                    <h3 className="text-xl font-bold">3</h3>
                                    <p className={isDark ? "text-gray-400 text-xs" : "text-gray-500 text-xs"}>
                                        To Do
                                    </p>
                                </div>

                                <div
                                    className={`rounded-xl border p-3 text-center
                                ${isDark
                                            ? "bg-yellow-900/20 border-yellow-700"
                                            : "bg-yellow-50 border-yellow-200"
                                        }`}
                                >
                                    <h3 className="text-xl font-bold">2</h3>
                                    <p className={isDark ? "text-yellow-300 text-xs" : "text-yellow-700 text-xs"}>
                                        In Progress
                                    </p>
                                </div>

                                <div
                                    className={`rounded-xl border p-3 text-center
                                ${isDark
                                            ? "bg-green-900/20 border-green-700"
                                            : "bg-green-50 border-green-200"
                                        }`}
                                >
                                    <h3 className="text-xl font-bold">3</h3>
                                    <p className={isDark ? "text-green-300 text-xs" : "text-green-700 text-xs"}>
                                        Done
                                    </p>
                                </div>

                            </div>

                            {/* Goal */}
                            <div>

                                <h3 className="font-semibold mb-2">
                                    Sprint Goal
                                </h3>

                                <p className={isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>
                                    {ActiveSprint?.SprintGoal || "Sprint Goal"}
                                </p>

                            </div>

                            {/* Button */}
                            <button
                                className={`w-full py-3 rounded-xl transition-all duration-300 font-medium hover:cursor-not-allowed
                            ${isDark
                                        ? "bg-blue-600 hover:bg-blue-500 text-white"
                                        : "bg-slate-900 hover:bg-black text-white"
                                    }`}
                                disabled={true}
                            >
                                View Sprint Board
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            <Sprints workspaceid={workspaceid}></Sprints>
        </>

    );
};

export default Backlog;