// import { useContext, useEffect, useState } from "react";
// import { FaClipboardList, FaListUl, FaTasks } from "react-icons/fa";
// import { MdGridView } from "react-icons/md";
// import Button from "../../Button";
// import ViewTask from "./ViewTask";
// import bgthemeContext from "../../../Context/ThemeContext";
// import MyTable from "./MyTable";
// import { FiChevronLeft, FiChevronRight, FiGrid } from "react-icons/fi";
// import ViewTaskFirst from "../../../Context/FirstTaskView";
// import { fetchtaskApi } from "../../../services/taskApi";
// import {
//   Panel,
//   PanelGroup,
//   PanelResizeHandle,
// } from "react-resizable-panels";

// function SpaceList({ spaceid }: any) {
//   const contexttheme = useContext(bgthemeContext);
//   const { theme }: any = contexttheme;

//   const TasksView = useContext(ViewTaskFirst);
//   const { setasks }: any = TasksView;

//   const [CurrentView, setCurrentView] = useState("grid");
//   const [isworkspace, setisworkspace] = useState(true);
//   const [TaskListView, setTaskListView] = useState<any[]>([]);
//   const [taksid, settaskid] = useState<number>(0);
//   const [viewtasks, setviewtaks] = useState<any>(null);

//   const isDark = theme === "Dark";

//   useEffect(() => {
//     const FetchTasks = async () => {
//       try {
//         const response = await fetchtaskApi(spaceid);
//         const tasks = response?.data?.message || [];

//         setTaskListView(tasks);

//         if (tasks.length > 0) {
//           settaskid(0);
//           setviewtaks(tasks[0]);
//           setasks(tasks[0]);
//         } else {
//           setviewtaks(null);
//         }
//       } catch (error: any) {
//         console.log(error);
//         setTaskListView([]);
//         setviewtaks(null);
//       }
//     };

//     FetchTasks();
//   }, [spaceid, setasks]);

//   const handelViewtaks = (id: number, tasks: any) => {
//     settaskid(id);
//     setviewtaks(tasks);
//     setasks(tasks);
//   };

//   return (
//     <>
//       {/* ================= TOPBAR ================= */}
//       <div className="mb-5 flex items-center justify-between">
//         <div
//           className={`
//             flex w-fit items-center gap-1 rounded-lg border px-1.5 py-1
//             ${
//               isDark
//                 ? "border-gray-700 bg-[#111827] text-white"
//                 : "border-gray-300 bg-white text-black"
//             }
//           `}
//         >
//           <Button
//             type="button"
//             title="Grid View"
//             classaName={`
//               rounded-md p-1.5
//               ${
//                 CurrentView === "grid"
//                   ? isDark
//                     ? "text-blue-400"
//                     : "text-blue-600"
//                   : isDark
//                   ? "text-gray-400 hover:text-white"
//                   : "text-gray-500 hover:text-black"
//               }
//             `}
//             OnclickEvent={() => setCurrentView("grid")}
//             Icon={<MdGridView className="text-[14px] sm:text-[16px]" />}
//           />

//           <Button
//             type="button"
//             title="List View"
//             classaName={`
//               rounded-md p-1.5
//               ${
//                 CurrentView === "list"
//                   ? isDark
//                     ? "text-blue-400"
//                     : "text-blue-600"
//                   : isDark
//                   ? "text-gray-400 hover:text-white"
//                   : "text-gray-500 hover:text-black"
//               }
//             `}
//             OnclickEvent={() => setCurrentView("list")}
//             Icon={<FaListUl className="text-[12px] sm:text-[14px]" />}
//           />
//         </div>
//       </div>

//       {/* ================= LIST VIEW ================= */}
//       {CurrentView === "list" && <MyTable theme={theme} spaceid={spaceid} />}

//       {/* ================= GRID VIEW ================= */}
//       {CurrentView === "grid" && (
//         <div
//           className={`
//             h-[calc(100vh-180px)] min-h-[560px] w-full max-w-[1200px]
//             overflow-hidden rounded-[28px] border
//             shadow-[0_10px_40px_rgba(0,0,0,0.06)]
//             ${
//               isDark
//                 ? "border-white/10 bg-[#0f172a]"
//                 : "border-gray-200 bg-white"
//             }
//           `}
//         >
//           <PanelGroup direction="horizontal" className="h-full w-full">
//             {/* ================= LEFT PANEL ================= */}
//             <Panel defaultSize={22} minSize={14} maxSize={38}>
//               <div className="h-full min-h-0 overflow-hidden">
//                 <div className="flex h-full min-h-0">
//                   {/* ================= SIDEBAR ================= */}
//                   <div
//                     className={`
//                       h-full shrink-0 overflow-hidden border-r transition-all duration-300 ease-in-out
//                       ${isworkspace ? "w-[280px]" : "w-[72px]"}
//                       ${
//                         isDark
//                           ? "border-white/10 bg-[#0b1220]"
//                           : "border-gray-200 bg-white"
//                       }
//                     `}
//                   >
//                     {/* HEADER */}
//                     <div
//                       className={`
//                         flex h-14 items-center justify-between border-b px-3
//                         ${isDark ? "border-white/10" : "border-gray-200"}
//                       `}
//                     >
//                       {isworkspace ? (
//                         <h2 className="flex items-center gap-2 text-sm font-semibold">
//                           <FaTasks className="text-sm" />
//                           <span>Tasks</span>
//                         </h2>
//                       ) : (
//                         <div className="flex w-full justify-center">
//                           <FaTasks className="text-sm" />
//                         </div>
//                       )}

