import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import Sidebar from "../Components/Navbar";

type Task = {
    id: string;
    title: string;
    date: string;
    status?: "todo" | "done";
};

export default function ProjectCalendar() {
    const [tasks, setTasks] = useState<Task[]>([
        { id: "1", title: "Frontend Task", date: "2026-05-05" },
        { id: "2", title: "Backend API", date: "2026-05-01" },
        { id: "3", title: "Backend API", date: "2026-05-01", status: "todo" },
        { id: "73", title: "Backend API/DbApi", date: "2026-05-04", status: "todo" },

    ]);
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
    const events = tasks.map((task) => ({
        id: task.id,
        title: task.title,
        date: task.date,
        backgroundColor: getEventColor(task.date, task.status),
        borderColor: getEventColor(task.date, task.status),

    }));

    // click to add task
    const handleDateClick = (info: any) => {
        const title = prompt("Enter Task Name:");
        if (!title) return;

        setTasks((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                title,
                date: info.dateStr,
            },
        ]);
    };
    const HanledlUpdates = (info: any) => {
        console.log("Task ID:", info.event.id);
        console.log("Task Name:", info.event.title);
        console.log("Start Date:", info.event.start);
    }

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
                            dateClick={handleDateClick}
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