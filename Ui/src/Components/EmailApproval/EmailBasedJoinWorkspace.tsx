import { useEffect, useState } from "react";
import {
    FaFolderOpen,
    FaEnvelope,
    FaArrowRight,
    FaUsers,
    FaLayerGroup,
    FaCalendarAlt,
} from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CheckCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { instance } from "../../services/apiservices";

type WorkspaceMember = {
    _id?: string;
    name?: string;
    email?: string;
};

type WorkspaceStatus = {
    name?: string;
    color?: string;
};

type WorkspaceWorkType = {
    name?: string;
};

type WorkspaceSetup = {
    createby?: any;
    title?: string;
    description?: string;
    workTypes?: WorkspaceWorkType[];
    statuses?: WorkspaceStatus[] | string[];
};

type WorkspaceIcon = {
    id?: string;
    name?: string;
    img?: string;
};

type ProjectInfo = {
    _id?: string;
    id?: string;
    name?: string;
    badge?: string;
    product?: string;
    type?: string;
    description?: string;
    detailedInfo?: string;
    defaultView?: string;
    icon?: string;
    image?: string;
    workspaceBackground?: string;
    workspaceicon?: WorkspaceIcon;
    createdAt?: string;
    updatedAt?: string;
    WorkSpacememebers?: WorkspaceMember[];
    columns?: any[];
    workspaceSetup?: WorkspaceSetup;
};

type Props = {
    theme?: "Dark" | "Light" | string;
};

