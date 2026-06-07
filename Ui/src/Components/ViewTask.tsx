// import React from 'react'

function ViewTask({theme}:any) {
  return (
   <>
   
   
     <div
    className={`
      flex-1 min-w-0
      lg:h-[560px]
      overflow-y-auto
      p-3 sm:p-5 lg:p-6
      ${theme == "Dark" ? "bg-[#111827]" : "bg-white"}
    `}
  >

    <div
      className={`
        rounded-[24px] border
        p-4 sm:p-6
        h-full

        ${theme === "Dark"
          ? "border-white/10 bg-white/[0.03]"
          : "border-gray-200 bg-gray-50/50"
        }
      `}
    >

      {/* TOP */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

        <div className="flex items-start gap-4 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
            📁
          </div>

          <div className="min-w-0">
            <h2 className={`text-lg sm:text-xl font-semibold truncate ${theme === "Dark" ? "text-white" : "text-gray-900"}`}>
              Frontend Dashboard
            </h2>
            <p className={`text-sm mt-1 ${theme === "Dark" ? "text-gray-400" : "text-gray-500"}`}>
              React Workspace Management
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400">
                In Progress
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400">
                Synced
              </span>
            </div>
          </div>
        </div>

        <button className={`
          h-10 px-4 rounded-xl text-sm font-medium shrink-0
          ${theme === "Dark"
            ? "bg-white/10 text-white hover:bg-white/15"
            : "bg-gray-900 text-white hover:bg-black"
          }
        `}>
          Open Workspace
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
        {[
          { label: "Modules", value: "12", sub: "UI components" },
          { label: "Tasks", value: "48", sub: "8 pending today" },
          { label: "Team", value: "06", sub: "2 active now" },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`
              rounded-2xl border p-4
              ${theme === "Dark"
                ? "border-white/10 bg-white/[0.03]"
                : "border-gray-200 bg-white"
              }
            `}
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            <h3 className="text-2xl font-semibold mt-2 text-gray-900 dark:text-white">
              {stat.value}
            </h3>
            <p className="text-xs mt-1 text-gray-500">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* DESCRIPTION + OVERVIEW */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mt-6">

        <div className="xl:col-span-3 rounded-2xl border p-4 bg-white dark:bg-white/[0.02] border-gray-200 dark:border-white/10">
          <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
            Description
          </h3>
          <p className="text-sm leading-7 text-gray-600 dark:text-gray-400">
            This workspace contains frontend dashboard modules, realtime socket integration,
            responsive layouts, reusable UI blocks, and collaboration tools built using React
            and Tailwind CSS.
          </p>
        </div>

        <div className="xl:col-span-2 rounded-2xl border p-4 bg-white dark:bg-white/[0.02] border-gray-200 dark:border-white/10">
          <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">
            Overview
          </h3>

          <div className="space-y-3">
            {[
              ["Framework", "React + Tailwind"],
              ["Realtime", "Socket enabled"],
              ["Status", "Production ready"],
            ].map(([l, v]) => (
              <div key={l} className="flex justify-between text-sm">
                <span className="text-gray-500">{l}</span>
                <span className="font-medium text-gray-900 dark:text-white">{v}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ACTIVITY */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">
          Recent Activity
        </h3>

        <div className="space-y-3">
          {[
            { title: "Socket integration updated", time: "2 hours ago" },
            { title: "Dashboard widgets improved", time: "Yesterday" },
            { title: "Responsive issues fixed", time: "Mobile view" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex justify-between gap-3 border rounded-2xl px-4 py-3 bg-white dark:bg-white/[0.02] border-gray-200 dark:border-white/10"
            >
              <div className="flex gap-3 min-w-0">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500">Workspace activity update</p>
                </div>
              </div>

              <span className="text-xs text-gray-500 whitespace-nowrap">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
   </>
  )
}

export default ViewTask