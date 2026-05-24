import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

import Sidebar from "../Components/Navbar";
import { fetchtaskApi, HandelDeleteTask } from "../services/taskApi";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import ActionLoading from "../Components/ActionLoading";

export default function ProjectCalendar() {

    const [tasks, setTasks] = useState<any[]>([]);
    const [poupAction, setpoupaction] = useState(false);
    const [taskUpdateLoader, settaskUpdateLoader] = useState<boolean>(false)
    // const [taskUpdateLoader, settaLoader] = useState<boolean>(false)


    const [message, setmessage] = useState<{
        title: string,
        descp: string,
        type: string
    }>()
    const isSameDay = (a: Date, b: Date) =>
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();

    const getEventColor = (date: string, status?: string) => {

        const today = new Date();
        const due = new Date(date);

        const diffDays =
            (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

        if (isSameDay(today, due)) return "purple";

        if (status === "done") return "green";

        if (status === "todo") return "blue";

        if (diffDays < 0) return "red";

        if (diffDays <= 2) return "orange";

        return "gray";
    };

    // Convert tasks into FullCalendar events
    const events = tasks?.map((task: any) => ({
        id: task.TaskId,
        title: task.TaskName,
        date: task.TaskstartDate,

        backgroundColor: getEventColor(
            task.TaskstartDate,
            task.taskpriority
        ),

        borderColor: getEventColor(
            task.TaskstartDate,
            task.taskpriority
        ),
    }));

    // Update task after drag and drop
    const HanledlUpdates = async (info: any) => {

        console.log("Task ID:", info.event.id);
        console.log("New Date:", info.event.start);

        try {
            settaskUpdateLoader(true)
                        setmessage({ title: "Updating.", descp: "Updating the task ", type: "loading" })

            const updateTask = await axios.patch(
                "http://localhost:5000/api/Task/taskUpdate",
                {
                    TaskId: info.event.id,
                    TaskstartDate: info.event.start,
                    TaskendDate: info.event.start,
                }
            );

            console.log(updateTask.data);

            if (updateTask.data.message === "updated") {
                toast.success("Task Updated");
                settaskUpdateLoader(false)
            }

        } catch (error: any) {

            console.log(error.message);
            toast.error("Update Failed");
        }
        finally {
            settaskUpdateLoader(false)
        }
    };

    // Fetch tasks
    useEffect(() => {

        const fetchTaskes = async () => {

            try {

                const response = await fetchtaskApi();

                console.log(response.data.message);

                setTasks(response?.data?.message);

            } catch (error: any) {

                toast.error(error.message);
            }
        };

        fetchTaskes();

    }, []);


    const [TaskId, setTaskId] = useState<any>()

    const handelDelete = async () => {
        console.log(TaskId, 'TaskId')
        if (!TaskId) {
            return toast.info('No tasks available to delete. ', { position: "top-center" })
        }

        try {
            settaskUpdateLoader(true)
            setmessage({ title: "Deleting the tAsk", descp: "f", type: "delete" })
            const response = await HandelDeleteTask(TaskId)
            console.log(response)
            settaskUpdateLoader(false)
        } catch (error: any) {
            toast.error(error.message)

        }
        finally {

            settaskUpdateLoader(false)
        }


    }
    return (
        <>
            <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            // transition={Bounce}

            ></ToastContainer>


            {taskUpdateLoader && <ActionLoading description={message?.descp} title={message?.title} type={message?.type} />}
            {/* Popup */}
            {
                poupAction &&

                <div className="fixed top-5 right-5 bg-white shadow-xl border rounded-xl p-4 w-72 z-50">

                    <div className="flex items-center justify-between mb-4">

                        <h2 className="text-lg font-semibold">
                            Task Action
                        </h2>

                        <button
                            onClick={() => setpoupaction(false)}
                            className="text-gray-500 hover:text-black"
                        >
                            ✖
                        </button>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                        Date clicked successfully
                    </p>

                    <div className="flex justify-end gap-3">

                        <button
                            onClick={() => setpoupaction(false)}
                            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                            onClick={handelDelete}
                        >
                            🗑 Delete
                        </button>

                    </div>
                </div>
            }

            <div className="flex h-screen bg-gray-100">

                <Sidebar page="Calendar" />

                <Toaster />

                <main className="flex-1 p-6 overflow-y-auto">

                    <div className="p-4 bg-white rounded-xl shadow">

                        <h2 className="text-xl font-bold mb-3">
                            📅 Project Deadline Tracker
                        </h2>

                        <FullCalendar
                            plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin
                            ]}

                            initialView="dayGridMonth"

                            events={events}

                            editable={true}

                            droppable={true}

                            height="80vh"

                            // Click Empty Date
                            dateClick={(info) => {

                                console.log("Date Clicked");
                                console.log(info.dateStr);

                                setpoupaction(true);
                            }}

                            // Click Event
                            eventClick={(info: any) => {
                                setTaskId(info.event.id)
                                // console.log(info.event.id)
                                setpoupaction((prev) => !prev)
                            }}

                            // Drag & Drop Event
                            eventDrop={(info) => HanledlUpdates(info)}

                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right:
                                    "dayGridMonth,timeGridWeek,timeGridDay"
                            }}
                        />

                    </div>

                </main>

            </div>
        </>
    );
}