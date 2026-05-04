import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Sidebar from "../Components/Navbar";

/* ---------------- TYPES ---------------- */

type ColumnType = "todo" | "progress" | "done";

type TaskItem = {
    id: string;
    title: string;
};

type TasksState = {
    todo: TaskItem[];
    progress: TaskItem[];
    done: TaskItem[];
};

/* ---------------- INITIAL DATA ---------------- */

const initialData: TasksState = {
    todo: [
        { id: "1", title: "Build Navbar UI" },
        { id: "2", title: "Fix Login Bug" },
    ],
    progress: [{ id: "3", title: "API Integration" }],
    done: [{ id: "4", title: "Setup Project" }],
};

/* ---------------- MAIN COMPONENT ---------------- */

function KanbanBoard() {
    const [tasks, setTasks] = useState<TasksState>(initialData);

    function handleDragEnd(event: any) {
        const { active, over } = event;
        if (!over) return;

        const sourceCol = active.data.current.col as ColumnType;
        const destCol = over.data.current.col as ColumnType;

        const sourceItems = [...tasks[sourceCol]];
        const destItems = [...tasks[destCol]];

        const draggedItem = sourceItems.find((t) => t.id === active.id);

        if (!draggedItem) return;

        const newSource = sourceItems.filter((t) => t.id !== active.id);

        destItems.push(draggedItem);

        setTasks({
            ...tasks,
            [sourceCol]: newSource,
            [destCol]: destItems,
        });
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar page="Tasks" />

            <main className="flex-1 p-6 overflow-y-auto">
                <div className="p-6 bg-gray-100 min-h-screen mt-10">
                    <h1 className="text-3xl font-bold mb-6">Kanban Board</h1>

                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Column title="To Do" col="todo" tasks={tasks.todo} />
                            <Column title="In Progress" col="progress" tasks={tasks.progress} />
                            <Column title="Done" col="done" tasks={tasks.done} />
                        </div>
                    </DndContext>
                </div>
            </main>
        </div>
    );
}

export default KanbanBoard;

/* ---------------- COLUMN ---------------- */

type ColumnProps = {
    title: string;
    tasks: TaskItem[];
    col: ColumnType;
};

function Column({ title, col, tasks }: ColumnProps) {
    return (
        <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-bold text-lg mb-4">{title}</h2>

            <SortableContext
                items={tasks.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} col={col} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
}

/* ---------------- TASK CARD ---------------- */

type TaskCardProps = {
    task: TaskItem;
    col: ColumnType;
};

function TaskCard({ task, col }: TaskCardProps) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: task.id,
            data: { col },
        });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-gray-100 p-3 rounded-lg shadow cursor-grab active:cursor-grabbing hover:bg-gray-200 transition"
        >
            {task.title}
        </div>
    );
}