import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";



const modules = [AllCommunityModule];

function SubTaskTable({ theme = "Dark", rowData  }: any) {
  console.log("Grid Data:", rowData);

  const columnDefs = [
    {
      field: "taskid",
      headerName: "Task ID",
      width: 120,
    },
    {
      field: "taskname",
      headerName: "Task Name",
      flex: 1,
    },
    {
      field: "AssignedTo",
      headerName: "Assigned To",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
    },
  ];

  return (
    <div className="mt-4">
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
    console.log("Old Value:", params.oldValue);
    console.log("New Value:", params.newValue);
    console.log("Updated Row:", params.data);
  }}
                        />
                    </div>
                </AgGridProvider>
      </div>
    </div>
  );
}

export default SubTaskTable;