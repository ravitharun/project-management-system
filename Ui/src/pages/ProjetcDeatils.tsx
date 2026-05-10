import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Navbar";
import Button from "../Components/Button";
// import { MdWork } from "react-icons/md";
import {
    FaArrowLeft,
    FaUser,
    FaCalendarAlt,
    FaUsers,
    FaTag,
    FaMoneyBillWave,
    FaPlus,
    FaFileUpload,
    // FaFilePdf
    // FaFileUpload
} from "react-icons/fa";
import "../index.css"
import Input from "../Components/Input";
import toast from "react-hot-toast";
import { getuserInfo } from "../Components/LocalStorage";
import { instance } from "../services/apiservices";
import { useEffect, useState } from "react";
import TaskForm from "../Components/TaskForm";
import ProjectDocuments from "../Components/ProjectDocuments";
import TasksByProjectId from "../Components/TasksByProjectId";

function ProjetcDeatils() {
    const data = useLocation().state.project;
    const navigate = useNavigate();
    console.log(data, 'data')
    const [ProjectInfo, setProjectInfo] = useState<any>([])
    const [Addtask, setAddtask] = useState<boolean>(false)

    const statusColor =
        data?.status === "Completed"
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600";

    const priorityColor =
        data?.priority === "High"
            ? "bg-red-100 text-red-600"
            : "bg-blue-100 text-blue-600";
    const HandelFile = async (e: any) => {
        const fileFormdata = new FormData()
        const userinfo: any = {
            Info: getuserInfo ? JSON.parse(getuserInfo) : null
        }
        console.log(userinfo, 'userinfo')
        const uploadfile = e.target.files[0]
        if (!uploadfile) { return alert("file    is required to Upload") }
        fileFormdata.append("uploadfile", uploadfile)
        fileFormdata.append("projectId", data.projectId)
        fileFormdata.append("Username", userinfo.Info.Username)
        fileFormdata.append("userEmail", userinfo.Info.userEmail)
        fileFormdata.append("userrole", userinfo.Info.userrole)



        try {
            const response = await instance.post("/api/ProjectfileUpload/upload", fileFormdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if (response.data.
                message
                ===
                "File uploaded.") {
                setTimeout(() => {
                    return toast.success("File uploaded.")
                }, 1500);
            }
        } catch (error: any) {
            return toast.error(error.message)
        }

    }



    useEffect(() => {
        const GetProjects = async () => {
            try {
                const response = await instance.get("api/ProjectfileUpload/Fileuploads", {
                    params: {
                        projectsid: data?.projectId
                    }
                })
                setProjectInfo(response.data.data)
                console.log(response.data.data, 'response.data.data')
            } catch (error: any) {
                console.log(error.message)
                toast.error(error)


            }
        }
        GetProjects()
    }, [])

    const handelClose = () => {
        setAddtask((prev) => !prev)
    }
    const Data = getuserInfo ? JSON.parse(getuserInfo) : null
    const AddedBy: any = {
        name: Data.Username,
        userEmail: Data.userEmail,
        userrole: Data.userrole,

    }



    useEffect(() => {

        const FetchTask = async () => {
            const response = await instance.get("/api/Task/TaskBYPproject", {
                params: {
                    projectId: data.projectId
                }
            })
            console.log(response,'responses')

        }
        FetchTask()
    }, [])

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar page="Projects" />

            <main className="flex-1 p-6 overflow-y-auto hide-scrollbar space-y-6">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {data?.projectName}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Project ID: {data?.projectId}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            Btnname={
                                <span className="flex items-center gap-2">
                                    <FaPlus /> Add Task
                                </span>
                            }
                            classaName="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md"
                            OnclickEvent={handelClose}
                            type="button"
                        />

                        <Button
                            Btnname={
                                <span className="flex items-center gap-2">
                                    <FaArrowLeft /> Back
                                </span>
                            }
                            classaName="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-xl"
                            OnclickEvent={() => navigate("/Projects")}
                            type="button"
                        />
                    </div>
                </div>

                {/* HERO CARD */}
                <div className="bg-white rounded-2xl p-6 shadow mb-6 flex flex-col md:flex-row justify-between gap-6">

                    {/* LEFT */}
                    <div className="flex-1">
                        <p className="text-gray-600 mb-3">{data?.description}</p>

                        <div className="flex gap-3 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-sm ${statusColor}`}>
                                {data?.status}
                            </span>

                            <span className={`px-3 py-1 rounded-full text-sm ${priorityColor}`}>
                                {data?.priority} Priority
                            </span>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="w-full md:w-64 flex flex-col gap-3">

                        {/* UPLOAD BOX */}
                        <div className="border-2 border-dotted border-gray-300 rounded-xl p-5 text-center hover:border-blue-400 hover:bg-gray-50 transition">

                            <label className="cursor-pointer flex flex-col items-center gap-2">

                                <FaFileUpload className="text-blue-500 text-3xl bg-blue-100 p-2 rounded-full" />

                                <span className="text-sm font-medium text-gray-700">
                                    Upload Project File
                                </span>

                                <span className="text-xs text-gray-400">
                                    Click to upload (PDF only)
                                </span>

                                <Input
                                    required={true}
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e: any) => HandelFile(e)}
                                    classNameStyle="hidden"
                                />

                            </label>
                        </div>

                        <p className="text-xs text-gray-500 leading-relaxed text-center">
                            Upload documents to help your team understand the project better.
                        </p>

                        {/* PROGRESS */}
                        <div className="mt-2">

                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>{data?.progress || 0}%</span>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-green-500 h-full rounded-full transition-all duration-700"
                                    style={{ width: `${data?.progress || 0}%` }}
                                />
                            </div>

                        </div>

                    </div>
                </div>

                {/* DETAILS GRID */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <h2 className="flex items-center gap-2 font-semibold mb-3">
                            <FaUser /> Owner
                        </h2>
                        <p className="text-gray-800">{data?.owner?.name}</p>
                        <p className="text-gray-500 text-sm">{data?.owner?.email}</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <h2 className="flex items-center gap-2 font-semibold mb-3">
                            <FaCalendarAlt /> Timeline
                        </h2>
                        <p className="text-gray-600">
                            Start: {new Date(data?.startDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                            End: {new Date(data?.endDate).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <h2 className="flex items-center gap-2 font-semibold mb-3">
                            <FaMoneyBillWave /> Budget
                        </h2>
                        <p className="text-gray-600">
                            ₹{data?.budget?.total?.toLocaleString("en-IN")}
                        </p>
                        <p className="text-gray-500 text-sm">
                            Spent: ₹
                            {(data?.budget?.spent < 0 ? 0 : data?.budget?.spent)
                                ?.toLocaleString("en-IN")}
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition lg:col-span-2">
                        <h2 className="flex items-center gap-2 font-semibold mb-3">
                            <FaUsers /> Team Members
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            {data?.teamMembers?.map((m: string, i: number) => (
                                <span
                                    key={i}
                                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                                >
                                    {m}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <h2 className="flex items-center gap-2 font-semibold mb-3">
                            <FaTag /> Tech Stack
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            {data?.tags?.map((tag: string, i: number) => (
                                <span
                                    key={i}
                                    className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>


                {/* ProjectInfo */}
                <div className="p-6 bg-gray-100 rounded-2xl mt-6">

                    <ProjectDocuments ProjectInfo={ProjectInfo} />
                </div>
                <div className="p-6 bg-gray-100 rounded-2xl mt-6">

                    <TasksByProjectId ProjectTask={ProjectInfo} />
                </div>

                {Addtask && <>


                    <div className="ml-10">

                        <TaskForm onclose={handelClose} projectid={data.projectId} AddedBy={AddedBy}></TaskForm>
                    </div>
                </>}
            </main>
        </div>
    );
}

export default ProjetcDeatils;