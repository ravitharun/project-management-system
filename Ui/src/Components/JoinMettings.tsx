import {
    FiMic,
    FiMicOff,
    FiVideo,
    FiVideoOff,
    FiMonitor,
    FiMessageSquare,
    FiPhoneOff,
    FiMoreVertical,
    FiUsers,
    FiSettings,
    FiSearch,
} from "react-icons/fi";
'use client';
import { useState } from 'react'
import {
    VideoTrack,
    useTracks,
} from "@livekit/components-react";



import { Room, Track } from "livekit-client";
import '@livekit/components-styles';

import { toast, Toaster } from "sonner";

function JoinMettings({ room }: { room: Room }) {
    const cameraTracks = useTracks([
        {
            source: Track.Source.Camera,
            withPlaceholder: true,
        },
    ]);
    const [iscam, setiscam] = useState(false)
    const [isMic, setismic] = useState(false)
    const [openPeople, setopenPeople] = useState(false)
    const [participants, setparticipants] = useState<any[]>([]);
    const [listparticipants, listsetparticipants] = useState<any[]>(participants);




    let meetuid = 13

    const [isSharescreen, setisSharescreen] = useState(false)



    const handelMic = async () => {

        await room.localParticipant.setMicrophoneEnabled(true)
        setismic(true)
    }

    const handelMicoff = async () => {
        await room.localParticipant.setMicrophoneEnabled(false)
        setismic(false)
    }
    const offcam = async () => {
        await room.localParticipant.setCameraEnabled(false)
        setiscam(false)
        participants.filter((users: any) => users.id == meetuid && users.video ? users.video = false : users)

            ;

        setparticipants(participants)
    }
    const oncam = async () => {

        await room.localParticipant.setCameraEnabled(true)
        setiscam(true)


        const filterUpdate = participants.filter((users: any) => users.id == meetuid ? users.video = true : users)
        JSON.stringify(filterUpdate)
        setparticipants(filterUpdate)

    }


    const handelonSharescreen = async () => {
        await room.localParticipant.setScreenShareEnabled(true);
        setisSharescreen(true);
    };

    const handeloffSharescreen = async () => {
        await room.localParticipant.setScreenShareEnabled(false);
        setisSharescreen(false);
    };

    const HandelUsersList = () => {
        setopenPeople((prev) => !prev)

    }

    // call end :HandelCallEnded
    const HandelCallEnded = () => {

        // callended message

        toast.success("Meeting ended successfully.")

        setTimeout(() => {


            window.location.href = "/"
        }, 2000)
    }



    // searchUser
    const handelsearchUser = (e: any) => {
        let inp = e.target.value
        if (!inp) {


            return listsetparticipants(participants)
        }
        const filter_participants = participants.filter((user) => user.name.toLowerCase() == inp || user.name == inp || user.name.toUpperCase() == inp.toUpperCase())
        if (filter_participants.length == 0) {
            return listsetparticipants([])
        }

        listsetparticipants(filter_participants)



    }

    return (
        <>
            <Toaster position="top-center"></Toaster>

            <div className="flex min-h-screen flex-col bg-[#0b1120] text-white">
                {/* Header */}
                <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-800 px-4 sm:px-6">
                    <div>
                        <h1 className="text-base font-semibold sm:text-lg">
                            Project Discussion
                        </h1>

                        <p className="text-xs text-gray-400">
                            E-Commerce Website
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden items-center gap-2 rounded-lg bg-gray-800 px-3 py-2 text-xs text-gray-300 sm:flex">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            4 Participants
                        </div>

                        <button className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white" onClick={HandelUsersList}>
                            <FiUsers size={19} />
                        </button>

                        <button className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white">
                            <FiSettings size={19} />
                        </button>

                        <button className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white">
                            <FiMoreVertical size={19} />
                        </button>
                    </div>
                </header>

                {/* Participants */}
                <main className="flex flex-1 items-center justify-center p-3 sm:p-5">
                    <div className="flex w-full max-w-7xl items-start gap-8">
                        {/* Video Grid */}
                        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">

                            {/* Your Real Camera */}
                            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-gray-800 bg-[#111827]">

                                {cameraTracks.length > 0 ? (
                                    <VideoTrack
                                        trackRef={cameraTracks[0]}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-700 text-xl font-semibold text-gray-200">
                                        T
                                    </div>
                                )}

                                {/* Name */}
                                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-black/60 px-2.5 py-1.5 backdrop-blur-sm">
                                    <span className="text-sm font-medium">
                                        You
                                    </span>

                                    {isMic ? (
                                        <FiMic size={14} className="text-gray-300" />
                                    ) : (
                                        <FiMicOff size={14} className="text-red-400" />
                                    )}
                                </div>

                                {/* Video status */}
                                <div className="absolute right-3 top-3 rounded-lg bg-black/60 p-2 text-gray-300">
                                    {iscam ? (
                                        <FiVideo size={15} />
                                    ) : (
                                        <FiVideoOff size={15} />
                                    )}
                                </div>

                            </div>

                            {/* Dummy participants for now */}
                            {participants.map((participant) => (
                                <div
                                    key={participant.name}
                                    className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-gray-800 bg-[#111827]"
                                >

                                    {/* Dummy Avatar */}
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-700 text-xl font-semibold text-gray-200">
                                        {participant.name.charAt(0).toUpperCase()}
                                    </div>

                                    {/* Name */}
                                    <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-black/60 px-2.5 py-1.5 backdrop-blur-sm">
                                        <span className="text-sm font-medium">
                                            {participant.name}
                                        </span>

                                        {participant.muted ? (
                                            <FiMicOff size={14} className="text-red-400" />
                                        ) : (
                                            <FiMic size={14} className="text-gray-300" />
                                        )}
                                    </div>

                                    {/* Video status */}
                                    <div className="absolute right-3 top-3 rounded-lg bg-black/60 p-2 text-gray-300">
                                        {participant.video ? (
                                            <FiVideo size={15} />
                                        ) : (
                                            <FiVideoOff size={15} />
                                        )}
                                    </div>

                                </div>
                            ))}

                        </div>

                        {/* Participants Panel */}
                        {openPeople && (
                            <div className="w-80 flex-shrink-0 rounded-xl border border-gray-800 bg-[#111827] p-4 shadow-lg">
                                {/* Header */}
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-white">
                                        Participants ({participants.length})
                                    </h3>

                                    <button
                                        onClick={HandelUsersList}
                                        className="rounded-md bg-gray-800 px-3 py-1 text-sm text-gray-300 hover:bg-gray-700"
                                    >
                                        Close
                                    </button>
                                </div>

                                {/* Search */}
                                <div className="relative mb-4">
                                    <FiSearch
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        size={16}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search participant..."


                                        onChange={(e) => handelsearchUser(e)}
                                        className="w-full rounded-lg border border-gray-700 bg-gray-900 py-2 pl-10 pr-3 text-sm text-white outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* Participants List */}
                                <div className="max-h-[450px] space-y-2 overflow-y-auto pr-1">
                                    {listparticipants.length === 0 ? (
                                        <div className="flex h-[250px] flex-col items-center justify-center rounded-xl border border-gray-700 bg-gray-800/50">
                                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-700">
                                                <FiUsers size={30} className="text-gray-400" />
                                            </div>

                                            <h2 className="text-base font-semibold text-white">
                                                No participants
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-400">
                                                Waiting for others to join...
                                            </p>
                                        </div>
                                    ) : (
                                        listparticipants.map((participant) => (
                                            <div
                                                key={participant.name}
                                                className="group flex items-center justify-between rounded-xl border border-gray-700/60 bg-gray-800 px-3 py-3 transition-all duration-200 hover:border-gray-600 hover:bg-gray-750"
                                            >
                                                {/* Left - Avatar + Name */}
                                                <div className="flex min-w-0 items-center gap-3">

                                                    {/* Avatar */}
                                                    <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white shadow-sm">
                                                        {participant.name?.charAt(0).toUpperCase()}

                                                        {/* Online indicator */}
                                                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-gray-800 bg-green-400" />
                                                    </div>

                                                    {/* Name */}
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-medium text-white">
                                                            {participant.name}
                                                        </p>

                                                        <p className="text-xs text-gray-500">
                                                            Participant
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Right - Controls */}
                                                <div className="flex flex-shrink-0 items-center gap-1">

                                                    {/* Mic */}
                                                    <div
                                                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${isMic
                                                            ? "bg-red-500/10 text-red-400"
                                                            : "bg-gray-700/60 text-gray-300"
                                                            }`}
                                                    >
                                                        {isMic ? (
                                                            <FiMicOff size={15} />
                                                        ) : (
                                                            <FiMic size={15} />
                                                        )}
                                                    </div>

                                                    {/* Video */}
                                                    <div
                                                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${participant.video
                                                            ? "bg-gray-700/60 text-gray-300"
                                                            : "bg-gray-700/30 text-gray-500"
                                                            }`}
                                                    >
                                                        {participant.video ? (
                                                            <FiVideo size={15} />
                                                        ) : (
                                                            <FiVideoOff size={15} />
                                                        )}
                                                    </div>

                                                    {/* More */}
                                                    <button
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-700 hover:text-white"
                                                    >
                                                        <FiMoreVertical size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                {/* Controls */}
                <footer className="flex shrink-0 items-center justify-center border-t border-gray-800 bg-[#0b1120] px-3 py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Mic */}
                        <button
                            title={isMic ? "Mute" : "Unmute"}
                            onClick={isMic ? handelMic : handelMicoff}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-gray-700"
                        >
                            {isMic ? <FiMic size={19} /> : <FiMicOff size={19} />}
                        </button>

                        {/* Camera */}
                        <button
                            title={iscam ? "Turn Off Camera" : "Turn On Camera"}
                            onClick={iscam ? offcam : oncam}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-gray-700"
                        >
                            {iscam ? <FiVideo size={19} /> : <FiVideoOff size={19} />}
                        </button>

                        {/* Screen Share */}
                        <button
                            title={isSharescreen ? "Stop Sharing" : "Share Screen"}
                            onClick={isSharescreen ? handeloffSharescreen : handelonSharescreen}
                            className="hidden h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-gray-700 sm:flex"
                        >
                            <FiMonitor size={19} />
                        </button>

                        {/* Chat */}
                        <button
                            title="Chat"
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-gray-700"
                        >
                            <FiMessageSquare size={19} />
                        </button>

                        {/* Leave */}

                        <button
                            title="Leave meeting"
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700"
                            onClick={HandelCallEnded}
                        >
                            <FiPhoneOff size={19} />
                        </button>
                    </div>
                </footer>

            </div>

        </>

    );
}

export default JoinMettings;