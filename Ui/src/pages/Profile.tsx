import { ToastContainer } from "react-toastify";
import Sidebar from "../Components/Navbar";
import {
    FaUserCircle,
    FaEnvelope,
    FaIdBadge,
    FaBuilding,
    FaUserShield,
    FaClock,
} from "react-icons/fa";

const user = {
    _id: "6a16ec6c16d8e9b2a7674c69",
    userID: "EmppPIW",
    dept: "Backend Development",
    userProfile:
        "https://res.cloudinary.com/dqckm1xhq/image/upload/v1779887212/dl0dkk47",
    Username: "tharun",
    userEmail: "tharunravi672@gmail.com",
    userrole: "manager",
    isactive: true,
    lastseen: "2026-05-29T04:10:30.393+00:00",
};

function Profile() {
    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} theme="dark" />

            <div className="flex h-screen bg-gray-50">

                <Sidebar page="Profile" />

                {/* CENTER */}
                <div className="flex-1 flex items-center justify-center p-6">

                    <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-8">

                        {/* TOP */}
                        <div className="flex flex-col items-center text-center">

                            {user.userProfile ? (
                                <img
                                    src={user.userProfile}
                                    className="w-24 h-24 rounded-full object-cover border"
                                />
                            ) : (
                                <FaUserCircle className="text-7xl text-gray-400" />
                            )}

                            <h2 className="mt-4 text-xl font-semibold text-gray-800">
                                {user.Username}
                            </h2>

                            <p className="text-gray-500 text-sm capitalize">
                                {user.userrole}
                            </p>

                            <span
                                className={`mt-2 text-xs px-3 py-1 rounded-full ${
                                    user.isactive
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-600"
                                }`}
                            >
                                {user.isactive ? "Active" : "Inactive"}
                            </span>
                        </div>

                        {/* DETAILS */}
                        <div className="mt-6 space-y-4 text-sm text-gray-700">

                            <div className="flex items-center gap-3">
                                <FaIdBadge className="text-gray-500" />
                                <span>{user.userID}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-gray-500" />
                                <span>{user.userEmail}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaBuilding className="text-gray-500" />
                                <span>{user.dept}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaUserShield className="text-gray-500" />
                                <span>{user.userrole}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaClock className="text-gray-500" />
                                <span>
                                    Last seen:{" "}
                                    {new Date(user.lastseen).toLocaleString()}
                                </span>
                            </div>

                        </div>

                        {/* BUTTON */}
                        <button className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                            Edit Profile
                        </button>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Profile;