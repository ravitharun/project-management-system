import { useContext, useEffect, useState } from "react";
import SubTaskTable from "../CreateTask/SubTask/SubTasktabel";
import ViewTaskFirst from "../../../Context/FirstTaskView";
import { instance } from "../../../services/apiservices";
import GlobalToast from "../../GlobalToast";
import { getuserInfo, useremail } from "../../LocalStorage";
import ApiLoader from "../../ApiLoader";
export interface RowData {
  taskid: string;
  taskname: string;
  AssignedTo: string;
  status: string;
  priority: string;
  action: string;
  createby:
  { name: string, email: string }

}
import { nanoid } from "nanoid";

export default function SubTaskWithFiles({ theme, viewtasks }: any) {
  const isDark = theme === "Dark";
  console.log(viewtasks, 'viewtasks')

  const contextFirstView = useContext(ViewTaskFirst)

  const { Tasks }: any = contextFirstView


  const data = Tasks;

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [loader, setloader] = useState(false)

  console.log(uploadedFiles, 'uploadedFiles')
  console.log(setActiveTaskId, setUploadedFiles)
  const [rowData, setrowdata] = useState<any>([]);
  const [Data, setdata] = useState<any>()
  console.log(activeTaskId, 'activeTaskIdcls')
  console.log(setdata, 'setdata')


  useEffect(() => {
    setrowdata(data?.SubTask || []);
  }, [data]);






  const AddTask = async () => {
    const newTask: RowData = {
      taskid: `ST-${nanoid()}`,
      taskname: "Add New SubTask",
      AssignedTo: "Unassigned",
      status: "Completed",
      priority: "Low",
      action: "Done",
      createby: {
        name: JSON.parse(getuserInfo)?.Username,
        email: useremail,
      },
    };
    console.log(newTask, 'newTask')
    const updatedTasks = [...(rowData || []), newTask];

    setrowdata(updatedTasks);

    try {
      setloader(true);

      const AddSubTask = await instance.post(
        "/api/Task/AddSubTasks",
        {
          rowData: newTask,
          id: data._id,
        }
      );

      if (AddSubTask?.status === 201) {
        GlobalToast("SubTask added", "success");
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setloader(false);
    }
  };



  return (
    <>
      {loader && (
        <ApiLoader
          texttyoe="Adding Subtask"
          text="Please wait while we create your subtask..."
        />
      )}
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
              Data={data}
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
            {Data?.Files?.length === 0 && (
              <p className="text-xs text-gray-500">
                No files uploadeds
              </p>
            )}

            {Data?.Files?.map((file: any, index: number) => (
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
    </>

  );

}