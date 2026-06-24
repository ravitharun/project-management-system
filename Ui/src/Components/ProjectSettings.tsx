
import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    IoArrowBack,
    IoGridOutline,
    IoSettingsOutline,
    IoEyeOutline,
    IoAdd,
} from "react-icons/io5";
import { FaCrown, FaTrash, FaUserCircle } from "react-icons/fa";
import bgthemeContext from "../Context/ThemeContext";
import Chooseicon from "./Chooseicon";
import AddPeopleWorkspace from "./Task/AddPeople-workspace/AddPeopleWorkspace";

function ProjectSettings() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { theme }: any = useContext(bgthemeContext);

    const [ChooseIcon,setChooseIcon] = useState<string | undefined>();
    console.log(ChooseIcon)
    // console.log(first)
    const [openIconModal, setOpenIconModal] = useState(false);

    const data = state?.CreatedWorkSpace;
    const [AddMemeber, setAddMemeber] = useState(false)
    useEffect(() => {
        if (!data) navigate("/", { replace: true });
    }, [data, navigate]);

    if (!data) return null;

    const members = [
        {
            id: 1,
            name: "Ravi Tharun",
            email: "ravi@example.com",
            role: "Admin",
        },
        {
            id: 2,
            name: "John Doe",
            email: "john@example.com",
            role: "Member",
        },
    ];

    const isDark = theme === "Dark";

    const shell = isDark
        ? "bg-slate-950 text-slate-100"
        : "bg-slate-50 text-slate-900";

    const card = isDark
        ? "bg-slate-900/80 border border-white/10"
        : "bg-white border border-slate-200";

    const muted = isDark ? "text-slate-400" : "text-slate-500";
    const subtle = isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700";

    return (
        <>
            {openIconModal && (
                <Chooseicon
                    close={setOpenIconModal}
                    theme={theme}
                    selectedIcon={data?.workspaceicon?.img}
                    id={data._id}
                />
            )}

            {AddMemeber &&
                <AddPeopleWorkspace

                    theme={theme}
                    closesetAddMembers={() => setAddMemeber(false)}
                    workspace={data}

                />
            }

            <div className={`min-h-screen transition-colors duration-300 ${shell}`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                    {/* Top bar */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${isDark
                                ? "bg-slate-900 border border-white/10 hover:bg-slate-800"
                                : "bg-white border border-slate-200 hover:bg-slate-100"
                                }`}
                        >
                            <IoArrowBack size={16} />
                            Back
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="rounded-full bg-blue-600/10 text-blue-600 px-3 py-1 text-xs font-semibold">
                                Active Workspace
                            </span>
                        </div>
                    </div>

                    {/* Hero / summary */}
                    <div
                        className={`relative overflow-hidden rounded-3xl border ${card}`}
                    >
                        <div
                            className="h-44 sm:h-52 w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${data?.workspaceBackground})` }}
                        >
                            <div className="h-full w-full bg-black/40" />
                        </div>

                        <div className="relative px-5 sm:px-6 lg:px-8 pb-6">
                            <div className="-mt-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                                <div className="flex items-start gap-4">
                                    <button
                                        onClick={() => {
                                            setChooseIcon(data?.workspaceicon?.img);
                                            setOpenIconModal(true);
                                        }}
                                        className="group relative h-20 w-20 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg"
                                    >
                                        <img
                                            src={data?.workspaceicon?.img}
                                            alt="Workspace icon"
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                                    </button>

                                    <div className="pt-3">
                                        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                                            {data?.workspaceName}
                                        </h1>
                                        <p className={`mt-2 max-w-2xl text-sm leading-6 ${muted}`}>
                                            {data?.description}
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {[data?.type, data?.defaultView, data?.product].map(
                                                (item, idx) =>
                                                    item ? (
                                                        <span
                                                            key={idx}
                                                            className={`rounded-full px-3 py-1 text-xs font-medium ${subtle}`}
                                                        >
                                                            {item}
                                                        </span>
                                                    ) : null
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${isDark
                                            ? "bg-slate-800 hover:bg-slate-700"
                                            : "bg-slate-100 hover:bg-slate-200"
                                            }`}
                                    >
                                        Edit Details
                                    </button>
                                    <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {/* Left */}
                        <div className="xl:col-span-2 space-y-6">
                            <section className={`rounded-3xl p-6 ${card}`}>
                                <div className="flex items-center gap-2 mb-4">
                                    <IoSettingsOutline className="text-blue-500" />
                                    <h2 className="text-lg font-semibold">About Workspace</h2>
                                </div>
                                <p className={`text-sm leading-7 ${muted}`}>
                                    {data?.detailedInfo || "No detailed information added yet."}
                                </p>
                            </section>

                            <section className={`rounded-3xl p-6 ${card}`}>
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-2">
                                        <IoGridOutline className="text-blue-500" />
                                        <h2 className="text-lg font-semibold">Workflow Columns</h2>
                                    </div>
                                    <span className={`text-xs font-medium ${muted}`}>
                                        Board structure
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {data?.columns?.map((itm: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${isDark
                                                ? "bg-slate-950 border border-white/10 hover:border-blue-500/50"
                                                : "bg-slate-50 border border-slate-200 hover:border-blue-400"
                                                }`}
                                        >
                                            {itm?.name}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className={`rounded-3xl p-6 ${card}`}>
                                <div className="flex items-center justify-between mb-5">
                                    <div>
                                        <h2 className="text-lg font-semibold">Team Members</h2>
                                        <p className={`text-sm mt-1 ${muted}`}>
                                            Manage project access and roles
                                        </p>
                                    </div>

                                    <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition" onClick={() => setAddMemeber(true)}>
                                        <IoAdd size={16} />
                                        Add Member
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {members.map((user) => (
                                        <div
                                            key={user.id}
                                            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl p-4 transition ${isDark
                                                ? "bg-slate-950 border border-white/10"
                                                : "bg-slate-50 border border-slate-200"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <FaUserCircle className="text-4xl text-blue-500 shrink-0" />
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <p className="font-medium">{user.name}</p>
                                                        <span
                                                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${user.role === "Admin"
                                                                ? "bg-amber-500/15 text-amber-600"
                                                                : isDark
                                                                    ? "bg-slate-800 text-slate-300"
                                                                    : "bg-slate-200 text-slate-700"
                                                                }`}
                                                        >
                                                            {user.role}
                                                        </span>
                                                        {user.role === "Admin" && (
                                                            <FaCrown className="text-xs text-amber-500" />
                                                        )}
                                                    </div>
                                                    <p className={`text-sm truncate ${muted}`}>{user.email}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    className={`rounded-lg px-3 py-2 text-sm transition ${isDark
                                                        ? "hover:bg-slate-800 text-slate-300"
                                                        : "hover:bg-slate-200 text-slate-700"
                                                        }`}
                                                >
                                                    Change Role
                                                </button>
                                                <button className="rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right */}
                        <div className="space-y-6">
                            <section className={`rounded-3xl p-6 ${card}`}>
                                <h2 className="text-lg font-semibold mb-5">Workspace Info</h2>
                                <div className="space-y-5">
                                    <div>
                                        <p className={`text-xs uppercase tracking-wide ${muted}`}>Created By</p>
                                        <p className="mt-1 text-sm font-medium break-all">
                                            {data?.workspaceSetup?.createby?.userEmail}
                                        </p>
                                    </div>

                                    <div>
                                        <p className={`text-xs uppercase tracking-wide ${muted}`}>Default View</p>
                                        <p className="mt-1 text-sm font-medium">{data?.defaultView}</p>
                                    </div>

                                    <div>
                                        <p className={`text-xs uppercase tracking-wide ${muted}`}>Workspace Type</p>
                                        <p className="mt-1 text-sm font-medium capitalize">{data?.type}</p>
                                    </div>
                                </div>
                            </section>

                            <section className={`rounded-3xl p-6 ${card}`}>
                                <div className="flex items-center gap-2 mb-5">
                                    <IoEyeOutline className="text-blue-500" />
                                    <h2 className="text-lg font-semibold">Available Views</h2>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {data?.workspaceSetup?.views?.map((view: any, idx: number) => (
                                        <span
                                            key={idx}
                                            className={`rounded-xl px-3 py-2 text-xs font-medium ${subtle}`}
                                        >
                                            {view}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectSettings;