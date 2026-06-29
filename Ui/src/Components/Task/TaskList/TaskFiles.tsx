import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import { MasterDetailModule, RowGroupingModule } from "ag-grid-enterprise";
import { FiEye, FiDownload, FiTrash2 } from "react-icons/fi";
import { getuserInfo } from "../../LocalStorage";
import bgthemeContext from "../../../Context/ThemeContext";
import { useContext, useState } from "react";
import { instance } from "../../../services/apiservices";
import GlobalToast from "../../GlobalToast";
import ApiLoader from "../../ApiLoader";

ModuleRegistry.registerModules([
    AllCommunityModule,
    MasterDetailModule,
    RowGroupingModule,
]);

function TaskFiles({ file }: any) {
    const context = useContext(bgthemeContext);
    const { theme }: any = context

    const [isdelete, setisdelete] = useState(false)
    console.log(file, 'Tarun viewtasks')
    const GetDate = (date: any) => {
        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (!file || file.length === 0) {
        return (
            <p className="text-xs text-gray-400 p-3">
                No files available
            </p>
        );
    }

    const rowData = file?.Files?.map((item: any) => ({
        ...item,
    }));
    const columnDefs: ColDef[] = [
        {
            headerName: "Uploaded By",
            field: "Uploaded By",
            flex: 1,
            cellRenderer: (params: any) => {
                // console.log(params.data,'Tharunparams')
                const row = params.data;
                return (
                    <div className="flex items-center gap-2">
                        {row?.userid?.Username || "Username"}

                    </div>
                );
            },
        },
        {
            headerName: "Uploaded At",
            field: "Uploaded At",
            flex: 1,
            cellRenderer: (params: any) => {
                const row = params.data;
                return (
                    <div className="flex items-center gap-2">
                        {GetDate(row?.uploadedAt) || "Date"}
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
                        <a className="flex items-center gap-1 px-3 py-1 text-xs rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"


                            href={`https://docs.google.com/gview?url=${encodeURIComponent(row.fileurl)}&embedded=true`}
                            target="_blank"
                        >
                            <FiEye size={14} />
                            {/* {
                            }  - View */}
                            View

                        </a>

                        {/* DOWNLOAD */}
                        <a href={row?.fileurl} download={row?.fileName || "TaskFiles"} className="flex items-center gap-1 px-3 py-1 text-xs rounded-md bg-green-600 hover:bg-green-700 text-white transition">
                            <FiDownload size={14} />
                            Downloads
                        </a>

                        {/* DELETE */}
                        {row?.userid?._id === JSON.parse(getuserInfo)._id && <button className="flex items-center gap-1 px-3 py-1 text-xs rounded-md bg-red-600 hover:bg-red-700 text-white transition" onClick={() => HandelDeleteFile(row._id)}>
                            <FiTrash2 size={14} />
                            Delete
                        </button>}

                    </div>
                );
            },
        },
    ];

    const HandelDeleteFile = async (Id: string | number) => {
        try {
            setisdelete(true)
            const response = await instance.delete(`/api/Task/${Id}/DeleteFile`)
            console.log(response, 'response')
            const Status = response.status
            if (Status == 200) {
                return GlobalToast(response.data.message, 'success')
            }



        }


        catch (error: any) {
            const Status: number = error?.response?.status
            console.log(Status, 'Status')
            const Message: string = error?.response.data.message
            console.log(Message, 'Message')
            if (Status === 404) {
                return GlobalToast("try Again", 'error')
            }
            if (Status == 500) {
                // return alert("Try again")
                return GlobalToast("Server error", 'error')
            }
            if (Status == 401) {
                // return alert("Try again")
                return GlobalToast("Server error", 'error')
            }


        } finally {

            setisdelete(false)
        }
    }
    return (
        <>
            {isdelete &&
                <ApiLoader
                    text="Deleting File"
                    texttyoe="Please wait. Your file is being deleted securely..."
                />
            }
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
        </>
    );
}

export default TaskFiles;