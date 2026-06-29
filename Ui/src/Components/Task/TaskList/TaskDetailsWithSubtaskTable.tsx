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
import { toast, ToastContainer } from "react-toastify";
import TaskFiles from "./TaskFiles";
import bgthemeContext from "../../../Context/ThemeContext";

export default function SubTaskWithFiles({ viewtasks }: any) {
  const context = useContext(bgthemeContext);
  const { theme }: any = context
  const isDark = theme === "Dark";
  console.log(viewtasks, 'viewtasks')

  const contextFirstView = useContext(ViewTaskFirst)

  const { Tasks }: any = contextFirstView


  const data = Tasks;

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  console.log(uploadedFiles, 'uploadedFiles')
  const [loader, setloader] = useState(false)
  const [file, setfile] = useState<any | null>(null)
  console.log(setActiveTaskId, setUploadedFiles)
  const [rowData, setrowdata] = useState<any>([]);
  // const [Data, setdata] = useState<any>(viewtasks.Files);
  
  console.log(file, 'file')
  console.log(activeTaskId, 'activeTaskIdcls')
  // console.log(setdata, 'setdata')

  const [fileUpload, setfileUpload] = useState<boolean>(false)

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

  const UploadFiles = async (e: any) => {
    const file = e.target.files[0]
    if (!file) { return toast.info("File is required to Upload ") }
    setfile(file)

    try {
      setfileUpload(true)


      console.log(viewtasks, '(viewtasksviewtasksviewtasks')
      const Fileformdata = new FormData()
      Fileformdata.append("TaskFileUpload", file)
      Fileformdata.append("Taskid", viewtasks.TaskId)
      Fileformdata.append("projectid", viewtasks.projectid)
      Fileformdata.append("UploadedBy", JSON.parse(getuserInfo)._id)
      const response = await instance.post("/api/Task/uploadSubtaskFiles", Fileformdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(response.status)
      if (response.status == 201) {
        toast.success("File Uploaded.")
        setfile(null);
        e.target.value = "";


        return
      }

      setfile(null)
    } catch (error: any) {
      const errmessage = error.response.data.message
      const errstatus = error.response.status
      console.log(errstatus)
      console.log(errmessage, 'tharun')


      if (errstatus == 404) {
        return alert(errmessage)
      }

      return errmessage + errstatus

    }
    finally { setfileUpload(false) }

  }

  return (
    <>
      <ToastContainer></ToastContainer>
      {loader && (
        <ApiLoader
          texttyoe="Adding Subtask"
          text="Please wait while we create your subtask..."
        />
      )}



      {fileUpload && (
        <ApiLoader
          theme={theme}
          texttyoe="Uploading File..."
          text="Please wait while your file is being uploaded."
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
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h2
              className={`text-lg font-semibold flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"
                }`}
            >
              📁 Uploaded Files
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${isDark
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-100 text-gray-700"
                  }`}
              >
                {viewtasks?.Files?.length || 0}
              </span>
            </h2>

            <label className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md cursor-pointer transition">
              Upload
              <input
                type="file"
                className="hidden"
                onChange={(e) => UploadFiles(e)}
              />
            </label>
          </div>

          {/* FILE LIST */}
          <div className="overflow-x-auto">
            <div className="max-h-[300px] overflow-y-auto">
              <TaskFiles theme={theme} file={viewtasks} />
            </div>
          </div>
        </div>
      </div>
    </>

  );

}