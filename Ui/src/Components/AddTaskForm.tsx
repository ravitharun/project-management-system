import { useState } from "react";
import Input from "./Input";
import {
  FaTimes,
  FaProjectDiagram,
  FaUser,
  FaCalendarAlt,
  FaMoneyBill,
  FaTags,
  FaUsers,
  FaFlag,
} from "react-icons/fa";

type Props = {
  onclick: () => void;
};

function AddProjectForm({ onclick }: Props) {
  const [projectData, setProjectData] = useState({
    projectName: "",
    description: "",

    owner: {
      userId: "",
      name: "",
      email: "",
    },

    teamMembers: "",

    status: "Not Started",
    priority: "Medium",

    startDate: "",
    endDate: "",

    budget: {
      total: "",
      spent: "",
      currency: "INR",
    },

    tags: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name.startsWith("owner.")) {
      const key = name.split(".")[1];
      setProjectData({
        ...projectData,
        owner: { ...projectData.owner, [key]: value },
      });
    } else if (name.startsWith("budget.")) {
      const key = name.split(".")[1];
      setProjectData({
        ...projectData,
        budget: { ...projectData.budget, [key]: value },
      });
    } else {
      setProjectData({
        ...projectData,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    const formattedData = {
      ...projectData,
      teamMembers: projectData.teamMembers.split(","),
      tags: projectData.tags.split(","),
    };

    console.log("Project Data:", formattedData);
    onclick();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-gray-200 p-6 overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
            <FaProjectDiagram className="text-blue-600" />
            Add Project
          </h2>

          <FaTimes
            onClick={onclick}
            className="cursor-pointer text-gray-500 hover:text-red-500 text-xl"
          />
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Project Name */}
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FaProjectDiagram /> Project Name
            </label>
            <Input type="text" name="projectName" value={projectData.projectName} onChange={handleChange} classNameStyle="mt-1" />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FaTags /> Description
            </label>
            <Input type="text" name="description" value={projectData.description} onChange={handleChange} classNameStyle="mt-1" />
          </div>

          {/* Owner Name */}
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FaUser /> Owner Name
            </label>
            <Input type="text" name="owner.name" value={projectData.owner.name} onChange={handleChange} classNameStyle="mt-1" />
          </div>

          {/* Owner Email */}
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FaUser /> Owner Email
            </label>
            <Input type="email" name="owner.email" value={projectData.owner.email} onChange={handleChange} classNameStyle="mt-1" />
          </div>

          {/* Team Members */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FaUsers /> Team Members
            </label>
            <Input
              type="text"
              name="teamMembers"
              placeholder="user1, user2"
              value={projectData.teamMembers}
              onChange={handleChange}
              classNameStyle="mt-1"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FaFlag /> Status
            </label>
            <select
              name="status"
              value={projectData.status}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FaFlag /> Priority
            </label>
            <select
              name="priority"
              value={projectData.priority}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Dates */}
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FaCalendarAlt /> Start Date
            </label>
            <Input type="date" name="startDate" value={projectData.startDate} onChange={handleChange} classNameStyle="mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FaCalendarAlt /> End Date
            </label>
            <Input type="date" name="endDate" value={projectData.endDate} onChange={handleChange} classNameStyle="mt-1" />
          </div>

          {/* Budget */}
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FaMoneyBill /> Total Budget
            </label>
            <Input type="number" name="budget.total" value={projectData.budget.total} onChange={handleChange} classNameStyle="mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FaMoneyBill /> Spent Budget
            </label>
            <Input type="number" name="budget.spent" value={projectData.budget.spent} onChange={handleChange} classNameStyle="mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FaMoneyBill /> Currency
            </label>
            <select
              name="budget.currency"
              value={projectData.budget.currency}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option>INR</option>
              <option>USD</option>
            </select>
          </div>

          {/* Tags */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FaTags /> Tags
            </label>
            <Input
              type="text"
              name="tags"
              placeholder="React, Node, MongoDB"
              value={projectData.tags}
              onChange={handleChange}
              classNameStyle="mt-1"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onclick} className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
            Cancel
          </button>

          <button onClick={handleSubmit} className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md">
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProjectForm;