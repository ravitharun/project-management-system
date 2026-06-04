import { useContext, useRef, useState } from "react";
import WorkspaceData from "../Context/workspaceData";
import WorkspaceViwe from "./WorkspaceViwe";
import CreatedspaceData from "../Context/CreatedWorkspace";
import {
  FiList,
  FiActivity,
  FiCheckCircle,
  FiUsers,
} from "react-icons/fi";
import SetWork from "../Components/SetWork"
import WorkspaceMenu from "./WorkspaceMenu";
import { FaGear } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
function ViewWorkspace({ theme }: any) {
  const workspaceProvider = useContext(WorkspaceData);
  const CreatedSpaceJson = useContext(CreatedspaceData)
  const [CurrentView, setCurrentView] = useState<string>("Summary")
  const { SpaceJson }: any = CreatedSpaceJson
  const { work }: any = workspaceProvider;
  const workspace = work;
  const workspaceMenuRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  const columns =
    workspace?.columns?.map((c: any) => c.name) ||
    workspace?.workspaceSetup?.statuses || [
      "Backlog",
      "To Do",
      "In Progress",
      "In Review",
      "Done",
    ];
  const [isSetBackground, SetBackground] = useState<boolean>(false);
  const [openProject, setOpenProject] = useState<string | null>(null);


  const tasks =
    workspace?.tasks || [
      { id: 1, title: "Setup project structure", status: "Backlog", priority: "Low" },
      { id: 2, title: "Design UI system", status: "To Do", priority: "Medium" },
      { id: 3, title: "Connect API", status: "In Progress", priority: "High" },
      { id: 4, title: "Fix bugs", status: "In Review", priority: "Medium" },
      { id: 5, title: "Deploy", status: "Done", priority: "Low" },
    ];

  const filtered = tasks.filter((t: any) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const priorityColor = (p: string) => {
    if (p === "High") return "bg-red-500";
    if (p === "Medium") return "bg-yellow-500";
    return "bg-green-500";
  };


  const navigate = useNavigate()



  const handleProjectSetting = (CreatedWorkSpace: any) => {

    console.log(CreatedWorkSpace)

    if (!CreatedWorkSpace) {
      return
    }
    return navigate("/projectSettings", {
      state: {
        CreatedWorkSpace
      }
    })
  }
  return (
    <>
      {work?.length == 0 ? (
        <WorkspaceViwe theme={theme} SpaceJson={SpaceJson} />
      ) : (
        <>
          {isSetBackground &&
            <SetWork
              SetBackground={SetBackground}
              id={workspace._id}
              theme={theme}
            />
          }


          <div
            className={`min-h-screen relative overflow-hidden transition-all duration-500 ${theme === "Dark"
              ? "bg-[#0f1117] text-white"
              : "bg-[#f6f7fb] text-black"
              }`}
          >
            {/* ================= BACKGROUND ================= */}
            {workspace?.workspaceBackground && (
              <>
                <img
                  src={workspace?.workspaceBackground}
                  alt="workspace-bg"
                  className="absolute inset-0 w-full h-full object-cover opacity-10 scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
              </>
            )}

            {/* ================= CONTENT ================= */}
            <div className="relative z-10 p-4 md:p-6 space-y-6">

              {/* ================= HERO HEADER ================= */}
              <div
                className={`rounded-[30px] p-5 md:p-6 backdrop-blur-2xl shadow-xl transition-all ${theme === "Dark"
                  ? "bg-white/[0.04] border border-white/10"
                  : "bg-white/70 border border-white"
                  }`}
              >
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                  {/* LEFT */}
                  <div className="flex items-center gap-4">

                    <div className="relative">
                      <img
                        src={workspace?.workspaceicon?.img}
                        className="w-16 h-16 rounded-[22px] object-cover shadow-2xl"
                      />


                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-[3px] border-white" />

                    </div>

                    <div>
                      <div className="flex items-center gap-3 flex-wrap">

                        <h1 className="text-2xl font-bold tracking-tight">
                          {workspace?.name}
                        </h1>

                        <span
                          className={`text-[11px] px-3 py-1 rounded-full ${theme === "Dark"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-blue-100 text-blue-700"
                            }`}
                          onClick={() => setOpenProject(workspace._id)}
                        >
                          <WorkspaceMenu
                            setopenProjects={setOpenProject}
                            SetBackground={SetBackground}
                            openproject={workspace._id}
                            itm={workspace}
                            from="ViewPage"
                          />

                        </span>
                      </div>

                      <p className="text-sm opacity-60 mt-2 max-w-[700px] leading-relaxed">
                        {workspace?.description}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-3 flex-wrap">

                    <div
                      className={`px-4 py-2 rounded-2xl flex items-center gap-3 ${theme === "Dark"
                        ? "bg-white/5"
                        : "bg-black/[0.03]"
                        }`}
                    >
                      <span className="text-sm opacity-60">🔍</span>

                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search tasks..."
                        className="bg-transparent outline-none text-sm w-[180px] md:w-[250px]"
                      />
                    </div>

                    <button
                      className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-all hover:scale-105 shadow-lg ${theme === "Dark"
                        ? "bg-white text-black"
                        : "bg-black text-white"
                        }`}
                    >
                      + Create Task
                    </button>
                    <h1>




                    </h1>
                  </div>
                </div>
              </div>
              {openProject === workspace?._id && (

                <div
                  ref={workspaceMenuRef}
                  className={`
                                                        fixed top-24 left-[290px] md:left-[320px]
                                                        w-64 z-[999]
                                                        rounded-xl border shadow-2xl
                                                        py-2 overflow-hidden transition-all duration-200

                                                        ${theme === "Dark"
                      ? "bg-[#111827] border-gray-800 text-white"
                      : "bg-white border-gray-200 text-gray-900 shadow-lg"
                    }
                                                    `}
                  onClick={(e) => e.stopPropagation()}
                >

                  {/* YOUR EXISTING MENU */}
                  <div
                    ref={workspaceMenuRef}
                    className={`
            fixed top-24 left-[290px] md:left-[320px]
            w-64 z-[999]
            rounded-xl border shadow-2xl py-2 overflow-hidden
            transition-all duration-200

            ${theme === "Dark"
                        ? "bg-[#111827] border-gray-800 text-white"
                        : "bg-white border-gray-200 text-gray-900 shadow-lg"
                      }
        `}
                    onClick={(e) => e.stopPropagation()}
                  >

                    {/* SET BACKGROUND  */}
                    <button
                      onClick={() => {
                        SetBackground(true);
                      }}
                      className={`
    w-full flex items-center gap-3 px-4 py-2.5 text-sm
    rounded-xl transition-all duration-200 hover:cursor-pointer

    ${theme === "Dark"
                          ? "hover:bg-[#1e293b] hover:text-white"
                          : "hover:bg-blue-200 hover:text-black"
                        }
`}
                    >
                      <span className="text-base">🖼️</span>
                      Set Space Background
                    </button>

                    {/* SETTINGS */}
                    <button
                      className={`
    w-full flex items-center gap-3 px-4 py-2.5 text-sm
    rounded-xl transition-all duration-200 hover:cursor-pointer

    ${theme === "Dark"
                          ? "hover:bg-[#1e293b] hover:text-white"
                          : "hover:bg-blue-200 hover:text-black"
                        }
`}


                      onClick={() => handleProjectSetting(workspace)}
                    >
                      <FaGear className="text-sm" />
                      Project Settings
                    </button>

                    {/* DIVIDER */}
                    <div className="my-1 border-t border-gray-200 dark:border-gray-700" />

                    {/* DELETE */}
                    <button
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm
            text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
            transition"



                      onClick={() => console.log(workspace._id)}
                    >
                      🗑️ Delete
                    </button>

                    {/* CLOSE */}
                    <button
                      onClick={() => {
                        setOpenProject(null);
                        SetBackground(false);
                      }}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                    >
                      <IoClose size={16} />
                    </button>
                  </div>
                </div>
              )}
              {/* ================= STATS ================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  {
                    title: "Total Tasks",
                    value: tasks.length,
                    icon: <FiList />,
                  },
                  {
                    title: "In Progress",
                    value: tasks.filter(
                      (t: any) => t.status === "In Progress"
                    ).length,
                    icon: <FiActivity />,
                  },
                  {
                    title: "Completed",
                    value: tasks.filter(
                      (t: any) => t.status === "Done"
                    ).length,
                    icon: <FiCheckCircle />,
                  },
                  {
                    title: "Team Members",
                    value: "12",
                    icon: <FiUsers />,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`rounded-[28px] p-5 backdrop-blur-xl transition-all hover:translate-y-[-2px] ${theme === "Dark"
                      ? "bg-white/[0.04] border border-white/10"
                      : "bg-white/70 border border-white"
                      }`}
                  >
                    <div className="flex items-center justify-between">

                      {/* LEFT TEXT */}
                      <div>
                        <p className="text-sm opacity-60">
                          {item.title}
                        </p>

                        <h2 className="text-3xl font-bold mt-3">
                          {item.value}
                        </h2>
                      </div>

                      {/* ICON */}
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${theme === "Dark"
                          ? "bg-white/10 text-white"
                          : "bg-black/[0.04] text-black"
                          }`}
                      >
                        {item.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ================= VIEWS ================= */}
              <div
                className={`rounded-[28px] px-3 py-2 backdrop-blur-xl flex items-center overflow-x-auto scrollbar-hide ${theme === "Dark"
                  ? "bg-white/[0.04] border border-white/10"
                  : "bg-white/70 border border-white"
                  }`}
              >
                {workspace?.workspaceSetup?.views?.map(
                  (view: any, idx: number) => {

                    const active = CurrentView === view;

                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentView(view)}
                        className={`relative px-5 py-3 text-sm rounded-2xl whitespace-nowrap transition-all duration-300 ${active
                          ? theme === "Dark"
                            ? "bg-white text-black"
                            : "bg-black text-white"
                          : "opacity-60 hover:opacity-100"
                          }`}
                      >
                        <span className="flex items-center gap-2">

                          {view === "Board" && "📋"}
                          {view === "Table" && "📊"}
                          {view === "Calendar" && "📅"}
                          {view === "Timeline" && "⏳"}
                          {view === "Cards" && "🗂️"}

                          {view}
                        </span>
                      </button>
                    );
                  }
                )}
              </div>

              {/* ================= BOARD ================= */}
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-5 min-w-max">
                  {(workspace?.template === "Scrum"
                    ? ["Backlog", "Sprint", "Review", "Done"]
                    : columns
                  ).map((col: string) => {
                    const colTasks = filtered.filter(
                      (t: any) => t.status === col
                    );

                    return (
                      <div
                        key={col}
                        className={`w-[340px] h-[290px] rounded-[32px] p-4 backdrop-blur-xl flex flex-col transition-all ${theme === "Dark"
                          ? "bg-white/[0.04] border border-white/10"
                          : "bg-white/70 border border-white"
                          }`}
                      >
                        {/* HEADER */}
                        <div className="flex items-center justify-between mb-5 shrink-0">
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-3 h-3 rounded-full ${col === "Done"
                                ? "bg-green-500"
                                : col === "Sprint" || col === "In Progress"
                                  ? "bg-yellow-500"
                                  : col === "Review"
                                    ? "bg-blue-500"
                                    : "bg-gray-400"
                                }`}
                            />

                            <div>
                              <h2 className="font-semibold">{col}</h2>

                              <p className="text-xs opacity-50">
                                {colTasks.length} Tasks
                              </p>
                            </div>
                          </div>

                          <button
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg transition-all hover:scale-110 ${theme === "Dark"
                              ? "bg-white/10"
                              : "bg-black/[0.04]"
                              }`}
                          >
                            +
                          </button>
                        </div>

                        {/* TASK LIST */}
                        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                          {colTasks.map((task: any) => (
                            <div
                              key={task.id}
                              className={`rounded-[28px] p-4 cursor-pointer transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl ${theme === "Dark"
                                ? "bg-black/20 border border-white/10 hover:bg-white/[0.06]"
                                : "bg-white border border-gray-100"
                                }`}
                            >
                              {/* TOP */}
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-sm">
                                    {task.title}
                                  </h3>

                                  <p className="text-xs opacity-60 mt-2 line-clamp-2 leading-relaxed">
                                    {task.description || "No description"}
                                  </p>
                                </div>

                                <span
                                  className={`w-3 h-3 rounded-full mt-1 ${priorityColor(
                                    task.priority
                                  )}`}
                                />
                              </div>

                              {/* TAGS */}
                              <div className="flex flex-wrap gap-2 mt-4">
                                <span
                                  className={`text-[10px] px-3 py-1 rounded-full ${theme === "Dark"
                                    ? "bg-white/10"
                                    : "bg-black/[0.04]"
                                    }`}
                                >
                                  {task.priority}
                                </span>

                                {workspace?.template === "Scrum" && (
                                  <span
                                    className={`text-[10px] px-3 py-1 rounded-full ${theme === "Dark"
                                      ? "bg-blue-500/20 text-blue-300"
                                      : "bg-blue-100 text-blue-700"
                                      }`}
                                  >
                                    Story Point: 5
                                  </span>
                                )}
                              </div>

                              {/* FOOTER */}
                              <div className="flex items-center justify-between mt-5">
                                <div className="flex -space-x-2">
                                  <img
                                    src="https://i.pravatar.cc/40?img=1"
                                    alt=""
                                    className="w-8 h-8 rounded-full border-2 border-white"
                                  />

                                  <img
                                    src="https://i.pravatar.cc/40?img=2"
                                    alt=""
                                    className="w-8 h-8 rounded-full border-2 border-white"
                                  />
                                </div>

                                <p className="text-[11px] opacity-40">
                                  #{task.id}
                                </p>
                              </div>
                            </div>
                          ))}

                          {/* EMPTY STATE */}
                          {colTasks.length === 0 && (
                            <div
                              className={`rounded-[28px] border-2 border-dashed p-10 text-center text-sm opacity-40 ${theme === "Dark"
                                ? "border-white/10"
                                : "border-gray-300"
                                }`}
                            >
                              Drop tasks here
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </>
      )}
    </>
  );
}

export default ViewWorkspace;