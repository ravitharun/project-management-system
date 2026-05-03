import { useState } from "react";
import {
    DndContext,
    closestCenter,
} from "@dnd-kit/core";

import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Sidebar from "../Components/Navbar";

/* ---------------- INITIAL DATA ---------------- */

const initialData = {
    todo: [
        { id: "1", title: "Build Navbar UI" },
        { id: "2", title: "Fix Login Bug" },
    ],
    progress: [
        { id: "3", title: "API Integration" },
    ],
    done: [
        { id: "4", title: "Setup Project" },
    ],
};

/* ---------------- MAIN COMPONENT ---------------- */

function KanbanBoard() {
    const [tasks, setTasks] = useState(initialData);

    function handleDragEnd(event) {
        const { active, over } = event;
        if (!over) return;

        const sourceCol = active.data.current.col;
        const destCol = over.data.current.col;

        const sourceItems = [...tasks[sourceCol]];
        const destItems = [...tasks[destCol]];

        const draggedItem = sourceItems.find((t) => t.id === active.id);

        // remove from source
        const newSource = sourceItems.filter((t) => t.id !== active.id);

        // add to destination
        destItems.push(draggedItem);

        setTasks({
            ...tasks,
            [sourceCol]: newSource,
            [destCol]: destItems,
        });
    }

    return (
        <>
            <div className="flex h-screen bg-gray-100 ">

                {/* SIDEBAR */}
                <Sidebar page="Tasks" />

                {/* MAIN CONTENT */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="p-6 bg-gray-100 min-h-screen mt-10">

                        {/* HEADER */}
                        <h1 className="text-3xl font-bold mb-6">
                            Kanban Board
                        </h1>

                        <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                {/* TODO */}
                                <Column title="To Do" col="todo" tasks={tasks.todo} />

                                {/* IN PROGRESS */}
                                <Column title="In Progress" col="progress" tasks={tasks.progress} />

                                {/* DONE */}
                                <Column title="Done" col="done" tasks={tasks.done} />

                            </div>

                        </DndContext>
                    </div>
                </main>
            </div>

        </>
    );
}

export default KanbanBoard;


function Column({ title, tasks, col }) {
    console.log({ title, tasks, col })
    return (
        <>

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
        </>
    );
}

/* ---------------- TASK CARD ---------------- */

function TaskCard({ task, col }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: task.id,
        data: { col },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <>


            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="bg-gray-100 p-3 rounded-lg shadow cursor-grab active:cursor-grabbing hover:bg-gray-200 transition"
            >
                {task.title}s
            </div>
        </>
    );
}