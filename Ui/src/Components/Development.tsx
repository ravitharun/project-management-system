import  { useContext, useState } from "react";
import {
  GitCommit,
  GitBranch,
  GitPullRequest,
  Rocket,
  CircleCheck,
  // CircleX,
  Clock3,
  // User,
  Search,
  Filter,
  ExternalLink,
  MoreHorizontal,
  // Plus,
  Code2,
  // Terminal,
} from "lucide-react";
import bgthemeContext from "../Context/ThemeContext";


function Development() {
  const { theme }: any = useContext(bgthemeContext);
  const istheme = theme === "Dark";

  const [activeTab, setActiveTab] = useState("Activity");

  const activities = [
    {
      type: "commit",
      title: "Fix authentication middleware",
      author: "Ravi",
      branch: "feature/auth",
      time: "10 minutes ago",
      hash: "a82f91c",
    },
    {
      type: "pull",
      title: "Add dashboard API",
      author: "Tharun",
      branch: "feature/dashboard",
      time: "35 minutes ago",
      status: "Open",
    },
    {
      type: "commit",
      title: "Update project schema",
      author: "Arun",
      branch: "main",
      time: "1 hour ago",
      hash: "72bc10a",
    },
    {
      type: "pull",
      title: "Implement task comments",
      author: "Ravi",
      branch: "feature/comments",
      time: "3 hours ago",
      status: "Merged",
    },
  ];

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
            Development
          </h1>

          <p
            className={`mt-1 text-sm ${
              istheme ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Track code changes, branches, pull requests and deployments
          </p>
        </div>

        <button
          className="
            flex
            items-center
            gap-2
            rounded-lg
            bg-gray-900
            px-4
            py-2.5
            text-sm
            font-medium
            text-white
            hover:bg-gray-800
          "
        >
          <Rocket size={17} />
          Deploy
        </button>

      </div>


      {/* ================================================= */}
      {/* REPOSITORY HEADER */}
      {/* ================================================= */}

      <div
        className={`mb-6 rounded-xl border p-5 ${
          istheme
            ? "border-gray-800 bg-gray-900"
            : "border-gray-200 bg-white"
        }`}
      >

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-4">

            <div
              className={`flex h-11 w-11 items-center justify-center rounded-lg ${
                istheme ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <Code2 size={22} />
            </div>

            <div>

              <div className="flex items-center gap-2">

                <h2 className="font-semibold">
                  project-management-system
                </h2>

                <span
                  className={`rounded-md px-2 py-1 text-[11px] ${
                    istheme
                      ? "bg-gray-800 text-gray-400"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  GitHub
                </span>

              </div>

              <p
                className={`mt-1 text-xs ${
                  istheme ? "text-gray-500" : "text-gray-400"
                }`}
              >
                main · Last updated 10 minutes ago
              </p>

            </div>

          </div>

          <button
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
              istheme
                ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                : "border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Open Repository
            <ExternalLink size={14} />
          </button>

        </div>

      </div>


      {/* ================================================= */}
      {/* STATS */}
      {/* ================================================= */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Commits */}

        <div
          className={`rounded-xl border p-5 ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Commits
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                128
              </h2>

              <p className="mt-1 text-xs text-green-600">
                +18 this week
              </p>
            </div>

            <GitCommit size={22} />

          </div>

        </div>


        {/* Branches */}

        <div
          className={`rounded-xl border p-5 ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Branches
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                12
              </h2>
            </div>

            <GitBranch size={22} />

          </div>

        </div>


        {/* Pull Requests */}

        <div
          className={`rounded-xl border p-5 ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Pull Requests
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                8
              </h2>

              <p className="mt-1 text-xs text-yellow-600">
                3 awaiting review
              </p>
            </div>

            <GitPullRequest size={22} />

          </div>

        </div>


        {/* Deployment */}

        <div
          className={`rounded-xl border p-5 ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Deployment
              </p>

              <h2 className="mt-2 text-lg font-semibold">
                Production
              </h2>

              <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                <CircleCheck size={13} />
                Healthy
              </p>
            </div>

            <Rocket size={22} />

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* TABS */}
      {/* ================================================= */}

      <div
        className={`mb-6 border-b ${
          istheme ? "border-gray-800" : "border-gray-200"
        }`}
      >

        <div className="flex gap-6">

          {["Activity", "Commits", "Branches", "Pull Requests"].map(
            (tab) => (

              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 pb-3 text-sm font-medium transition ${
                  activeTab === tab
                    ? istheme
                      ? "border-white text-white"
                      : "border-gray-900 text-gray-900"
                    : istheme
                    ? "border-transparent text-gray-500 hover:text-gray-300"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>

            )
          )}

        </div>

      </div>


      {/* ================================================= */}
      {/* TOOLBAR */}
      {/* ================================================= */}

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <div className="relative w-full md:w-80">

          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            placeholder="Search development activity..."
            className={`w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none ${
              istheme
                ? "border-gray-700 bg-gray-900 text-white"
                : "border-gray-200 bg-white"
            }`}
          />

        </div>

        <button
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
            istheme
              ? "border-gray-700 hover:bg-gray-900"
              : "border-gray-200 hover:bg-gray-100"
          }`}
        >
          <Filter size={15} />
          Filter
        </button>

      </div>


      {/* ================================================= */}
      {/* ACTIVITY */}
      {/* ================================================= */}

      {activeTab === "Activity" && (

        <div
          className={`rounded-xl border ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >

          {activities.map((activity, index) => (

            <div
              key={index}
              className={`flex gap-4 p-5 ${
                index !== activities.length - 1
                  ? istheme
                    ? "border-b border-gray-800"
                    : "border-b border-gray-100"
                  : ""
              }`}
            >

              {/* Icon */}

              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  istheme ? "bg-gray-800" : "bg-gray-100"
                }`}
              >

                {activity.type === "commit" ? (
                  <GitCommit size={17} />
                ) : (
                  <GitPullRequest size={17} />
                )}

              </div>


              {/* Content */}

              <div className="min-w-0 flex-1">

                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">

                  <p className="text-sm">

                    <span className="font-medium">
                      {activity.author}
                    </span>{" "}

                    {activity.type === "commit"
                      ? "committed"
                      : "created pull request"}

                    {" "}

                    <span className="font-medium">
                      "{activity.title}"
                    </span>

                  </p>

                  <span className="text-xs text-gray-400">
                    {activity.time}
                  </span>

                </div>


                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">

                  <span className="flex items-center gap-1">
                    <GitBranch size={13} />
                    {activity.branch}
                  </span>

                  {activity.hash && (
                    <span className="rounded bg-gray-100 px-2 py-1 font-mono text-[11px] dark:bg-gray-800">
                      {activity.hash}
                    </span>
                  )}

                  {activity.status && (
                    <span
                      className={`flex items-center gap-1 ${
                        activity.status === "Merged"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {activity.status === "Merged" ? (
                        <CircleCheck size={13} />
                      ) : (
                        <Clock3 size={13} />
                      )}

                      {activity.status}
                    </span>
                  )}

                </div>

              </div>


              <button className="text-gray-400">
                <MoreHorizontal size={18} />
              </button>

            </div>

          ))}

        </div>

      )}


      {/* ================================================= */}
      {/* OTHER TABS */}
      {/* ================================================= */}

      {activeTab === "Commits" && (

        <div
          className={`rounded-xl border p-8 text-center ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >
          <GitCommit className="mx-auto" size={28} />

          <h2 className="mt-3 font-medium">
            Commits
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View all repository commits here.
          </p>
        </div>

      )}


      {activeTab === "Branches" && (

        <div
          className={`rounded-xl border p-8 text-center ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >
          <GitBranch className="mx-auto" size={28} />

          <h2 className="mt-3 font-medium">
            Branches
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage project branches here.
          </p>
        </div>

      )}


      {activeTab === "Pull Requests" && (

        <div
          className={`rounded-xl border p-8 text-center ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >
          <GitPullRequest className="mx-auto" size={28} />

          <h2 className="mt-3 font-medium">
            Pull Requests
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Review and manage pull requests here.
          </p>
        </div>

      )}

    </div>
  );
}

export default Development;