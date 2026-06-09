

import { useState } from "react";

/* ================= MOCK JSON ================= */
const initialSubTasks = [
  {
    id: "ST-01",
    title: "Build KPI cards",
    owner: "Tharun",
    priority: "High",
    status: "In Progress",
    due: "Today",
    progress: 72,
  },
  {
    id: "ST-02",
    title: "Recent activity timeline",
    owner: "Ravi",
    priority: "Medium",
    status: "Review",
    due: "Tomorrow",
    progress: 54,
  },
  {
    id: "ST-03",
    title: "Comments + reply UI",
    owner: "Anu",
    priority: "High",
    status: "Completed",
    due: "Done",
    progress: 100,
  },
  {
    id: "ST-04",
    title: "Task actions dropdown",
    owner: "Kiran",
    priority: "Low",
    status: "Pending",
    due: "Jun 12",
    progress: 18,
  },
];

/* ================= STYLES ================= */
const statusStyles: any = {
  "In Progress": "bg-blue-500/10 text-blue-400",
  Review: "bg-amber-500/10 text-amber-400",
  Completed: "bg-green-500/10 text-green-400",
  Pending: "bg-gray-500/10 text-gray-300",
};

const priorityStyles: any = {
  High: "text-red-400",
  Medium: "text-amber-400",
  Low: "text-emerald-400",
};

/* ================= COMPONENT ================= */
export default function SubTaskWithFiles({ theme = "Dark" }) {
  const isDark = theme === "Dark";

  // const fileRef = useRef(null);

  const [tasks, setTasks] = useState(initialSubTasks);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  console.log(activeTaskId, 'activeTaskId')
  console.log(setTasks, 'activeTaskId')
  console.log(setUploadedFiles, 'activeTaskId')

  /* OPEN FILE PICKER */
  const openFilePicker = (id: any) => {
    setActiveTaskId(id);
    // fileRef.current?.click();
  };

  /* HANDLE UPLOAD */
  // const handleFileChange = (e) => {
  //   const file = e.target.files?.[0];
  //   if (!file || !activeTaskId) return;

  //   setTasks((prev) =>
  //     prev.map((t) =>
  //       t.id === activeTaskId ? { ...t, file: file.name } : t
  //     )
  //   );

  //   setUploadedFiles((prev) => [
  //     ...prev,
  //     { taskId: activeTaskId, fileName: file.name },
  //   ]);

  //   e.target.value = "";
  // };

  return (
    <>

      <div className="flex flex-col gap-5 w-full">

        {/* ================= SUBTASK TABLE ================= */}
        <div
          className={`rounded-2xl p-4 ${isDark ? "bg-[#111827]" : "bg-white"
            }`}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Sub Tasks
              </h2>
              <p className="text-xs text-gray-400">
                Track progress & uploads
              </p>
            </div>

            <button className="px-3 py-2 text-xs rounded-lg bg-blue-500/20 text-blue-300">
              + Add Task
            </button>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[850px]">
              <thead className="text-gray-400 text-xs">
                <tr>
                  {[
                    "ID",
                    "Task",
                    "Owner",
                    "Priority",
                    "Status",
                    "Progress",
                    "Action",
                  ].map((h) => (
                    <th key={h} className="text-left px-3 py-2">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {tasks.map((t) => (
                  <tr key={t.id} className="border-t border-white/5">

                    <td className="px-3 py-3 text-white font-medium">
                      {t.id}
                    </td>

                    <td className="px-3 py-3 text-gray-300">
                      {t.title}
                    </td>

                    <td className="px-3 py-3 text-gray-400">
                      {t.owner}
                    </td>

                    <td className="px-3 py-3">
                      <span className={priorityStyles[t.priority]}>
                        {t.priority}
                      </span>
                    </td>

                    <td>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusStyles[t.status]}`}>
                        {t.status}
                      </span>
                    </td>

                    <td className="px-3 py-3 min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${t.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">
                          {t.progress}%
                        </span>
                      </div>
                    </td>



                    <td className="px-3 py-3">
                      <button
                        onClick={() => openFilePicker(t.id)}
                        className="px-3 py-1.5 text-xs rounded-lg bg-white/10 text-white hover:bg-white/20"
                      >
                        Upload
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= FILES SECTION (NOW BELOW TABLE) ================= */}
        <div
          className={`rounded-2xl p-4 ${isDark ? "bg-[#111827]" : "bg-white"
            }`}
        >
          <h2 className="text-sm font-semibold text-white mb-3">
            Uploaded Files
          </h2>
          {/* DROP AREA */}
          <div className="border border-white/10 rounded-xl p-4 text-center text-gray-400 text-xs mb-4">
            Drag & Drop files here or use upload button
          </div>

          {/* FILE LIST */}
          <div className="space-y-2">
            {uploadedFiles.length === 0 && (
              <p className="text-xs text-gray-500">
                No files uploaded
              </p>
            )}

            {uploadedFiles?.map((f: any, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white/5 p-2 rounded-lg"
              >
                <span className="text-xs text-gray-300 truncate">
                  {f?.fileName}
                </span>
                <span className="text-[10px] text-gray-500">
                  {f?.taskId}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}