function EmailBasedJoinWorkspace({ theme = "Light" }: Props) {
    const isDark = theme === "Dark";

    const [loading, setloading] = useState(true);
    const [projectinfo, setprojects] = useState<ProjectInfo | null>(null);

    const [searchParams] = useSearchParams();
    const AcceptEmail = searchParams.get("AcceptEmail");
    const workspaceid = searchParams.get("workspaceid");
    const expiresAt = searchParams.get("expiresAt");
    const toekn = searchParams.get("toekn");
    const formatDate = (date?: string) => {
        if (!date) return "Not available";
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const membersCount = projectinfo?.WorkSpacememebers?.length || 0;
    const columnsCount = projectinfo?.columns?.length || 0;

    useEffect(() => {
        const JoinWorkspace = async () => {
            try {
                setloading(true);

                if (!AcceptEmail || !workspaceid) {
                    toast.error("Invalid invitation link");
                    return;
                }

                const response = await instance.post(
                    "/api/Workspace/approve-workspace-invite",
                    { AcceptEmail, workspaceid, toekn, expiresAt }
                );

                if (response?.status) {
                    setprojects(response?.data?.data);
                    toast.success("Workspace invitation verified");
                }
            } catch (error: any) {
                console.log(error);
                const message =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Something went wrong";

                if (error?.response?.data?.status == 400) {
                    return toast.error(message)
                }
                toast.error(message);
            } finally {
                setloading(false);
            }
        };

        JoinWorkspace();
    }, [AcceptEmail, workspaceid]);

    if (loading) {
        return (
            <div
                className={`min-h-screen flex items-center justify-center px-4 ${isDark
                    ? "bg-slate-950"
                    : "bg-gradient-to-br from-slate-50 via-white to-blue-50"
                    }`}
            >
                <div
                    className={`w-full max-w-md rounded-3xl border p-8 text-center shadow-xl ${isDark ? "border-slate-800 bg-slate-900" : "border-gray-100 bg-white"
                        }`}
                >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">
                        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500" />
                    </div>

                    <h2
                        className={`mt-6 text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"
                            }`}
                    >
                        Verifying Invitation
                    </h2>

                    <p
                        className={`mt-3 text-sm sm:text-base ${isDark ? "text-slate-400" : "text-gray-500"
                            }`}
                    >
                        Please wait while we verify your workspace invitation and load the
                        workspace details.
                    </p>
                </div>
            </div>
        );
    }

    if (!projectinfo) {
        return (
            <div
                className={`min-h-screen flex items-center justify-center px-4 ${isDark ? "bg-slate-950" : "bg-slate-50"
                    }`}
            >
                <div
                    className={`w-full max-w-lg rounded-3xl border p-8 text-center shadow-lg ${isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
                        }`}
                >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                        <FaEnvelope size={22} />
                    </div>

                    <h2
                        className={`mt-5 text-xl font-semibold ${isDark ? "text-white" : "text-slate-900"
                            }`}
                    >
                        Invitation not found
                    </h2>

                    <p
                        className={`mt-2 text-sm ${isDark ? "text-slate-400" : "text-slate-600"
                            }`}
                    >
                        This invite may be invalid, expired, or already used.
                    </p>

                    <div className="mt-6">
                        <Link to="/">
                            <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                                Go to home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`min-h-screen px-4 py-8 sm:px-6 sm:py-10 ${isDark ? "bg-[#0b0f19]" : "bg-[#f4f5f7]"
                }`}
        >
            <div className="mx-auto w-full max-w-5xl">
                <div
                    className={`overflow-hidden rounded-3xl border shadow-[0_10px_40px_rgba(0,0,0,0.10)] ${isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
                        }`}
                >
                    {/* Cover Section */}
                    <div className="relative h-48 w-full sm:h-56">
                        <img
                            src={
                                projectinfo.workspaceBackground ||
                                projectinfo.image ||
                                "https://picsum.photos/1200/500"
                            }
                            alt={projectinfo.name || "Workspace"}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />

                        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur">
                                        {projectinfo.workspaceicon?.img || projectinfo.icon ? (
                                            <img
                                                src={projectinfo.workspaceicon?.img || projectinfo.icon}
                                                alt={projectinfo.workspaceicon?.name || projectinfo.name}
                                                className="h-8 w-8 object-contain"
                                            />
                                        ) : (
                                            <FaFolderOpen className="text-white" size={20} />
                                        )}
                                    </div>

                                    <div>
                                        <div className="mb-2 flex flex-wrap items-center gap-2">
                                            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                                                Workspace invite
                                            </span>

                                            {projectinfo.badge && (
                                                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-100">
                                                    {projectinfo.badge}
                                                </span>
                                            )}

                                            {projectinfo.type && (
                                                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium capitalize text-white/90">
                                                    {projectinfo.type}
                                                </span>
                                            )}
                                        </div>

                                        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                            Join {projectinfo.name || "Workspace"}
                                        </h1>

                                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
                                            {projectinfo.description ||
                                                "You’ve been invited to collaborate with your team and access active projects."}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`hidden rounded-xl border px-4 py-3 text-xs font-medium sm:flex sm:flex-col ${isDark
                                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-100"
                                        : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                        }`}
                                >
                                    <span className={isDark ? "text-emerald-200/70" : "text-emerald-600"}>
                                        Status
                                    </span>
                                    <span className="mt-1 text-emerald-400 sm:text-emerald-500">
                                        Acceptance confirmed
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="px-5 py-6 sm:px-8 sm:py-8">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.9fr]">
                            {/* Left column */}
                            <div className="space-y-5">
                                {/* Workspace block */}
                                <div
                                    className={`rounded-2xl border p-5 sm:p-6 ${isDark
                                        ? "border-slate-800 bg-slate-950/40"
                                        : "border-slate-200 bg-slate-50"
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                                            <FaFolderOpen size={22} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2
                                                    className={`truncate text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"
                                                        }`}
                                                >
                                                    {projectinfo.product || projectinfo.name || "Workspace"}
                                                </h2>

                                                {projectinfo.defaultView && (
                                                    <span
                                                        className={`rounded-md px-2.5 py-1 text-xs font-medium ${isDark
                                                            ? "bg-slate-800 text-slate-300"
                                                            : "border border-slate-200 bg-white text-slate-600"
                                                            }`}
                                                    >
                                                        {projectinfo.defaultView} view
                                                    </span>
                                                )}
                                            </div>

                                            <p
                                                className={`mt-2 text-sm leading-6 ${isDark ? "text-slate-400" : "text-slate-600"
                                                    }`}
                                            >
                                                {projectinfo.detailedInfo?.split("\n\n")[0] ||
                                                    "Access boards, tasks, timelines, and team collaboration tools."}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                        <div
                                            className={`rounded-xl border px-4 py-4 ${isDark
                                                ? "border-slate-800 bg-slate-900"
                                                : "border-slate-200 bg-white"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <FaUsers className="text-blue-500" />
                                                Members
                                            </div>
                                            <p
                                                className={`mt-2 text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"
                                                    }`}
                                            >
                                                {membersCount} active users
                                            </p>
                                        </div>

                                        <div
                                            className={`rounded-xl border px-4 py-4 ${isDark
                                                ? "border-slate-800 bg-slate-900"
                                                : "border-slate-200 bg-white"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <FaLayerGroup className="text-violet-500" />
                                                Columns
                                            </div>
                                            <p
                                                className={`mt-2 text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"
                                                    }`}
                                            >
                                                {columnsCount} workflow stages
                                            </p>
                                        </div>

                                        <div
                                            className={`rounded-xl border px-4 py-4 ${isDark
                                                ? "border-slate-800 bg-slate-900"
                                                : "border-slate-200 bg-white"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <FaCalendarAlt className="text-emerald-500" />
                                                Created
                                            </div>
                                            <p
                                                className={`mt-2 text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"
                                                    }`}
                                            >
                                                {formatDate(projectinfo.createdAt)}
                                            </p>
                                        </div>

                                        <div
                                            className={`rounded-xl border px-4 py-4 ${isDark
                                                ? "border-slate-800 bg-slate-900"
                                                : "border-slate-200 bg-white"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <FaCalendarAlt className="text-amber-500" />
                                                Updated
                                            </div>
                                            <p
                                                className={`mt-2 text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"
                                                    }`}
                                            >
                                                {formatDate(projectinfo.updatedAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Setup block */}
                                {projectinfo.workspaceSetup && (
                                    <div
                                        className={`rounded-2xl border p-5 sm:p-6 ${isDark
                                            ? "border-slate-800 bg-slate-950/30"
                                            : "border-slate-200 bg-white"
                                            }`}
                                    >
                                        <h3
                                            className={`text-base font-semibold ${isDark ? "text-white" : "text-slate-900"
                                                }`}
                                        >
                                            {projectinfo.workspaceSetup.title || "Workspace setup"}
                                        </h3>

                                        <p
                                            className={`mt-2 text-sm leading-6 ${isDark ? "text-slate-400" : "text-slate-600"
                                                }`}
                                        >
                                            {projectinfo.workspaceSetup.description ||
                                                "These settings define how your team plans and tracks work in this workspace."}
                                        </p>

                                        {!!projectinfo.workspaceSetup?.statuses?.length && (
                                            <div className="mt-4">
                                                <p
                                                    className={`mb-2 text-xs font-medium uppercase tracking-wide ${isDark ? "text-slate-500" : "text-slate-500"
                                                        }`}
                                                >
                                                    Workflow statuses
                                                </p>

                                                <div className="flex flex-wrap gap-2">
                                                    {projectinfo.workspaceSetup.statuses.map(
                                                        (status: any, index: number) => (
                                                            <span
                                                                key={index}
                                                                className={`rounded-full px-3 py-1.5 text-xs font-medium ${isDark
                                                                    ? "bg-slate-800 text-slate-300"
                                                                    : "bg-slate-100 text-slate-700"
                                                                    }`}
                                                            >
                                                                {typeof status === "string"
                                                                    ? status
                                                                    : status?.name || "Status"}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {!!projectinfo.workspaceSetup?.workTypes?.length && (
                                            <div className="mt-4">
                                                <p
                                                    className={`mb-2 text-xs font-medium uppercase tracking-wide ${isDark ? "text-slate-500" : "text-slate-500"
                                                        }`}
                                                >
                                                    Work types
                                                </p>

                                                <div className="flex flex-wrap gap-2">
                                                    {projectinfo.workspaceSetup.workTypes.map(
                                                        (workType: any, index: number) => (
                                                            <span
                                                                key={index}
                                                                className={`rounded-full border px-3 py-1.5 text-xs font-medium ${isDark
                                                                    ? "border-slate-700 bg-slate-900 text-slate-300"
                                                                    : "border-slate-200 bg-slate-50 text-slate-700"
                                                                    }`}
                                                            >
                                                                {workType?.name || "Work type"}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Right column */}
                            <div className="space-y-5">
                                <div
                                    className={`rounded-2xl border p-5 sm:p-6 ${isDark
                                        ? "border-slate-800 bg-slate-950/30"
                                        : "border-slate-200 bg-slate-50"
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                                            <FaEnvelope />
                                        </div>

                                        <div>
                                            <p
                                                className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"
                                                    }`}
                                            >
                                                Invitation linked to your email
                                            </p>
                                            <p
                                                className={`mt-1 text-sm leading-6 ${isDark ? "text-slate-400" : "text-slate-600"
                                                    }`}
                                            >
                                                Accept this invite using the same email address that
                                                received it.
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className={`mt-5 rounded-xl border px-4 py-4 ${isDark
                                            ? "border-slate-800 bg-slate-900"
                                            : "border-slate-200 bg-white"
                                            }`}
                                    >
                                        <p
                                            className={`text-xs uppercase tracking-wide ${isDark ? "text-slate-500" : "text-slate-500"
                                                }`}
                                        >
                                            Email
                                        </p>
                                        <p
                                            className={`mt-1 break-all text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-800"
                                                }`}
                                        >
                                            {AcceptEmail || "Not available"}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`rounded-2xl border p-5 sm:p-6 ${isDark
                                        ? "border-slate-800 bg-slate-950/30"
                                        : "border-slate-200 bg-white"
                                        }`}
                                >
                                    <h3
                                        className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"
                                            }`}
                                    >
                                        Before you continue
                                    </h3>

                                    <ul
                                        className={`mt-3 space-y-3 text-sm ${isDark ? "text-slate-400" : "text-slate-600"
                                            }`}
                                    >
                                        <li>Access boards, tasks, and team collaboration tools.</li>
                                        <li>Workspace permissions will be applied after joining.</li>
                                        <li>You can update workspace preferences later.</li>
                                    </ul>

                                    <div className="mt-6 flex flex-col-reverse gap-3">
                                        <Link to="/">
                                            <button
                                                className={`w-full rounded-xl border px-5 py-3 text-sm font-medium transition ${isDark
                                                    ? "border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
                                                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                                                    }`}
                                            >
                                                Back
                                            </button>
                                        </Link>

                                        <Link to="/">
                                            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                                                Accept invitation
                                                <FaArrowRight size={14} />
                                            </button>
                                        </Link>
                                    </div>

                                    <div className="mt-5 flex items-center gap-2">
                                        <CheckCircle className="text-green-500" size={16} />
                                        <p
                                            className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"
                                                }`}
                                        >
                                            Verified and secure workspace access
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmailBasedJoinWorkspace;