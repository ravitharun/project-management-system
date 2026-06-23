import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { MasterDetailModule, RowGroupingModule } from "ag-grid-enterprise";
import { FiEye, FiDownload, FiTrash2 } from "react-icons/fi";
import { getuserInfo } from "../../LocalStorage";

ModuleRegistry.registerModules([
    AllCommunityModule,
    MasterDetailModule,
    RowGroupingModule,
]);

function TaskFiles({ theme, file }: any) {
    console.log(file, 'file§')
    const GetDate = new Date()

    if (!file || file.length === 0) {
        return (
            <p className="text-xs text-gray-400 p-3">
                No files available
            </p>
        );
    }

    const rowData = file.map((item: any) => ({
        ...item,

        taskid: item.taskId,
        taskname: item.fileName,
    }));

    const columnDefs: ColDef[] = [
        {
            headerName: "Task ID",
            field: "taskid",
            flex: 1,
        },
        {
            headerName: "Task Name",
            field: "taskname",
            flex: 1,
        },
        {
            headerName: "Uploaded By",
            field: "Uploaded By",
            flex: 1,
            cellRenderer: () => {
                return (
                    <div className="flex items-center gap-2">
                        Username

                    </div>
                );
            },
        },
        {
            headerName: "Uploaded At",
            field: "Uploaded At",
            flex: 1,
            cellRenderer: () => {
                return (
                    <div className="flex items-center gap-2">
                        {GetDate.toDateString() || "Date"}
                    </div>
                );
            },
        },

        {
            headerName: "Action",
            field: "action",
            cellRenderer: (params: any) => {
                const row = params.data;

                console.log("FULL ROW:", row);
                return (
                    <div className="flex items-center gap-2">

                        {/* VIEW */}
                        <button className="flex items-center gap-1 px-3 py-1 text-xs rounded-md bg-blue-600 hover:bg-blue-700 text-white transition">
                            <FiEye size={14} />
                            View
                        </button>

                        {/* DOWNLOAD */}
                        <button className="flex items-center gap-1 px-3 py-1 text-xs rounded-md bg-green-600 hover:bg-green-700 text-white transition">
                            <FiDownload size={14} />
                            Download
                        </button>

                        {/* DELETE */}
                        {row?.uploadedBy?._id === JSON.parse(getuserInfo)._id && <button className="flex items-center gap-1 px-3 py-1 text-xs rounded-md bg-red-600 hover:bg-red-700 text-white transition">
                            <FiTrash2 size={14} />
                            Delete
                        </button>}

                    </div>
                );
            },
        },
    ];

    return (
        <div
            className={`${theme === "Dark" ? "ag-theme-alpine-dark" : "ag-theme-alpine"
                } w-full h-[500px] rounded-xl`}
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                domLayout="normal"
                pagination={true}
                paginationPageSize={10}
                defaultColDef={{
                    resizable: true,
                    sortable: true,
                    filter: true,
                    flex: 1,
                    minWidth: 120,
                }}
            />
        </div>
    );
}

export default TaskFiles;