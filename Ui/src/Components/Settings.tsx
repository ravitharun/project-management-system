import { useContext, useState } from "react";

import {
    FiUser,
    FiBell,
    FiMoon,
    FiShield,
    FiLink,
    FiBriefcase,
    FiChevronRight,
    FiMail,
    FiLock,
    FiGithub,
    FiCalendar,
    FiCheck,
    FiEdit3,
    FiSave,
} from "react-icons/fi";

import bgthemeContext from "../Context/ThemeContext";
import Sidebar from "./Navbar";
import SideBarContext from "../Context/SideBard";

const Settings = () => {
    const { theme }: any = useContext(bgthemeContext);
    const { sidebaropen }: any = useContext(SideBarContext);

    const isDark = theme === "Dark";

    const [activeTab, setActiveTab] = useState("Account");

    const [notifications, setNotifications] = useState({
        email: true,
        taskAssigned: true,
        mentions: true,
        comments: false,
    });

    const [profile, setProfile] = useState({
        name: "Tharun Ravi",
        email: "tharun@example.com",
    });

    const settings = [
        {
            name: "Account",
            description: "Manage your profile and account information",
            icon: <FiUser />,
        },
        {
            name: "Notifications",
            description: "Control how you receive notifications",
            icon: <FiBell />,
        },
        {
            name: "Appearance",
            description: "Customize the look and feel of your workspace",
            icon: <FiMoon />,
        },
        {
            name: "Security",
            description: "Manage your password and account security",
            icon: <FiShield />,
        },
        {
            name: "Integrations",
            description: "Connect external applications and services",
            icon: <FiLink />,
        },
        {
            name: "Workspace",
            description: "Manage your workspace information",
            icon: <FiBriefcase />,
        },
    ];

    /* =========================
       ACCOUNT
    ========================= */

    const renderAccount = () => (
        <div className="space-y-5 lg:space-y-6">

            <div>
                <h2
                    className={`text-xl font-semibold lg:text-2xl ${isDark ? "text-white" : "text-gray-900"
                        }`}
                >
                    Account
                </h2>

                <p
                    className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                >
                    Manage your personal account information.
                </p>
            </div>

            <div
                className={`rounded-xl border p-4 sm:p-5 lg:p-6 ${isDark
                    ? "border-gray-800 bg-[#111827]"
                    : "border-gray-200 bg-white"
                    }`}
            >

                <div className="mb-6 flex items-center justify-between">

                    <div>
                        <h3
                            className={`text-base font-semibold ${isDark ? "text-white" : "text-gray-900"
                                }`}
                        >
                            Profile Information
                        </h3>

                        <p
                            className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-500"
                                }`}
                        >
                            Update your account details.
                        </p>
                    </div>

                    <div
                        className={`flex h-11 w-11 items-center justify-center rounded-full ${isDark
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-blue-50 text-blue-600"
                            }`}
                    >
                        <FiUser size={21} />
                    </div>

                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div>
                        <label
                            className={`mb-2 block text-sm font-medium ${isDark
                                ? "text-gray-300"
                                : "text-gray-700"
                                }`}
                        >
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    name: e.target.value,
                                })
                            }
                            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 ${isDark
                                ? "border-gray-700 bg-[#1e293b] text-white"
                                : "border-gray-300 bg-white text-gray-900"
                                }`}
                        />
                    </div>

                    <div>
                        <label
                            className={`mb-2 block text-sm font-medium ${isDark
                                ? "text-gray-300"
                                : "text-gray-700"
                                }`}
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            value={profile.email}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    email: e.target.value,
                                })
                            }
                            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 ${isDark
                                ? "border-gray-700 bg-[#1e293b] text-white"
                                : "border-gray-300 bg-white text-gray-900"
                                }`}
                        />
                    </div>

                </div>

                <button className="mt-5 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
                    <FiSave size={16} />
                    Save Changes
                </button>

            </div>
        </div>
    );

    /* =========================
       NOTIFICATIONS
    ========================= */

    const renderNotifications = () => (
        <div className="space-y-5 lg:space-y-6">

            <div>
                <h2
                    className={`text-xl font-semibold lg:text-2xl ${isDark ? "text-white" : "text-gray-900"
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
            </div>

            <div
                className={`divide-y rounded-xl border ${isDark
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
                    isDark={isDark}
                />

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
        </div>
    );

    /* =========================
       APPEARANCE
    ========================= */

    const renderAppearance = () => (
        <div className="space-y-5 lg:space-y-6">

            <div>
                <h2
                    className={`text-xl font-semibold lg:text-2xl ${isDark ? "text-white" : "text-gray-900"
                        }`}
                >
                    Appearance
                </h2>

                <p
                    className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                >
                    Customize how the application looks.
                </p>
            </div>

            <div
                className={`rounded-xl border p-4 sm:p-5 lg:p-6 ${isDark
                    ? "border-gray-800 bg-[#111827]"
                    : "border-gray-200 bg-white"
                    }`}
            >

                <h3
                    className={`text-base font-semibold ${isDark ? "text-white" : "text-gray-900"
                        }`}
                >
                    Theme
                </h3>

                <p
                    className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                >
                    Your current application theme.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <ThemeCard
                        title="Light"
                        description="Clean and bright interface"
                        selected={!isDark}
                        isDark={isDark}
                    />

                    <ThemeCard
                        title="Dark"
                        description="Easy on the eyes"
                        selected={isDark}
                        isDark={isDark}
                    />

                </div>
            </div>
        </div>
    );

    /* =========================
       SECURITY
    ========================= */

    const renderSecurity = () => (
        <div className="space-y-5 lg:space-y-6">

            <div>
                <h2
                    className={`text-xl font-semibold lg:text-2xl ${isDark ? "text-white" : "text-gray-900"
                        }`}
                >
                    Security
                </h2>

                <p
                    className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                >
                    Protect your account and manage security.
                </p>
            </div>

            <div
                className={`rounded-xl border ${isDark
                    ? "border-gray-800 bg-[#111827]"
                    : "border-gray-200 bg-white"
                    }`}
            >

                <SecurityItem
                    icon={<FiLock />}
                    title="Change Password"
                    description="Update your account password."
                    isDark={isDark}
                    action={<FiChevronRight />}
                />

                <SecurityItem
                    icon={<FiShield />}
                    title="Two-Factor Authentication"
                    description="Add an extra layer of security to your account."
                    isDark={isDark}
                    action={
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${isDark
                                ? "bg-gray-800 text-gray-400"
                                : "bg-gray-100 text-gray-600"
                                }`}
                        >
                            Disabled
                        </span>
                    }
                />

                <SecurityItem
                    icon={<FiUser />}
                    title="Active Sessions"
                    description="View devices currently signed into your account."
                    isDark={isDark}
                    action={<FiChevronRight />}
                />

            </div>
        </div>
    );

    /* =========================
       INTEGRATIONS
    ========================= */

    const renderIntegrations = () => (
        <div className="space-y-5 lg:space-y-6">

            <div>
                <h2
                    className={`text-xl font-semibold lg:text-2xl ${isDark ? "text-white" : "text-gray-900"
                        }`}
                >
                    Integrations
                </h2>

                <p
                    className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                >
                    Connect your favorite tools with your workspace.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                <IntegrationCard
                    icon={<FiGithub />}
                    title="GitHub"
                    description="Connect repositories, issues and pull requests."
                    connected={false}
                    isDark={isDark}
                />

                <IntegrationCard
                    icon={<FiCalendar />}
                    title="Google Calendar"
                    description="Sync project events and deadlines."
                    connected={true}
                    isDark={isDark}
                />

            </div>
        </div>
    );

    /* =========================
       WORKSPACE
    ========================= */

    const renderWorkspace = () => (
        <div className="space-y-5 lg:space-y-6">

            <div>
                <h2
                    className={`text-xl font-semibold lg:text-2xl ${isDark ? "text-white" : "text-gray-900"
                        }`}
                >
                    Workspace
                </h2>

                <p
                    className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                >
                    Manage your workspace information.
                </p>
            </div>

            <div
                className={`rounded-xl border p-4 sm:p-5 lg:p-6 ${isDark
                    ? "border-gray-800 bg-[#111827]"
                    : "border-gray-200 bg-white"
                    }`}
            >

                <label
                    className={`mb-2 block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                >
                    Workspace Name
                </label>

                <input
                    type="text"
                    defaultValue="My Workspace"
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500 ${isDark
                        ? "border-gray-700 bg-[#1e293b] text-white"
                        : "border-gray-300 bg-white text-gray-900"
                        }`}
                />

                <button className="mt-5 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
                    <FiSave size={16} />
                    Save Workspace
                </button>

            </div>
        </div>
    );

    /* =========================
       CONTENT SWITCH
    ========================= */

    const renderContent = () => {
        switch (activeTab) {
            case "Account":
                return renderAccount();

            case "Notifications":
                return renderNotifications();

            case "Appearance":
                return renderAppearance();

            case "Security":
                return renderSecurity();

            case "Integrations":
                return renderIntegrations();

            case "Workspace":
                return renderWorkspace();

            default:
                return renderAccount();
        }
    };

    /*
     * SIDEBAR WIDTH
     *
     * Open   -> 276px
     * Closed -> 80px
     *
     * Change 80px if your collapsed Sidebar
     * has a different width.
     */

    const mainMargin = sidebaropen
        ? "lg:ml-[276px]"
        : "lg:ml-[80px]";

    return (
        <div
            className={`min-h-screen ${isDark
                ? "bg-[#020617]"
                : "bg-gray-50"
                }`}
        >

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN CONTENT */}

            <main
                className={`
                    min-h-screen
                    pt-[80px]
                    ${mainMargin}
                    transition-all
                    duration-300
                    ease-in-out
                `}
            >

                <div
                    className="
                        mx-auto
                        w-full
                        max-w-[1400px]
                        px-3
                        py-5
                        sm:px-5
                        sm:py-6
                        md:px-6
                        lg:px-8
                        lg:py-8
                        xl:px-10
                    "
                >

                    {/* HEADER */}

                    <div className="mb-6 lg:mb-8">

                        <h1
                            className={`text-2xl font-bold sm:text-3xl ${isDark
                                ? "text-white"
                                : "text-gray-900"
                                }`}
                        >
                            Settings
                        </h1>

                        <p
                            className={`mt-1 text-sm sm:text-base ${isDark
                                ? "text-gray-400"
                                : "text-gray-500"
                                }`}
                        >
                            Manage your account and application preferences.
                        </p>

                    </div>

                    {/* SETTINGS LAYOUT */}
                    <div
                        className="
        grid
        min-w-0
        grid-cols-1
        gap-5
        lg:grid-cols-[240px_minmax(0,1fr)]
        lg:gap-6
        xl:grid-cols-[260px_minmax(0,1fr)]
    "
                    >
                        {/* SETTINGS MENU */}

                        <aside
                            className={`
            min-w-0
            h-fit
            rounded-xl
            border
            p-2
            ${isDark
                                    ? "border-gray-800 bg-[#111827]"
                                    : "border-gray-200 bg-white"
                                }
        `}
                        >
                            <div
                                className="
                flex
                flex-col
                gap-1
            "
                            >
                                {settings.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => setActiveTab(item.name)}
                                        className={`
                        flex
                        w-full
                        min-w-0
                        items-start
                        gap-3
                        rounded-lg
                        px-3
                        py-3
                        text-left
                        transition

                        ${activeTab === item.name
                                                ? isDark
                                                    ? "bg-blue-500/10 text-blue-400"
                                                    : "bg-blue-50 text-blue-600"
                                                : isDark
                                                    ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            }
                    `}
                                    >
                                        {/* ICON */}

                                        <span className="mt-0.5 shrink-0 text-lg">
                                            {item.icon}
                                        </span>

                                        {/* TEXT */}

                                        <span className="min-w-0 flex-1">
                                            <span className="block truncate text-sm font-medium">
                                                {item.name}
                                            </span>

                                            <span
                                                className={`
                                mt-1
                                block
                                break-words
                                text-xs
                                leading-4
                                ${activeTab === item.name
                                                        ? isDark
                                                            ? "text-blue-400/70"
                                                            : "text-blue-600/70"
                                                        : "text-gray-400"
                                                    }
                            `}
                                            >
                                                {item.description}
                                            </span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </aside>

                        {/* SETTINGS CONTENT */}

                        <section className="min-w-0">
                            {renderContent()}
                        </section>
                    </div>

                </div>

            </main>

        </div>
    );
};


