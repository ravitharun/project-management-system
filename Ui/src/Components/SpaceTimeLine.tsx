import { useContext } from "react";
import {
  CalendarDays,
  ChevronDown,
  Filter,
  Plus,
  Search,
  User,
  CheckCircle2,
  Circle,
  Milestone,
  Flag,
  GitBranch,
  MoreHorizontal,
} from "lucide-react";

import bgthemeContext from "../Context/ThemeContext";

function SpaceTimeLine() {
  const context = useContext(bgthemeContext);
  const { theme }: any = context;

  const istheme = theme === "Dark";

  return (
    <div
      className={`min-h-screen p-6 transition-colors ${
        istheme
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
            className={`text-2xl font-semibold ${
              istheme ? "text-white" : "text-gray-900"
            }`}
          >
            Timeline
          </h1>

          <p
            className={`mt-1 text-sm ${
              istheme ? "text-gray-400" : "text-gray-500"
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
        className={`mb-5 rounded-xl border p-3 ${
          istheme
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
              className={`w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none ${
                istheme
                  ? "border-gray-700 bg-gray-950 text-white placeholder:text-gray-500"
                  : "border-gray-200 bg-gray-50 text-gray-900"
              }`}
            />

          </div>


          {/* Filters */}

          <div className="flex flex-wrap items-center gap-2">

            <button
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                istheme
                  ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <User size={15} />
              Assignee
              <ChevronDown size={14} />
            </button>

            <button
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                istheme
                  ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Filter size={15} />
              Filter
            </button>

            <button
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                istheme
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

      <div
        className={`overflow-hidden rounded-xl border ${
          istheme
            ? "border-gray-800 bg-gray-900"
            : "border-gray-200 bg-white"
        }`}
      >

        {/* Timeline Header */}

        <div className="flex border-b">

          {/* Left task area */}

          <div
            className={`w-72 shrink-0 border-r p-4 ${
              istheme ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <span className="text-sm font-semibold">
              Work Items
            </span>
          </div>


          {/* Date area */}

          <div className="min-w-[850px] flex-1">

            <div className="grid grid-cols-4">

              {[
                "Aug 18 - Aug 24",
                "Aug 25 - Aug 31",
                "Sep 1 - Sep 7",
                "Sep 8 - Sep 14",
              ].map((date) => (

                <div
                  key={date}
                  className={`border-r p-4 text-center text-xs font-medium ${
                    istheme
                      ? "border-gray-800 text-gray-400"
                      : "border-gray-200 text-gray-500"
                  }`}
                >
                  {date}
                </div>

              ))}

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* PROJECT GROUP */}
        {/* ================================================= */}

        <div className="flex border-b">

          {/* Task names */}

          <div
            className={`w-72 shrink-0 border-r ${
              istheme ? "border-gray-800" : "border-gray-200"
            }`}
          >

            <div className="flex items-center gap-2 border-b p-4">

              <ChevronDown size={15} />

              <span className="font-medium">
                Authentication
              </span>

            </div>


            <div
              className={`border-b p-4 pl-10 text-sm ${
                istheme ? "border-gray-800" : "border-gray-100"
              }`}
            >
              Login API
            </div>


            <div
              className={`border-b p-4 pl-10 text-sm ${
                istheme ? "border-gray-800" : "border-gray-100"
              }`}
            >
              JWT Integration
            </div>


            <div className="p-4 pl-10 text-sm">
              Password Reset
            </div>

          </div>


          {/* Timeline bars */}

          <div className="relative min-w-[850px] flex-1">

            {/* Vertical grid */}

            <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">

              <div
                className={`border-r ${
                  istheme ? "border-gray-800" : "border-gray-100"
                }`}
              />

              <div
                className={`border-r ${
                  istheme ? "border-gray-800" : "border-gray-100"
                }`}
              />

              <div
                className={`border-r ${
                  istheme ? "border-gray-800" : "border-gray-100"
                }`}
              />

              <div />

            </div>


            {/* Group row */}

            <div className="h-[53px] border-b" />


            {/* Login API */}

            <div
              className={`relative h-[53px] border-b ${
                istheme ? "border-gray-800" : "border-gray-100"
              }`}
            >

              <div className="absolute left-[8%] top-4 h-6 w-[25%] rounded-md bg-gray-800 px-3 text-xs leading-6 text-white shadow-sm">
                Login API
              </div>

            </div>


            {/* JWT */}

            <div
              className={`relative h-[53px] border-b ${
                istheme ? "border-gray-800" : "border-gray-100"
              }`}
            >

              <div className="absolute left-[28%] top-4 h-6 w-[32%] rounded-md bg-gray-600 px-3 text-xs leading-6 text-white shadow-sm">
                JWT Integration
              </div>

            </div>


            {/* Password */}

            <div className="relative h-[53px]">

              <div className="absolute left-[55%] top-4 h-6 w-[28%] rounded-md bg-gray-400 px-3 text-xs leading-6 text-gray-900 shadow-sm">
                Password Reset
              </div>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* DASHBOARD */}
        {/* ================================================= */}

        <div className="flex border-b">

          <div
            className={`w-72 shrink-0 border-r ${
              istheme ? "border-gray-800" : "border-gray-200"
            }`}
          >

            <div className="flex items-center gap-2 border-b p-4">

              <ChevronDown size={15} />

              <span className="font-medium">
                Dashboard
              </span>

            </div>

            <div
              className={`border-b p-4 pl-10 text-sm ${
                istheme ? "border-gray-800" : "border-gray-100"
              }`}
            >
              Dashboard UI
            </div>

            <div className="p-4 pl-10 text-sm">
              Dashboard API
            </div>

          </div>


          <div className="relative min-w-[850px] flex-1">

            <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">

              <div
                className={`border-r ${
                  istheme ? "border-gray-800" : "border-gray-100"
                }`}
              />

              <div
                className={`border-r ${
                  istheme ? "border-gray-800" : "border-gray-100"
                }`}
              />

              <div
                className={`border-r ${
                  istheme ? "border-gray-800" : "border-gray-100"
                }`}
              />

              <div />

            </div>


            <div className="h-[53px] border-b" />


            <div
              className={`relative h-[53px] border-b ${
                istheme ? "border-gray-800" : "border-gray-100"
              }`}
            >

              <div className="absolute left-[35%] top-4 h-6 w-[30%] rounded-md bg-gray-700 px-3 text-xs leading-6 text-white">
                Dashboard UI
              </div>

            </div>


            <div className="relative h-[53px]">

              <div className="absolute left-[55%] top-4 h-6 w-[35%] rounded-md bg-gray-500 px-3 text-xs leading-6 text-white">
                Dashboard API
              </div>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* MILESTONE */}
        {/* ================================================= */}

        <div className="flex">

          <div
            className={`w-72 shrink-0 border-r p-4 ${
              istheme ? "border-gray-800" : "border-gray-200"
            }`}
          >

            <div className="flex items-center gap-2">

              <Milestone size={16} />

              <span className="font-medium text-sm">
                Release v1.1
              </span>

            </div>

          </div>


          <div className="relative min-w-[850px] flex-1 h-[60px]">

            <div className="absolute inset-0 grid grid-cols-4">

              <div
                className={`border-r ${
                  istheme ? "border-gray-800" : "border-gray-100"
                }`}
              />

              <div
                className={`border-r ${
                  istheme ? "border-gray-800" : "border-gray-100"
                }`}
              />

              <div
                className={`border-r ${
                  istheme ? "border-gray-800" : "border-gray-100"
                }`}
              />

              <div />

            </div>


            <div className="absolute left-[73%] top-5">

              <div className="flex items-center gap-2">

                <Flag size={17} />

                <span className="text-xs font-medium">
                  Release v1.1
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* LEGEND */}
      {/* ================================================= */}

      <div
        className={`mt-4 flex flex-wrap items-center gap-5 text-xs ${
          istheme ? "text-gray-400" : "text-gray-500"
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