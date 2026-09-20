import { useEffect } from "react";
import {
    FiActivity,
    FiBell,
    FiCalendar,
    FiClock,
    FiInfo,
    FiUsers,
    FiVideo,
    FiX,
} from "react-icons/fi";
import {
    HiOutlineCheckCircle,
    HiOutlinePencil,
    HiOutlineTrash,
} from "react-icons/hi";
import Participation from "./Participation";

type TabName = "Overview" | "Participants" | "Activity";

interface MeetingInfo {
    _id?: string;
    MettingTitle?: string;
    MettingDate?: string;
    MettingStartTime?: string;
    MettingEndTime?: string;
}

interface MeetingModalProps {
    Upcomingoption: boolean | string;
    setUpcomingoption: (value: boolean | string) => void;
    poupMettinginfo?: MeetingInfo | null;
    Selectedtab: any;
    setSelectedtab: (tab: TabName) => void;
    handelmarkAscompleted: (id?: string) => void;
    handelDeleteMettings: (id?: string) => void;
}

const MeetingModal: React.FC<MeetingModalProps> = ({
    Upcomingoption,
    setUpcomingoption,
    poupMettinginfo,
    Selectedtab,
    setSelectedtab,
    handelmarkAscompleted,
    handelDeleteMettings,
}) => {
    useEffect(() => {
        if (!Upcomingoption) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setUpcomingoption("");
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleEscape);
        };
    }, [Upcomingoption, setUpcomingoption]);

    if (!Upcomingoption) return null;

    const tabs: {
        name: TabName;
        icon: React.ElementType;
    }[] = [
            {
                name: "Overview",
                icon: FiInfo,
            },
            {
                name: "Participants",
                icon: FiUsers,
            },
            {
                name: "Activity",
                icon: FiActivity,
            },
        ];

    return (
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 px-3 py-4 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="meeting-modal-title"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    setUpcomingoption("");
                }
            }}
        >
            <div
                className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
                style={{
                    maxHeight: "calc(100vh - 2rem)",
                }}
                onMouseDown={(event) => event.stopPropagation()}
            >
                {/* Header */}
                <div className="flex shrink-0 items-start justify-between border-b border-gray-200 px-4 py-4 sm:px-5 dark:border-gray-700">
                    <div className="min-w-0 pr-3">
                        <h2
                            id="meeting-modal-title"
                            className="truncate text-base font-semibold text-gray-900 dark:text-white"
                        >
                            {poupMettinginfo?.MettingTitle || "Meeting Title"}
                        </h2>

                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                                <FiCalendar />
                                {poupMettinginfo?.MettingDate || "2026-09-21"}
                            </span>

                            <span className="flex items-center gap-1">
                                <FiClock />
                                {poupMettinginfo?.MettingStartTime || "18:08"}
                                <span>-</span>
                                {poupMettinginfo?.MettingEndTime || "20:08"}
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setUpcomingoption("")}
                        aria-label="Close meeting modal"
                        className="shrink-0 rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                        <FiX className="text-lg" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="min-h-0 flex-1 overflow-y-auto">
                    {/* Tabs */}
                    <div className="sticky top-0 z-10 overflow-x-auto border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                        <div className="flex min-w-max px-3 sm:px-5">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = Selectedtab === tab.name;

                                return (
                                    <button
                                        key={tab.name}
                                        type="button"
                                        onClick={() => setSelectedtab(tab.name)}
                                        className={`flex items-center gap-1.5 border-b-2 px-3 py-3 text-xs font-medium transition sm:px-4 ${isActive
                                            ? "border-blue-600 text-blue-600"
                                            : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                            }`}
                                    >
                                        <Icon />
                                        {tab.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Overview Tab */}
                    {Selectedtab === "Overview" && (
                        <div className="grid grid-cols-1 gap-0 md:grid-cols-[minmax(0,1.6fr)_minmax(260px,1fr)]">
                            {/* Left Side */}
                            <div className="min-w-0 border-b border-gray-200 p-4 sm:p-5 md:border-b-0 md:border-r dark:border-gray-700">
                                <div className="mb-4 flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Meeting
                                        </p>

                                        <h3 className="mt-1 truncate text-sm font-semibold text-gray-900 dark:text-white">
                                            {poupMettinginfo?.MettingTitle || "Team Discussion"}
                                        </h3>
                                    </div>

                                    <span className="shrink-0 rounded-full bg-yellow-100 px-2.5 py-1 text-[11px] font-medium text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400">
                                        Upcoming
                                    </span>
                                </div>

                                {/* Information Row */}
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-200 p-3 dark:border-gray-700">
                                        <div className="shrink-0 rounded-lg bg-blue-100 p-2 dark:bg-blue-950/40">
                                            <FiCalendar className="text-blue-600" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-[10px] text-gray-500 dark:text-gray-400">
                                                Date
                                            </p>

                                            <p className="truncate text-xs font-medium text-gray-900 dark:text-white">
                                                {poupMettinginfo?.MettingDate || "Sep 21, 2026"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-200 p-3 dark:border-gray-700">
                                        <div className="shrink-0 rounded-lg bg-purple-100 p-2 dark:bg-purple-950/40">
                                            <FiClock className="text-purple-600" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-[10px] text-gray-500 dark:text-gray-400">
                                                Time
                                            </p>

                                            <p className="truncate text-xs font-medium text-gray-900 dark:text-white">
                                                {poupMettinginfo?.MettingStartTime || "18:08"} -{" "}
                                                {poupMettinginfo?.MettingEndTime || "20:08"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Participants Preview */}
                                <div className="mt-5">
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                        <div className="flex min-w-0 items-center gap-2">
                                            <FiUsers className="shrink-0 text-gray-400" />

                                            <h3 className="text-xs font-semibold text-gray-900 dark:text-white">
                                                Participants
                                            </h3>

                                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                                23
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            className="shrink-0 text-[11px] font-medium text-blue-600 hover:text-blue-700"
                                            onClick={() => setSelectedtab("Participants")}
                                        >
                                            View all →
                                        </button>
                                    </div>

                                    <Participation type="horizontal" />
                                </div>

                                {/* Reminder */}
                                <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800/50">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="shrink-0 rounded-lg bg-yellow-100 p-2 dark:bg-yellow-950/40">
                                            <FiBell className="text-yellow-600" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs font-medium text-gray-900 dark:text-white">
                                                Meeting Reminder
                                            </p>

                                            <p className="truncate text-[10px] text-gray-500 dark:text-gray-400">
                                                15 minutes before meeting
                                            </p>
                                        </div>
                                    </div>

                                    <span className="shrink-0 text-[10px] font-medium text-green-600">
                                        Enabled
                                    </span>
                                </div>
                            </div>

                            {/* Right Side */}
                            <div className="flex min-w-0 flex-col justify-between p-4 sm:p-5">
                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                        Meeting Actions
                                    </p>

                                    <div className="mt-3 space-y-2">
                                        {/* Join */}
                                        <button
                                            type="button"
                                            className="flex w-full items-center gap-3 rounded-xl bg-blue-600 px-4 py-3 text-left text-white transition hover:bg-blue-700"
                                        >
                                            <FiVideo className="shrink-0 text-lg" />

                                            <div className="min-w-0">
                                                <p className="text-xs font-semibold">
                                                    Join Meeting
                                                </p>

                                                <p className="truncate text-[10px] text-blue-100">
                                                    Join the meeting call
                                                </p>
                                            </div>
                                        </button>

                                        {/* Edit */}
                                        <button
                                            type="button"
                                            className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-left transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                                        >
                                            <HiOutlinePencil className="shrink-0 text-blue-600" />

                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-gray-900 dark:text-white">
                                                    Edit Meeting
                                                </p>

                                                <p className="truncate text-[10px] text-gray-500 dark:text-gray-400">
                                                    Update meeting details
                                                </p>
                                            </div>
                                        </button>

                                        {/* Complete */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handelmarkAscompleted(poupMettinginfo?._id)
                                            }
                                            className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-left transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                                        >
                                            <HiOutlineCheckCircle className="shrink-0 text-green-600" />

                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-gray-900 dark:text-white">
                                                    Mark as Completed
                                                </p>

                                                <p className="truncate text-[10px] text-gray-500 dark:text-gray-400">
                                                    Complete this meeting
                                                </p>
                                            </div>
                                        </button>

                                        {/* Delete */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handelDeleteMettings(poupMettinginfo?._id)
                                            }
                                            className="flex w-full items-center gap-3 rounded-xl border border-red-200 px-4 py-3 text-left transition hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-950/30"
                                        >
                                            <HiOutlineTrash className="shrink-0 text-red-600" />

                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-red-600">
                                                    Delete Meeting
                                                </p>

                                                <p className="truncate text-[10px] text-gray-500 dark:text-gray-400">
                                                    Permanently delete meeting
                                                </p>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-5 border-t border-gray-200 pt-4 dark:border-gray-700">
                                    <button
                                        type="button"
                                        onClick={() => setUpcomingoption("")}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                                    >
                                        <FiX />
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Participants Tab */}
                    {Selectedtab === "Participants" && (
                        <div className="p-4 sm:p-5">
                            <Participation type="vertical" />
                        </div>
                    )}

                    {/* Activity Tab */}
                    {Selectedtab === "Activity" && (
                        <div className="flex min-h-[250px] items-center justify-center p-5 text-sm text-gray-500 dark:text-gray-400">
                            No activity available yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MeetingModal;