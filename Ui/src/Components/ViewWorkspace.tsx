import { useContext, useState } from "react";
import WorkspaceData from "../Context/workspaceData";
import WorkspaceViwe from "./WorkspaceViwe";

function ViewWorkspace({ theme }: any) {
  const workspaceProvider = useContext(WorkspaceData);
  const { work }: any = workspaceProvider;

  const workspace = work;

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

  return (
    <>
      {work?.length == 0 ? (
        <WorkspaceViwe theme={theme} />
      ) : (
        <div
          className={`min-h-screen p-4 md:p-6 ${
            theme === "Dark" ? "bg-gray-950 text-white" : "bg-gray-100 text-black"
          }`}
        >
          {/* TOP BAR */}
          <div
            className={`flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 rounded-md ${
              theme === "Dark" ? "bg-gray-900" : "bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={workspace?.workspaceicon?.img}
                className="w-10 h-10 rounded-md"
              />

              <div>
                <h1 className="font-semibold">
                  {workspace?.name}
                </h1>
                <p className="text-xs opacity-60">
                  {workspace?.description}
                </p>
              </div>
            </div>

            {/* SEARCH */}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className={`px-3 py-2 text-sm rounded-md border outline-none ${
                theme === "Dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-300"
              }`}
            />
          </div>

          {/* QUICK STATS */}
          <div className="flex gap-4 mt-4 text-xs opacity-70">
            <span>Total: {tasks.length}</span>
            <span>In Progress: {tasks.filter(t => t.status === "In Progress").length}</span>
            <span>Done: {tasks.filter(t => t.status === "Done").length}</span>
          </div>

          {/* BOARD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-5">
            {columns.map((col: string) => {
              const colTasks = filtered.filter(
                (t: any) => t.status === col
              );

              return (
                <div key={col} className="min-h-[350px]">
                  {/* COLUMN HEADER */}
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-medium opacity-80">
                      {col} ({colTasks.length})
                    </h2>

                    <span className="text-xs opacity-50">+</span>
                  </div>

                  {/* TASK LIST */}
                  <div className="space-y-2">
                    {colTasks.map((task: any) => (
                      <div
                        key={task.id}
                        className={`p-2 text-sm border-l-2 ${
                          theme === "Dark"
                            ? "border-gray-700 bg-gray-900"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{task.title}</span>

                          <span
                            className={`w-2 h-2 rounded-full ${priorityColor(
                              task.priority
                            )}`}
                          />
                        </div>
                      </div>
                    ))}

                    {colTasks.length === 0 && (
                      <div className="text-xs opacity-40">
                        Drop tasks here
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default ViewWorkspace;