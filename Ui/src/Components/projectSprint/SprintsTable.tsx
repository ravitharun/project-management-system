import { useContext, useEffect, useState } from "react";
import { instance } from "../../services/apiservices";
import { useNavigate } from "react-router-dom";
import { checkuser } from "../LocalStorage";
import { AgGridReact, AgGridProvider } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";

import { AllCommunityModule } from "ag-grid-community";
import bgthemeContext from "../../Context/ThemeContext";



const Sprints = ({ workspaceid }: any) => {



    // const GetDateFormat = (date: any) => {
    //     console.log(date, 'datedatedate');

    //     if (!date) return "-"
    //     const a = new Date(date).toLocaleString("en-IN", {
    //         day: "2-digit",
    //         month: "short",
    //         year: "numeric",
    //         hour: "2-digit",
    //         minute: "2-digit",
    //     });
    //     console.log(a, 'tharun');
    // }
    const modules = [AllCommunityModule];
    const { theme }: any = useContext(bgthemeContext)
    const redirect = useNavigate()


    const [Sprints, setSprint] = useState<any>([])
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
                console.log(params?.data?.SprintEndDate, 'params?.data?.SprintEndDate');

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

    ];

    return (



        <>



            <AgGridProvider modules={modules}>
                <div
                    className={`${theme === "Dark"
                        ? "ag-theme-alpine-dark"
                        : "ag-theme-alpine"
                        } w-full h-[500px] rounded-xl`}
                >
                    <AgGridReact
                        rowData={Sprints}
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
    )
}

export default Sprints