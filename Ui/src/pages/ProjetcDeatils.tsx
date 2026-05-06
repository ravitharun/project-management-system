import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Navbar";
import Button from "../Components/Button";
import {
    FaArrowLeft,
    FaUser,
    FaCalendarAlt,
    FaUsers,
    FaTag,
    FaMoneyBillWave,
    FaPlus,
    FaFileUpload,
    // FaFileUpload
} from "react-icons/fa";
import Input from "../Components/Input";

function ProjetcDeatils() {
    const data = useLocation().state.project;
    const navigate = useNavigate();

    const statusColor =
        data?.status === "Completed"
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600";

    const priorityColor =
        data?.priority === "High"
            ? "bg-red-100 text-red-600"
            : "bg-blue-100 text-blue-600";

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar page="Projects" />

            <main className="flex-1 p-6 overflow-y-auto">

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
                            OnclickEvent={() => console.log("Add Task")}
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

      <FaFileUpload className="text-gray-400 text-2xl" />

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
        onChange={(e: any) => console.log(e.target.files[0])}
        classNameStyle="hidden"
      />

    </label>
  </div>

  {/* NOTE */}
  <p className="text-xs text-gray-500 leading-relaxed text-center">
    Upload documents to help your team understand the project better.
  </p>

  {/* PROGRESS */}
  <div className="mt-2">
    <div className="flex justify-between text-xs text-gray-500 mb-1">
      <span>Progress</span>
      <span>{data?.progress || 0}%</span>
    </div>

    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-green-500 h-3 rounded-full transition-all"
        style={{ width: `${data?.progress || 0}%` }}
      />
    </div>
  </div>

</div>
                </div>

                {/* DETAILS GRID */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                        <h2 className="flex items-center gap-2 font-semibold mb-3">
                            <FaUser /> Owner
                        </h2>
                        <p className="text-gray-800">{data?.owner?.name}</p>
                        <p className="text-gray-500 text-sm">{data?.owner?.email}</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
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

                    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
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

                    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
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
            </main>
        </div>
    );
}

export default ProjetcDeatils;