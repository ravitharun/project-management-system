import React, { useEffect, useState } from "react";
import {
  FaTable,
  FaThLarge,
  FaUserCircle,
  FaTasks,
  FaSearch,
} from "react-icons/fa";
import Sidebar from "../Components/Navbar";

type MemberType = {
  name: string;
  role: string;
  department: string;
  tasks: number;
  completed: number;
  progress: number;
  status: string;
};

function Team() {
  const [view, setView] = useState<"table" | "card">("table");

  const [members, setMembers] = useState<MemberType[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<MemberType[]>([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // ---------------- API CALL (SIMULATED) ----------------
  useEffect(() => {
    const fetchData = async () => {
      const data: MemberType[] = [
        {
          name: "Ravi Kumar",
          role: "Frontend Developer",
          department: "UI",
          tasks: 14,
          completed: 10,
          progress: 78,
          status: "Active",
        },
        {
          name: "John Mathew",
          role: "Backend Developer",
          department: "API",
          tasks: 9,
          completed: 5,
          progress: 55,
          status: "Idle",
        },
        {
          name: "Sara Sharma",
          role: "UI/UX Designer",
          department: "Design",
          tasks: 7,
          completed: 7,
          progress: 100,
          status: "Active",
        },
        {
          name: "Amit Verma",
          role: "Full Stack Developer",
          department: "Product",
          tasks: 16,
          completed: 11,
          progress: 68,
          status: "Active",
        },
        {
          name: "Neha Reddy",
          role: "QA Engineer",
          department: "Testing",
          tasks: 6,
          completed: 4,
          progress: 70,
          status: "Idle",
        },
      ];

      setMembers(data);
      setFilteredMembers(data);
    };

    fetchData();
  }, []);

  const applyFilters = (searchText: string, dept: string) => {
    let data = members;

    // SEARCH
    if (searchText) {
      data = data.filter((m) =>
        m.name.toLowerCase().includes(searchText.toLowerCase()) ||
        m.role.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // FILTER
    if (dept !== "All") {
      data = data.filter(
        (m) => m.department === dept || m.status === dept
      );
    }

    setFilteredMembers(data);
  };

  // ---------------- SEARCH HANDLER ----------------
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    applyFilters(value, filter);
  };

  // ---------------- FILTER HANDLER ----------------
  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilter(value);
    applyFilters(search, value);
  };

  // ---------------- HEATMAP ----------------
  const getHeatColor = (tasks: number) => {
    if (tasks >= 12) return "bg-red-500";
    if (tasks >= 8) return "bg-orange-400";
    if (tasks >= 5) return "bg-yellow-300";
    return "bg-green-400";
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar page="Team" />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="p-6 bg-gray-100 min-h-screen">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">

              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Team  Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  Manage team, workload & performance
                </p>
              </div>

              {/* VIEW TOGGLE */}
              <div className="flex bg-white shadow rounded-lg overflow-hidden">

                <button
                  onClick={() => setView("table")}
                  className={`px-4 py-2 flex items-center gap-2 text-sm ${view === "table" ? "bg-blue-600 text-white" : ""
                    }`}
                >
                  <FaTable /> Table
                </button>

                <button
                  onClick={() => setView("card")}
                  className={`px-4 py-2 flex items-center gap-2 text-sm ${view === "card" ? "bg-blue-600 text-white" : ""
                    }`}
                >
                  <FaThLarge /> Cards
                </button>

              </div>
            </div>

            {/* FILTER BAR */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">

              {/* SEARCH */}
              <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow w-full">
                <FaSearch className="text-gray-500" />
                <input
                  placeholder="Search members..."
                  className="ml-2 w-full outline-none"
                  value={search}
                  onChange={handleSearch}
                />
              </div>

              {/* FILTER */}
              <select
                className="bg-white px-3 py-2 rounded-lg shadow"
                value={filter}
                onChange={handleFilter}
              >
                <option value="All">All</option>
                <option value="UI">UI</option>
                <option value="API">API</option>
                <option value="Design">Design</option>
                <option value="Product">Product</option>
                <option value="Testing">Testing</option>
                <option value="Active">Active</option>
                <option value="Idle">Idle</option>
              </select>

            </div>

            {/* ================= TABLE VIEW ================= */}
            {view === "table" && (
              <div className="bg-white rounded-xl shadow overflow-hidden">

                <div className="grid grid-cols-6 bg-gray-200 p-3 text-sm font-semibold">
                  <div>Name</div>
                  <div>Dept</div>
                  <div>Tasks</div>
                  <div>Progress</div>
                  <div>Workload</div>
                  <div>Status</div>
                </div>

                {filteredMembers.length == 0 ? <>

                  <div className="flex flex-col items-center justify-center h-64 text-center p-6 border border-dashed border-gray-300 rounded-xl bg-gray-50">

                    <svg
                      className="w-14 h-14 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 9.4a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM3.75 20.25a8.25 8.25 0 0116.5 0"
                      />
                    </svg>

                    <h2 className="text-lg font-semibold text-gray-700">
                      No Team Members Found
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      It looks like there are no team members available right now.
                    </p>

                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                      Add Member
                    </button>
                  </div>
                </> : filteredMembers.map((m, i) => (
                  <div key={i} className="grid grid-cols-6 p-4 border-b">

                    <div className="flex items-center gap-2">
                      <FaUserCircle className="text-2xl text-gray-500" />
                      {m.name}
                    </div>

                    <div>{m.department}</div>

                    <div className="flex items-center gap-1">
                      <FaTasks /> {m.tasks}
                    </div>

                    <div>{m.progress}%</div>

                    <div className={`w-16 h-5 rounded ${getHeatColor(m.tasks)}`}></div>

                    <div>{m.status}</div>

                  </div>
                ))}
              </div>
            )}

            {/* ================= CARD VIEW ================= */}
            {view === "card" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {filteredMembers.map((m, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl shadow">

                    <div className="flex items-center gap-3">
                      <FaUserCircle className="text-5xl text-gray-400" />
                      <div>
                        <h2 className="font-bold">{m.name}</h2>
                        <p className="text-sm text-gray-500">{m.role}</p>
                      </div>
                    </div>

                    <p className="text-sm mt-3">
                      Dept: {m.department}
                    </p>

                    <p className="text-sm">
                      Tasks: {m.tasks} | Progress: {m.progress}%
                    </p>

                    <div className={`h-2 mt-3 rounded ${getHeatColor(m.tasks)}`}></div>

                  </div>
                ))}
              </div>
            )}

          </div>
        </main>
      </div>


    </>
  );
}

export default Team;