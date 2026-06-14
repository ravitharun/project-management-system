import { useState } from "react";
import SubTaskTable from "../CreateTask/SubTask/SubTasktabel";
export interface RowData {
  taskid: string;
  taskname: string;
  AssignedTo: string;
  status: string;
  priority: string;
  action: string;
}
/* ================= COMPONENT ================= */
export default function SubTaskWithFiles({ theme = "Dark" }) {
  const isDark = theme === "Dark";

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  console.log(setActiveTaskId, setUploadedFiles)
  const [rowData, setrowdata] = useState<RowData[]>([
    {
      taskid: "ST-101",
      taskname: "Design Login UI",
      AssignedTo: "Amit",
      status: "In Progress",
      priority: "High",
      action: "Edit",
    },
    {
      taskid: "ST-102",
      taskname: "API Integration",
      AssignedTo: "Ravi",
      status: "Pending",
      priority: "Medium",
      action: "View",
    },
  ]);

  const AddTask = () => {
    const newTask: RowData = {
      taskid: `ST-${100 + rowData.length + 1}`,
      taskname: "Add New SubTask",
      AssignedTo: "John",
      status: "Completed",
      priority: "Low",
      action: "Done",
    };

    setrowdata((prev) => [...prev, newTask]);
  };

  console.log("Active Task:", activeTaskId);
  console.log("Row Data:", rowData);

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* ================= SUBTASK TABLE ================= */}
      <div
        className={`rounded-2xl p-4 ${isDark ? "bg-[#111827]" : "bg-white"
          }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2
              className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"
                }`}
            >
              Sub Tasks
            </h2>

            <p className="text-xs text-gray-400">
              Track progress & uploads
            </p>
          </div>

          <button
            className="px-3 py-2 text-xs rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition"
            onClick={AddTask}
          >
            + Add Task
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <SubTaskTable
            theme={theme}
            rowData={rowData}
          />
        </div>
      </div>

      {/* ================= FILES SECTION ================= */}
      <div
        className={`rounded-2xl p-4 ${isDark ? "bg-[#111827]" : "bg-white"
          }`}
      >
        <h2
          className={`text-sm font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"
            }`}
        >
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

          {uploadedFiles.map((file: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white/5 p-2 rounded-lg"
            >
              <span className="text-xs text-gray-300 truncate">
                {file?.fileName}
              </span>

              <span className="text-[10px] text-gray-500">
                {file?.taskId}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}