    
import { useContext, useRef, useState } from "react";
import {
    CalendarDays,
    Filter,
    MoreHorizontal,
    Plus,
    Search,
} from "lucide-react";

import {
    ReactGanttChart,
    type GanttDependencyChange,
    type GanttHandle,
    type Task,
    type TaskDependency,
} from "@jaeungkim/gantt-chart";

import "@jaeungkim/gantt-chart/style.css";

import bgthemeContext from "../Context/ThemeContext";

function ProjectTimeline() {
    const { theme }: any = useContext(bgthemeContext);

    const ganttRef = useRef<GanttHandle>(null);

    // Controls which hierarchy items are collapsed
    const [collapsedIds, setCollapsedIds] = useState<string[]>([]);
const initialTasks: Task[] = [
    // =========================
    // PROJECT 1
    // =========================
    {
        id: "project-1",
        name: "Website Project",
        startDate: "2026-09-01T00:00:00Z",
        endDate: "2026-09-30T00:00:00Z",
        parentId: null,
        sequence: "1",
        dependencies: [] as TaskDependency[],
    },
    {
        id: "design-1",
        name: "Design",
        startDate: "2026-09-01T00:00:00Z",
        endDate: "2026-09-05T00:00:00Z",
        parentId: "project-1",
        sequence: "2",
        dependencies: [] as TaskDependency[],
    },
    {
        id: "build-1",
        name: "Build",
        startDate: "2026-09-06T00:00:00Z",
        endDate: "2026-09-12T00:00:00Z",
        parentId: "project-1",
        sequence: "3",
        dependencies: [] as TaskDependency[],
    },
    {
        id: "testing-1",
        name: "Testing",
        startDate: "2026-09-13T00:00:00Z",
        endDate: "2026-09-18T00:00:00Z",
        parentId: "project-1",
        sequence: "4",
        dependencies: [] as TaskDependency[],
    },

    // =========================
    // PROJECT 2
    // =========================
    {
        id: "project-2",
        name: "Mobile App Project",
        startDate: "2026-09-05T00:00:00Z",
        endDate: "2026-10-10T00:00:00Z",
        parentId: null,
        sequence: "5",
        dependencies: [] as TaskDependency[],
    },
    {
        id: "mobile-ui",
        name: "UI Design",
        startDate: "2026-09-05T00:00:00Z",
        endDate: "2026-09-12T00:00:00Z",
        parentId: "project-2",
        sequence: "6",
        dependencies: [] as TaskDependency[],
    },
    {
        id: "mobile-dev",
        name: "Development",
        startDate: "2026-09-13T00:00:00Z",
        endDate: "2026-09-28T00:00:00Z",
        parentId: "project-2",
        sequence: "7",
        dependencies: [] as TaskDependency[],
    },
    {
        id: "mobile-testing",
        name: "Testing",
        startDate: "2026-09-29T00:00:00Z",
        endDate: "2026-10-05T00:00:00Z",
        parentId: "project-2",
        sequence: "8",
        dependencies: [] as TaskDependency[],
    },
    {
        id: "mobile-release",
        name: "Release",
        startDate: "2026-10-06T00:00:00Z",
        endDate: "2026-10-10T00:00:00Z",
        parentId: "project-2",
        sequence: "9",
        dependencies: [] as TaskDependency[],
    },

    // =========================
    // PROJECT 3
    // =========================
    {
        id: "project-3",
        name: "Backend API Project",
        startDate: "2026-09-10T00:00:00Z",
        endDate: "2026-10-20T00:00:00Z",
        parentId: null,
        sequence: "10",
        dependencies: [] as TaskDependency[],
    },
    {
        id: "api-design",
        name: "API Design",
        startDate: "2026-09-10T00:00:00Z",
        endDate: "2026-09-15T00:00:00Z",
        parentId: "project-3",
        sequence: "11",
        dependencies: [] as TaskDependency[],
    },
    {
        id: "api-development",
        name: "API Development",
        startDate: "2026-09-16T00:00:00Z",
        endDate: "2026-10-05T00:00:00Z",
        parentId: "project-3",
        sequence: "12",
        dependencies: [] as TaskDependency[],
    },
    {
        id: "api-testing",
        name: "API Testing",
        startDate: "2026-10-06T00:00:00Z",
        endDate: "2026-10-12T00:00:00Z",
        parentId: "project-3",
        sequence: "13",
        dependencies: [] as TaskDependency[],
    },
    {
        id: "api-deployment",
        name: "Deployment",
        startDate: "2026-10-13T00:00:00Z",
        endDate: "2026-10-20T00:00:00Z",
        parentId: "project-3",
        sequence: "14",
        dependencies: [] as TaskDependency[],
    },
];

    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const handleTasksChange = (updatedTasks: Task[]) => {
        console.log("Tasks changed:", updatedTasks);
        setTasks(updatedTasks);
    };

    return (
        <>
            <div
                className={`w-full p-4 sm:p-6 ${theme === "Dark"
                        ? "bg-slate-950 text-white"
                        : "bg-white text-slate-900"
                    }`}
            >
                {/* Timeline Card */}
                <div
                    className={`overflow-hidden rounded-xl border shadow-sm ${theme === "Dark"
                            ? "border-slate-700 bg-slate-900"
                            : "border-slate-200 bg-white"
                        }`}
                >
                    {/* Toolbar */}
                    <div
                        className={`flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 ${theme === "Dark"
                                ? "border-slate-700"
                                : "border-slate-200"
                            }`}
                    >
                        {/* Title */}
                        <div className="flex items-center gap-3">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-lg ${theme === "Dark"
                                        ? "bg-blue-500/15 text-blue-400"
                                        : "bg-blue-100 text-blue-600"
                                    }`}
                            >
                                <CalendarDays size={20} />
                            </div>

                            <div>
                                <h2
                                    className={`text-lg font-semibold ${theme === "Dark"
                                            ? "text-white"
                                            : "text-slate-900"
                                        }`}
                                >
                                    Project Timeline
                                </h2>

                                <p
                                    className={`text-xs ${theme === "Dark"
                                            ? "text-slate-400"
                                            : "text-slate-500"
                                        }`}
                                >
                                    September 2026 — October 2026
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {/* Search */}
                            <button
                                className={`flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition ${theme === "Dark"
                                        ? "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
                                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                <Search size={15} />
                                <span className="hidden sm:inline">
                                    Search
                                </span>
                            </button>

                            {/* Filter */}
                            <button
                                className={`flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition ${theme === "Dark"
                                        ? "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
                                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                <Filter size={15} />
                                <span className="hidden sm:inline">
                                    Filter
                                </span>
                            </button>

                            {/* Add Task */}
                            <button className="flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white transition hover:bg-blue-700 sm:px-4">
                                <Plus size={16} />
                                <span className="hidden sm:inline">
                                    Add Task
                                </span>
                            </button>

                            {/* More */}
                            <button
                                className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${theme === "Dark"
                                        ? "border-slate-700 text-slate-400 hover:bg-slate-800"
                                        : "border-slate-200 text-slate-500 hover:bg-slate-50"
                                    }`}
                            >
                                <MoreHorizontal size={17} />
                            </button>
                        </div>
                    </div>

                    {/* Gantt Chart */}
                    <div className="w-full overflow-x-auto p-3 sm:p-5">
                        <div
                            className={`min-w-[750px] overflow-hidden rounded-lg border ${theme === "Dark"
                                    ? "border-slate-700"
                                    : "border-slate-200"
                                }`}
                        >
                            <ReactGanttChart
                                ref={ganttRef}

                                /* =========================
                                   HIERARCHY
                                ========================== */

                                showTaskList={true}
                                showRowNumbers={true}

                                hierarchy={true}

                                collapsedIds={collapsedIds}
                                onCollapsedChange={setCollapsedIds}

                                /* =========================
                                   TASKS
                                ========================== */

                                tasks={tasks}
                                onTasksChange={handleTasksChange}

                                height={420}
                                width="100%"

                                theme={
                                    theme === "Dark"
                                        ? "dark"
                                        : "light"
                                }

                                /* =========================
                                   CALENDAR
                                ========================== */

                                holidays={[
                                    "2026-09-10",
                                    "2026-09-21",
                                    "2026-10-02",
                                ]}

                                showNonWorkingDays={true}

                                workingWeekdays={[
                                    1,
                                    2,
                                    3,
                                    4,
                                    5,
                                ]}

                                workingCalendar={true}

                                /* =========================
                                   READ ONLY
                                ========================== */

                                readOnly={true}

                                /* =========================
                                   DEPENDENCIES
                                ========================== */

                                allowLinkCreate={true}
                                allowLinkDelete={true}

                                onDependencyCreate={(
                                    change: GanttDependencyChange
                                ) => {
                                    console.log(
                                        "Dependency created:",
                                        change
                                    );

                                    return true;
                                }}

                                onDependencyDelete={(
                                    change: GanttDependencyChange
                                ) => {
                                    console.log(
                                        "Dependency deleted:",
                                        change
                                    );

                                    return window.confirm(
                                        `Unlink ${change.predecessorId} → ${change.successorId}?`
                                    );
                                }}

                                /* =========================
                                   TASK SELECTION
                                ========================== */

                                selectable={true}

                                onTaskSelect={(task) => {
                                    console.log(
                                        "Selected task:",
                                        task
                                    );
                                }}

                                /* =========================
                                   CLICK
                                ========================== */

                                onTaskClick={(task) => {
                                    console.log(
                                        "Clicked task:",
                                        task
                                    );
                                }}

                                onTaskDoubleClick={(task) => {
                                    console.log(
                                        "Double clicked task:",
                                        task
                                    );
                                }}

                                /* =========================
                                   DETAIL PANEL
                                ========================== */

                                showDetail={true}

                                onDetailChange={(task) => {
                                    console.log(
                                        "Detail changed:",
                                        task
                                    );
                                }}

                                /* =========================
                                   ZOOM / SCROLL
                                ========================== */

                                zoomOnWheel={true}
                                autoScrollOnDrag={true}
                                infiniteScroll={true}
                            />
                        </div>
                    </div>

                    {/* Bottom Info */}
                    <div
                        className={`flex flex-wrap items-center gap-4 border-t px-4 py-3 sm:px-5 ${theme === "Dark"
                                ? "border-slate-700"
                                : "border-slate-200"
                            }`}
                    >
                        <span
                            className={`text-xs font-semibold ${theme === "Dark"
                                    ? "text-slate-300"
                                    : "text-slate-600"
                                }`}
                        >
                            Dependencies
                        </span>

                        <span
                            className={`flex items-center gap-1.5 text-xs ${theme === "Dark"
                                    ? "text-slate-400"
                                    : "text-slate-500"
                                }`}
                        >
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                            Finish → Start
                        </span>

                        <span
                            className={`ml-auto text-xs ${theme === "Dark"
                                    ? "text-slate-500"
                                    : "text-slate-400"
                                }`}
                        >
                            Drag tasks to create dependencies
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectTimeline;
