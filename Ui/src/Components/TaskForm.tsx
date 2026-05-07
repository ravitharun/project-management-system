import { useState } from "react"

import Button from "./Button"
import Input from "./Input"

import {
    FaTasks,
    FaUser,
    FaAlignLeft,
    FaFlag,
    FaSpinner,
    FaCalendarAlt,
    FaClock,
    FaTag,
    FaLayerGroup,
    FaChartLine,
    FaTimes,
    FaPlus,
} from "react-icons/fa"

type props = {
    onclose: () => void
}

function TaskForm({ onclose }: props) {

    // STATES
    const [taskName, setTaskName] = useState("")
    const [description, setDescription] = useState("")
    const [assignTo, setAssignTo] = useState("")
    const [priority, setPriority] = useState("Medium")
    const [status, setStatus] = useState("Pending")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [tags, setTags] = useState("")
    const [estimatedHours, setEstimatedHours] = useState("")
    const [progress, setProgress] = useState(0)

    // SUBMIT
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const TaskData = {
            taskName,
            description,
            assignTo,
            priority,
            status,
            startDate,
            endDate,
            tags,
            estimatedHours,
            progress,
        }

        console.log(TaskData)

        alert("Task Added Successfully ")
    }

    return (
        <>

            {/* BACKDROP */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-5" onClick={onclose}>
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    {/* MODAL */}
                    <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
                        {/* HEADER */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex justify-between items-center text-white">
                            <div>
                                <h1 className="text-2xl font-bold flex items-center gap-2">
                                    <FaTasks />
                                    Create New Task's
                                </h1>

                                <p className="text-blue-100 text-sm mt-1">
                                    Manage your project workflow efficiently
                                </p>
                            </div>
                            <button
                                onClick={onclose}
                                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition"
                            >
                                <FaTimes />
                            </button>

                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[85vh] overflow-y-auto hide-scrollbar"
                        >

                            {/* TASK NAME */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-700">
                                    <FaTasks className="text-blue-500" />
                                    Task Name
                                </label>

                                <Input
                                    type="text"
                                    required={true}
                                    placeholder="Enter task name"
                                    value={taskName}
                                    onChange={(e: any) => setTaskName(e.target.value)}
                                    classNameStyle="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* ASSIGN TO */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-700">
                                    <FaUser className="text-purple-500" />
                                    Assign To
                                </label>

                                <Input
                                    type="text"
                                    required={true}
                                    placeholder="Assign member"
                                    value={assignTo}
                                    onChange={(e: any) => setAssignTo(e.target.value)}
                                    classNameStyle="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* DESCRIPTION */}
                            <div className="md:col-span-2">
                                <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-700">
                                    <FaAlignLeft className="text-green-500" />
                                    Description
                                </label>

                                <textarea
                                    placeholder="Enter task description..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full border border-gray-300 rounded-2xl px-4 py-4 h-32 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* PRIORITY */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-700">
                                    <FaFlag className="text-red-500" />
                                    Priority
                                </label>

                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>

                            {/* STATUS */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-700">
                                    <FaSpinner className="text-orange-500" />
                                    Status
                                </label>

                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option>Pending</option>
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                </select>
                            </div>

                            {/* START DATE */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-700">
                                    <FaCalendarAlt className="text-indigo-500" />
                                    Start Date
                                </label>

                                <Input
                                    type="date"
                                    required={true}
                                    value={startDate}
                                    onChange={(e: any) => setStartDate(e.target.value)}
                                    classNameStyle="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* END DATE */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-700">
                                    <FaClock className="text-pink-500" />
                                    End Date
                                </label>

                                <Input
                                    type="date"
                                    required={true}
                                    value={endDate}
                                    onChange={(e: any) => setEndDate(e.target.value)}
                                    classNameStyle="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* TAGS */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-700">
                                    <FaTag className="text-cyan-500" />
                                    Tags
                                </label>

                                <Input
                                    type="text"
                                    required={true}
                                    placeholder="React, Node.js"
                                    value={tags}
                                    onChange={(e: any) => setTags(e.target.value)}
                                    classNameStyle="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* ESTIMATED HOURS */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-700">
                                    <FaLayerGroup className="text-yellow-500" />
                                    Estimated Hours
                                </label>

                                <Input
                                    type="number"
                                    required={true}
                                    placeholder="10 Hours"
                                    value={estimatedHours}
                                    onChange={(e: any) => setEstimatedHours(e.target.value)}
                                    classNameStyle="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* PROGRESS */}
                            <div className="md:col-span-2">

                                <div className="flex justify-between mb-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <FaChartLine className="text-green-500" />
                                        Progress
                                    </label>

                                    <span className="text-sm font-semibold text-blue-600">
                                        {progress}%
                                    </span>
                                </div>

                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={progress}
                                    onChange={(e: any) => setProgress(e.target.value)}
                                    className="w-full accent-blue-600 cursor-pointer"
                                />

                                {/* PROGRESS BAR */}
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mt-3">

                                    <div
                                        className="bg-green-500 h-full rounded-full transition-all duration-700 relative overflow-hidden"
                                        style={{ width: `${progress}%` }}
                                    >

                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-flow" />

                                    </div>

                                </div>

                            </div>

                            {/* BUTTONS */}
                            <div className="md:col-span-2 flex justify-center gap-4 pt-4 border-t">

                                <Button
                                    Btnname={
                                        <span className="flex items-center gap-2">
                                            <FaTimes />
                                            Close
                                        </span>
                                    }
                                    classaName="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl transition"
                                    type="button"
                                    OnclickEvent={onclose}
                                />

                                <Button
                                    Btnname={
                                        <span className="flex items-center gap-2">
                                            <FaPlus />
                                            Add Task
                                        </span>
                                    }
                                    classaName="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition"
                                    type="submit"
                                    OnclickEvent={() => { }}
                                />

                            </div>

                        </form>

                    </div>
                </div>

            </div>

        </>
    )
}

export default TaskForm