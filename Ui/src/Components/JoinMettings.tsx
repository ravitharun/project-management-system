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
} from "react-icons/fi";

function JoinMettings() {
    const participants = [
        { name: "Ravi", muted: false, video: true },
        { name: "John", muted: false, video: true },
        { name: "Alex", muted: true, video: true },
        { name: "Tharun", muted: false, video: false },
    ];

    return (
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

                    <button className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white">
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
                <div className="grid w-full max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2">
                    {participants.map((participant) => (
                        <div
                            key={participant.name}
                            className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-gray-800 bg-[#111827]"
                        >
                            {/* Dummy avatar */}
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-700 text-xl font-semibold text-gray-200">
                                {participant.name.charAt(0)}
                            </div>

                            {/* Name */}
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

                            {/* Video status */}
                            {!participant.video && (
                                <div className="absolute right-3 top-3 rounded-lg bg-black/60 p-2 text-gray-300">
                                    <FiVideoOff size={15} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            {/* Controls */}
            <footer className="flex shrink-0 items-center justify-center border-t border-gray-800 bg-[#0b1120] px-3 py-4">
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Mic */}
                    <button
                        title="Mute"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-gray-700"
                    >
                        <FiMic size={19} />
                    </button>

                    {/* Camera */}
                    <button
                        title="Camera"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-gray-700"
                    >
                        <FiVideo size={19} />
                    </button>

                    {/* Screen Share */}
                    <button
                        title="Share screen"
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
                    >
                        <FiPhoneOff size={19} />
                    </button>
                </div>
            </footer>
        </div>
    );
}

export default JoinMettings;