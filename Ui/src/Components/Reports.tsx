import { useContext } from "react";
import {
  BarChart3,
  CheckCircle2,
  Clock3,
  CircleAlert,
  Download,
  Filter,
  ListTodo,
  MoreHorizontal,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import bgthemeContext from "../Context/ThemeContext";

function Reports() {
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

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1
            className={`text-2xl font-semibold ${
              istheme ? "text-white" : "text-gray-900"
            }`}
          >
            Reports
          </h1>

          <p
            className={`mt-1 text-sm ${
              istheme ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Track project performance and team progress
          </p>
        </div>

        <div className="flex items-center gap-2">

          <button
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
              istheme
                ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                : "border-gray-200 text-gray-700 hover:bg-white"
            }`}
          >
            <Filter size={16} />
            Filter
          </button>

          <button
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Download size={16} />
            Export
          </button>

        </div>

      </div>


      {/* ================================================= */}
      {/* OVERVIEW CARDS */}
      {/* ================================================= */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total Tasks */}

        <div
          className={`rounded-xl border p-5 ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Tasks
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                128
              </h2>

              <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                <TrendingUp size={13} />
                12% this week
              </p>

            </div>

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                istheme ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <ListTodo size={20} />
            </div>

          </div>

        </div>


        {/* Completed */}

        <div
          className={`rounded-xl border p-5 ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Completed
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                84
              </h2>

              <p className="mt-1 text-xs text-green-600">
                66% completion
              </p>

            </div>

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                istheme ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <CheckCircle2 size={20} />
            </div>

          </div>

        </div>


        {/* In Progress */}

        <div
          className={`rounded-xl border p-5 ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm text-gray-500">
                In Progress
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                29
              </h2>

              <p className="mt-1 text-xs text-blue-600">
                Active tasks
              </p>

            </div>

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                istheme ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <Clock3 size={20} />
            </div>

          </div>

        </div>


        {/* Blocked */}

        <div
          className={`rounded-xl border p-5 ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Blocked
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                15
              </h2>

              <p className="mt-1 text-xs text-red-500">
                Needs attention
              </p>

            </div>

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                istheme ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <CircleAlert size={20} />
            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* MAIN GRID */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* ================================================= */}
        {/* TASK PROGRESS */}
        {/* ================================================= */}

        <div
          className={`xl:col-span-2 rounded-xl border p-5 ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="font-semibold">
                Task Progress
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Tasks completed over the last 6 weeks
              </p>

            </div>

            <button className="text-gray-400">
              <MoreHorizontal size={19} />
            </button>

          </div>


          {/* Fake Chart */}

          <div className="flex h-64 items-end justify-between gap-4">

            {[
              { week: "W1", value: 45 },
              { week: "W2", value: 60 },
              { week: "W3", value: 52 },
              { week: "W4", value: 75 },
              { week: "W5", value: 68 },
              { week: "W6", value: 88 },
            ].map((item) => (

              <div
                key={item.week}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >

                <span className="text-xs text-gray-500">
                  {item.value}
                </span>

                <div
                  className={`w-full max-w-[45px] rounded-t-md ${
                    istheme ? "bg-gray-500" : "bg-gray-800"
                  }`}
                  style={{
                    height: `${item.value}%`,
                  }}
                />

                <span className="text-xs text-gray-400">
                  {item.week}
                </span>

              </div>

            ))}

          </div>

        </div>


        {/* ================================================= */}
        {/* STATUS */}
        {/* ================================================= */}

        <div
          className={`rounded-xl border p-5 ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >

          <div className="mb-6">

            <h2 className="font-semibold">
              Task Status
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Current distribution
            </p>

          </div>


          <div className="space-y-5">

            {/* Todo */}

            <div>

              <div className="mb-2 flex justify-between">

                <span className="text-sm">
                  To Do
                </span>

                <span className="text-xs text-gray-500">
                  32
                </span>

              </div>

              <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">

                <div className="h-2 w-[35%] rounded-full bg-gray-400" />

              </div>

            </div>


            {/* Progress */}

            <div>

              <div className="mb-2 flex justify-between">

                <span className="text-sm">
                  In Progress
                </span>

                <span className="text-xs text-gray-500">
                  29
                </span>

              </div>

              <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">

                <div className="h-2 w-[28%] rounded-full bg-gray-600" />

              </div>

            </div>


            {/* Review */}

            <div>

              <div className="mb-2 flex justify-between">

                <span className="text-sm">
                  Review
                </span>

                <span className="text-xs text-gray-500">
                  18
                </span>

              </div>

              <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">

                <div className="h-2 w-[20%] rounded-full bg-gray-500" />

              </div>

            </div>


            {/* Done */}

            <div>

              <div className="mb-2 flex justify-between">

                <span className="text-sm">
                  Done
                </span>

                <span className="text-xs text-gray-500">
                  49
                </span>

              </div>

              <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">

                <div className="h-2 w-[55%] rounded-full bg-gray-900 dark:bg-gray-300" />

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* SECOND ROW */}
      {/* ================================================= */}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">


        {/* ================================================= */}
        {/* TEAM WORKLOAD */}
        {/* ================================================= */}

        <div
          className={`rounded-xl border p-5 ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="font-semibold">
                Team Workload
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Tasks assigned to team members
              </p>

            </div>

            <Users size={19} className="text-gray-400" />

          </div>


          <div className="space-y-6">

            {[
              {
                name: "Ravi",
                tasks: 18,
                progress: 80,
              },
              {
                name: "Tharun",
                tasks: 14,
                progress: 65,
              },
              {
                name: "Arun",
                tasks: 9,
                progress: 45,
              },
            ].map((member) => (

              <div key={member.name}>

                <div className="mb-2 flex justify-between">

                  <div className="flex items-center gap-2">

                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                        istheme
                          ? "bg-gray-800"
                          : "bg-gray-100"
                      }`}
                    >
                      {member.name.charAt(0)}
                    </div>

                    <span className="text-sm font-medium">
                      {member.name}
                    </span>

                  </div>

                  <span className="text-xs text-gray-500">
                    {member.tasks} tasks
                  </span>

                </div>

                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">

                  <div
                    className={`h-2 rounded-full ${
                      istheme ? "bg-gray-400" : "bg-gray-800"
                    }`}
                    style={{
                      width: `${member.progress}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* ================================================= */}
        {/* PRIORITY */}
        {/* ================================================= */}

        <div
          className={`rounded-xl border p-5 ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >

          <div className="mb-6">

            <h2 className="font-semibold">
              Priority Distribution
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Tasks by priority
            </p>

          </div>


          <div className="space-y-5">

            {[
              {
                name: "Highest",
                count: 12,
                width: 30,
              },
              {
                name: "High",
                count: 28,
                width: 65,
              },
              {
                name: "Medium",
                count: 52,
                width: 85,
              },
              {
                name: "Low",
                count: 36,
                width: 55,
              },
            ].map((priority) => (

              <div key={priority.name}>

                <div className="mb-2 flex justify-between">

                  <span className="text-sm">
                    {priority.name}
                  </span>

                  <span className="text-xs text-gray-500">
                    {priority.count}
                  </span>

                </div>

                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">

                  <div
                    className={`h-2 rounded-full ${
                      istheme ? "bg-gray-500" : "bg-gray-700"
                    }`}
                    style={{
                      width: `${priority.width}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* SPRINT SUMMARY */}
      {/* ================================================= */}

      <div
        className={`mt-6 rounded-xl border p-5 ${
          istheme
            ? "border-gray-800 bg-gray-900"
            : "border-gray-200 bg-white"
        }`}
      >

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="font-semibold">
              Sprint 12
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Sprint progress · Aug 18 - Sep 1
            </p>

          </div>

          <BarChart3
            size={20}
            className="text-gray-400"
          />

        </div>


        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          <div>

            <p className="text-sm text-gray-500">
              Completed
            </p>

            <p className="mt-2 text-2xl font-semibold">
              28
            </p>

          </div>


          <div>

            <p className="text-sm text-gray-500">
              Remaining
            </p>

            <p className="mt-2 text-2xl font-semibold">
              12
            </p>

          </div>


          <div>

            <p className="text-sm text-gray-500">
              Progress
            </p>

            <p className="mt-2 text-2xl font-semibold">
              70%
            </p>

          </div>

        </div>


        <div className="mt-6 h-2 rounded-full bg-gray-100 dark:bg-gray-800">

          <div className="h-2 w-[70%] rounded-full bg-gray-800 dark:bg-gray-300" />

        </div>

      </div>

    </div>
  );
}

export default Reports;