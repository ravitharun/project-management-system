import { CiShare1 } from "react-icons/ci";
import MyCalendar from "../pages/Calendra";
import Board from "./Board";
import SpaceList from "./SpaceList";
import SpaceTimeLine from "./SpaceTimeLine";
import { FaUsers } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { PiDotsThreeBold } from "react-icons/pi";
import { CgMaximizeAlt } from "react-icons/cg";
import { TbMinimize } from "react-icons/tb";
function MinAndMaxWorkspaceView({ handelMaximizeAndMinPoup, theme, work, workspace, setwork, setOpenProject, openProject, workspaceMenuRef, SetBackground, CurrentView, setCurrentView, handleProjectSetting, ismaxAndMin }: any) {
  console.log(ismaxAndMin)
  return (
    <>
      <div
        className={`relative min-h-screen overflow-hidden transition-all duration-500 ${theme === "Dark"
            ? "bg-[#0b1020] text-white"
            : "bg-[#f5f7fb] text-black"
          }`}

        style={{
          position: ismaxAndMin ? "fixed" : "relative",
          inset: ismaxAndMin ? "0" : "",
          zIndex: ismaxAndMin ? 9999 : "",
          width: ismaxAndMin ? "100vw" : "",
          height: ismaxAndMin ? "100vh" : "",
          overflow: ismaxAndMin ? "auto" : "",
        }}
      >

        {/* BACKGROUND */}
        {workspace?.workspaceBackground && (
          <>
            <img
              src={workspace.workspaceBackground}
              alt="workspace-bg"
              className="
            absolute inset-0
            w-full h-full
            object-cover
            scale-105
          "
            />

            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
          </>
        )}

        {/* CONTENT */}
        <div
          className="relative z-10 p-3 md:p-5 space-y-4"

          style={{
            width: ismaxAndMin ? "100%" : "",
            minHeight: ismaxAndMin ? "100vh" : "",
          }}
        >

          {/* HEADER */}
          <button
            onClick={() => setwork([])}
            className="
          px-3 py-1.5
          text-xs font-medium
          rounded-full
          transition-all duration-200
          bg-blue-500 text-white
          hover:bg-blue-600
          active:scale-95
          shadow-sm
        "
          >
            Reset to For You
          </button>

          <div
            className={`
          w-fit
          min-w-[950px]
          max-w-[720px]
          rounded-[20px]
          px-3 py-2.5
          border-none
          shadow-none
          outline-none
          ring-0
        `}

            style={{
              width: ismaxAndMin ? "100%" : "",
              maxWidth: ismaxAndMin ? "100%" : "",
              minWidth: ismaxAndMin ? "100%" : "",
            }}
          >

            <div
              className="
            flex items-center
            justify-between
            gap-5
          "
            >

              {/* LEFT */}
              <div
                className="
              flex items-center
              gap-3
              min-w-0
              flex-1
            "
              >

                {/* ICON */}
                <div
                  className={`
                relative
                w-[42px] h-[42px]
                rounded-[14px]
                overflow-hidden
                shrink-0
                border

                ${theme === "Dark"
                      ? "bg-white/[0.05] border-white/10"
                      : "bg-gray-100 border-gray-200"
                    }
              `}
                >
                  <img
                    src={workspace?.workspaceicon?.img}
                    alt=""
                    className="w-full h-full object-cover"
                  />

                  <div
                    className="
                  absolute bottom-[3px] right-[3px]
                  w-2 h-2
                  rounded-full
                  bg-green-500
                "
                  />
                </div>

                {/* CONTENT */}
                <div className="min-w-0">

                  {/* TITLE */}
                  <div className="flex items-center gap-2 min-w-0">

                    <h1
                      className="
                    text-[15px]
                    md:text-[16px]
                    font-semibold
                    truncate
                    max-w-[180px]
                  "
                    >
                      {workspace?.name}
                    </h1>

                    {/* USERS */}
                    <button
                      className={`
                    w-8 h-8
                    rounded-[10px]
                    border
                    flex items-center justify-center
                    text-[11px]
                    shrink-0
                    transition-all

                    ${theme === "Dark"
                          ? "bg-white/[0.04] border-white/10 hover:bg-white/[0.08]"
                          : "bg-gray-100 border-gray-200 hover:bg-gray-200"
                        }
                  `}
                    >
                      <FaUsers fontSize={20} />
                    </button>

                    {/* MENU */}
                    <button
                      onClick={() =>
                        setOpenProject(
                          openProject === workspace._id
                            ? null
                            : workspace._id
                        )
                      }
                      className={`
                    w-8 h-8
                    rounded-[10px]
                    border
                    flex items-center justify-center
                    text-[14px]
                    shrink-0
                    transition-all

                    ${theme === "Dark"
                          ? "bg-white/[0.04] border-white/10 hover:bg-white/[0.08]"
                          : "bg-gray-100 border-gray-200 hover:bg-gray-200"
                        }
                  `}
                    >
                      <PiDotsThreeBold fontSize={20} />
                    </button>
                  </div>

                  {/* DESCRIPTION */}
                  <p
                    className={` mt-0.5
                  text-[12px]
                  opacity-60
                  truncate
                  max-w-[260px]

                  ${theme === "Dark"
                        ? "text-white"
                        : "text-shadow-black"
                      }`}
                  >
                    {workspace?.description}
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex items-center gap-2 shrink-0">

                {/* SHARE */}
                <button
                  className={`
                w-8 h-8
                rounded-[10px]
                border
                flex items-center justify-center
                text-[12px]
                transition-all

                ${theme === "Dark"
                      ? "bg-white/[0.04] border-white/10 hover:bg-white/[0.08]"
                      : "bg-gray-100 border-gray-200 hover:bg-gray-200"
                    }
              `}
                >
                  <CiShare1 fontSize={20}  title="press Key s"/>
                </button>
                {/* MAX / MIN */}
                <button
                  onClick={handelMaximizeAndMinPoup}
                  className={`
                w-8 h-8
                rounded-[10px]
                border
                flex items-center justify-center
                text-[12px]
                transition-all

                ${theme === "Dark"
                      ? "bg-white/[0.04] border-white/10 hover:bg-white/[0.08]"
                      : "bg-gray-100 border-gray-200 hover:bg-gray-200"
                    }
              `}
                >
                  {ismaxAndMin ? (
                    <TbMinimize fontSize={18} title="press I or i" />
                  ) : (
                    <CgMaximizeAlt fontSize={20} title="press Shift" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* MENU */}
          {openProject === workspace?._id && (
            <div
              ref={workspaceMenuRef}
              className={`
            fixed top-24 right-5
            w-[250px]
            z-[999]
            rounded-[22px]
            border
            p-2
            shadow-2xl
            backdrop-blur-2xl

            ${theme === "Dark"
                  ? "bg-[#111827]/95 border-white/10 text-white"
                  : "bg-white/95 border-gray-200 text-black"
                }
          `}

              style={{
                right: ismaxAndMin ? "20px" : "",
                top: ismaxAndMin ? "85px" : "",
                zIndex: ismaxAndMin ? 99999 : "",
              }}
            >
              <button
                onClick={() => SetBackground(true)}
                className={`
              w-full
              flex items-center gap-3
              px-4 py-3
              rounded-xl
              text-[13px]
              transition-all

              ${theme === "Dark"
                    ? "hover:bg-white/10"
                    : "hover:bg-gray-100"
                  }
            `}
              >
                🖼️ Set Space Background
              </button>

              <button
                onClick={() => handleProjectSetting(workspace)}
                className={`
              w-full
              flex items-center gap-3
              px-4 py-3
              rounded-xl
              text-[13px]
              transition-all

              ${theme === "Dark"
                    ? "hover:bg-white/10"
                    : "hover:bg-gray-100"
                  }
            `}
              >
                <FaGear />
                Project Settings
              </button>

              <div className="my-2 border-t border-white/10" />

              <button
                className="
              w-full
              flex items-center gap-3
              px-4 py-3
              rounded-xl
              text-[13px]
              text-red-500
              hover:bg-red-500/10
            "
              >
                🗑️ Delete
              </button>
            </div>
          )}

          {/* VIEWS */}
          <div
            className={`
          max-w-max
          rounded-[20px]
          border
          p-2
          flex items-center gap-2
          overflow-x-auto
          scrollbar-hide

          ${theme === "Dark"
                ? "bg-white/[0.04] border-white/10"
                : "bg-white/80 border-gray-200"
              }
        `}

            style={{
              width: ismaxAndMin ? "100%" : "",
              maxWidth: ismaxAndMin ? "100%" : "",
            }}
          >
            {workspace?.workspaceSetup?.views?.map(
              (view: any, idx: number) => {
                const active = CurrentView === view;

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentView(view)}
                    className={`
                  px-4 py-2.5
                  rounded-xl
                  text-[13px]
                  whitespace-nowrap
                  transition-all

                  ${active
                        ? theme === "Dark"
                          ? "bg-white text-black"
                          : "bg-black text-white"
                        : "opacity-60 hover:opacity-100"
                      }
                `}
                  >
                    {view}
                  </button>
                );
              }
            )}
          </div>

          {/* BOARD */}
          <div
            className="overflow-x-auto pb-4 scrollbar-hide"

            style={{
              width: ismaxAndMin ? "100%" : "",
              minHeight: ismaxAndMin
                ? "calc(100vh - 180px)"
                : "",
            }}
          >

            {CurrentView == "Summary" &&
              <h1>{CurrentView} View Adding Soon</h1>
            }

            {CurrentView == "Timeline" && (
              <div
                style={{
                  width: ismaxAndMin ? "100%" : "",
                  minWidth: ismaxAndMin ? "100%" : "",
                }}
              >
                <SpaceTimeLine />
              </div>
            )}

            {CurrentView == "Development" &&
              <h1>{CurrentView} View Adding Soon</h1>
            }

            {CurrentView == "Forms" &&
              <h1>{CurrentView} View Adding Soon</h1>
            }

            {CurrentView == "List" && (
              <div
                style={{
                  width: ismaxAndMin ? "100%" : "",
                  minWidth: ismaxAndMin ? "100%" : "",
                }}
              >
                <SpaceList />
              </div>
            )}

            {CurrentView == "Pages" &&
              <h1>{CurrentView} View Adding Soon</h1>
            }

            {CurrentView == "Reports" &&
              <h1>{CurrentView} View Adding Soon</h1>
            }

            {CurrentView == "Backlog" &&
              <h1>{CurrentView} View Adding Soon</h1>
            }

            {CurrentView == "Calendar" && (
              <div
                style={{
                  width: ismaxAndMin ? "100%" : "",
                  minWidth: ismaxAndMin ? "100%" : "",
                  height: ismaxAndMin ? "100%" : "",
                }}
              >
                <MyCalendar theme={theme} />
              </div>
            )}

            {CurrentView == "Goals" &&
              <h1>{CurrentView} View Adding Soon</h1>
            }

            {CurrentView == "Board" && (
              <div
                style={{
                  width: ismaxAndMin ? "100%" : "",
                  minWidth: ismaxAndMin ? "100%" : "",
                  height: ismaxAndMin ? "100%" : "",
                }}
              >
                <Board theme={theme} work={work} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default MinAndMaxWorkspaceView