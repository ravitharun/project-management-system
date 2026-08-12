import { useContext, useEffect, useState } from "react";
import { instance } from "../../services/apiservices";
import { useNavigate } from "react-router-dom";
import { checkuser } from "../LocalStorage";
import { AgGridReact, AgGridProvider } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";

import { AllCommunityModule } from "ag-grid-community";
import bgthemeContext from "../../Context/ThemeContext";
import { socket } from "../../Scokets/ScoketConfig";
// import { toast, ToastContainer } from "react-toastify";
// import { toast, ToastContainer } from "react-toastify";
import { toast} from "sonner";




const Sprints = ({ workspaceid }: any) => {
    alert("Sprint")

    const tasks = [
        {
            _id: "task1",
            TaskId: "TASK-101",
            TaskName: "Design Login Page",
            TaskDescription: "Create responsive login UI",
            TaskStatus: "TODO",
            TaskPriority: "HIGH",
            AssiginMember: "Ravi",
            SprintId: null,
            SprintName: null,
            DueDate: "2026-08-12",
            SubTask: [
                {
                    TaskId: "SUB-101",
                    taskName: "Create Login Form",
                    AssiginMember: "Ravi",
                    SubTaskStatus: "TODO",
                    taskPriority: "HIGH",
                },
                {
                    TaskId: "SUB-102",
                    taskName: "Validate Inputs",
                    AssiginMember: "Ravi",
                    SubTaskStatus: "TODO",
                    taskPriority: "MEDIUM",
                },
            ],
        },
        {
            _id: "task2",
            TaskId: "TASK-102",
            TaskName: "Authentication API",
            TaskDescription: "Implement JWT Authentication",
            TaskStatus: "IN_PROGRESS",
            TaskPriority: "HIGH",
            AssiginMember: "Kiran",
            SprintId: "SPRINT-1",
            SprintName: "Sprint 1",
            DueDate: "2026-08-15",
            SubTask: [
                {
                    TaskId: "SUB-201",
                    taskName: "Generate JWT",
                    AssiginMember: "Kiran",
                    SubTaskStatus: "DONE",
                    taskPriority: "HIGH",
                },
                {
                    TaskId: "SUB-202",
                    taskName: "Refresh Token",
                    AssiginMember: "Kiran",
                    SubTaskStatus: "IN_PROGRESS",
                    taskPriority: "HIGH",
                },
            ],
        },
        {
            _id: "task3",
            TaskId: "TASK-103",
            TaskName: "Dashboard UI",
            TaskDescription: "Create Admin Dashboard",
            TaskStatus: "TODO",
            TaskPriority: "MEDIUM",
            AssiginMember: "Rahul",
            SprintId: "SPRINT-1",
            SprintName: "Sprint 1",
            DueDate: "2026-08-14",
            SubTask: [],
        },
        {
            _id: "task4",
            TaskId: "TASK-104",
            TaskName: "Notification Module",
            TaskDescription: "Real-time notifications",
            TaskStatus: "DONE",
            TaskPriority: "LOW",
            AssiginMember: "Sneha",
            SprintId: "SPRINT-1",
            SprintName: "Sprint 1",
            DueDate: "2026-08-13",
            SubTask: [],
        },
        {
            _id: "task5",
            TaskId: "TASK-105",
            TaskName: "Profile Page",
            TaskDescription: "User profile screen",
            TaskStatus: "TODO",
            TaskPriority: "MEDIUM",
            AssiginMember: "Arun",
            SprintId: null,
            SprintName: null,
            DueDate: "2026-08-18",
            SubTask: [],
        },
    ];


    const modules = [AllCommunityModule];
    const { theme }: any = useContext(bgthemeContext)
    const redirect = useNavigate()


    const [Sprints, setSprint] = useState<any>(tasks)
    useEffect(() => {


        const FetchworkspaceSprints = async () => {

            try {
                const response = await instance.get(`/api/sprints/${workspaceid._id}/sprint`)

                setSprint(response.data.data);

            } catch (error: any) {



                const status = error.response.status


                if (status == 401) { return checkuser(redirect) }


            }
        }

        FetchworkspaceSprints()
    }, [workspaceid])


    useEffect(() => {
        const GetActviesprints = (data: any) => {

            setSprint(data)


        }

        socket.on("ActvieSprint", GetActviesprints)


        return () => {
            socket.off("ActvieSprint", GetActviesprints);

            socket.off("connect");
            socket.off("disconnect");
        }

    }, [])
    const handleDrag = (params: any) => {
        console.log("Dragging:", params.node.data);
    };


    const columnDefs: ColDef[] = [
        {
            field: "SprintId",
            headerName: "Sprint ID",
            width: 150,
            flex: 1,
            editable: false,
            cellRenderer: (params: any) => {
                return <div>{params.id}</div>;
            },
        },

        {
            field: "SprintOrder",
            headerName: "Sprint Order",
            width: 150,
            flex: 1,
            editable: false,
            cellRenderer: (params: any) => {
                return <div>Sprint {params.data.SprintOrder}</div>;
            },
        },

        {
            field: "SprintName",
            headerName: "Sprint Name",
            flex: 1,
            editable: true,
        },
        {
            field: "Sprint Goal",
            headerName: "Sprint Goal",
            flex: 1,
            editable: true,
            cellRenderer: (params: any) => {


                return (


                    <>

                        <div>{params.data.SprintGoal}</div>
                    </>
                )
            }
        },

        {
            field: "Sprintstatus",
            headerName: "Sprint Status",
            cellRenderer: (params: any) => {
                const color =
                    params?.data.SprintStatus === "Completed"
                        ? "bg-green-500/20 text-green-400"
                        : params.value === "PLANNED"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-yellow-500/20 text-yellow-400";

                return (
                    <button
                        className={`px-3 py-1 rounded-full text-xs ${color}`}
                    >
                        {params?.data.SprintStatus}
                    </button>
                );
            },
        },

        {
            field: "SprintStartDate",
            headerName: "Sprint StartDate",
            cellRenderer: (params: any) => {

                return (
                    <button
                        className={`px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400`}
                    >
                        {/* {params?.data.SprintStartDate} */}
                        {new Date(params?.data?.SprintStartDate).toLocaleDateString()}
                    </button>
                );
            },
        },
        {
            field: "SprintEndDate",
            headerName: "Sprint EndDate",
            cellRenderer: (params: any) => {

                const Alert =
                    new Date(params?.data?.SprintEndDate).toLocaleDateString() == new Date().toLocaleDateString()
                        ? "bg-red-100 text-red-700 border border-red-200"
                        : "bg-blue-100 text-blue-700 border border-blue-200";
                return (
                    <button
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${Alert}`}
                    >
                        {new Date(params?.data?.SprintEndDate).toLocaleDateString()}
                    </button>
                );
            },
        },




        {
            field: "SprintActive",
            headerName: "Sprint Active",
            cellRenderer: (params: any) => {
                console.log(params, 'params');

                const color =
                    params.SprintActive
                        ? "text-red-400"

                        : "text-green-400";

                return (
                    <span className={`font-medium ${color}`}>
                        {params.value ? "Active" : params?.data.SprintStatus}
                    </span>
                );
            },
        },
        {
            field: "Action",
            headerName: "Action",
            editable: false,
            cellRenderer: (params: any) => {


                // console.log(params.data._id);

                return (


                    <>


                        <button
                            onClick={() => HandelSprint(params?.data._id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${params?.data?.SprintActive
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-green-500 hover:bg-green-600"
                                }`}
                        >
                            {params?.data?.SprintActive ? "Stop Sprint" : "Start Sprint"}
                        </button>                    </>
                )
            }
        }

    ];

    const HandelSprint = async (Sprintid: any) => {
        try {
            const response = await instance.put(`/api/sprints/${Sprintid}/${workspaceid?._id}/Updatesprint`)
            console.log(response.data, 'tharun');

        } catch (error: any) {


            const status = error.response.status
            const error_msg = error.response.data.message

            if (status == 400) {
                return toast.custom(() => (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 shadow-lg">
                        <p className="font-medium text-red-700">
                            {error_msg}.
                        </p>
                    </div>
                ));
            }

            if (status == 401) {


                return checkuser(redirect)
            }

        }
    }

    return (



        <>

            {/* <Toaster position="bottom-center" richColors /> */}

            <AgGridProvider modules={modules}>
                <div
                    className={`${theme === "Dark"
                        ? "ag-theme-alpine-dark"
                        : "ag-theme-alpine"
                        } w-full h-[500px] rounded-xl`}
                >
                    <AgGridReact
                        rowData={Sprints}
                        columnDefs={columnDefs}

                        // Row Drag
                        rowDragManaged={true}
                        rowDragEntireRow={true}
                        onRowDragMove={handleDrag}

                        // Master Detail
                        masterDetail={true}
                        isRowMaster={(data: any) =>
                            data?.SubTask && data?.SubTask?.length > 0
                        }

                        autoGroupColumnDef={{
                            headerName: "Tasks",
                            minWidth: 200,
                            cellRendererParams: {
                                suppressCount: true,
                            },
                        }}

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
                            console.log(params.data);
                        }}

                        detailCellRendererParams={{
                            detailGridOptions: {
                                columnDefs: [
                                    { field: "TaskId", headerName: "SubTask TaskId" },
                                    { field: "taskName", headerName: "SubTask Name" },
                                    {
                                        field: "AssiginMember",
                                        headerName: "Assign Member",
                                    },
                                    {
                                        field: "SubTaskStatus",
                                        headerName: "SubTask Status",
                                    },
                                    {
                                        field: "taskPriority",
                                        headerName: "SubTask Priority",
                                    },
                                ],
                                defaultColDef: {
                                    flex: 1,
                                    minWidth: 150,
                                    resizable: true,
                                    sortable: true,
                                    editable: true,
                                    filter: true,
                                },
                            },
                            getDetailRowData: (params: any) => {
                                params.successCallback(params.data.SubTask || []);
                            },
                        }}
                    />
                </div>
            </AgGridProvider>




        </>
    )
}

export default Sprints