//                       <button
//                         onClick={() => setisworkspace((prev) => !prev)}
//                         className={`
//                           rounded-md p-1.5 transition-colors
//                           ${
//                             isDark
//                               ? "bg-white/10 text-white hover:bg-white/15"
//                               : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//                           }
//                         `}
//                         aria-label={isworkspace ? "Collapse sidebar" : "Expand sidebar"}
//                         title={isworkspace ? "Collapse sidebar" : "Expand sidebar"}
//                       >
//                         {isworkspace ? <FiChevronLeft /> : <FiChevronRight />}
//                       </button>
//                     </div>

//                     {/* TASK LIST */}
//                     <div className="h-[calc(100%-56px)] overflow-y-auto p-2">
//                       {TaskListView?.length === 0 ? (
//                         <div className="flex min-h-full items-center justify-center px-4 py-10 sm:py-16">
//                           <div
//                             className={`
//                               w-full max-w-md rounded-2xl border p-6 text-center shadow-sm transition-all duration-300 sm:p-8
//                               ${
//                                 isDark
//                                   ? "border-slate-700 bg-[#0f172a] text-white"
//                                   : "border-slate-200 bg-white text-slate-800"
//                               }
//                             `}
//                           >
//                             <div
//                               className={`
//                                 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full
//                                 ${
//                                   isDark
//                                     ? "bg-slate-800 text-slate-400"
//                                     : "bg-slate-100 text-slate-500"
//                                 }
//                               `}
//                             >
//                               <FaClipboardList fontSize={28} />
//                             </div>

//                             <h3 className="text-lg font-semibold sm:text-xl">
//                               No Tasks Found
//                             </h3>

//                             <p
//                               className={`mt-2 text-sm sm:text-base ${
//                                 isDark ? "text-slate-400" : "text-slate-500"
//                               }`}
//                             >
//                               There are no tasks available at the moment. Create a
//                               new task to get started.
//                             </p>
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="space-y-2">
//                           {TaskListView.map((itm: any, index: number) => {
//                             const isActive = index === taksid;

//                             return (
//                               <button
//                                 key={itm?.id || itm?._id || index}
//                                 type="button"
//                                 onClick={() => handelViewtaks(index, itm)}
//                                 className={`
//                                   group flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-all
//                                   ${isworkspace ? "justify-start" : "justify-center"}
//                                   ${
//                                     isActive
//                                       ? isDark
//                                         ? "bg-blue-500/15 ring-1 ring-blue-400/30"
//                                         : "bg-blue-50 ring-1 ring-blue-200"
//                                       : isDark
//                                       ? "hover:bg-white/5"
//                                       : "hover:bg-gray-100"
//                                   }
//                                 `}
//                               >
//                                 <div
//                                   className={`
//                                     flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm transition
//                                     ${
//                                       isActive
//                                         ? "bg-blue-500 text-white shadow-sm"
//                                         : isDark
//                                         ? "bg-white/10 text-gray-300 group-hover:bg-white/15"
//                                         : "bg-gray-200 text-gray-700 group-hover:bg-gray-300"
//                                     }
//                                   `}
//                                 >
//                                   <FiGrid />
//                                 </div>

//                                 {isworkspace && (
//                                   <div className="min-w-0 flex-1">
//                                     <p
//                                       className={`truncate text-sm font-medium ${
//                                         isDark ? "text-white" : "text-gray-900"
//                                       }`}
//                                     >
//                                       {itm?.taskName || "Untitled Task"}
//                                     </p>
//                                   </div>
//                                 )}
//                               </button>
//                             );
//                           })}
//                         </div>
//                       )}
//                     </div>
//                   </div>


//                 </div>
//               </div>
//             </Panel>

//             {/* ================= RESIZE HANDLE ================= */}
//             <PanelResizeHandle
//               className={`
//                 group relative flex w-3 items-center justify-center transition-colors duration-200
//                 ${isDark ? "bg-slate-900 hover:bg-slate-800" : "bg-slate-100 hover:bg-slate-200"}
//                 cursor-col-resize
//               `}
//             >
//               <div
//                 className={`
//                   h-16 w-1 rounded-full transition-all duration-200
//                   ${
//                     isDark
//                       ? "bg-white/10 group-hover:bg-blue-400/70"
//                       : "bg-slate-300 group-hover:bg-blue-500"
//                   }
//                   group-data-[resize-handle-active=pointer]:h-24
//                   group-data-[resize-handle-active=pointer]:bg-blue-500
//                   group-data-[resize-handle-active=keyboard]:h-24
//                   group-data-[resize-handle-active=keyboard]:bg-blue-500
//                 `}
//               />
//             </PanelResizeHandle>

//             {/* ================= RIGHT PANEL ================= */}
//             <Panel defaultSize={78} minSize={35}>
//               <div className="h-full min-h-0 overflow-hidden">
//                 <div className="h-full overflow-auto">
//                   <ViewTask
//                     theme={theme}
//                     viewtasks={viewtasks}
//                     TaskListView={TaskListView}
//                   />
//                 </div>
//               </div>
//             </Panel>
//           </PanelGroup>
//         </div>
//       )}
//     </>
//   );
// }

// export default SpaceList;

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