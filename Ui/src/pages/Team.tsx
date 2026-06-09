import React, { useEffect, useState } from "react";
import {
  FaTable,
  FaThLarge,
  FaUserCircle,
  FaTasks,
  FaSearch,
} from "react-icons/fa";
import Sidebar from "../Components/Navbar";
import { instance } from "../services/apiservices";
import { departments } from "../types/Dept";
import { checkuser, useremail } from "../Components/LocalStorage";
import { socket } from "../Scokets/ScoketConfig";
import Progress from "../Components/progress";



function Team() {
  const [view, setView] = useState<"table" | "card">("table");

  const [members, setMembers] = useState<any[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<any[]>([]);
  const In = true

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // ---------------- API CALL (SIMULATED) ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/api/Team");

        console.log(response.data.message);

        setMembers(response.data.message);
        setFilteredMembers(response.data.message);

      } catch (error: any) {
        console.error(error.message);
        if (error.response.status == 401) {
          return checkuser()
          // redirect("")

        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {

    const handelTeamdata = (Teamdata: any) => {
      console.log(Teamdata, 'Teamdata');

      setMembers(Teamdata);
      setFilteredMembers(Teamdata);
    };
    const handleOfflineUser = (data: any) => {

      setMembers((prev: any) => {

        const updated = prev.map((member: any) => {

          if (
            member.userEmail === data.userEmail
          ) {
            return {
              ...member,
              isactive: data.isactive,
              lastseen: data.lastseen
            };
          }

          return member;
        });

        // ✅ update filtered also
        setFilteredMembers(updated);

        return updated;
      });

    };
    socket.on(
      "offlineUser",
      handleOfflineUser
    );


    socket.on("Teamdata", handelTeamdata);

    return () => {
      socket.off("Teamdata", handelTeamdata);
      // socket.off("disconnect");
      socket.off(
        "offlineUser",
        handleOfflineUser
      );
    };

  }, []);
  console.log(members, 'membersmembers')


  const applyFilters = (searchText: string, dept: string) => {
    let data = members;

    // SEARCH
    if (searchText) {
      data = data.filter((m) =>
        m.Username.toLowerCase().includes(searchText.toLowerCase()) ||
        m.userrole.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // FILTER
    if (dept !== "All") {
      data = data.filter(
        (m) => m.dept === dept || m.status === dept
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
      {In && <>

        <Progress></Progress>
      </>}
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
                {departments.map((dept: string) => (
                  <option value={dept}>{dept}</option>
                ))}
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

                {


                  filteredMembers?.map((m, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-6 items-center px-4 py-3 border-b hover:bg-gray-50 transition"
                    >
                      {/* User */}
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9">
                          <img
                            src={m?.userProfile || "/default-avatar.png"}
                            alt={m?.Username}
                            className="w-9 h-9 rounded-full object-cover border"
                          />
                          {!m?.userProfile && (
                            <FaUserCircle className="absolute inset-0 m-auto text-gray-400 text-xl" />
                          )}
                        </div>

                        <span className="font-medium text-gray-800 truncate max-w-[120px]">
                          {m?.Username}
                        </span>
                      </div>

                      {/* Department */}
                      <div className="text-gray-600 text-sm flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        {m?.dept || "No Dept"}
                      </div>

                      {/* Tasks */}
                      <div className="flex items-center gap-2 text-gray-700">
                        <FaTasks className="text-gray-500 text-sm" />
                        <span>{m?.totalTask || 0}</span>
                      </div>

                      {/* Progress */}
                      <div className="text-sm font-medium text-gray-700">
                        {m?.progress || 0}%
                      </div>

                      {/* Heat / Activity */}
                      <div
                        className={`w-16 h-2 rounded-full ${getHeatColor(
                          m?.tasks || 0
                        )}`}
                      ></div>

                      {/* Status */}
                      <div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium ${m.isactive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                            }`}
                        >
                          {m.isactive ? "Active" : "Idle"}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {filteredMembers && filteredMembers.length == 0 &&

              <>

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
              </>}

            {/* CARD view  */}
            {view === "card" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredMembers.map((m, i) => (
                  <div
                    key={m.id || i}
                    className="relative bg-white p-5 rounded-2xl shadow hover:shadow-lg transition border"
                  >

                    <div className="absolute top-3 right-3 flex gap-2">

                      {/* Role Badge */}
                      <span className="px-2 py-1 text-[10px] rounded-full bg-blue-100 text-blue-700 font-medium">
                        {m.userrole == "tl" ? "team leader".toUpperCase() : m.userrole.toUpperCase()}
                      </span>

                      {/* YOU badge */}
                      {m.userEmail === useremail && (
                        <span className="px-2 py-1 text-[10px] rounded-full bg-purple-100 text-purple-700 font-medium">
                          You
                        </span>
                      )}
                    </div>

                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12">
                        <img
                          src={m.userProfile || "/default-avatar.png"}
                          alt={m.Username}
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                      </div>

                      <div>
                        <h2 className="font-bold text-gray-800">{m.Username}</h2>
                        <p className="text-sm text-gray-500">{m.userrole}</p>
                      </div>
                    </div>

                    {/* Department */}
                    <p className="text-sm mt-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      {m.dept || "No Department"}
                    </p>

                    {/* Email */}
                    <p className="text-xs text-gray-500 mt-1">
                      {m.userEmail}
                    </p>

                    {/* Tasks & Progress */}
                    <p className="text-sm mt-2">
                      Tasks: {m.totalTask || 0} | Progress: {m.progress || 0}%
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
                      <div
                        className={`h-2 rounded-full ${getHeatColor(m.tasks || 0)}`}
                        style={{ width: `${m.progress || 0}%` }}
                      />
                    </div>

                    {/* Status */}
                    <div className="mt-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${m.isactive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                          }`}
                      >
                        {m.isactive ? "Active" : "Idle"}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        </main >
      </div >


    </>
  );
}

export default Team;