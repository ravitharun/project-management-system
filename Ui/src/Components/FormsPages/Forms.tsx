import React, { useContext, useState } from "react";
import {
  Search,
  Plus,
  FileText,
  MoreHorizontal,
  Edit3,
  Eye,
  Inbox,
  Users,
  CheckCircle2,
  Clock3,
  ClipboardList,
  ChevronDown,
} from "lucide-react";

import bgthemeContext from "../../Context/ThemeContext";

function Forms() {
  const { theme }: any = useContext(bgthemeContext);
  const istheme = theme === "Dark";

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const forms = [
    {
      id: 1,
      title: "Bug Report",
      description: "Report bugs and issues in the project",
      status: "Active",
      fields: 8,
      submissions: 24,
      updated: "2 hours ago",
    },
    {
      id: 2,
      title: "Feature Request",
      description: "Submit new feature ideas and suggestions",
      status: "Active",
      fields: 6,
      submissions: 12,
      updated: "Yesterday",
    },
    {
      id: 3,
      title: "Task Request",
      description: "Request a new task for the project",
      status: "Draft",
      fields: 5,
      submissions: 0,
      updated: "3 days ago",
    },
    {
      id: 4,
      title: "Project Feedback",
      description: "Collect feedback from project members",
      status: "Active",
      fields: 7,
      submissions: 18,
      updated: "5 days ago",
    },
  ];

  const filteredForms = forms.filter((form) => {
    const matchesSearch =
      form.title.toLowerCase().includes(search.toLowerCase()) ||
      form.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || form.status === filter;

    return matchesSearch && matchesFilter;
  });

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
            Forms
          </h1>

          <p
            className={`mt-1 text-sm ${
              istheme ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Create forms to collect project information
          </p>
        </div>

        <button
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-gray-900
            px-4
            py-2.5
            text-sm
            font-medium
            text-white
            transition
            hover:bg-gray-800
          "
        >
          <Plus size={17} />
          Create Form
        </button>

      </div>


      {/* ================================================= */}
      {/* STATS */}
      {/* ================================================= */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total Forms */}

        <div
          className={`rounded-xl border p-5 ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-center justify-between">

            <div>
              <p
                className={`text-sm ${
                  istheme ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Total Forms
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                4
              </h2>
            </div>

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                istheme ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <ClipboardList size={20} />
            </div>

          </div>
        </div>


        {/* Active Forms */}

        <div
          className={`rounded-xl border p-5 ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-center justify-between">

            <div>
              <p
                className={`text-sm ${
                  istheme ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Active Forms
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


        {/* Submissions */}

        <div
          className={`rounded-xl border p-5 ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-center justify-between">

            <div>
              <p
                className={`text-sm ${
                  istheme ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Total Submissions
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                54
              </h2>
            </div>

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                istheme ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <Inbox size={20} />
            </div>

          </div>
        </div>

      </div>


      {/* ================================================= */}
      {/* SEARCH + FILTER */}
      {/* ================================================= */}

      <div
        className={`mb-6 flex flex-col gap-3 rounded-xl border p-3 md:flex-row md:items-center md:justify-between ${
          istheme
            ? "border-gray-800 bg-gray-900"
            : "border-gray-200 bg-white"
        }`}
      >

        {/* Search */}

        <div className="relative w-full md:w-80">

          <Search
            size={17}
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              istheme ? "text-gray-500" : "text-gray-400"
            }`}
          />

          <input
            type="text"
            placeholder="Search forms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none ${
              istheme
                ? "border-gray-700 bg-gray-950 text-white placeholder:text-gray-500"
                : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
            }`}
          />

        </div>


        {/* Filter */}

        <div className="flex items-center gap-2">

          {["All", "Active", "Draft"].map((item) => (

            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-lg px-3 py-2 text-sm transition ${
                filter === item
                  ? istheme
                    ? "bg-white text-gray-900"
                    : "bg-gray-900 text-white"
                  : istheme
                  ? "text-gray-400 hover:bg-gray-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

      </div>


      {/* ================================================= */}
      {/* FORMS */}
      {/* ================================================= */}

      <div className="space-y-4">

        {filteredForms.map((form) => (

          <div
            key={form.id}
            className={`group rounded-xl border p-5 transition-all hover:-translate-y-0.5 ${
              istheme
                ? "border-gray-800 bg-gray-900 hover:border-gray-700"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
            }`}
          >

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              {/* LEFT */}

              <div className="flex gap-4">

                {/* Icon */}

                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                    istheme ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <FileText size={21} />
                </div>


                {/* Content */}

                <div>

                  <div className="flex items-center gap-3">

                    <h2
                      className={`font-semibold ${
                        istheme ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {form.title}
                    </h2>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                        form.status === "Active"
                          ? istheme
                            ? "bg-green-950 text-green-400"
                            : "bg-green-50 text-green-600"
                          : istheme
                          ? "bg-gray-800 text-gray-400"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {form.status}
                    </span>

                  </div>


                  <p
                    className={`mt-1 text-sm ${
                      istheme ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {form.description}
                  </p>


                  {/* META */}

                  <div
                    className={`mt-4 flex flex-wrap items-center gap-4 text-xs ${
                      istheme ? "text-gray-500" : "text-gray-400"
                    }`}
                  >

                    <span className="flex items-center gap-1.5">
                      <FileText size={14} />
                      {form.fields} fields
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Users size={14} />
                      {form.submissions} submissions
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Clock3 size={14} />
                      Updated {form.updated}
                    </span>

                  </div>

                </div>

              </div>


              {/* ACTIONS */}

              <div className="flex items-center gap-2">

                <button
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                    istheme
                      ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Eye size={15} />
                  Open
                </button>


                <button
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                    istheme
                      ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Edit3 size={15} />
                  Edit
                </button>


                <button
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                    istheme
                      ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Inbox size={15} />
                  Submissions
                </button>


                <button
                  className={`rounded-lg p-2 ${
                    istheme
                      ? "text-gray-400 hover:bg-gray-800"
                      : "text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  <MoreHorizontal size={18} />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* ================================================= */}
      {/* EMPTY STATE */}
      {/* ================================================= */}

      {filteredForms.length === 0 && (

        <div
          className={`rounded-xl border py-16 text-center ${
            istheme
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >

          <div
            className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
              istheme ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <FileText size={22} />
          </div>

          <h3 className="mt-4 font-medium">
            No forms found
          </h3>

          <p
            className={`mt-1 text-sm ${
              istheme ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Try changing your search or filter.
          </p>

        </div>

      )}

    </div>
  );
}

export default Forms;