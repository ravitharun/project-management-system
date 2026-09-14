import { FiCalendar, FiCheckCircle, FiChevronDown, FiX } from "react-icons/fi";

function GoogleCalendarManage({ isDark, SetManage }: any) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div
                className={`w-full max-w-lg overflow-hidden rounded-2xl border shadow-2xl ${isDark
                    ? "border-gray-800 bg-[#111827] text-white"
                    : "border-gray-200 bg-white text-gray-900"
                    }`}
            >
                {/* Header */}
                <div
                    className={`flex items-center justify-between border-b px-5 py-4 ${isDark ? "border-gray-800" : "border-gray-200"
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${isDark
                                ? "bg-blue-500/10 text-blue-400"
                                : "bg-blue-50 text-blue-600"
                                }`}
                        >
                            <FiCalendar size={20} />
                        </div>

                        <div>
                            <h2 className="text-base font-semibold">
                                Google Calendar
                            </h2>

                            <p
                                className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"
                                    }`}
                            >
                                Manage your calendar connection
                            </p>
                        </div>
                    </div>

                    <button
                        className={`rounded-lg p-2 transition ${isDark
                            ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                        onClick={() => SetManage(false)}
                    >
                        <FiX size={19} />
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-5 p-5">
                    {/* Connected Status */}
                    <div
                        className={`flex items-center gap-3 rounded-xl border p-4 ${isDark
                            ? "border-green-500/20 bg-green-500/10"
                            : "border-green-200 bg-green-50"
                            }`}
                    >
                        <FiCheckCircle
                            className="shrink-0 text-green-500"
                            size={20}
                        />

                        <div>
                            <p className="text-sm font-medium">Connected</p>

                            <p
                                className={`mt-0.5 text-xs ${isDark ? "text-gray-400" : "text-gray-500"
                                    }`}
                            >
                                Your Google Calendar is connected.
                            </p>
                        </div>
                    </div>

                    {/* Connected Account */}
                    <div>
                        <label
                            className={`mb-2 block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"
                                }`}
                        >
                            Connected Account
                        </label>

                        <div
                            className={`rounded-lg border px-3 py-2.5 text-sm ${isDark
                                ? "border-gray-700 bg-gray-900 text-gray-300"
                                : "border-gray-200 bg-gray-50 text-gray-700"
                                }`}
                        >
                            ravi@gmail.com
                        </div>
                    </div>

                    {/* Calendar */}
                    <div>
                        <label
                            className={`mb-2 block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"
                                }`}
                        >
                            Calendar
                        </label>

                        <button
                            type="button"
                            className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition ${isDark
                                ? "border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-600"
                                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                                }`}
                        >
                            <span>My Calendar</span>
                            <FiChevronDown size={17} />
                        </button>
                    </div>

                    {/* Sync */}
                    <div
                        className={`flex items-center justify-between rounded-xl border p-4 ${isDark
                            ? "border-gray-800 bg-gray-900/50"
                            : "border-gray-200 bg-gray-50"
                            }`}
                    >
                        <div className="pr-4">
                            <p className="text-sm font-medium">
                                Sync project events
                            </p>

                            <p
                                className={`mt-1 text-xs leading-5 ${isDark ? "text-gray-400" : "text-gray-500"
                                    }`}
                            >
                                Automatically sync project events with your
                                Google Calendar.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="relative flex h-6 w-11 shrink-0 items-center rounded-full bg-blue-600"
                        >
                            <span className="absolute right-0.5 h-5 w-5 rounded-full bg-white shadow-sm" />
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div
                    className={`flex flex-col-reverse gap-2 border-t px-5 py-4 sm:flex-row sm:justify-end ${isDark ? "border-gray-800" : "border-gray-200"
                        }`}
                >
                    <button
                        type="button"
                        className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${isDark
                            ? "text-red-400 hover:bg-red-500/10"
                            : "text-red-600 hover:bg-red-50"
                            }`}
                    >
                        Disconnect
                    </button>

                    <button
                        type="button"
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GoogleCalendarManage