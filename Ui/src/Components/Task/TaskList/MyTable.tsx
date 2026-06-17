import { AgGridReact, AgGridProvider } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { useEffect, useRef, useState } from "react";
import ViewProfileCard from "../../PoupProfileCard/ViewProfileCard";
import { fetchtaskApi } from "../../../services/taskApi";
import SubTaskCell from "./SubTaskCell ";

const modules = [AllCommunityModule];
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { MasterDetailModule, RowGroupingModule } from "ag-grid-enterprise";

ModuleRegistry.registerModules([
    AllCommunityModule,
    MasterDetailModule,
    RowGroupingModule,
]);

export type RowData = {
    taskid: string;
    AssignedTo: string;
    taskname: string;
    status: string;
    priority: string;
    action: string;
    SubTask?: any[];
};

const MyTable = ({ theme = "Dark", spaceid }: any) => {
    const timeoutRef = useRef<any>(null);

    const [popupPos, setPopupPos] = useState({
        x: 0,
        y: 0,
        show: false,
        userInof: {},
    });

    const [rowData, setrowData] = useState<any[]>([]);

    useEffect(() => {
        const FetchTasks = async () => {
            try {
                const response = await fetchtaskApi(spaceid);

                const formattedData = response.data.message.map((item: any) => ({
                    taskid: item.Taskid,
                    taskname: item.taskName,
                    status: item.status || "Pending",
                    priority: item.priority || "Low",
                    AssignedTo: item.AssignedTo || "Unassigned",
                    action: "View",
                    _id: item._id,
                    SubTask: item.SubTask || [],
                    Files: item.Files,
                    Links: item.Links,
                }));

                setrowData(formattedData);
            } catch (error) {
                console.log(error);
            }
        };

        FetchTasks();
    }, []);

    const columnDefs: ColDef[] = [
        {
            headerName: "",
            field: "expand",
            width: 50,
            cellRenderer: "agGroupCellRenderer",
        },
        {
            field: "taskid",
            headerName: "Task ID",
            width: 150,
            flex: 1,
            cellRenderer: (params: any) => {
                return <div>{params.data.taskid}</div>;
            },
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
                    <button
                        className={`px-3 py-1 rounded-full text-xs ${color}`}
                    >
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

                return (
                    <span className={`font-medium ${color}`}>
                        {params.value}
                    </span>
                );
            },
        },
        {
            field: "AssignedTo",
            headerName: "Assigned To",
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
                                userInof: {
                                    username: params
                                },
                            });
                        }}
                        onMouseLeave={() => {
                            timeoutRef.current = setTimeout(() => {
                                setPopupPos((prev) => ({
                                    ...prev,
                                    show: false,
                                    userInof: {},
                                }));
                            }, 800);
                        }}
                    >
                        <span className="cursor-pointer text-blue-500">
                            {params.value}
                        </span>
                    </div>
                );
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
        <>
            {/* POPUP */}
            {popupPos.show && (
                <div
                    className="fixed z-[9999]"
                    style={{
                        top: popupPos.y + 10,
                        left: popupPos.x + 10,
                    }}
                >
                    <ViewProfileCard
                        userInof={popupPos.userInof}
                        theme={theme}
                    />
                </div>
            )}

            <AgGridProvider modules={modules}>
                <div
                    className={`${theme === "Dark"
                        ? "ag-theme-alpine-dark"
                        : "ag-theme-alpine"
                        } w-full h-[500px] rounded-xl`}
                >
                    <AgGridReact
                        rowData={rowData}
                        masterDetail={true}

                        isRowMaster={(data: any) => {
                            return data?.SubTask && data.SubTask.length > 0;
                        }}

                        autoGroupColumnDef={{
                            headerName: "Tasks",
                            minWidth: 200,
                            cellRendererParams: {
                                suppressCount: true,
                            },
                        }}

                        columnDefs={columnDefs}
                        domLayout="autoHeight"
                        suppressHorizontalScroll={true}

                        defaultColDef={{
                            resizable: true,
                            sortable: true,
                            filter: true,
                            editable: true,
                            flex: 1,
                            minWidth: 150,
                        }}

                        onCellClicked={(params) => {
                            console.log("Cell clicked:", params.data);
                        }}

                        detailCellRendererParams={{
                            detailGridOptions: {
                                columnDefs: [
                                    { field: "TaskId", headerName: "SubTask TaskId" },
                                    { field: "taskName", headerName: "SubTask Name" },

                                    {
                                        field: "AssiginMember",
                                        headerName: "Assigin Member",

                                        cellRenderer: (params: any) => {
                                            console.log(params.data,'params')
                                            return (
                                                <div
                                                    className="inline-block"
                                                    onMouseEnter={(e: any) => {
                                                        clearTimeout(timeoutRef.current);

                                                        setPopupPos({
                                                            x: e.clientX,
                                                            y: e.clientY,
                                                            show: true,
                                                            userInof: {
                                                                username: params.value
                                                            },
                                                        });
                                                    }}
                                                    onMouseLeave={() => {
                                                        timeoutRef.current = setTimeout(() => {
                                                            setPopupPos((prev) => ({
                                                                ...prev,
                                                                show: false,
                                                                userInof: {},
                                                            }));
                                                        }, 800);
                                                    }}
                                                >
                                                    <span className="cursor-pointer text-blue-500">
                                                        {params.data?.AssiginMember?.Name}
                                                    </span>
                                                </div>
                                            );
                                        },
                                    },





                                    { field: "SubTaskStatus", headerName: "SubTask Status" },
                                    { field: "taskPriority", headerName: "SubTask Priority" },
                                ],

                                defaultColDef: {
                                    flex: 1,
                                    minWidth: 150,
                                    resizable: true,
                                    sortable: true,
                                    editable: true,
                                    filter: true,
                                },

                                suppressHorizontalScroll: false,
                            },

                            getDetailRowData: (params: any) => {
                                params.successCallback(params.data.SubTask || []);
                            },
                        }}
                    />
                </div>
            </AgGridProvider>
        </>
    );
};

export default MyTable;