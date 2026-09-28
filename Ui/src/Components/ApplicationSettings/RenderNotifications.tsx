
import { useState } from 'react';
import { Toaster } from 'sonner'
import { NotificationItem } from './NotificationItem';
import { FiBell, FiEdit3, FiMail, FiUser } from 'react-icons/fi';

function RenderNotifications({ isDark }: any) {

    const [notifications, setNotifications] = useState({
        email: true,
        taskAssigned: true,
        mentions: true,
        comments: false,
    });
    return (
        <>
            <Toaster   ></Toaster>
            <div className="space-y-5 lg:space-y-6">
                {/* Header */}
                <div>
                    <h2
                        className={`text-xl font-semibold lg:text-2xl ${isDark ? "text-white" : "text-red-900"
                            }`}
                    >
                        Notifications
                    </h2>
                    <p
                        className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        Choose which notifications you want to receive.
                    </p>

                    {/* Notification Card */}
                    <div
                        className={`divide-y overflow-hidden rounded-xl border ${isDark
                            ? "divide-gray-800 border-gray-800 bg-[#111827]"
                            : "divide-gray-200 border-gray-200 bg-white"
                            }`}
                    >
                        <NotificationItem
                            icon={<FiMail />}
                            title="Email Notifications"
                            description="Receive important updates through email."
                            enabled={notifications.email}
                            onChange={() =>
                                setNotifications({
                                    ...notifications,
                                    email: !notifications.email,
                                })
                            }
                            isDark={isDark}
                        />

                        <NotificationItem
                            icon={<FiUser />}
                            title="Task Assignments"
                            description="Notify me when a task is assigned to me."
                            enabled={notifications.taskAssigned}
                            onChange={() =>
                                setNotifications({
                                    ...notifications,
                                    taskAssigned: !notifications.taskAssigned,
                                })
                            }
                            isDark={isDark}
                        />

                        <NotificationItem
                            icon={<FiBell />}
                            title="Mentions"
                            description="Notify me when someone mentions me."
                            enabled={notifications.mentions}
                            onChange={() =>
                                setNotifications({
                                    ...notifications,
                                    mentions: !notifications.mentions,
                                })
                            }
                            isDark={isDark} />

                        <NotificationItem
                            icon={<FiEdit3 />}
                            title="Comments"
                            description="Notify me about comments on my tasks."
                            enabled={notifications.comments}
                            onChange={() =>
                                setNotifications({
                                    ...notifications,
                                    comments: !notifications.comments,
                                })
                            }
                            isDark={isDark}
                        />
                    </div>
                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default RenderNotifications