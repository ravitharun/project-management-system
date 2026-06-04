import { useContext, useState } from "react";
import {
  FiStar,
  FiEye,
  FiSearch,
} from "react-icons/fi";

import WorkspaceData from "../Context/workspaceData";
import { useremail } from "./LocalStorage";

function WorkspaceViwe({ theme, SpaceJson }: any) {

  const workSpaceData = useContext(WorkspaceData);
  const { setwork }: any = workSpaceData;

  const [type, settype] = useState("Recommended");
  const [id, setid] = useState<number | null>(null);

  const filters = [
    "Recommended",
    "For you",
    "Assigned to me",
    "Starred",
    "Worked on",
    "Viewed",
  ];

  return (
    <>
      <div
        className={`
          min-h-screen
          w-full
          px-3 md:px-5
          py-5
          transition-all duration-300

          ${theme === "Dark"
            ? "bg-[#0B1120] text-white"
            : "bg-[#F5F7FB] text-gray-900"
          }
        `}
      >

        {/* ================= CONTAINER ================= */}
        <div className="max-w-[1350px] mx-auto space-y-5">

          {/* ================= HEADER ================= */}
          <div className="
            flex flex-col lg:flex-row
            lg:items-center
            lg:justify-between
            gap-4
          ">

            {/* LEFT */}
            <div>

              <h1 className="
                text-2xl md:text-3xl
                font-bold
                tracking-tight
              ">
                Your Workspaces
              </h1>

              <p
                className={`
                  mt-2
                  text-[13px]

                  ${theme === "Dark"
                    ? "text-gray-400"
                    : "text-gray-500"
                  }
                `}
              >
                Manage your teams, projects, and collaboration spaces
              </p>
            </div>

            {/* RIGHT */}
            <div className="
              flex flex-col sm:flex-row
              gap-3
              w-full lg:w-auto
            ">

              {/* SEARCH */}
              <div
                className={`
                  flex items-center gap-3
                  h-[44px]
                  px-4
                  rounded-[18px]
                  min-w-0
                  w-full sm:w-[240px]
                  backdrop-blur-xl
                  border

                  ${theme === "Dark"
                    ? "bg-white/[0.05] border-white/10"
                    : "bg-white border-gray-200"
                  }
                `}
              >
                <FiSearch
                  className={`
                    text-sm shrink-0

                    ${theme === "Dark"
                      ? "text-gray-400"
                      : "text-gray-500"
                    }
                  `}
                />

                <input
                  type="text"
                  placeholder="Search workspace..."
                  className={`
                    bg-transparent
                    outline-none
                    text-[13px]
                    w-full
                    min-w-0

                    ${theme === "Dark"
                      ? "placeholder:text-gray-500"
                      : "placeholder:text-gray-400"
                    }
                  `}
                />
              </div>

              {/* BUTTON */}
              <button
                className="
                  h-[44px]
                  px-4
                  rounded-[18px]
                  text-[13px]
                  font-medium
                  whitespace-nowrap
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  transition-all
                  hover:scale-[1.02]
                "
              >
                + Create Workspace
              </button>
            </div>
          </div>

          {/* ================= FILTERS ================= */}
          <div className="
            flex items-center
            gap-2
            overflow-x-auto
            scrollbar-hide
            pb-1
          ">

            {filters.map((f, i) => (

              <button
                key={i}
                onClick={() => settype(f)}
                className={`
                  px-4 py-2
                  rounded-full
                  text-[12px]
                  font-medium
                  whitespace-nowrap
                  transition-all duration-200
                  border

                  ${type === f
                    ? "bg-blue-600 text-white border-blue-600"
                    : theme === "Dark"
                      ? "bg-white/[0.05] border-white/10 text-gray-300 hover:bg-white/[0.08]"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                {f}
              </button>
            ))}
          </div>

          {/* ================= SECTION HEADER ================= */}
          <div className="
            flex items-center
            justify-between
            gap-3
            flex-wrap
          ">

            <div>

              <h2 className="
                text-lg
                font-semibold
              ">
                Recommended Spaces
              </h2>

              <p
                className={`
                  text-[13px]
                  mt-1

                  ${theme === "Dark"
                    ? "text-gray-400"
                    : "text-gray-500"
                  }
                `}
              >
                Continue collaborating with your team
              </p>
            </div>

            <span
              className={`
                text-[13px]
                font-medium
                shrink-0

                ${theme === "Dark"
                  ? "text-blue-400"
                  : "text-blue-600"
                }
              `}
            >
              {SpaceJson.length} Spaces
            </span>
          </div>

          {/* ================= WORKSPACE GRID ================= */}
          <div className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-4
          ">

            {SpaceJson.length === 0 ? (

              <div
                className={`
                  col-span-full
                  h-[240px]
                  rounded-[28px]
                  border
                  flex flex-col
                  items-center
                  justify-center
                  text-center
                  p-6

                  ${theme === "Dark"
                    ? "bg-white/[0.04] border-white/10 text-gray-400"
                    : "bg-white border-gray-200 text-gray-500"
                  }
                `}
              >
                <div className="text-5xl mb-4">
                  📂
                </div>

                <h3 className="font-semibold text-lg">
                  No Workspaces Found
                </h3>

                <p className="text-sm mt-2 opacity-70">
                  Try changing filters or create a new workspace
                </p>
              </div>

            ) : (

              SpaceJson.map((w: any, i: number) => (

                <div
                  key={i}
                  onMouseEnter={() => setid(i)}
                  onMouseLeave={() => setid(null)}
                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-[28px]
                    border
                    p-4
                    transition-all duration-300
                    cursor-pointer

                    ${theme === "Dark"
                      ? "bg-white/[0.04] border-white/10 hover:bg-white/[0.06]"
                      : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg"
                    }
                  `}
                >

                  <div className="
                    flex items-start
                    justify-between
                    gap-4
                  ">

                    {/* LEFT */}
                    <div className="
                      flex items-start
                      gap-4
                      min-w-0
                      flex-1
                    ">

                      {/* ICON */}
                      <div
                        className={`
                          w-14 h-14
                          rounded-[18px]
                          flex items-center justify-center
                          shrink-0

                          ${theme === "Dark"
                            ? "bg-white/[0.06]"
                            : "bg-gray-100"
                          }
                        `}
                      >
                        <img
                          src={w?.workspaceicon?.img}
                          alt="workspace"
                          className="w-8 h-8 object-contain"
                        />
                      </div>

                      {/* INFO */}
                      <div className="
                        min-w-0
                        flex-1
                      ">

                        <h3 className="
                          font-semibold
                          text-[15px]
                          truncate
                        ">
                          {w?.workspaceSetup?.workspaceName}
                        </h3>

                        <p
                          className={`
                            text-[12px]
                            truncate
                            mt-1

                            ${theme === "Dark"
                              ? "text-gray-400"
                              : "text-gray-500"
                            }
                          `}
                        >
                          {w?.workspaceSetup?.createby?.userName || "User"} • Team Lead
                        </p>

                        {/* TAGS */}
                        <div className="
                          flex items-center
                          gap-2
                          mt-3
                          flex-wrap
                        ">

                          <span
                            className={`
                              px-2.5 py-1
                              rounded-full
                              text-[10px]
                              font-medium

                              ${theme === "Dark"
                                ? "bg-white/[0.06] text-gray-300"
                                : "bg-gray-100 text-gray-600"
                              }
                            `}
                          >
                            Active
                          </span>

                          <span
                            className={`
                              px-2.5 py-1
                              rounded-full
                              text-[10px]
                              font-medium

                              ${theme === "Dark"
                                ? "bg-blue-500/10 text-blue-400"
                                : "bg-blue-50 text-blue-600"
                              }
                            `}
                          >
                            Workspace
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div
                      className={`
                        flex items-center
                        gap-2
                        shrink-0
                        transition-all duration-300

                        ${id === i
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                        }
                      `}
                    >

                      {/* STAR */}
                      <button
                        className={`
                          w-10 h-10
                          rounded-[14px]
                          flex items-center justify-center
                          transition-all duration-200

                          ${w?.isStaredUsers?.userEmail === useremail
                            ? "bg-yellow-400 text-white"
                            : theme === "Dark"
                              ? "bg-white/[0.06] text-gray-400 hover:text-yellow-400"
                              : "bg-gray-100 text-gray-500 hover:text-yellow-500"
                          }
                        `}
                      >
                        <FiStar
                          className={
                            w?.isStaredUsers?.userEmail === useremail
                              ? "fill-current"
                              : ""
                          }
                        />
                      </button>

                      {/* VIEW */}
                      <button
                        onClick={() => setwork(w)}
                        className={`
                          w-10 h-10
                          rounded-[14px]
                          flex items-center justify-center
                          transition-all duration-200

                          ${theme === "Dark"
                            ? "bg-white/[0.06] text-gray-300 hover:bg-blue-600 hover:text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white"
                          }
                        `}
                      >
                        <FiEye />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ================= FOOTER ================= */}
          <div
            className={`
              text-center
              pt-2
              text-[12px]

              ${theme === "Dark"
                ? "text-gray-500"
                : "text-gray-400"
              }
            `}
          >
            Explore all workspaces and collaborate efficiently
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkspaceViwe;