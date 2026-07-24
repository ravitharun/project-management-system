
import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    IoArrowBack,
    IoGridOutline,
    IoSettingsOutline,
    IoEyeOutline,
    IoAdd,
} from "react-icons/io5";
import { FaCrown, FaTrash } from "react-icons/fa";
import "../index.css"
import bgthemeContext from "../Context/ThemeContext";
import Chooseicon from "./Chooseicon";
import AddPeopleWorkspace from "./Task/AddPeople-workspace/AddPeopleWorkspace";
import { instance } from "../services/apiservices";
import { toast, ToastContainer } from "react-toastify";
import { Role } from "../types/Role";
import { getuserInfo } from "./LocalStorage";

function ProjectSettings() {


    const { state } = useLocation();
    const navigate = useNavigate();
    const { theme }: any = useContext(bgthemeContext);

    const [ChooseIcon, setChooseIcon] = useState<string | undefined>();

    const [isRoleOpen, setisRoleopen] = useState<boolean>(false)
    const [ProjectRole, setProjectRole] = useState<String | any>("")
    const [userid, setusrid] = useState<string | Number | any>('')


    console.log(userid, 'userid')
    console.log(ChooseIcon)

    const [openIconModal, setOpenIconModal] = useState(false);


    const data = state?.CreatedWorkSpace;
    const [users, setusers] = useState([])


    const naviagte = useNavigate()
    useEffect(() => {
        const fetchteamUsers = async () => {
            try {
                if (!data._id) {
                    return naviagte("/")
                }


                const response = await instance.get("/api/WorkSpace/TeamUsers", {
                    params: {
                        SpaceId: data._id
                    }
                })


                setusers(response.data.message.WorkSpacememebers)
                console.log(response.data.message)




            } catch (error: any) {
                console.log(error.response, 'error.response')
                const status_Code: number = error.response.status
                const status_message: string = error.response.data.message
                console.log(status_Code, status_message);
                if (status_Code == 400) {
                    // return GlobalToast(status_message, "error")
                    return toast.error(status_message)
                }
                if (status_Code == 404) {
                    // return GlobalToast(status_message, "error")
                    return toast.error(status_message)
                }
                if (status_Code == 500) {
                    // return GlobalToast(status_message, "error")
                    return toast.error('server error')
                }
            }

        }
        fetchteamUsers()
    }, [data?._id])


    console.log(users, 'users')

    const [AddMemeber, setAddMemeber] = useState(false)
    useEffect(() => {
        if (!data) navigate("/", { replace: true });
    }, [data, navigate]);



    const isDark = theme === "Dark";

    const shell = isDark
        ? "bg-slate-950 text-slate-100"
        : "bg-slate-50 text-slate-900";

    const card = isDark
        ? "bg-slate-900/80 border border-white/10"
        : "bg-white border border-slate-200";

    const muted = isDark ? "text-slate-400" : "text-slate-500";
    const subtle = isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700";
    const handelRolePoup = (id: any) => {
        setisRoleopen((prev) => !prev);
        setusrid(id);
    };
    return (
        <>


            <ToastContainer></ToastContainer>
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

                                <div className="space-y-4">
                                    {users.length === 0 && (
                                        <div className="flex flex-col items-center justify-center py-16 px-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                                            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-10 h-10 text-blue-600 dark:text-blue-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M17 20h5V4H2v16h5m10 0v-4a3 3 0 00-3-3H10a3 3 0 00-3 3v4m10 0H7m10-10a4 4 0 11-8 0 4 4 0 018 0z"
                                                    />
                                                </svg>
                                            </div>

                                            <h2 className="mt-5 text-xl font-semibold text-slate-800 dark:text-white">
                                                No Users Found
                                            </h2>

                                            <p className="mt-2 max-w-sm text-center text-sm text-slate-500 dark:text-slate-400">
                                                There are no users available at the moment. Add a new user or refresh
                                                the page to see the list.
                                            </p>
                                        </div>
                                    )}
                                    {users?.map((user: any) => (
                                        <div
                                            key={user?.id?._id || user?.id}
                                            className={`flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-lg px-4 py-3 border transition-all duration-200
${JSON.parse(getuserInfo).userEmail === user.email
                                                    ? isDark
                                                        ? "bg-blue-900/20 border-blue-800"
                                                        : "bg-blue-50 border-blue-300"
                                                    : isDark
                                                        ? "bg-slate-950 border-slate-800 hover:bg-slate-900"
                                                        : "bg-white border-slate-200 hover:bg-slate-50"
                                                }`}
                                        >
                                            {/* Left Section */}
                                            <div className="flex items-center gap-4 min-w-0 flex-1">
                                                <div className="relative shrink-0">
                                                    <img
                                                        src={user?.id?.userProfile}
                                                        alt="User Profile"
                                                        className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 shadow"
                                                    />

                                                    {/* Online Indicator */}
                                                    {user?.id?.isactive && (
                                                        <>
                                                            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white animate-ping"></span>
                                                            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></span>
                                                        </>
                                                    )}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    {/* Username + Role */}
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h2 className="font-semibold text-lg truncate">
                                                            {user?.id?.Username}
                                                        </h2>

                                                        <span
                                                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${user?.role === "Admin"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : isDark
                                                                    ? "bg-slate-700 text-slate-300"
                                                                    : "bg-slate-100 text-slate-600"
                                                                }`}
                                                        >
                                                            {user?.role || "Member"}
                                                        </span>

                                                        {user?.role === "Admin" && (
                                                            <FaCrown className="text-yellow-500" />
                                                        )}
                                                    </div>

                                                    {/* Email */}
                                                    <p className={`text-sm mt-1 truncate ${muted}`}>
                                                        {user?.email}
                                                    </p>
                                                    {/* Status */}
                                                    <div className="mt-3">
                                                        {user?.id?.isactive ? (
                                                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                                                                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                                                                Active Now
                                                            </span>
                                                        ) : (
                                                            <span
                                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${isDark
                                                                    ? "bg-slate-800 text-slate-400"
                                                                    : "bg-slate-100 text-slate-600"
                                                                    }`}
                                                            >
                                                                Last seen{" "}
                                                                {new Date(user?.id?.lastseen).toLocaleString("en-IN", {
                                                                    day: "2-digit",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                    hour12: true,
                                                                })}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Section */}
                                            <div className="relative flex items-center gap-3">
                                                <button
                                                    onClick={() => handelRolePoup(user?._id)}
                                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition ${isDark
                                                        ? "bg-slate-800 hover:bg-slate-700 text-white"
                                                        : "bg-blue-50 hover:bg-blue-100 text-blue-600"
                                                        }`}
                                                >
                                                    {isRoleOpen && userid === user?._id ? "Close" : "Choose Role"}
                                                </button>

                                                <button className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                                                    <FaTrash />
                                                </button>

                                                {isRoleOpen && userid === user?._id && (
                                                    <div
                                                        className={`absolute top-0 left-full ml-4 z-50 w-64 rounded-2xl shadow-xl border p-4 ${isDark
                                                            ? "bg-slate-900 border-slate-700"
                                                            : "bg-white border-slate-200"
                                                            }`}
                                                    >
                                                        <h3 className="text-sm font-semibold mb-3">
                                                            Change Project Role
                                                        </h3>

                                                        <select
                                                            name="role"
                                                            id="Projectrole"
                                                            value={ProjectRole}
                                                            onChange={(e) => setProjectRole(e.target.value)}
                                                            className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark
                                                                ? "bg-slate-800 border-slate-700 text-white"
                                                                : "bg-white border-slate-300"
                                                                }`}
                                                        >
                                                            <option value="">Choose Role</option>

                                                            {Role.map((role) => (
                                                                <option key={role} value={role}>
                                                                    {role}
                                                                </option>
                                                            ))}
                                                        </select>

                                                        <div className="mt-4 flex justify-end gap-2">
                                                            <button
                                                                onClick={() => setisRoleopen(false)}
                                                                className={`px-3 py-2 rounded-lg text-sm ${isDark
                                                                    ? "bg-slate-800 hover:bg-slate-700"
                                                                    : "bg-slate-100 hover:bg-slate-200"
                                                                    }`}
                                                            >
                                                                Cancel
                                                            </button>

                                                            <button
                                                                className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
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

            {/* 
             Poup Role */}


        </>
    );
}

export default ProjectSettings;