"use client";

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

import { useEffect, useState } from "react";

import {
    VideoTrack,
} from "@livekit/components-react";

import {
    Room,
    Track,
    TrackPublication,
} from "livekit-client";

import "@livekit/components-styles";

import { toast, Toaster } from "sonner";

function JoinMettings({ room }: { room: Room }) {

    const [iscam, setiscam] = useState(false);
    const [isMic, setismic] = useState(false);
    const [openPeople, setopenPeople] = useState(false);

    const [participants, setparticipants] = useState<any[]>([]);

    const [listparticipants, listsetparticipants] =
        useState<any[]>([]);

    const [isSharescreen, setisSharescreen] =
        useState(false);

    const meetuid = 13;

    /*
    |--------------------------------------------------------------------------
    | GET LOCAL CAMERA PUBLICATION
    |--------------------------------------------------------------------------
    */

    const [cameraPublication, setCameraPublication] =
        useState<TrackPublication | undefined>(
            room.localParticipant.getTrackPublication(
                Track.Source.Camera
            )
        );

    /*
    |--------------------------------------------------------------------------
    | GET CURRENT CAMERA / MIC STATUS
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const updateCamera = () => {

            const publication =
                room.localParticipant.getTrackPublication(
                    Track.Source.Camera
                );

            setCameraPublication(publication);

            setiscam(
                publication?.isEnabled ?? false
            );
        };

        const updateMic = () => {

            const publication =
                room.localParticipant.getTrackPublication(
                    Track.Source.Microphone
                );

            setismic(
                publication?.isEnabled ?? false
            );
        };

        updateCamera();
        updateMic();

        /*
        | Listen for local track changes
        */

        const handleTrackPublished = () => {
            updateCamera();
            updateMic();
        };

        const handleTrackUnpublished = () => {
            updateCamera();
            updateMic();
        };

        room.localParticipant.on(
            "localTrackPublished",
            handleTrackPublished
        );

        room.localParticipant.on(
            "localTrackUnpublished",
            handleTrackUnpublished
        );

        return () => {

            room.localParticipant.off(
                "localTrackPublished",
                handleTrackPublished
            );

            room.localParticipant.off(
                "localTrackUnpublished",
                handleTrackUnpublished
            );
        };

    }, [room]);

    /*
    |--------------------------------------------------------------------------
    | DEBUG
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        console.log(
            "LiveKit Room:",
            room
        );

        console.log(
            "Local Participant:",
            room.localParticipant
        );

        console.log(
            "Camera Publication:",
            cameraPublication
        );

        console.log(
            "Camera Enabled:",
            room.localParticipant.isCameraEnabled
        );

        console.log(
            "Microphone Enabled:",
            room.localParticipant.isMicrophoneEnabled
        );

    }, [room, cameraPublication]);

    /*
    |--------------------------------------------------------------------------
    | MICROPHONE ON
    |--------------------------------------------------------------------------
    */

    const handelMic = async () => {

        try {

            await room.localParticipant.setMicrophoneEnabled(
                true
            );

            setismic(true);

        } catch (error) {

            console.error(
                "Microphone error:",
                error
            );

            toast.error(
                "Unable to turn microphone on"
            );
        }
    };

    /*
    |--------------------------------------------------------------------------
    | MICROPHONE OFF
    |--------------------------------------------------------------------------
    */

    const handelMicoff = async () => {

        try {

            await room.localParticipant.setMicrophoneEnabled(
                false
            );

            setismic(false);

        } catch (error) {

            console.error(
                "Microphone error:",
                error
            );

            toast.error(
                "Unable to turn microphone off"
            );
        }
    };

    /*
    |--------------------------------------------------------------------------
    | CAMERA ON
    |--------------------------------------------------------------------------
    */

    const oncam = async () => {

        try {

            console.log(
                "Turning camera ON..."
            );

            await room.localParticipant.setCameraEnabled(
                true
            );

            const publication =
                room.localParticipant.getTrackPublication(
                    Track.Source.Camera
                );

            console.log(
                "Camera publication after ON:",
                publication
            );

            setCameraPublication(
                publication
            );

            setiscam(true);

            /*
            | Update dummy participant
            */

            setparticipants((prev) =>
                prev.map((user) =>
                    user.id === meetuid
                        ? {
                            ...user,
                            video: true,
                        }
                        : user
                )
            );

            listsetparticipants((prev) =>
                prev.map((user) =>
                    user.id === meetuid
                        ? {
                            ...user,
                            video: true,
                        }
                        : user
                )
            );

        } catch (error) {

            console.error(
                "Camera error:",
                error
            );

            toast.error(
                "Unable to access camera"
            );
        }
    };

    /*
    |--------------------------------------------------------------------------
    | CAMERA OFF
    |--------------------------------------------------------------------------
    */

    const offcam = async () => {

        try {

            await room.localParticipant.setCameraEnabled(
                false
            );

            const publication =
                room.localParticipant.getTrackPublication(
                    Track.Source.Camera
                );

            setCameraPublication(
                publication
            );

            setiscam(false);

            /*
            | Update participant
            */

            setparticipants((prev) =>
                prev.map((user) =>
                    user.id === meetuid
                        ? {
                            ...user,
                            video: false,
                        }
                        : user
                )
            );

            listsetparticipants((prev) =>
                prev.map((user) =>
                    user.id === meetuid
                        ? {
                            ...user,
                            video: false,
                        }
                        : user
                )
            );

        } catch (error) {

            console.error(
                "Camera error:",
                error
            );

            toast.error(
                "Unable to turn camera off"
            );
        }
    };

    /*
    |--------------------------------------------------------------------------
    | SCREEN SHARE ON
    |--------------------------------------------------------------------------
    */

    const handelonSharescreen = async () => {

        try {

            await room.localParticipant.setScreenShareEnabled(
                true
            );

            setisSharescreen(true);

        } catch (error) {

            console.error(
                "Screen share error:",
                error
            );

            toast.error(
                "Unable to start screen sharing"
            );
        }
    };

    /*
    |--------------------------------------------------------------------------
    | SCREEN SHARE OFF
    |--------------------------------------------------------------------------
    */

    const handeloffSharescreen = async () => {

        try {

            await room.localParticipant.setScreenShareEnabled(
                false
            );

            setisSharescreen(false);

        } catch (error) {

            console.error(
                "Screen share error:",
                error
            );

            toast.error(
                "Unable to stop screen sharing"
            );
        }
    };

    /*
    |--------------------------------------------------------------------------
    | PARTICIPANT PANEL
    |--------------------------------------------------------------------------
    */

    const HandelUsersList = () => {

        setopenPeople(
            (prev) => !prev
        );
    };

    /*
    |--------------------------------------------------------------------------
    | END MEETING
    |--------------------------------------------------------------------------
    */

    const HandelCallEnded = async () => {

        try {

            await room.localParticipant.setCameraEnabled(
                false
            );

            await room.localParticipant.setMicrophoneEnabled(
                false
            );

            await room.disconnect();

        } catch (error) {

            console.error(
                "Disconnect error:",
                error
            );
        }

        toast.success(
            "Meeting ended successfully."
        );

        setTimeout(() => {

            window.location.href = "/";

        }, 2000);
    };

    /*
    |--------------------------------------------------------------------------
    | SEARCH PARTICIPANT
    |--------------------------------------------------------------------------
    */

    const handelsearchUser = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const inp =
            e.target.value
                .trim()
                .toLowerCase();

        if (!inp) {

            listsetparticipants(
                participants
            );

            return;
        }

        const filter_participants =
            participants.filter(
                (user) =>
                    user.name
                        .toLowerCase()
                        .includes(inp)
            );

        listsetparticipants(
            filter_participants
        );
    };

    return (

        <>

            <Toaster
                position="top-center"
            />

            <div className="flex min-h-screen flex-col bg-[#0b1120] text-white">

                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

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

                            {participants.length + 1} Participants

                        </div>

                        <button
                            onClick={HandelUsersList}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white"
                        >
                            <FiUsers size={19} />
                        </button>

                        <button
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white"
                        >
                            <FiSettings size={19} />
                        </button>

                        <button
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white"
                        >
                            <FiMoreVertical size={19} />
                        </button>

                    </div>

                </header>

                {/* ================================================= */}
                {/* MAIN */}
                {/* ================================================= */}

                <main className="flex flex-1 items-center justify-center p-3 sm:p-5">

                    <div className="flex w-full max-w-7xl items-start gap-8">

                        {/* ================================================= */}
                        {/* VIDEO GRID */}
                        {/* ================================================= */}

                        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">

                            {/* ================================================= */}
                            {/* YOUR CAMERA */}
                            {/* ================================================= */}

                            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-gray-800 bg-[#111827]">

                                {cameraPublication?.track ? (
                                    <VideoTrack
                                        trackRef={{
                                            participant: room.localParticipant,
                                            publication: cameraPublication,
                                            source: Track.Source.Camera,
                                        }}
                                        className="h-full w-full object-cover"
                                    />

                                ) : (

                                    <div className="flex flex-col items-center justify-center">

                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-700 text-xl font-semibold text-gray-200">

                                            T

                                        </div>

                                        <p className="mt-3 text-sm text-gray-400">

                                            Camera is off

                                        </p>

                                    </div>

                                )}

                                {/* YOUR NAME */}

                                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-black/60 px-2.5 py-1.5 backdrop-blur-sm">

                                    <span className="text-sm font-medium">
                                        You
                                    </span>

                                    {isMic ? (

                                        <FiMic
                                            size={14}
                                            className="text-gray-300"
                                        />

                                    ) : (

                                        <FiMicOff
                                            size={14}
                                            className="text-red-400"
                                        />

                                    )}

                                </div>

                                {/* VIDEO STATUS */}

                                <div className="absolute right-3 top-3 rounded-lg bg-black/60 p-2 text-gray-300">

                                    {iscam ? (

                                        <FiVideo size={15} />

                                    ) : (

                                        <FiVideoOff size={15} />

                                    )}

                                </div>

                            </div>

                            {/* ================================================= */}
                            {/* OTHER PARTICIPANTS */}
                            {/* ================================================= */}

                            {participants.map(
                                (participant) => (

                                    <div
                                        key={participant.id}
                                        className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-gray-800 bg-[#111827]"
                                    >

                                        {/* Avatar */}

                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-700 text-xl font-semibold text-gray-200">

                                            {participant.name
                                                .charAt(0)
                                                .toUpperCase()}

                                        </div>

                                        {/* NAME */}

                                        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-black/60 px-2.5 py-1.5 backdrop-blur-sm">

                                            <span className="text-sm font-medium">

                                                {participant.name}

                                            </span>

                                            {participant.muted ? (

                                                <FiMicOff
                                                    size={14}
                                                    className="text-red-400"
                                                />

                                            ) : (

                                                <FiMic
                                                    size={14}
                                                    className="text-gray-300"
                                                />

                                            )}

                                        </div>

                                        {/* VIDEO */}

                                        <div className="absolute right-3 top-3 rounded-lg bg-black/60 p-2 text-gray-300">

                                            {participant.video ? (

                                                <FiVideo size={15} />

                                            ) : (

                                                <FiVideoOff size={15} />

                                            )}

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                        {/* ================================================= */}
                        {/* PARTICIPANTS PANEL */}
                        {/* ================================================= */}

                        {openPeople && (

                            <div className="w-80 flex-shrink-0 rounded-xl border border-gray-800 bg-[#111827] p-4 shadow-lg">

                                {/* HEADER */}

                                <div className="mb-4 flex items-center justify-between">

                                    <h3 className="text-lg font-semibold text-white">

                                        Participants (
                                        {participants.length}
                                        )

                                    </h3>

                                    <button
                                        onClick={HandelUsersList}
                                        className="rounded-md bg-gray-800 px-3 py-1 text-sm text-gray-300 hover:bg-gray-700"
                                    >

                                        Close

                                    </button>

                                </div>

                                {/* SEARCH */}

                                <div className="relative mb-4">

                                    <FiSearch
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        size={16}
                                    />

                                    <input
                                        type="text"
                                        placeholder="Search participant..."
                                        onChange={handelsearchUser}
                                        className="w-full rounded-lg border border-gray-700 bg-gray-900 py-2 pl-10 pr-3 text-sm text-white outline-none focus:border-blue-500"
                                    />

                                </div>

                                {/* LIST */}

                                <div className="max-h-[450px] space-y-2 overflow-y-auto pr-1">

                                    {listparticipants.length === 0 ? (

                                        <div className="flex h-[250px] flex-col items-center justify-center rounded-xl border border-gray-700 bg-gray-800/50">

                                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-700">

                                                <FiUsers
                                                    size={30}
                                                    className="text-gray-400"
                                                />

                                            </div>

                                            <h2 className="text-base font-semibold text-white">

                                                No participants

                                            </h2>

                                            <p className="mt-1 text-sm text-gray-400">

                                                Waiting for others to join...

                                            </p>

                                        </div>

                                    ) : (

                                        listparticipants.map(
                                            (participant) => (

                                                <div
                                                    key={participant.id}
                                                    className="group flex items-center justify-between rounded-xl border border-gray-700/60 bg-gray-800 px-3 py-3 transition-all duration-200 hover:border-gray-600 hover:bg-gray-750"
                                                >

                                                    {/* LEFT */}

                                                    <div className="flex min-w-0 items-center gap-3">

                                                        <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white shadow-sm">

                                                            {participant.name
                                                                ?.charAt(0)
                                                                .toUpperCase()}

                                                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-gray-800 bg-green-400" />

                                                        </div>

                                                        <div className="min-w-0">

                                                            <p className="truncate text-sm font-medium text-white">

                                                                {participant.name}

                                                            </p>

                                                            <p className="text-xs text-gray-500">

                                                                Participant

                                                            </p>

                                                        </div>

                                                    </div>

                                                    {/* RIGHT */}

                                                    <div className="flex flex-shrink-0 items-center gap-1">

                                                        {/* MIC */}

                                                        <div
                                                            className={`flex h-8 w-8 items-center justify-center rounded-lg ${participant.muted
                                                                ? "bg-red-500/10 text-red-400"
                                                                : "bg-gray-700/60 text-gray-300"
                                                                }`}
                                                        >

                                                            {participant.muted ? (

                                                                <FiMicOff
                                                                    size={15}
                                                                />

                                                            ) : (

                                                                <FiMic
                                                                    size={15}
                                                                />

                                                            )}

                                                        </div>

                                                        {/* VIDEO */}

                                                        <div
                                                            className={`flex h-8 w-8 items-center justify-center rounded-lg ${participant.video
                                                                ? "bg-gray-700/60 text-gray-300"
                                                                : "bg-gray-700/30 text-gray-500"
                                                                }`}
                                                        >

                                                            {participant.video ? (

                                                                <FiVideo
                                                                    size={15}
                                                                />

                                                            ) : (

                                                                <FiVideoOff
                                                                    size={15}
                                                                />

                                                            )}

                                                        </div>

                                                        {/* MORE */}

                                                        <button
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-700 hover:text-white"
                                                        >

                                                            <FiMoreVertical
                                                                size={18}
                                                            />

                                                        </button>

                                                    </div>

                                                </div>

                                            )
                                        )

                                    )}

                                </div>

                            </div>

                        )}

                    </div>

                </main>

                {/* ================================================= */}
                {/* CONTROLS */}
                {/* ================================================= */}

                <footer className="flex shrink-0 items-center justify-center border-t border-gray-800 bg-[#0b1120] px-3 py-4">

                    <div className="flex items-center gap-2 sm:gap-3">

                        {/* MIC */}

                        <button
                            title={
                                isMic
                                    ? "Mute"
                                    : "Unmute"
                            }
                            onClick={
                                isMic
                                    ? handelMicoff
                                    : handelMic
                            }
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-gray-700"
                        >

                            {isMic ? (

                                <FiMic size={19} />

                            ) : (

                                <FiMicOff size={19} />

                            )}

                        </button>

                        {/* CAMERA */}

                        <button
                            title={
                                iscam
                                    ? "Turn Off Camera"
                                    : "Turn On Camera"
                            }
                            onClick={
                                iscam
                                    ? offcam
                                    : oncam
                            }
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-gray-700"
                        >

                            {iscam ? (

                                <FiVideo size={19} />

                            ) : (

                                <FiVideoOff size={19} />

                            )}

                        </button>

                        {/* SCREEN SHARE */}

                        <button
                            title={
                                isSharescreen
                                    ? "Stop Sharing"
                                    : "Share Screen"
                            }
                            onClick={
                                isSharescreen
                                    ? handeloffSharescreen
                                    : handelonSharescreen
                            }
                            className="hidden h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-gray-700 sm:flex"
                        >

                            <FiMonitor size={19} />

                        </button>

                        {/* CHAT */}

                        <button
                            title="Chat"
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-gray-700"
                        >

                            <FiMessageSquare
                                size={19}
                            />

                        </button>

                        {/* LEAVE */}

                        <button
                            title="Leave meeting"
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700"
                            onClick={HandelCallEnded}
                        >

                            <FiPhoneOff
                                size={19}
                            />

                        </button>

                    </div>

                </footer>

            </div>

        </>
    );
}

export default JoinMettings;