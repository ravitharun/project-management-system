
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
import JoinMettings from "./JoinMettings";
import { instance } from "../services/apiservices";
import { ShowToast } from "./toastHelper";
import ClickedWorkSpace from "../Context/ClickedWorkSpace";

function MeetingRoom() {
    const { ClickedSpace }: any = useContext(ClickedWorkSpace)
    const [CreateMetting, setCreateMetting] = useState<boolean>(false)
    const onClose = () => {
        setCreateMetting((prev) => !prev)
    }
    const [meetingHistory, setMeetingHistory] = useState<any[]>([]);
    const [todaysMeetings, setTodaysMeetings] = useState<any[]>([]);
    const [upcomingMeetings, setUpcomingMeetings] = useState<any[]>([]);


    useEffect(() => {
        const fetchMettings = async () => {


            try {


                const response = await instance.get("/api/mettings/", {
                    params: {
                        Pid: ClickedSpace._id
                    }
                })

                // Meeting History
                // Todays _mettngs
                // Upcoming_mettings
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
    console.log(meetingHistory, meetingHistory)
    return (
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
            {/* Upcoming Meetings */}
            <section className="mb-8">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                            Upcoming Meetings
                        </h2>

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Meetings scheduled for your projects
                        </p>
                    </div>

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        3 Upcoming
                    </span>
                </div>

                <div className="space-y-3">
                    {/* Meeting 1 */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-[#111827]">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                    <FiVideo size={20} />
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                        Sprint Planning
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        E-Commerce Project
                                    </p>

                                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <FiCalendar size={13} />
                                            Sep 15, 2026
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <FiClock size={13} />
                                            10:30 AM
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <FiUsers size={13} />
                                            5 Participants
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 lg:flex-none">
                                    Join Meeting
                                </button>

                                <button className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-white">
                                    <FiMoreVertical size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Meeting 2 */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-[#111827]">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                                    <FiVideo size={20} />
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                        Team Standup
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Taskora Development
                                    </p>

                                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <FiCalendar size={13} />
                                            Sep 16, 2026
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <FiClock size={13} />
                                            9:30 AM
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <FiUsers size={13} />
                                            4 Participants
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 lg:flex-none">
                                    Join Meeting
                                </button>

                                <button className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-white">
                                    <FiMoreVertical size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meeting History */}
            <section>
                <div className="mb-4">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                        Meeting History
                    </h2>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Previously completed meetings
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#111827]">
                    <div className="divide-y divide-gray-200 dark:divide-gray-800">
                        {meetingHistory.length == 0 ? "hey" :


                            <>



                                {meetingHistory.map((mt, idx) => (


                                    <div
                                        className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                                        key={idx}
                                    >
                                        <div className="flex items-center gap-3">
                                            {mt?.MettingCompleted && (
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                                                    <FiCheckCircle size={18} />
                                                </div>
                                            )}

                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {mt?.MettingTitle || "Meeting Title"}
                                                </h3>

                                                <div className="mt-1 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                                    {/* Date & Time */}
                                                    <span>
                                                        {mt?.MettingDate || "Meeting Date"} ·{" "}
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
                                                        {mt?.attendeeCount.length}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                            {mt?.MettingCompleted && "Completed"}
                                        </span>
                                    </div>
                                ))}
                            </>}

                    </div>
                </div>
            </section>
            <JoinMettings></JoinMettings>
        </div>
    );
}

export default MeetingRoom;