import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import ViewProfileCard from "../../../PoupProfileCard/ViewProfileCard";
import { useContext, useEffect, useRef, useState } from "react";
import bgthemeContext from "../../../../Context/ThemeContext";
import { instance } from "../../../../services/apiservices";
import GlobalToast from "../../../GlobalToast";

type EditType = {
  SubTaskStatus: "to do" | "in progress" | "Completed",
  TaskId: string,
  taskPriority: string,
  taskName: string,
  _id: string
}

const modules = [AllCommunityModule];

function SubTaskTable({ rowData }: any) {
  const context = useContext(bgthemeContext);

  const [editTask, setEditTask] = useState<EditType | undefined>(undefined);
  console.log(editTask, 'editTask check')
  const { theme }: any = context
  console.log("Grid Data:", rowData);


  const timeoutRef = useRef<any>(null);
  const [popupPos, setPopupPos] = useState({
    x: 0,
    y: 0,
    show: false,
    userInof: {}
  })

  useEffect(() => {
    if (!editTask?.TaskId) return;

    const handleEditTask = async () => {
      try {
        const response = await instance.put(
          `/api/Task/${editTask.TaskId}/EditSubtask`,
          { editTask }
        );

        console.log(response.data);

        if(response.data.status==201){
          return GlobalToast(response.data.message,"success")
        }
      } catch (error: any) {
        const status = error.response?.status;
        const msg = error.response?.data?.message;

        GlobalToast(`${status}: ${msg}`, "error");
      }
    };

    handleEditTask();
  }, [editTask]);




  const columnDefs = [
    {
      field: "TaskId",
      headerName: "Task ID",
      width: 120,
      editable: false,

    },
    {
      field: "taskName",
      headerName: "Task Name",
      flex: 1,

    },
    {
      headerName: "Assigned To",
      flex: 1,
      cellRenderer: (params: any) => {
        return (
          <div
            className="inline-block"
            onMouseEnter={(e: any) => {
              clearTimeout(timeoutRef.current);
              setPopupPos({
                x: e.clientX,
                y: e.clientY,
                show: true,
                userInof: params
              });
            }}
            onMouseLeave={() => {

              timeoutRef.current = setTimeout(() => {
                setPopupPos((prev) => ({
                  ...prev,
                  show: false,
                  userInof: {}
                }));
              }, 1200);
            }}
          >
            <span className="cursor-pointer text-blue-500">
              {params.value}
            </span>
          </div>
        );
      },
      valueGetter: (params: any) => params.data?.AssiginMember?.Name || "Unassigned",
    },
    {
      field: "SubTaskStatus",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "taskPriority",
      headerName: "Priority",
      flex: 1,
    },
    {
      headerName: "Action",
      flex: 1,
      cellRenderer: (params: any) => {
        return (
          <button
            onClick={() => {
              console.log("Delete Row:", params.data);
            }}
          >
            Delete
          </button>
        );
      },
    },
  ];

  return (

    <>


      {
        popupPos.show && (
          <div
            className="fixed z-[999999999]"
            style={{
              top: popupPos.y + 10,
              left: popupPos.x + 10,
            }}

            onMouseEnter={() => {
              setPopupPos((prev) => ({
                ...prev,
                show: true,
              }));
            }}

            onMouseLeave={() => {
              setPopupPos((prev) => ({
                ...prev,
                show: false,
              }));
            }}
          >
            <ViewProfileCard userInof={popupPos.userInof} theme={theme} />
          </div>
        )
      }
      <div className="mt-4" >
        <div
          className={
            theme === "Dark"
              ? "ag-theme-alpine-dark"
              : "ag-theme-alpine"
          }
          style={{
            height: "500px",
            width: "100%",
          }}
        >
          <AgGridProvider modules={modules}>
            <div
              className={`
                        ${theme === "Dark"
                  ? "ag-theme-alpine-dark"
                  : "ag-theme-alpine"
                }
          w-full rounded-xl
          h-[300px] sm:h-[400px] lg:h-[500px]
          overflow-auto   /* ✅ IMPORTANT */
        `}
              style={{
                "--ag-background-color": theme === "Dark" ? "#0f172a" : "#ffffff",
                "--ag-header-background-color":
                  theme === "Dark" ? "#111827" : "#f3f4f6",
                "--ag-odd-row-background-color":
                  theme === "Dark" ? "#0b1220" : "#ffffff",
                "--ag-border-color":
                  theme === "Dark"
                    ? "rgba(255,255,255,0.1)"
                    : "#e5e7eb",
                "--ag-foreground-color":
                  theme === "Dark" ? "#e5e7e3" : "#111827",
              } as React.CSSProperties}
            >
              <AgGridReact
                rowData={rowData}
                domLayout="autoHeight"
                columnDefs={columnDefs}

                suppressHorizontalScroll={false}

                defaultColDef={{
                  resizable: true,
                  sortable: true,
                  filter: true,
                  editable: true,
                  flex: 1,
                  minWidth: 350,
                }}

                onCellClicked={(params) => {
                  console.log("Cell clicked:", params.value);
                  console.log("Row data:", params.data);
                }}
                onCellValueChanged={(params) => {
                  // console.log("Old Value:", params.oldValue);
                  // console.log("New Value:", params.newValue);
                  // setEditTask(params.data)
                  setEditTask({
                    TaskId: params.data.TaskId,
                    taskName: params.data.taskName,
                    taskPriority: params.data.taskPriority,
                    SubTaskStatus:  params.data.SubTaskStatus,
                    _id: params.data._id,
                  });
                  // console.log("Updated Row:", params.data);
                }}
              />
            </div>
          </AgGridProvider>
        </div>
      </div >
    </>

  );
}

export default SubTaskTable;