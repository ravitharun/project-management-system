
import { useContext, useEffect, useState } from "react";
import {
    FiVideo,
    FiPlus,
    FiCalendar,
    FiClock,
    FiUsers,
    FiMoreVertical,
    FiCheckCircle,
    FiUserCheck,

} from "react-icons/fi";
import CreateMeeting from "./CreateMeeting";
import { instance } from "../services/apiservices";
import { ShowToast } from "./toastHelper";
import ClickedWorkSpace from "../Context/ClickedWorkSpace";
import { FaRegCalendarTimes } from "react-icons/fa";
import { socket } from "../Scokets/ScoketConfig";
import { Toaster } from "sonner";
import MeetingModal from "./MettingParticipation";
import { Link } from "react-router-dom";

function MeetingRoom() {

    const [activeTab, setActiveTab] = useState("today");
    const { ClickedSpace }: any = useContext(ClickedWorkSpace)
    const [CreateMetting, setCreateMetting] = useState<boolean>(false)
    const onClose = () => {
        setCreateMetting((prev) => !prev)
    }
    const [meetingHistory, setMeetingHistory] = useState<any[]>([]);
    const [__, setTodaysMeetings] = useState<any[]>([]);
    const [UpcomingMeetings, setUpcomingMeetings] = useState<any[]>([]);
    const [Selectedtab, setSelectedtab] = useState<String>("Overview")
    const [Upcomingoption, setUpcomingoption] = useState("")
    const [poupMettinginfo, setpoupMettinginfo] = useState<any | null>(null)

    useEffect(() => {
        const fetchMettings = async () => {


            try {


                const response = await instance.get("/api/mettings/", {
                    params: {
                        Pid: ClickedSpace._id
                    }
                })


                console.log(response.data);


                setMeetingHistory(response.data.Meeting_History)
                setTodaysMeetings(response.data.Todays_mettngs)
                setUpcomingMeetings(response.data.Upcoming_mettings
                )
            } catch (error: any) {


                return ShowToast(error?.response?.data?.message, error?.response?.status, "Error")

            }
        }
        fetchMettings()
    }, [])

    // handelUpcomingOption


    const handelUpcomingOption = (id: any) => {
        if (!id) {
            return
        }
        setpoupMettinginfo(id)
        setUpcomingoption(id)
    }



    // MettingsList
    useEffect(() => {

        const handelMettingsList = (data: any) => {
            const meetings = data;

            setMeetingHistory(meetings.Mettings);
            setTodaysMeetings(meetings.todayMetting);
            setUpcomingMeetings(meetings.upcoming_mettings);
        };


        socket.on("MettingsList", handelMettingsList)
        return () => {

            socket.off("MettingsList", handelMettingsList)

            socket.off("connect");
            socket.off("disconnect");
        }
    }, [])

    // handelDeleteMettings


    const handelDeleteMettings = async (id: any) => {
        if (!id) {



            return ShowToast('Some Thing Went Wrong.', 400, 'Error')
        }

        try {
            const response = await instance.delete('/api/mettings/delete', {
                params: {
                    meet_id: id,
                    pid: ClickedSpace._id
                }
            })

            return ShowToast(response.data.message, response.status, 'sucess')
        } catch (error: any) {

            return ShowToast(error?.response.data.message, error?.response.data.status, 'Error')
        }
    }


    const handelmarkAscompleted = async (id: any) => {


        try {
            if (!id) {
                return ShowToast("something Went Wrong", 400, 'Error')
            }

            console.log({ id: id, Pid: ClickedSpace._id })
            const response = await instance.put("/api/mettings/completed", { id: id, Pid: ClickedSpace._id })
            return ShowToast(response?.data?.message, response?.status, "sucess")
        } catch (error: any) {


            return ShowToast(error?.response?.data?.message, error?.response?.status, "Error")
        }
    }
    return (
        <>

            <Toaster></Toaster>

            {/* </> */}
            <div className="min-h-screen bg-gray-50 p-4 dark:bg-[#0b1120] sm:p-6">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            Meetings
                        </h1>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Schedule and join project meetings.
                        </p>
                    </div>

                    <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700" onClick={() => setCreateMetting(true)}>
                        <FiPlus size={18} />
                        Create Meeting
                    </button>
                </div>
                {CreateMetting && <CreateMeeting onClose={onClose} CreateMetting={CreateMetting} ></CreateMeeting>}

                {/* TABs */}
                <div className="w-full px-3 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">

                        {/* Tabs */}
                        <div className="mb-6 overflow-x-auto">
                            <div className="flex min-w-max gap-2 rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm dark:border-gray-800 dark:bg-[#111827]">

                                {/* Upcoming */}
                                <button
                                    onClick={() => setActiveTab("upcoming")}
                                    className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition sm:px-5 ${activeTab === "upcoming"
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                        }`}
                                >
                                    <FiCalendar size={17} />
                                    <span>Upcoming</span>
                                </button>

                                {/* Today */}
                                <button
                                    onClick={() => setActiveTab("today")}
                                    className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition sm:px-5 ${activeTab === "today"
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                        }`}
                                >
                                    <FiClock size={17} />
                                    <span>Today</span>
                                </button>

                                {/* History */}
                                <button
                                    onClick={() => setActiveTab("history")}
                                    className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition sm:px-5 ${activeTab === "history"
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                        }`}
                                >
                                    <FiCheckCircle size={17} />
                                    <span>History</span>
                                </button>

                            </div>
                        </div>

                        {/* Content */}
                        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-[#0f172a] sm:p-6">

                            {/* ================= UPCOMING ================= */}
                            {activeTab === "upcoming" && (
                                <>
                                    <section className="mb-8">

                                        {/* Section Header */}
                                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                                                    <span>Upcoming Meetings</span>

                                                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                                        {UpcomingMeetings?.length || 0}
                                                    </span>
                                                </h2>

                                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                    Meetings scheduled for your projects
                                                </p>
                                            </div>

                                            <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                                {UpcomingMeetings?.length || 0} Upcoming
                                            </span>
                                        </div>

                                        {/* Meeting List */}
                                        <div className="space-y-3">

                                            {UpcomingMeetings?.length === 0 ? (
                                                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-12 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                                                    <FaRegCalendarTimes className="mb-3 text-4xl" />

                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        No upcoming meetings
                                                    </p>

                                                    <span className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                                        You don't have any upcoming meetings scheduled.
                                                    </span>
                                                </div>
                                            ) : (
                                                UpcomingMeetings?.map((up) => (
                                                    <div
                                                        key={up._id}
                                                        className="rounded-xl border border-gray-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm dark:border-gray-800 dark:bg-[#111827] dark:hover:border-blue-500/30"
                                                    >
                                                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                                            {/* Meeting Info */}
                                                            <div className="flex gap-3">

                                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                                                    <FiVideo size={20} />
                                                                </div>

                                                                <div className="min-w-0">
                                                                    <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                                                                        {up?.MettingTitle || "Meeting Title"}
                                                                    </h3>

                                                                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400">

                                                                        <span className="flex items-center gap-1">
                                                                            <FiCalendar size={13} />
                                                                            {up?.MettingDate || "Meeting Date"}
                                                                        </span>

                                                                        <span className="flex items-center gap-1">
                                                                            <FiClock size={13} />
                                                                            {up?.MettingStartTime || "Start Time"} -
                                                                            {" "}
                                                                            {up?.MettingEndTime || "End Time"}
                                                                        </span>

                                                                        <span className="flex items-center gap-1">
                                                                            <FiUsers size={13} />
                                                                            {up?.TeamMembers?.length || 0} Participants
                                                                        </span>

                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Actions */}
                                                            <div className="flex items-center gap-2">

                                                                <Link
                                                                    to="/join-metting"
                                                                    state={{ Meetid: up._id }}
                                                                    className="flex-1 sm:flex-none"
                                                                >
                                                                    <button
                                                                        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                                                                    >
                                                                        Join Meeting
                                                                    </button>
                                                                </Link>

                                                                <button
                                                                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-white"
                                                                    onClick={() => handelUpcomingOption(up)}
                                                                >
                                                                    <FiMoreVertical size={18} />
                                                                </button>

                                                            </div>

                                                        </div>
                                                    </div>
                                                ))
                                            )}

                                        </div>
                                    </section>
                                </>
                            )}

                            {/* ================= TODAY ================= */}
                            {activeTab === "today" && (
                                <section>

                                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                                                Today's Meetings
                                            </h2>

                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                Meetings scheduled for today
                                            </p>
                                        </div>

                                        <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600 dark:bg-green-500/10 dark:text-green-400">
                                            Today
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-12 text-gray-500 dark:border-gray-800 dark:text-gray-400">

                                        <FiCalendar className="mb-3 text-4xl" />

                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            No meetings today
                                        </p>

                                        <span className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                            You don't have any meetings scheduled for today.
                                        </span>

                                    </div>

                                </section>
                            )}

                            {/* ================= HISTORY ================= */}
                            {activeTab === "history" && (
                                <section>

                                    {/* Header */}
                                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                                                <span>Meeting History</span>

                                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                                    {meetingHistory?.length || 0}
                                                </span>
                                            </h2>

                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                Previously completed meetings
                                            </p>
                                        </div>

                                        <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                            {meetingHistory?.length || 0} Meetings
                                        </span>
                                    </div>

                                    {/* History Container */}
                                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#111827]">

                                        <div className="divide-y divide-gray-200 dark:divide-gray-800">

                                            {meetingHistory?.length === 0 ? (
                                                <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">

                                                    <FaRegCalendarTimes className="mb-3 text-4xl" />

                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        No Meeting History
                                                    </p>

                                                    <span className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                                        You don't have any past meetings yet.
                                                    </span>

                                                </div>
                                            ) : (
                                                meetingHistory?.map((mt, idx) => (
                                                    <div
                                                        className="flex flex-col gap-4 p-4 transition hover:bg-gray-50 dark:hover:bg-gray-800/40 sm:flex-row sm:items-center sm:justify-between"
                                                        key={idx}
                                                    >

                                                        {/* Meeting Details */}
                                                        <div className="flex min-w-0 items-center gap-3">

                                                            {mt?.MettingCompleted && (
                                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                                                                    <FiCheckCircle size={18} />
                                                                </div>
                                                            )}

                                                            <div className="min-w-0">

                                                                <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                                                    {mt?.MettingTitle || "Meeting Title"}
                                                                </h3>

                                                                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400">

                                                                    {/* Date */}
                                                                    <span className="flex items-center gap-1">
                                                                        <FiCalendar size={13} />
                                                                        {mt?.MettingDate || "Meeting Date"}
                                                                    </span>

                                                                    {/* Time */}
                                                                    <span className="flex items-center gap-1">
                                                                        <FiClock size={13} />
                                                                        {mt?.MettingEndTime || "Meeting Time"}
                                                                    </span>

                                                                    {/* Team Members */}
                                                                    <span className="flex items-center gap-1">
                                                                        <FiUsers size={13} />
                                                                        {mt?.TeamMembers?.length || 0}
                                                                    </span>

                                                                    {/* Attended */}
                                                                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                                                        <FiUserCheck size={13} />
                                                                        {mt?.attendeeCount?.length || 0}
                                                                    </span>

                                                                </div>

                                                            </div>
                                                        </div>

                                                        {/* Status */}
                                                        <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600 dark:bg-green-500/10 dark:text-green-400">
                                                            {mt?.MettingCompleted && "Completed"}
                                                        </span>

                                                    </div>
                                                ))
                                            )}

                                        </div>
                                    </div>

                                </section>
                            )}

                        </div>
                    </div>
                </div>


            </div>

            {Upcomingoption && (

                <MeetingModal Selectedtab={Selectedtab} handelmarkAscompleted={handelmarkAscompleted} handelDeleteMettings={handelDeleteMettings} poupMettinginfo={poupMettinginfo} Upcomingoption={Upcomingoption} setSelectedtab={setSelectedtab} setUpcomingoption={() => setUpcomingoption("")} ></MeetingModal >
            )
            }
        </>
    );
}

export default MeetingRoom;