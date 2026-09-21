import { useState } from "react";
import {
    ArrowLeft,
    CalendarDays,
    Clock3,
    Search,
    Users,
    Mail,
    BriefcaseBusiness,
    
} from "lucide-react";

const dummyMeeting = {
    title: "Team Discussion",
    date: "Sep 21, 2026",
    startTime: "18:08",
    endTime: "20:08",
};

const dummyUsers = [
    {
        id: 1,
        name: "Ravi Tharun",
        role: "Backend Developer",
        email: "ravi@example.com",
        status: "Online",
        initials: "RT",
    },
    {
        id: 2,
        name: "Rahul Kumar",
        role: "Team Leader",
        email: "rahul@example.com",
        status: "Offline",
        initials: "RK",
    },
    {
        id: 3,
        name: "Priya Sharma",
        role: "Frontend Developer",
        email: "priya@example.com",
        status: "Online",
        initials: "PS",
    },
    {
        id: 4,
        name: "Arjun Reddy",
        role: "Full Stack Developer",
        email: "arjun@example.com",
        status: "Online",
        initials: "AR",
    },
    {
        id: 5,
        name: "Sneha Rao",
        role: "UI/UX Designer",
        email: "sneha@example.com",
        status: "Offline",
        initials: "SR",
    },
];

const MeetingUsers = () => {
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [search, setSearch] = useState("");

    const filteredUsers = dummyUsers.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.role.toLowerCase().includes(search.toLowerCase())
    );

    // User Profile
    if (selectedUser) {
        return (
            <div className="min-h-screen bg-gray-950 px-4 py-6 text-white md:px-8">
                <div className="mx-auto max-w-5xl">

                    {/* Back */}
                    <button
                        onClick={() => setSelectedUser(null)}
                        className="mb-6 flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
                    >
                        <ArrowLeft size={18} />
                        Back to Participants
                    </button>

                    {/* Profile */}
                    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">

                        {/* Profile Header */}
                        <div className="border-b border-gray-800 px-6 py-8 md:px-10">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800 text-2xl font-semibold text-white">
                                    {selectedUser.initials}
                                </div>

                                <div>
                                    <h1 className="text-2xl font-semibold">
                                        {selectedUser.name}
                                    </h1>

                                    <p className="mt-1 text-sm text-gray-400">
                                        {selectedUser.role}
                                    </p>

                                    <div className="mt-2 flex items-center gap-2 text-sm">
                                        <span
                                            className={`h-2 w-2 rounded-full ${selectedUser.status === "Online"
                                                ? "bg-green-500"
                                                : "bg-gray-500"
                                                }`}
                                        />

                                        <span className="text-gray-400">
                                            {selectedUser.status}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Information */}
                        <div className="grid gap-6 p-6 md:grid-cols-2 md:p-10">

                            {/* Contact */}
                            <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">
                                <div className="mb-5 flex items-center gap-2">
                                    <Mail size={18} className="text-blue-400" />
                                    <h2 className="font-medium">Contact Information</h2>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">Email</p>
                                    <p className="mt-1 text-sm text-gray-200">
                                        {selectedUser.email}
                                    </p>
                                </div>
                            </div>

                            {/* Role */}
                            <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">
                                <div className="mb-5 flex items-center gap-2">
                                    <BriefcaseBusiness
                                        size={18}
                                        className="text-purple-400"
                                    />
                                    <h2 className="font-medium">Work Information</h2>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">Role</p>
                                    <p className="mt-1 text-sm text-gray-200">
                                        {selectedUser.role}
                                    </p>
                                </div>
                            </div>

                            {/* Meeting */}
                            <div className="rounded-xl border border-gray-800 bg-gray-950 p-5 md:col-span-2">
                                <div className="mb-5 flex items-center gap-2">
                                    <CalendarDays size={18} className="text-green-400" />
                                    <h2 className="font-medium">Meeting Information</h2>
                                </div>

                                <p className="font-medium text-white">
                                    {dummyMeeting.title}
                                </p>

                                <div className="mt-3 flex flex-wrap gap-5 text-sm text-gray-400">
                                    <span className="flex items-center gap-2">
                                        <CalendarDays size={15} />
                                        {dummyMeeting.date}
                                    </span>

                                    <span className="flex items-center gap-2">
                                        <Clock3 size={15} />
                                        {dummyMeeting.startTime} - {dummyMeeting.endTime}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Participants Page
    return (
        <div className="min-h-screen bg-gray-950 px-4 py-6 text-white md:px-8">
            <div className="mx-auto max-w-5xl">

                {/* Back */}
                <button className="mb-6 flex items-center gap-2 text-sm text-gray-400 transition hover:text-white">
                    <ArrowLeft size={18} />
                    Back to Meetings
                </button>

                {/* Meeting Header */}
                <div className="mb-8">
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

                        <div>
                            <p className="text-sm text-gray-500">Meeting Participants</p>

                            <h1 className="mt-1 text-2xl font-semibold">
                                {dummyMeeting.title}
                            </h1>

                            <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-400">
                                <span className="flex items-center gap-2">
                                    <CalendarDays size={16} />
                                    {dummyMeeting.date}
                                </span>

                                <span className="flex items-center gap-2">
                                    <Clock3 size={16} />
                                    {dummyMeeting.startTime} - {dummyMeeting.endTime}
                                </span>
                            </div>
                        </div>

                        {/* Count */}
                        <div className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3">
                            <Users size={20} className="text-blue-400" />

                            <div>
                                <p className="text-lg font-semibold">
                                    {dummyUsers.length}
                                </p>

                                <p className="text-xs text-gray-500">
                                    Participants
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-5">
                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                        type="text"
                        placeholder="Search participants..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-gray-800 bg-gray-900 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-gray-600"
                    />
                </div>

                {/* Users */}
                <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">

                    {filteredUsers.map((user, index) => (
                        <button
                            key={user.id}
                            onClick={() => setSelectedUser(user)}
                            className={`flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-gray-800/70 ${index !== filteredUsers.length - 1
                                ? "border-b border-gray-800"
                                : ""
                                }`}
                        >

                            <div className="flex items-center gap-4">

                                {/* Avatar */}
                                <div className="relative">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-sm font-semibold">
                                        {user.initials}
                                    </div>

                                    <span
                                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-900 ${user.status === "Online"
                                            ? "bg-green-500"
                                            : "bg-gray-600"
                                            }`}
                                    />
                                </div>

                                {/* Info */}
                                <div>
                                    <p className="text-sm font-medium text-white">
                                        {user.name}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {user.role}
                                    </p>
                                </div>

                            </div>

                            <div className="text-gray-600 transition group-hover:text-white">
                                →
                            </div>

                        </button>
                    ))}

                    {filteredUsers.length === 0 && (
                        <div className="px-5 py-12 text-center">
                            <Users
                                size={30}
                                className="mx-auto text-gray-700"
                            />

                            <p className="mt-3 text-sm text-gray-400">
                                No participants found
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default MeetingUsers;