/* =====================================================
   NOTIFICATION ITEM
===================================================== */

const NotificationItem = ({
    icon,
    title,
    description,
    enabled,
    onChange,
    isDark,
}: any) => {

    return (
        <div className="flex items-center justify-between gap-4 p-4 sm:p-5">

            <div className="flex min-w-0 items-center gap-3 sm:gap-4">

                <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isDark
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {icon}
                </div>

                <div className="min-w-0">

                    <h3
                        className={`text-sm font-medium ${isDark
                            ? "text-white"
                            : "text-gray-900"
                            }`}
                    >
                        {title}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                        {description}
                    </p>

                </div>

            </div>

            <Toggle
                enabled={enabled}
                onChange={onChange}
                isDark={isDark}
            />

        </div>
    );
};


/* =====================================================
   TOGGLE
===================================================== */

const Toggle = ({
    enabled,
    onChange,
    isDark,
}: any) => {

    return (
        <button
            type="button"
            onClick={onChange}
            aria-label="Toggle setting"
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${enabled
                ? "bg-blue-600"
                : isDark
                    ? "bg-gray-700"
                    : "bg-gray-300"
                }`}
        >

            <span
                className={`
                    absolute
                    top-0.5
                    h-5
                    w-5
                    rounded-full
                    bg-white
                    shadow-sm
                    transition-transform

                    ${enabled
                        ? "translate-x-5"
                        : "translate-x-0.5"
                    }
                `}
            />

        </button>
    );
};


/* =====================================================
   SECURITY ITEM
===================================================== */

const SecurityItem = ({
    icon,
    title,
    description,
    isDark,
    action,
}: any) => {

    return (
        <div
            className={`flex items-center justify-between gap-4 border-b p-4 last:border-b-0 sm:p-5 ${isDark
                ? "border-gray-800"
                : "border-gray-200"
                }`}
        >

            <div className="flex min-w-0 items-center gap-3 sm:gap-4">

                <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isDark
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {icon}
                </div>

                <div className="min-w-0">

                    <h3
                        className={`text-sm font-medium ${isDark
                            ? "text-white"
                            : "text-gray-900"
                            }`}
                    >
                        {title}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                        {description}
                    </p>

                </div>

            </div>

            <div className="shrink-0 text-gray-400">
                {action}
            </div>

        </div>
    );
};


/* =====================================================
   THEME CARD
===================================================== */

const ThemeCard = ({
    title,
    description,
    selected,
    isDark,
}: any) => {

    return (
        <div
            className={`rounded-xl border-2 p-4 transition ${selected
                ? "border-blue-500"
                : isDark
                    ? "border-gray-700"
                    : "border-gray-200"
                }`}
        >

            <div className="flex items-center justify-between gap-3">

                <div>

                    <p
                        className={`text-sm font-medium sm:text-base ${isDark
                            ? "text-white"
                            : "text-gray-900"
                            }`}
                    >
                        {title}
                    </p>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        {description}
                    </p>

                </div>

                {selected && (
                    <FiCheck className="shrink-0 text-blue-500" />
                )}

            </div>

        </div>
    );
};


/* =====================================================
   INTEGRATION CARD
===================================================== */

const IntegrationCard = ({
    icon,
    title,
    description,
    connected,
    isDark,
}: any) => {

    return (
        <div
            className={`rounded-xl border p-4 sm:p-5 ${isDark
                ? "border-gray-800 bg-[#111827]"
                : "border-gray-200 bg-white"
                }`}
        >

            <div className="flex items-start justify-between gap-3">

                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-lg ${isDark
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-700"
                        }`}
                >
                    {icon}
                </div>

                {connected && (
                    <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                        <FiCheck />
                        Connected
                    </span>
                )}

            </div>

            <h3
                className={`mt-4 text-base font-semibold ${isDark
                    ? "text-white"
                    : "text-gray-900"
                    }`}
            >
                {title}
            </h3>

            <p className="mt-1 text-sm leading-5 text-gray-500">
                {description}
            </p>

            <button
                className={`mt-5 w-full rounded-lg border px-4 py-2.5 text-sm font-medium transition ${isDark
                    ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
            >
                {connected ? "Manage" : "Connect"}
            </button>

        </div>
    );
};

export default Settings;