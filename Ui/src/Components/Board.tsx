import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import TaskForm from "./Task/CreateTask/TaskForm";

export default function Board({ theme, work, spacetasks, ismaxAndMin }: any) {
    console.log(spacetasks, 'spacetasks')


    const [CreateTask, setCreateTask] = useState<boolean>(false)

    const [data, setData] = useState<any>({
        tasks: {},
        columns: {},
        columnOrder: []
    });




    const [Hoverid, sethoverid] = useState<string>("")


    // Converting backend → UI format safely
    useEffect(() => {
        if (!work?.columns) return;

        const columnsArray = work.columns;

        const columns: any = {};
        const columnOrder: string[] = [];

        columnsArray.forEach((col: any) => {
            columns[col.id] = {
                id: col.id,
                title: col.name,
                taskIds: col.taskIds || []
            };

            columnOrder.push(col.id);
        });

        setData({
            tasks: work.tasks || {},
            columns,
            columnOrder
        });

    }, [work]);

    const onDragEnd = (result: any) => {
        const { source, destination } = result;
        if (!destination) return;

        // SAME COLUMN
        if (source.droppableId === destination.droppableId) {
            const column = data.columns[source.droppableId];
            const newTaskIds = Array.from(column.taskIds);

            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, result.draggableId);

            const newColumn = {
                ...column,
                taskIds: newTaskIds,
            };

            setData((prev: any) => ({
                ...prev,
                columns: {
                    ...prev.columns,
                    [newColumn.id]: newColumn,
                },
            }));

            return;
        }

        // MOVE BETWEEN COLUMNS
        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, result.draggableId);

        setData((prev: any) => ({
            ...prev,
            columns: {
                ...prev.columns,
                [start.id]: { ...start, taskIds: startTaskIds },
                [finish.id]: { ...finish, taskIds: finishTaskIds },
            },
        }));
    };

    return (

        <>


            <DragDropContext onDragEnd={onDragEnd}>
                <div
                    className={`
        flex gap-5 p-6 min-h-screen w-full
        overflow-x-auto
        scroll-smooth

            transition-all duration-300

        `}
                    style={{
                        scrollbarWidth: "thin",
                    }}
                >

                    {/* EMPTY STATE */}
                    {data.columnOrder?.length === 0 ? (
                        <div className="text-gray-500 p-6">
                            Loading board...
                        </div>
                    ) : (
                        data.columnOrder.map((colId: any) => {
                            const column = data.columns[colId];
                            if (!column) return null;

                            const tasks = column.taskIds.map(
                                (id: any) => data.tasks[id]
                            );

                            return (
                                <Droppable droppableId={column.id} key={column.id}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={`
                    min-w-[20rem]
                    h-[25vh]
                    flex flex-col
                    p-4 rounded-xl

                    backdrop-blur-xl border
                    transition-all duration-300

                    overflow-hidden

                    ${theme === "Dark"
                                                    ? "bg-[#0F172A] border-gray-800 text-white"
                                                    : "bg-white border-gray-200 text-gray-900"
                                                }
                `}

                                            onMouseEnter={() => sethoverid(column.id)}
                                            onMouseLeave={() => sethoverid("backlog")}
                                        >
                                            {/* HEADER */}
                                            <h2 className="font-mono mb-3 ">
                                                {column.title}
                                            </h2>
                                            {/* SCROLLABLE TASK AREA */}
                                            <div className="flex-1 overflow-y-auto pr-1 space-y-3">

                                                {/* EMPTY STATE */}
                                                {tasks.length === 0 ? (
                                                    Hoverid === column.id && (
                                                        <div className="flex items-center justify-center h-full">
                                                            <button
                                                                className="
                                        px-4 py-2 rounded-xl text-sm font-medium
                                        transition-all duration-200
                                        bg-blue-600 text-white
                                        hover:bg-blue-700
                                        active:scale-95
                                        shadow-md

                                    "

                                                                onClick={() => setCreateTask(true)}
                                                            >
                                                                + Create Task
                                                            </button>
                                                        </div>
                                                    )
                                                ) : (
                                                    tasks.map((task: any, index: number) => (
                                                        <Draggable
                                                            key={task.id}
                                                            draggableId={task.id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className={`
                                            p-3 rounded-xl cursor-pointer
                                            transition-all duration-200

                                            ${theme === "Dark"
                                                                            ? "bg-white/10 hover:bg-white/20"
                                                                            : "bg-white hover:bg-gray-100"
                                                                        }

                                            ${snapshot.isDragging
                                                                            ? "scale-105 shadow-xl"
                                                                            : "shadow-sm"
                                                                        }
                                        `}
                                                                >
                                                                    {task?.content}
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))
                                                )}

                                                {provided.placeholder}
                                            </div>
                                        </div>
                                    )}
                                </Droppable>
                            );
                        })
                    )}
                </div>
            </DragDropContext>
            {CreateTask

                && <TaskForm onclose={() => setCreateTask(false)}  maximizeParent={ismaxAndMin}  projectid={work._id} CreateTask={CreateTask}

                ></TaskForm>
            }
        </>
    );
}