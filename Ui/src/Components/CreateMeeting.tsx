import { useContext, useEffect, useState } from "react";
import {
    FiX,
    FiVideo,
    FiCalendar,
    FiClock,
    FiUsers,
    FiChevronDown,
    FiCheck,
    FiFolder,
    FiSearch,
} from "react-icons/fi";
import ClickedWorkSpace from "../Context/ClickedWorkSpace";
import { ShowToast } from "./toastHelper";
import { Toaster } from "sonner";
import { instance } from "../services/apiservices";
import { userid } from "./LocalStorage";

function CreateMeeting({ onClose }: any) {
    const { ClickedSpace }: any = useContext<any>(ClickedWorkSpace);
    const date = new Date().toISOString().split("T")[0];
    const now = new Date();

    const currentTime = now.toTimeString().slice(0, 5);
    const [MettingTitle, setMettingTitle] = useState("");
    const [MettingDate, setMettingDate] = useState(date);
    const [MettingStartTime, setMettingStartTime] = useState("");
    const [MettingEndTime, setMettingEndTime] = useState("");
    const [MettingPartisipations, setMettingPartisipations] = useState<any[]>(
        []
    );

    const [selectedParticipants, setSelectedParticipants] = useState<any[]>(
        []
    );

    const [isParticipantDropdownOpen, setIsParticipantDropdownOpen] =
        useState(false);

    const [participantSearch, setParticipantSearch] = useState("");

    useEffect(() => {
        const fetchTeamMember = async () => {
            try {
                const response: any = await instance.get(
                    "/api/WorkSpace/TeamMembers",
                    {
                        params: {
                            projectid: ClickedSpace._id,
                        },
                    }
                );

                setMettingPartisipations(response.data.message);
            } catch (error: any) {
                return ShowToast(
                    error?.response?.data?.message || "Failed to fetch members",
                    error?.response?.status || 500,
                    "error"
                );
            }
        };

        fetchTeamMember();
    }, [ClickedSpace._id]);

    const handleParticipantSelect = (user: any) => {
        const alreadySelected = selectedParticipants.some(
            (participant) => participant._id === user._id
        );

        if (alreadySelected) {
            setSelectedParticipants((prev) =>
                prev.filter((participant) => participant._id !== user._id)
            );
        } else {
            setSelectedParticipants((prev) => [...prev, user]);
        }
    };

    const filteredParticipants = MettingPartisipations.filter((tm: any) => {
        const user = tm?.id;

        const username = user?.Username?.toLowerCase() || "";
        const email = user?.userEmail?.toLowerCase() || "";

        return (
            username.includes(participantSearch.toLowerCase()) ||
            email.includes(participantSearch.toLowerCase())
        );
    });



    const CreateMetting = async () => {
        if (selectedParticipants.length == 0) {
            return ShowToast("", "", "Error")
        }
        if (!MettingTitle || !MettingStartTime || !MettingEndTime || !ClickedSpace._id) {
            return ShowToast("", "", "Error")

        }
        const data = {
            MettingTitle, MettingStartTime, MettingEndTime, "PID": ClickedSpace._id, "CreatedBy": userid, selectedParticipants
        }
        console.log(data)
        try {
            const response = await instance.post("/api/Metting", { mettingInfo: data })
        } catch (error) {

        }
    }
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                <div className="w-full max-w-md overflow-hidden rounded-xl border border-gray-800 bg-[#111827] text-white shadow-2xl">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                                <FiVideo size={18} />
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold">
                                    Create Meeting
                                </h2>

                                <p className="text-[11px] text-gray-400">
                                    Schedule a new project meeting
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-800 hover:text-white"
                        >
                            <FiX size={17} />
                        </button>
                    </div>

                    {/* Form */}
                    <div className="max-h-[70vh] space-y-4 overflow-y-auto p-4">

                        {/* Meeting Title */}
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-gray-200">
                                Meeting Title{" "}
                                <span className="text-red-400">*</span>
                            </label>

                            <input
                                type="text"
                                value={MettingTitle}
                                placeholder="Enter meeting title"
                                onChange={(e) =>
                                    setMettingTitle(e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-xs text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Project */}
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-gray-200">
                                Project{" "}
                                <span className="text-red-400">*</span>
                            </label>

                            <div className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2.5">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                                    <FiFolder size={16} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-xs font-medium text-white">
                                        {ClickedSpace.name}
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-gray-500">
                                        Current project
                                    </p>
                                </div>

                                <FiCheck
                                    size={16}
                                    className="shrink-0 text-green-400"
                                />
                            </div>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-gray-200">
                                Date{" "}
                                <span className="text-red-400">*</span>
                            </label>

                            <div className="relative">
                                <FiCalendar
                                    size={15}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                />

                                <input
                                    type="date"
                                    value={MettingDate || date}
                                    onChange={(e) => {

                                        if (e.target.value < date) {
                                            return ShowToast("Please select today or a future date", 400, "error");

                                        }

                                        setMettingDate(e.target.value)
                                    }
                                    }
                                    className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 pl-9 text-xs text-white outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Time */}
                        <div className="grid grid-cols-2 gap-3">

                            {/* Start Time */}
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-gray-200">
                                    Start Time{" "}
                                    <span className="text-red-400">*</span>
                                </label>

                                <div className="relative">
                                    <FiClock
                                        size={15}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    />

                                    <input
                                        type="time"
                                        value={MettingStartTime}
                                        onChange={(e) => {
                                            const selectedTime = e.target.value;
                                            console.log(selectedTime, 'stime');
                                            console.log(currentTime, 'curr');
                                            console.log(MettingDate == date, 'MettingDate ==date ');
                                            console.log(MettingDate, 'MettingDate  ');
                                            console.log(date, 'date ');
                                            if (MettingDate == date && selectedTime <= currentTime) {
                                                return ShowToast(
                                                    `Meeting date and time cannot be in the past or equal to the current time (${currentTime}).`,
                                                    "400",
                                                    "error"
                                                );
                                            }

                                            setMettingStartTime(e.target.value);
                                        }}

                                        className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 pl-9 text-xs text-white outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* End Time */}
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-gray-200">
                                    End Time
                                    <span className="text-red-400">*</span>
                                </label>

                                <div className="relative">
                                    <FiClock
                                        size={15}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    />

                                    <input
                                        type="time"
                                        value={currentTime || MettingEndTime}
                                        onChange={(e) =>
                                            setMettingEndTime(
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 pl-9 text-xs text-white outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Participants */}
                        <div className="relative">

                            <label className="mb-1.5 block text-xs font-medium text-gray-200">
                                Participants{" "}
                                <span className="text-red-400">*</span>
                            </label>

                            {/* Dropdown Button */}
                            <button
                                type="button"
                                onClick={() =>
                                    setIsParticipantDropdownOpen(
                                        (prev) => !prev
                                    )
                                }
                                className="flex w-full items-center justify-between rounded-lg border border-gray-700 bg-gray-900 px-3 py-2.5 text-left text-xs outline-none transition hover:border-gray-600"
                            >
                                <span className="flex min-w-0 items-center gap-2">

                                    <FiUsers
                                        size={15}
                                        className="shrink-0 text-gray-400"
                                    />

                                    {selectedParticipants.length === 0 ? (
                                        <span className="text-gray-400">
                                            Select participants
                                        </span>
                                    ) : (
                                        <span className="truncate text-white">
                                            {selectedParticipants.length}{" "}
                                            participant
                                            {selectedParticipants.length > 1
                                                ? "s"
                                                : ""}{" "}
                                            selected
                                        </span>
                                    )}
                                </span>

                                <FiChevronDown
                                    size={15}
                                    className={`shrink-0 text-gray-400 transition-transform ${isParticipantDropdownOpen
                                        ? "rotate-180"
                                        : ""
                                        }`}
                                />
                            </button>

                            {/* Selected Participants Preview */}
                            {selectedParticipants.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    {selectedParticipants.map(
                                        (user: any) => (
                                            <div
                                                key={user._id}
                                                className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 py-1 pl-1 pr-2"
                                            >
                                                {user.userProfile ? (
                                                    <img
                                                        src={user.userProfile}
                                                        alt={user.Username}
                                                        className="h-5 w-5 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-[9px] font-semibold text-blue-400">
                                                        {user.Username
                                                            ?.charAt(0)
                                                            ?.toUpperCase() ||
                                                            "U"}
                                                    </div>
                                                )}

                                                <span className="max-w-24 truncate text-[10px] text-blue-300">
                                                    {user.Username}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleParticipantSelect(
                                                            user
                                                        )
                                                    }
                                                    className="text-blue-400 hover:text-white"
                                                >
                                                    <FiX size={11} />
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}

                            {/* Dropdown */}
                            {isParticipantDropdownOpen && (
                                <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-gray-700 bg-[#111827] shadow-2xl">

                                    {/* Search */}
                                    <div className="border-b border-gray-800 p-2">
                                        <div className="flex items-center gap-2 rounded-md border border-gray-700 bg-gray-900 px-2.5 py-2">
                                            <FiSearch
                                                size={14}
                                                className="shrink-0 text-gray-500"
                                            />

                                            <input
                                                type="text"
                                                value={participantSearch}
                                                onChange={(e) =>
                                                    setParticipantSearch(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Search participants..."
                                                className="w-full bg-transparent text-xs text-white outline-none placeholder:text-gray-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Users */}
                                    <div className="max-h-52 overflow-y-auto p-1.5">

                                        {filteredParticipants.length ===
                                            0 ? (
                                            <div className="px-3 py-5 text-center text-xs text-gray-500">
                                                No participants found
                                            </div>
                                        ) : (
                                            filteredParticipants.map(
                                                (
                                                    tm: any,
                                                    idx: number
                                                ) => {
                                                    const user = tm?.id;

                                                    if (!user) return null;

                                                    const isSelected =
                                                        selectedParticipants.some(
                                                            (participant) =>
                                                                participant._id ===
                                                                user._id
                                                        );

                                                    return (
                                                        <div
                                                            key={
                                                                user._id ||
                                                                idx
                                                            }
                                                            onClick={() =>
                                                                handleParticipantSelect(
                                                                    user
                                                                )
                                                            }
                                                            className={`flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 transition ${isSelected
                                                                ? "bg-blue-500/10"
                                                                : "hover:bg-gray-800"
                                                                }`}
                                                        >

                                                            {/* Checkbox */}
                                                            <div
                                                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${isSelected
                                                                    ? "border-blue-500 bg-blue-600"
                                                                    : "border-gray-600 bg-gray-900"
                                                                    }`}
                                                            >
                                                                {isSelected && (
                                                                    <FiCheck
                                                                        size={
                                                                            11
                                                                        }
                                                                        className="text-white"
                                                                    />
                                                                )}
                                                            </div>

                                                            {/* Profile Image */}
                                                            {user.userProfile ? (
                                                                <img
                                                                    src={
                                                                        user.userProfile
                                                                    }
                                                                    alt={
                                                                        user.Username ||
                                                                        "User"
                                                                    }
                                                                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-400">
                                                                    {user.Username
                                                                        ?.charAt(
                                                                            0
                                                                        )
                                                                        ?.toUpperCase() ||
                                                                        "U"}
                                                                </div>
                                                            )}

                                                            {/* User Details */}
                                                            <div className="min-w-0 flex-1">
                                                                <p className="truncate text-xs font-medium text-white">
                                                                    {user.Username ||
                                                                        "Unknown User"}
                                                                </p>

                                                                <p className="truncate text-[10px] text-gray-500">
                                                                    {user.userEmail ||
                                                                        "No email"}
                                                                </p>
                                                            </div>

                                                            {/* Role */}
                                                            <span className="shrink-0 rounded-md bg-gray-800 px-2 py-1 text-[9px] text-gray-400">
                                                                {user.UserRole ||
                                                                    "Member"}
                                                            </span>
                                                        </div>
                                                    );
                                                }
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 border-t border-gray-800 px-4 py-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg px-3.5 py-2 text-xs font-medium text-gray-400 transition hover:bg-gray-800 hover:text-white"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
                            onClick={CreateMetting}
                        >
                            Create Meeting
                        </button>
                    </div>
                </div>
            </div>

            <Toaster />
        </>
    );
}

export default CreateMeeting;