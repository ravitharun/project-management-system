// import {
//     FiMic,
//     FiMicOff,
//     FiVideo,
//     FiVideoOff,
//     FiMonitor,
//     FiMessageSquare,
//     FiPhoneOff,
//     FiMoreVertical,
//     FiUsers,
//     FiSettings,
// } from "react-icons/fi";

// function MeetingRoom() {
//     const participants = [
//         { name: "Ravi", muted: false, video: true },
//         { name: "John", muted: false, video: true },
//         { name: "Alex", muted: true, video: true },
//         { name: "Tharun", muted: false, video: false },
//     ];

//     return (
//         <div className="flex min-h-screen flex-col bg-[#0b1120] text-white">
//             {/* Header */}
//             <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-800 px-4 sm:px-6">
//                 <div>
//                     <h1 className="text-base font-semibold sm:text-lg">
//                         Project Discussion
//                     </h1>

//                     <p className="text-xs text-gray-400">
//                         E-Commerce Website
//                     </p>
//                 </div>

//                 <div className="flex items-center gap-3">
//                     <div className="hidden items-center gap-2 rounded-lg bg-gray-800 px-3 py-2 text-xs text-gray-300 sm:flex">
//                         <span className="h-2 w-2 rounded-full bg-green-500" />
//                         4 Participants
//                     </div>

//                     <button className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white">
//                         <FiUsers size={19} />
//                     </button>

//                     <button className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white">
//                         <FiSettings size={19} />
//                     </button>

//                     <button className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white">
//                         <FiMoreVertical size={19} />
//                     </button>
//                 </div>
//             </header>

//             {/* Participants */}
//             <main className="flex flex-1 items-center justify-center p-3 sm:p-5">
//                 <div className="grid w-full max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2">
//                     {participants.map((participant) => (
//                         <div
//                             key={participant.name}
//                             className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-gray-800 bg-[#111827]"
//                         >
//                             {/* Dummy avatar */}
//                             <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-700 text-xl font-semibold text-gray-200">
//                                 {participant.name.charAt(0)}
//                             </div>

//                             {/* Name */}
//                             <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-black/60 px-2.5 py-1.5 backdrop-blur-sm">
//                                 <span className="text-sm font-medium">
//                                     {participant.name}
//                                 </span>

//                                 {participant.muted ? (
//                                     <FiMicOff
//                                         size={14}
//                                         className="text-red-400"
//                                     />
//                                 ) : (
//                                     <FiMic
//                                         size={14}
//                                         className="text-gray-300"
//                                     />
//                                 )}
//                             </div>

//                             {/* Video status */}
//                             {!participant.video && (
//                                 <div className="absolute right-3 top-3 rounded-lg bg-black/60 p-2 text-gray-300">
//                                     <FiVideoOff size={15} />
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </main>

//             {/* Controls */}
//             <footer className="flex shrink-0 items-center justify-center border-t border-gray-800 bg-[#0b1120] px-3 py-4">
//                 <div className="flex items-center gap-2 sm:gap-3">
//                     {/* Mic */}
//                     <button
//                         title="Mute"
//                         className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-gray-700"
//                     >
//                         <FiMic size={19} />
//                     </button>

//                     {/* Camera */}
//                     <button
//                         title="Camera"
//                         className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-gray-700"
//                     >
//                         <FiVideo size={19} />
//                     </button>

//                     {/* Screen Share */}
//                     <button
//                         title="Share screen"
//                         className="hidden h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-gray-700 sm:flex"
//                     >
//                         <FiMonitor size={19} />
//                     </button>

//                     {/* Chat */}
//                     <button
//                         title="Chat"
//                         className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-gray-700"
//                     >
//                         <FiMessageSquare size={19} />
//                     </button>

//                     {/* Leave */}
//                     <button
//                         title="Leave meeting"
//                         className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700"
//                     >
//                         <FiPhoneOff size={19} />
//                     </button>
//                 </div>
//             </footer>
//         </div>
//     );
// }

// export default MeetingRoom;
import React, { useState } from "react";
import {
    FiVideo,
    FiPlus,
    FiCalendar,
    FiClock,
    FiUsers,
    FiMoreVertical,
    FiCheckCircle,
} from "react-icons/fi";
import CreateMeeting from "./CreateMeeting";

function MeetingRoom() {
    const[CreateMetting,setCreateMetting]=useState<boolean>(false)
    const onClose=()=>{
        setCreateMetting((prev)=>!prev)
        console.log("onClose")
    }
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

                <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700" onClick={()=>setCreateMetting(true)}>
                    <FiPlus size={18} />
                    Create Meeting
                </button>
            </div>
           {CreateMetting&&  <CreateMeeting onClose={onClose} CreateMetting={CreateMetting} ></CreateMeeting>}
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
                        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                                    <FiCheckCircle size={18} />
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                        Project Review
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Sep 12, 2026 · 3:00 PM
                                    </p>
                                </div>
                            </div>

                            <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                Completed
                            </span>
                        </div>

                        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                                    <FiCheckCircle size={18} />
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                        Client Discussion
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Sep 10, 2026 · 11:00 AM
                                    </p>
                                </div>
                            </div>

                            <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                Completed
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MeetingRoom;