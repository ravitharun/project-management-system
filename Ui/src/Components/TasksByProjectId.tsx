import {
    CalendarDays,
    CircleDashed,
    Clock3,
    Flag,
    FolderKanban,
    User,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

type propsProjectTask = {
    ProjectTask: any;
};

function TasksByProjectId({ ProjectTask }: propsProjectTask) {
    console.log(ProjectTask, "ProjectTask");
    const handelUpadateProgress = async (id: number) => {
        console.log(id, 'id')
        try {
            // http://localhost:5000/api/Task/TaskProgressUpdatet?projectId=
          
            const response = await axios.patch(`http://localhost:5000/api/Task/TaskProgressUpdatet?projectId=${id}`)
            console.log(response, 'response')
            toast.success(response.data.message)
        } catch (error: any) {

            toast.error(error.message)
        }

    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-5 text-gray-800">
                Tasks
            </h1>

            <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr className="text-gray-700 text-sm">
                            <th className="px-5 py-4 text-left">Task</th>
                            <th className="px-5 py-4 text-left">Project</th>
                            <th className="px-5 py-4 text-left">Assigned</th>
                            <th className="px-5 py-4 text-left">Priority</th>
                            <th className="px-5 py-4 text-left">Hours</th>
                            <th className="px-5 py-4 text-left">Start</th>
                            <th className="px-5 py-4 text-left">End</th>
                            <th className="px-5 py-4 text-left">Progress</th>
                            <th className="px-5 py-4 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {ProjectTask === "No Task Added in these Project." ? <>


                            <tr>
                                <td colSpan={8} className="p-0">
                                    <div className="flex items-center justify-center h-40 bg-gray-50 border border-dashed border-gray-300 rounded-2xl m-4">
                                        <h1 className="text-gray-500 text-lg font-medium">
                                            No Task Added in this Project.
                                        </h1>
                                    </div>
                                </td>
                            </tr>


                        </>
                            : ProjectTask?.map((task: any, index: number) => (
                                <tr
                                    key={index}
                                    className="border-t hover:bg-gray-50 transition-all"
                                >
                                    {/* Task Name */}
                                    <td className="px-5 py-4">
                                        <div className="flex items-start gap-3">
                                            <CircleDashed
                                                size={20}
                                                className="text-blue-500 mt-1"
                                            />

                                            <div>
                                                <h1 className="font-semibold text-gray-800">
                                                    {task.TaskName}
                                                </h1>

                                                <p className="text-sm text-gray-500 mt-1">
                                                    {task.Taskdescription}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Project ID */}
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <FolderKanban
                                                size={18}
                                                className="text-purple-500"
                                            />
                                            {task.ProjectID}
                                        </div>
                                    </td>

                                    {/* Assign To */}
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <User
                                                size={18}
                                                className="text-green-500"
                                            />
                                            {task.assignToMember}
                                        </div>
                                    </td>

                                    {/* Priority */}
                                    <td className="px-5 py-4">
                                        <div
                                            className={`flex items-center gap-2 w-fit px-3 py-1 rounded-full text-sm font-medium
                                        ${task.taskpriority === "High"
                                                    ? "bg-red-100 text-red-600"
                                                    : task.taskpriority === "Medium"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-green-100 text-green-600"
                                                }`}
                                        >
                                            <Flag size={16} />
                                            {task.taskpriority}
                                        </div>
                                    </td>

                                    {/* Hours */}
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Clock3
                                                size={18}
                                                className="text-orange-500"
                                            />
                                            {task.taskestimatedHours} hrs
                                        </div>
                                    </td>

                                    {/* Start Date */}
                                    <td className="px-5 py-4 text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays
                                                size={18}
                                                className="text-blue-500"
                                            />
                                            {new Date(
                                                task.TaskstartDate
                                            ).toLocaleDateString()}
                                        </div>
                                    </td>

                                    {/* End Date */}
                                    <td className="px-5 py-4 text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays
                                                size={18}
                                                className="text-red-500"
                                            />
                                            {new Date(
                                                task.TaskendDate
                                            ).toLocaleDateString()}
                                        </div>
                                    </td>

                                    {/* Progress */}
                                    <td className="px-5 py-4 w-52">
                                        <div className="w-full bg-gray-200 rounded-full h-3" onClick={() => handelUpadateProgress(task._id)}>
                                            <div
                                                className="bg-blue-500 h-3 rounded-full"
                                                style={{
                                                    width: `${task.TaskProgress}%`,
                                                }}
                                            ></div>
                                        </div>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {task.TaskProgress}%
                                        </p>
                                    </td>


                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TasksByProjectId;