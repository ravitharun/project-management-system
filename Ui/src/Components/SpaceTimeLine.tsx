import { useContext } from "react";
import {
  CalendarDays,
  ChevronDown,
  Filter,
  Plus,
  Search,
  User,
  Milestone,
  
} from "lucide-react";

import bgthemeContext from "../Context/ThemeContext";
import ProjectTimeline from "./ProjectTimeline";

function SpaceTimeLine() {
  const context = useContext(bgthemeContext);
  const { theme }: any = context;

  const istheme = theme === "Dark";




  return (
    <div
      className={`min-h-screen p-6 transition-colors ${istheme
        ? "bg-gray-950 text-gray-100"
        : "bg-gray-50 text-gray-900"
        }`}
    >
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1
            className={`text-2xl font-semibold ${istheme ? "text-white" : "text-gray-900"
              }`}
          >
            Timeline

          </h1>

          <p
            className={`mt-1 text-sm ${istheme ? "text-gray-400" : "text-gray-500"
              }`}
          >
            Plan and track your project schedule
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800">
          <Plus size={17} />
          Add Task
        </button>

      </div>


      {/* ================================================= */}
      {/* TOOLBAR */}
      {/* ================================================= */}

      <div
        className={`mb-5 rounded-xl border p-3 ${istheme
          ? "border-gray-800 bg-gray-900"
          : "border-gray-200 bg-white"
          }`}
      >

        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">

          {/* Search */}

          <div className="relative w-full xl:w-80">

            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search tasks..."
              className={`w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none ${istheme
                ? "border-gray-700 bg-gray-950 text-white placeholder:text-gray-500"
                : "border-gray-200 bg-gray-50 text-gray-900"
                }`}
            />

          </div>


          {/* Filters */}

          <div className="flex flex-wrap items-center gap-2">

            <button
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${istheme
                ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
            >
              <User size={15} />
              Assignee
              <ChevronDown size={14} />
            </button>

            <button
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${istheme
                ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
            >
              <Filter size={15} />
              Filter
            </button>

            <button
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${istheme
                ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
            >
              <CalendarDays size={15} />
              Weeks
              <ChevronDown size={14} />
            </button>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* TIMELINE */}
      {/* ================================================= */}
<ProjectTimeline></ProjectTimeline>


      {/* ================================================= */}
      {/* LEGEND */}
      {/* ================================================= */}

      <div
        className={`mt-4 flex flex-wrap items-center gap-5 text-xs ${istheme ? "text-gray-400" : "text-gray-500"
          }`}
      >

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-gray-800" />
          In Progress
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-gray-500" />
          Planned
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-gray-400" />
          Upcoming
        </div>

        <div className="flex items-center gap-2">
          <Milestone size={14} />
          Milestone
        </div>

      </div>

    </div>
  );
}

export default SpaceTimeLine; 