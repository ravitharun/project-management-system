import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import Sidebar from "../Components/Navbar";
import { fetchtaskApi } from "../services/taskApi";
import toast from "react-hot-toast";
// import { instance } from "../services/apiservices";
import axios from "axios";

// type Task = {
//     id: string;
//     title: string;
//     date: string;
//     status?: "todo" | "done";
// };

export default function ProjectCalendar() {
    const [tasks, setTasks] = useState<[]>();
    const isSameDay = (a: Date, b: Date) =>
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();



    const getEventColor = (date: string, status?: string) => {
        const today = new Date();
        const due = new Date(date);
        const diffDays =
            (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

        if (isSameDay(today, due)) { return "purple" }
        if (status === "done") return "green";
        if (status === "todo") return "blue";
        if (diffDays < 0) return "red";
        if (diffDays <= 2) return "orange";

    };

    // convert tasks to FullCalendar events
    const events = tasks?.map((task: any) => ({
        id: task.TaskId,
        title: task.TaskName,
        date: task.TaskstartDate,
        backgroundColor: getEventColor(task.TaskstartDate, task.taskpriority),
        borderColor: getEventColor(task.TaskstartDate, task.taskpriority),


    }));

    // click to add task
    // const handleDateClick = (info: any) => {
    //     const title = prompt("Enter Task Name:");
    //     if (!title) return;
    //     setTasks((prev) => [
    //         ...prev
    //     ]);
    // };
    const HanledlUpdates = async (info: any) => {
        // console.log("Task ID:", info.event.id);
        // console.log("Task Name:", info.event.title);
        // console.log("Start Date:", info.event.start);
        // console.log("end Date:", info.event._instance.range.end);

        const data: any = { info}
        console.log(data)


        const updateTask = await axios.patch("http://localhost:5000/api/Task/taskUpdate", {
            data: data
        })
        console.log(updateTask, 'taskupdate /api/Task/taskUpdate')
    }




    useEffect(() => {
        const fetchTaskes = async () => {
            try {
                const response = await fetchtaskApi();
                console.log(response.data.message)
                setTasks(response?.data?.message
                )
            } catch (error: any) {
                toast.error(error)
            }
        }
        fetchTaskes()

    }, [])

    return (
        <>

            <div className="flex h-screen bg-gray-100">
                <Sidebar page="Calendar" />

                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="p-4 bg-white rounded-xl shadow">
                        <h2 className="text-xl font-bold mb-3">
                            📅 Project Deadline Tracker
                        </h2>

                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            events={events}
                            editable={true}
                            eventResizableFromStart={true}
                            eventDragStart={(info) => HanledlUpdates(info)}
                            eventDrop={(info) => {
                                console.log("New Date:", info);
                            }}
                            droppable={true}
                            // dateClick={handleDateClick}
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth",
                            }}
                        />
                    </div>
                </main>
            </div>
        </>
    );
}