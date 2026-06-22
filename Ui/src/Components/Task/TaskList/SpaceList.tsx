import { useContext, useEffect, useState } from "react";
import { FaClipboardList, FaListUl, FaTasks } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import Button from "../../Button";
import ViewTask from "./ViewTask";
import bgthemeContext from "../../../Context/ThemeContext";
import MyTable from "./MyTable";
import { FiGrid } from "react-icons/fi";
import ViewTaskFirst from "../../../Context/FirstTaskView";
import { fetchtaskApi } from "../../../services/taskApi";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

function SpaceList({ spaceid }: any) {
  const contexttheme = useContext(bgthemeContext);
  const { theme }: any = contexttheme;

  const TasksView = useContext(ViewTaskFirst);
  const { setasks }: any = TasksView;

  const [CurrentView, setCurrentView] = useState("grid");
  const [TaskListView, setTaskListView] = useState<any[]>([]);
  const [taksid, settaskid] = useState<number>(0);
  const [viewtasks, setviewtaks] = useState<any>(null);

  const isDark = theme === "Dark";

  useEffect(() => {
    const FetchTasks = async () => {
      try {
        const response = await fetchtaskApi(spaceid);
        const tasks = response?.data?.message || [];

        setTaskListView(tasks);

        if (tasks.length > 0) {
          settaskid(0);
          setviewtaks(tasks[0]);
          setasks(tasks[0]);
        } else {
          setviewtaks(null);
        }
      } catch (error: any) {
        console.log(error);
        setTaskListView([]);
        setviewtaks(null);
      }
    };

    FetchTasks();
  }, [spaceid, setasks]);

  const handelViewtaks = (id: number, tasks: any) => {
    settaskid(id);
    setviewtaks(tasks);
    setasks(tasks);
  };

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <div
          className={`
            flex w-fit items-center gap-1 rounded-lg border px-1.5 py-1
            ${isDark
              ? "border-gray-700 bg-[#111827] text-white"
              : "border-gray-300 bg-white text-black"
            }
          `}
        >
          <Button
            type="button"
            title="Grid View"
            classaName={`
              rounded-md p-1.5
              ${CurrentView === "grid"
                ? isDark
                  ? "text-blue-400"
                  : "text-blue-600"
                : isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-black"
              }
            `}
            OnclickEvent={() => setCurrentView("grid")}
            Icon={<MdGridView className="text-[14px] sm:text-[16px]" />}
          />

          <Button
            type="button"
            title="List View"
            classaName={`
              rounded-md p-1.5
              ${CurrentView === "list"
                ? isDark
                  ? "text-blue-400"
                  : "text-blue-600"
                : isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-black"
              }
            `}
            OnclickEvent={() => setCurrentView("list")}
            Icon={<FaListUl className="text-[12px] sm:text-[14px]" />}
          />
        </div>
      </div>

      {CurrentView === "list" && <MyTable theme={theme} spaceid={spaceid} />}

      {CurrentView === "grid" && (
        <div
          className={`
            h-[calc(100vh-180px)] min-h-[560px] w-full max-w-[1200px]
            overflow-hidden rounded-[28px] border
            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
            ${isDark
              ? "border-white/10 bg-[#0f172a]"
              : "border-gray-200 bg-white"
            }
          `}
        >
          <PanelGroup
            direction="horizontal"
            className="h-full w-full"
            autoSaveId={`space-layout-${spaceid}`}
            id={`space-panel-group-${spaceid}`}
            onLayout={(sizes) => console.log("layout:", sizes)}
          >
            <Panel
              id={`space-left-panel-${spaceid}`}
              order={1}
              defaultSize={22}
              minSize={14}
              maxSize={38}
              onResize={(size) => console.log("left size:", size)}
            >
              <div className="h-full min-h-0 overflow-hidden">
                <div
                  className={`
                    h-full overflow-hidden border-r
                    ${isDark
                      ? "border-white/10 bg-[#0b1220]"
                      : "border-gray-200 bg-white"
                    }
                  `}
                >
                  <div
                    className={`
                      flex h-14 items-center border-b px-3
                      ${isDark ? "border-white/10" : "border-gray-200"}
                    `}
                  >
                    <h2 className="flex items-center gap-2 text-sm font-semibold">
                      <FaTasks className="text-sm" />
                      <span>Tasks</span>
                    </h2>
                  </div>

                  <div className="h-[calc(100%-56px)] overflow-y-auto p-2">
                    {TaskListView?.length === 0 ? (
                      <div className="flex min-h-full items-center justify-center px-4 py-10 sm:py-16">
                        <div
                          className={`
                            w-full max-w-md rounded-2xl border p-6 text-center shadow-sm transition-all duration-300 sm:p-8
                            ${isDark
                              ? "border-slate-700 bg-[#0f172a] text-white"
                              : "border-slate-200 bg-white text-slate-800"
                            }
                          `}
                        >
                          <div
                            className={`
                              mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full
                              ${isDark
                                ? "bg-slate-800 text-slate-400"
                                : "bg-slate-100 text-slate-500"
                              }
                            `}
                          >
                            <FaClipboardList fontSize={28} />
                          </div>

                          <h3 className="text-lg font-semibold sm:text-xl">
                            No Tasks Found
                          </h3>

                          <p
                            className={`mt-2 text-sm sm:text-base ${isDark ? "text-slate-400" : "text-slate-500"
                              }`}
                          >
                            There are no tasks available at the moment. Create a
                            new task to get started.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {TaskListView.map((itm: any, index: number) => {
                          const isActive = index === taksid;

                          return (
                            <button
                              key={itm?.id || itm?._id || index}
                              type="button"
                              onClick={() => handelViewtaks(index, itm)}
                              className={`
                                group flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-all
                                ${isActive
                                  ? isDark
                                    ? "bg-blue-500/15 ring-1 ring-blue-400/30"
                                    : "bg-blue-50 ring-1 ring-blue-200"
                                  : isDark
                                    ? "hover:bg-white/5"
                                    : "hover:bg-gray-100"
                                }
                              `}
                            >
                              <div
                                className={`
                                  flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm transition
                                  ${isActive
                                    ? "bg-blue-500 text-white shadow-sm"
                                    : isDark
                                      ? "bg-white/10 text-gray-300 group-hover:bg-white/15"
                                      : "bg-gray-200 text-gray-700 group-hover:bg-gray-300"
                                  }
                                `}
                              >
                                <FiGrid />
                              </div>

                              <div className="min-w-0 flex-1">
                                <p
                                  className={`truncate text-sm font-medium ${isDark ? "text-white" : "text-gray-900"
                                    }`}
                                >
                                  {itm?.taskName || "Untitled Task"}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Panel>

            <PanelResizeHandle
              id={`space-resize-handle-${spaceid}`}
              className={`
                relative w-2 cursor-col-resize transition-colors
                ${isDark ? "bg-white/10 hover:bg-blue-500/70" : "bg-gray-200 hover:bg-blue-500"}
              `}
              hitAreaMargins={{ coarse: 24, fine: 12 }}
              onDragging={(isDragging) => console.log("dragging:", isDragging)}
            />
            <Panel
              id={`space-right-panel-${spaceid}`}
              order={2}
              defaultSize={78}
              minSize={35}
            >
              <div className="h-full w-full min-w-0 overflow-hidden">
                <ViewTask
                  projectid={spaceid}
                  theme={theme}
                  viewtasks={viewtasks}
                  TaskListView={TaskListView}
                />
              </div>
            </Panel>
          </PanelGroup>
        </div>
      )}
    </>
  );
}

export default SpaceList;