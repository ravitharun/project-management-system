import { useContext, useEffect, useState } from "react";
import MyTable from "../Task/TaskList/MyTable";
import bgthemeContext from "../../Context/ThemeContext";
import SprintForm from "./SprintForm";
import Sprints from "./SprintsTable";
import { instance } from "../../services/apiservices";
import { checkuser } from "../LocalStorage";
import { useNavigate } from "react-router-dom";
import { DueDate, GetDateFormat, GetDueDays } from "../DateFormat";
import Board from "../Board";
import TaskForm from "../Task/CreateTask/TaskForm";
import { userRfToken } from "../users";

const Backlog = ({ workspaceid }: any) => {

        // alert("Backlog")

    const [SprintPoupForm, setSprintPoupForm] = useState<boolean>(false)
    const { theme }: any = useContext(bgthemeContext);

    const [PoupOpen, _] = useState<boolean>(false)
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
    const progress = Math.min(
        100,
        Math.max(0, Number(ActiveSprint?.SprintProgress) || 0)
    );
    // console.log(userRfToken, 'userRfToken');
    const  HandelPoup = () => {
        setSprintPoupForm((prev) => !prev)
    }

    return (
        <>

            {!PoupOpen &&

                <TaskForm AddedBy={JSON.parse(userRfToken)._id} projectid={workspaceid._id} onclose={HandelPoup} CreateTask={SprintPoupForm} />

            }
     
            <SprintForm
                spaceid={workspaceid?._id}
                SprintPoupForm={SprintPoupForm}
                onClick={handelSprintForm}
            />

            <main className="min-h-screen p-4 sm:p-6">
                {/* Page Header */}
                <div className="mb-6">
                    <h1
                        className={`text-2xl font-bold sm:text-3xl ${isDark ? "text-white" : "text-gray-900"
                            }`}
                    >
                        Backlog
                    </h1>

                    <p
                        className={`mt-1 text-sm sm:text-base ${isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        Manage unassigned tasks and organize them into sprints.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
                    {/* Backlog Section */}
                    <section
                        className={`min-w-0 overflow-hidden rounded-2xl border shadow-sm ${isDark
                            ? "border-slate-800 bg-slate-900 text-white"
                            : "border-gray-200 bg-white text-gray-900"
                            } xl:col-span-3`}
                    >
                        {/* Backlog Header */}
                        <div
                            className={`flex flex-col gap-4 border-b p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between ${isDark ? "border-slate-800" : "border-gray-200"
                                }`}
                        >
                            <div>
                                <h2 className="text-lg font-semibold sm:text-xl">
                                    Backlog Tasks ({ActiveSprint?.length == 0 ? "0" : "0"})
                                </h2>

                                <p
                                    className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-500"
                                        }`}
                                >
                                    Tasks that are not assigned to any sprint.
                                </p>
                            </div>

                            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                                <button
                                    type="button"
                                    onClick={handelSprintForm}
                                    className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${isDark
                                        ? "border-slate-700 bg-slate-800 text-gray-200 hover:bg-slate-700"
                                        : "border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    + Create Sprint
                                </button>

                                <button
                                    type="button"
                                    className={`rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm transition ${isDark
                                        ? "bg-blue-600 hover:bg-blue-500"
                                        : "bg-slate-900 hover:bg-black"
                                        }`}
                                    onClick={HandelPoup
                                    }
                                >
                                    + Create Task
                                </button>
                            </div>
                        </div>

                        {/* Backlog Table */}
                        <div className="overflow-x-auto p-3 sm:p-5">
                            <div className="min-w-[650px]">
                                <MyTable spaceid={workspaceid._id} ActiveSprintId={ActiveSprint} />
                            </div>
                        </div>
                    </section>

                    {/* Active Sprint Sidebar */}
                    <aside
                        className={`h-fit overflow-hidden rounded-2xl border shadow-sm xl:sticky xl:top-6 ${isDark
                            ? "border-slate-800 bg-slate-900 text-white"
                            : "border-gray-200 bg-white text-gray-900"
                            }`}
                    >
                        {/* Sprint Header */}
                        <div
                            className={`border-b p-4 sm:p-5 ${isDark ? "border-slate-800" : "border-gray-200"
                                }`}
                        >
                            <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                                Active Sprint
                            </span>

                            <h2 className="mt-2 break-words text-xl font-bold sm:text-2xl">
                                {ActiveSprint?.SprintName || "No active sprint"}
                            </h2>

                            <p
                                className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-500"
                                    }`}
                            >
                                {ActiveSprint?.SprintDescription ||
                                    "There is no active sprint description."}
                            </p>
                        </div>

                        {/* Sprint Details */}
                        <div className="space-y-5 p-4 sm:p-5">
                            {/* Status */}
                            <div className="flex items-center justify-between gap-4">
                                <span
                                    className={
                                        isDark ? "text-gray-300" : "text-gray-600"
                                    }
                                >
                                    Status
                                </span>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium sm:text-sm ${ActiveSprint?.SprintActive
                                        ? isDark
                                            ? "bg-green-900/30 text-green-400"
                                            : "bg-green-100 text-green-700"
                                        : isDark
                                            ? "bg-gray-800 text-gray-400"
                                            : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {ActiveSprint?.SprintActive
                                        ? "Active"
                                        : "Not Active"}

                                        {/* {ActiveSprint?.ActiveSprint?"true":} */}
                                </span>
                            </div>

                            {/* Duration */}
                            <div
                                className={`flex items-start justify-between gap-4 border-b py-3 ${isDark
                                    ? "border-slate-700 text-gray-300"
                                    : "border-gray-200 text-gray-600"
                                    }`}
                            >
                                <span className="shrink-0 text-sm font-medium">
                                    Duration
                                </span>

                                <div className="text-right">
                                    <div
                                        className={`text-xs font-semibold sm:text-sm ${isDark
                                            ? "text-gray-100"
                                            : "text-gray-800"
                                            }`}
                                    >
                                        {ActiveSprint?.SprintStartDate
                                            ? GetDateFormat(
                                                ActiveSprint.SprintStartDate
                                            )
                                            : "—"}

                                        <span className="mx-1 text-gray-400">–</span>

                                        {ActiveSprint?.SprintEndDate
                                            ? GetDateFormat(
                                                ActiveSprint.SprintEndDate
                                            )
                                            : "—"}
                                    </div>

                                    {ActiveSprint?.SprintEndDate && (
                                        <div
                                            className={`mt-1 text-xs font-medium ${GetDueDays(
                                                ActiveSprint?.SprintEndDate
                                            ) <= 1
                                                ? "text-red-500"
                                                : "text-green-500"
                                                }`}
                                        >
                                            {DueDate(ActiveSprint?.SprintEndDate)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Tasks */}
                            <div className="flex items-center justify-between">
                                <span
                                    className={
                                        isDark ? "text-gray-300" : "text-gray-600"
                                    }
                                >
                                    Tasks
                                </span>

                                <span className="font-semibold">8</span>
                            </div>

                            {/* Progress */}
                            <div>
                                <div className="mb-2 flex justify-between text-sm">
                                    <span>Progress</span>
                                    <span className="font-medium">{progress}%</span>
                                </div>

                                <div
                                    className={`h-2.5 w-full overflow-hidden rounded-full ${isDark ? "bg-slate-700" : "bg-gray-200"
                                        }`}
                                >
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ${progress >= 75
                                            ? "bg-green-500"
                                            : progress >= 40
                                                ? "bg-yellow-500"
                                                : "bg-red-500"
                                            }`}
                                        style={{
                                            width: `${Math.min(
                                                Math.max(progress || 0, 0),
                                                100
                                            )}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Task Statistics */}
                            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                <div
                                    className={`rounded-xl border p-2.5 text-center sm:p-3 ${isDark
                                        ? "border-slate-700 bg-slate-800"
                                        : "border-gray-200 bg-gray-50"
                                        }`}
                                >
                                    <h3 className="text-lg font-bold sm:text-xl">3</h3>
                                    <p
                                        className={`text-[10px] sm:text-xs ${isDark
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        To Do
                                    </p>
                                </div>

                                <div
                                    className={`rounded-xl border p-2.5 text-center sm:p-3 ${isDark
                                        ? "border-yellow-700 bg-yellow-900/20"
                                        : "border-yellow-200 bg-yellow-50"
                                        }`}
                                >
                                    <h3 className="text-lg font-bold sm:text-xl">2</h3>
                                    <p
                                        className={`text-[10px] sm:text-xs ${isDark
                                            ? "text-yellow-300"
                                            : "text-yellow-700"
                                            }`}
                                    >
                                        In Progress
                                    </p>
                                </div>

                                <div
                                    className={`rounded-xl border p-2.5 text-center sm:p-3 ${isDark
                                        ? "border-green-700 bg-green-900/20"
                                        : "border-green-200 bg-green-50"
                                        }`}
                                >
                                    <h3 className="text-lg font-bold sm:text-xl">3</h3>
                                    <p
                                        className={`text-[10px] sm:text-xs ${isDark
                                            ? "text-green-300"
                                            : "text-green-700"
                                            }`}
                                    >
                                        Done
                                    </p>
                                </div>
                            </div>

                            {/* Sprint Goal */}
                            <div>
                                <h3 className="mb-2 font-semibold">Sprint Goal</h3>

                                <p
                                    className={`text-sm leading-6 ${isDark ? "text-gray-400" : "text-gray-600"
                                        }`}
                                >
                                    {ActiveSprint?.SprintGoal ||
                                        "No sprint goal available."}
                                </p>
                            </div>

                            {/* Sprint Button */}
                            <button
                                type="button"
                                disabled
                                className={`w-full cursor-not-allowed rounded-xl py-3 text-sm font-medium text-white opacity-60 ${isDark ? "bg-blue-600" : "bg-slate-900"
                                    }`}
                            >
                                View Sprint Board
                            </button>
                        </div>
                    </aside>
                </div>

                {/* Board Section */}
                <section
                    className={`mt-6 overflow-hidden rounded-2xl border shadow-sm ${isDark
                        ? "border-slate-800 bg-slate-900"
                        : "border-gray-200 bg-white"
                        }`}
                >
                    <div className="overflow-x-auto">
                        <div className="min-w-[900px]">
                            <Board
                                theme={theme}
                                work={workspaceid}
                                ismaxAndMin={true}
                            />
                        </div>
                    </div>
                </section>

                {/* Sprints Section */}
                <section className="mt-6">
                    <Sprints workspaceid={workspaceid} />
                </section>
            </main>
        </>

    );
};

export default Backlog;