import { AgGridReact, AgGridProvider } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
const modules = [AllCommunityModule];

type RowData = {
    taskid: string;
    AssignedTo: string,
    taskname: string;
    status: string;
    priority: string;
    action: string;
};

const MyTable = ({ theme }: any) => {
    const rowData: RowData[] = [
        {
            taskid: "T-101",
            AssignedTo:"UnAssigned",
            taskname: "Setup authentication system",
            status: "In Progress",
            priority: "High",
            action: "Edit",
        },
        {
            taskid: "T-102",
            taskname: "Design dashboard UI",
                        AssignedTo:"UnAssigned",
            status: "Completed",
            priority: "Medium",
            action: "View",
        },
        {
            taskid: "T-103",
            taskname: "Socket integration",
                        AssignedTo:"UnAssigned",
            status: "Pending",
            priority: "High",
            action: "Start",
        },
        {
            taskid: "T-104",
            taskname: "Fix responsive bugs",
                        AssignedTo:"Tharun",
            status: "In Progress",
            priority: "Low",
            action: "Fix",
        },
    ];

    const columnDefs: ColDef<RowData>[] = [
        {
            field: "taskid",
            headerName: "Task ID",
            width: 120,
        },
        {
            field: "taskname",
            headerName: "Task Name",
            flex: 1,
            editable: true,
        },
        {
            field: "status",
            headerName: "Status",
            cellRenderer: (params: any) => {
                const color =
                    params.value === "Completed"
                        ? "bg-green-500/20 text-green-400"
                        : params.value === "In Progress"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-yellow-500/20 text-yellow-400";

                return (
                    <button className={`px-3 py-1 rounded-full text-xs ${color}`} onClick={() => console.log(params.value, 'vlu')}>
                        {params.value}
                    </button>
                );
            },
        },
        {
            field: "priority",
            headerName: "Priority",
            cellRenderer: (params: any) => {
                const color =
                    params.value === "High"
                        ? "text-red-400"
                        : params.value === "Medium"
                            ? "text-yellow-400"
                            : "text-green-400";

                return <span className={`font-medium ${color}`}>{params.value}</span>;
            },
        },
        {
            field: "AssignedTo",
            headerName: "Task AssignedTo",
            cellRenderer: (params: any) => {
  
                return <span className={`font-medium `}>{params.value}</span>;
            },
        },



        {
            field: "action",
            headerName: "Action",
            cellRenderer: (params: any) => {
                return (
                    <button className="px-3 py-1 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                        {params.value}
                    </button>
                );
            },
        },
    ];


    return (
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
                <span>Dummy Data </span>
                <AgGridReact
                    rowData={rowData}
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
                />
            </div>
        </AgGridProvider>
    );
};

export default MyTable;