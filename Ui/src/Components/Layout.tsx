// import {
//   Panel,
//   PanelGroup,
//   PanelResizeHandle,
// } from "react-resizable-panels";
// import Sidebar from "./Navbar";
// import ViewTask from "./Task/TaskList/ViewTask";

// export default function Layout() {
//   return (
//     <>


//       <PanelGroup direction="horizontal" className="h-screen">
//         <Panel
//           defaultSize={20}
//           minSize={10}
//           maxSize={40}
//         >
//           <div className="h-full bg-slate-900 text-white p-4">

//             1

//           </div>
//         </Panel>

//         <PanelResizeHandle className="w-2 bg-blue-500 cursor-col-resize" />

//         <Panel
//           defaultSize={80}
//           minSize={40}
//         >
//           <div className="h-full p-4 border">
//             2
//           </div>
//         </Panel>
//       </PanelGroup>
//       <div className="h-screen w-full overflow-hidden">
//         <PanelGroup
//           direction="horizontal"
//           className="h-full w-full"
//           autoSaveId="layout-main"
//           onLayout={(sizes) => console.log(sizes)}
//         >
//           <Panel
//             defaultSize={20}
//             minSize={10}
//             maxSize={40}
//             collapsible
//             collapsedSize={5}
//           >
//             <div className="h-full bg-slate-900 p-4 text-white">
//               1            </div>
//           </Panel>

//           <PanelResizeHandle
//             className="w-2 cursor-col-resize bg-blue-500"
//             hitAreaMargins={{ coarse: 24, fine: 10 }}
//             onDragging={(dragging) => console.log(dragging)}
//           />

//           <Panel defaultSize={80} minSize={40}>
//             <div className="h-full overflow-auto border p-4">
//               2            </div>
//           </Panel>
//         </PanelGroup>
//       </div>

//       <h1>
//         stp1
//       </h1>
//       <div className="h-screen w-full overflow-hidden">
//       <PanelGroup
//         direction="horizontal"
//         className="h-full w-full"
//         autoSaveId="main-layout"
//         id="main-panel-group"
//         onLayout={(sizes) => console.log("layout:", sizes)}
//       >
//         <Panel
//           id="left-panel"
//           order={1}
//           defaultSize={20}
//           minSize={10}
//           maxSize={40}
//           collapsible
//           collapsedSize={5}
//           onCollapse={() => console.log("left panel collapsed")}
//           onExpand={() => console.log("left panel expanded")}
//           onResize={(size) => console.log("left size:", size)}
//         >
//           <div className="h-full bg-slate-900 p-4 text-white">
// 1          </div>
//         </Panel>

//         <PanelResizeHandle
//           id="main-resize-handle"
//           className="group relative flex w-3 cursor-col-resize items-center justify-center bg-slate-200 transition hover:bg-slate-300"
//           hitAreaMargins={{ coarse: 24, fine: 12 }}
//           onDragging={(isDragging) => console.log("dragging:", isDragging)}
//         >
//           <div className="h-16 w-1 rounded-full bg-blue-500 transition-all duration-200 group-active:h-24" />
//         </PanelResizeHandle>

//         <Panel
//           id="right-panel"
//           order={2}
//           defaultSize={80}
//           minSize={40}
//           onResize={(size) => console.log("right size:", size)}
//         >
//           <div className="h-full overflow-auto border p-4">
// 2          </div>
//         </Panel>
//       </PanelGroup>
//     </div>
//     </>
//   );
// }