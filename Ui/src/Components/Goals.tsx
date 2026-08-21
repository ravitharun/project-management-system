import { useContext } from "react";
import {
  Plus,
  Target,
  CheckCircle2,
  Clock3,
  CircleAlert,
  TrendingUp,
  CalendarDays,
  User,
  MoreHorizontal,
  // ChevronRight,
} from "lucide-react";

import bgthemeContext from "../Context/ThemeContext";

function Goals() {
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
            Goals
          </h1>

          <p
            className={`mt-1 text-sm ${
              istheme ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Set objectives and track project progress
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800">
          <Plus size={17} />
          Create Goal
        </button>

      </div>


      {/* ================================================= */}
      {/* OVERVIEW */}
      {/* ================================================= */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Active */}

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
                Active Goals
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                6
              </h2>

            </div>

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                istheme ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <Target size={20} />
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
                3
              </h2>

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


        {/* At Risk */}

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
                At Risk
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                1
              </h2>

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


        {/* Overall Progress */}

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
                Overall Progress
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                68%
              </h2>

              <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                <TrendingUp size={13} />
                +8% this month
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* GOALS */}
      {/* ================================================= */}

      <div>

        <div className="mb-4 flex items-center justify-between">

          <div>
            <h2 className="text-lg font-semibold">
              Project Goals
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Track your team's objectives
            </p>
          </div>

        </div>


        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">


          {/* ================================================= */}
          {/* GOAL 1 */}
          {/* ================================================= */}

          <div
            className={`rounded-xl border p-5 transition hover:shadow-sm ${
              istheme
                ? "border-gray-800 bg-gray-900"
                : "border-gray-200 bg-white"
            }`}
          >

            <div className="flex items-start justify-between">

              <div className="flex gap-3">

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    istheme ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <Target size={20} />
                </div>

                <div>

                  <h3 className="font-semibold">
                    Improve Application Performance
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Optimize backend and API response times
                  </p>

                </div>

              </div>

              <button className="text-gray-400 hover:text-gray-700">
                <MoreHorizontal size={18} />
              </button>

            </div>


            {/* Progress */}

            <div className="mt-6">

              <div className="mb-2 flex justify-between">

                <span className="text-sm font-medium">
                  Progress
                </span>

                <span className="text-sm text-gray-500">
                  75%
                </span>

              </div>

              <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">

                <div className="h-2 w-[75%] rounded-full bg-gray-800 dark:bg-gray-300" />

              </div>

            </div>


            {/* Details */}

            <div className="mt-5 flex flex-wrap gap-4 text-xs text-gray-500">

              <div className="flex items-center gap-1.5">
                <User size={14} />
                Ravi
              </div>

              <div className="flex items-center gap-1.5">
                <CalendarDays size={14} />
                Sep 15, 2026
              </div>

              <div className="flex items-center gap-1.5 text-green-600">
                <CheckCircle2 size={14} />
                On Track
              </div>

            </div>


            {/* Key Results */}

            <div
              className={`mt-5 rounded-lg p-4 ${
                istheme ? "bg-gray-950" : "bg-gray-50"
              }`}
            >

              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Key Results
              </p>

              <div className="space-y-3">

                <div className="flex items-center justify-between">

                  <span className="text-sm">
                    API response time
                  </span>

                  <span className="text-xs text-gray-500">
                    180ms / 200ms
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-sm">
                    Cache hit rate
                  </span>

                  <span className="text-xs text-gray-500">
                    82% / 90%
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* GOAL 2 */}
          {/* ================================================= */}

          <div
            className={`rounded-xl border p-5 transition hover:shadow-sm ${
              istheme
                ? "border-gray-800 bg-gray-900"
                : "border-gray-200 bg-white"
            }`}
          >

            <div className="flex items-start justify-between">

              <div className="flex gap-3">

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    istheme ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <TrendingUp size={20} />
                </div>

                <div>

                  <h3 className="font-semibold">
                    Complete LMS Development
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Finish core LMS features before release
                  </p>

                </div>

              </div>

              <button className="text-gray-400">
                <MoreHorizontal size={18} />
              </button>

            </div>


            {/* Progress */}

            <div className="mt-6">

              <div className="mb-2 flex justify-between">

                <span className="text-sm font-medium">
                  Progress
                </span>

                <span className="text-sm text-gray-500">
                  48%
                </span>

              </div>

              <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">

                <div className="h-2 w-[48%] rounded-full bg-gray-600" />

              </div>

            </div>


            {/* Details */}

            <div className="mt-5 flex flex-wrap gap-4 text-xs text-gray-500">

              <div className="flex items-center gap-1.5">
                <User size={14} />
                Tharun
              </div>

              <div className="flex items-center gap-1.5">
                <CalendarDays size={14} />
                Oct 10, 2026
              </div>

              <div className="flex items-center gap-1.5 text-blue-600">
                <Clock3 size={14} />
                In Progress
              </div>

            </div>


            {/* Key Results */}

            <div
              className={`mt-5 rounded-lg p-4 ${
                istheme ? "bg-gray-950" : "bg-gray-50"
              }`}
            >

              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Key Results
              </p>

              <div className="space-y-3">

                <div className="flex items-center justify-between">

                  <span className="text-sm">
                    Course Management
                  </span>

                  <span className="text-xs text-gray-500">
                    80%
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-sm">
                    Online Tests
                  </span>

                  <span className="text-xs text-gray-500">
                    35%
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* GOAL 3 */}
          {/* ================================================= */}

          <div
            className={`rounded-xl border p-5 transition hover:shadow-sm ${
              istheme
                ? "border-gray-800 bg-gray-900"
                : "border-gray-200 bg-white"
            }`}
          >

            <div className="flex items-start justify-between">

              <div className="flex gap-3">

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    istheme ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <Target size={20} />
                </div>

                <div>

                  <h3 className="font-semibold">
                    Launch Version 2.0
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Prepare the next major product release
                  </p>

                </div>

              </div>

              <button className="text-gray-400">
                <MoreHorizontal size={18} />
              </button>

            </div>


            <div className="mt-6">

              <div className="mb-2 flex justify-between">

                <span className="text-sm font-medium">
                  Progress
                </span>

                <span className="text-sm text-gray-500">
                  25%
                </span>

              </div>

              <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">

                <div className="h-2 w-[25%] rounded-full bg-gray-500" />

              </div>

            </div>


            <div className="mt-5 flex flex-wrap gap-4 text-xs text-gray-500">

              <div className="flex items-center gap-1.5">
                <User size={14} />
                Arun
              </div>

              <div className="flex items-center gap-1.5">
                <CalendarDays size={14} />
                Nov 01, 2026
              </div>

              <div className="flex items-center gap-1.5 text-yellow-600">
                <CircleAlert size={14} />
                At Risk
              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* GOAL 4 */}
          {/* ================================================= */}

          <div
            className={`rounded-xl border p-5 transition hover:shadow-sm ${
              istheme
                ? "border-gray-800 bg-gray-900"
                : "border-gray-200 bg-white"
            }`}
          >

            <div className="flex items-start justify-between">

              <div className="flex gap-3">

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    istheme ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <CheckCircle2 size={20} />
                </div>

                <div>

                  <h3 className="font-semibold">
                    Improve Code Quality
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Increase test coverage and reduce bugs
                  </p>

                </div>

              </div>

              <button className="text-gray-400">
                <MoreHorizontal size={18} />
              </button>

            </div>


            <div className="mt-6">

              <div className="mb-2 flex justify-between">

                <span className="text-sm font-medium">
                  Progress
                </span>

                <span className="text-sm text-gray-500">
                  100%
                </span>

              </div>

              <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">

                <div className="h-2 w-full rounded-full bg-gray-800 dark:bg-gray-300" />

              </div>

            </div>


            <div className="mt-5 flex flex-wrap gap-4 text-xs text-gray-500">

              <div className="flex items-center gap-1.5">
                <User size={14} />
                Ravi
              </div>

              <div className="flex items-center gap-1.5">
                <CalendarDays size={14} />
                Aug 20, 2026
              </div>

              <div className="flex items-center gap-1.5 text-green-600">
                <CheckCircle2 size={14} />
                Completed
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Goals;