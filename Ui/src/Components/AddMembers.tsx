import { useEffect, useState } from "react";
import { FaChevronDown, FaUserPlus } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { instance } from "../services/apiservices";
// import toast from "react-hot-toast";
import { toast, ToastContainer } from "react-toastify";
import { checkuser } from "./LocalStorage";

type ProjectIdProps = {
    projectsid: string;
    onclose: () => void;
};

function AddMembers({ projectsid, onclose }: ProjectIdProps) {
    const [open, setOpen] = useState(false);

    const [userid, setuserid] = useState<number[]>([])
    const [users, setusers] = useState<any[]>([
        {
            id: 1,
            name: "Ravi Tharun",
            role: "Frontend Developer",
        },
        {
            id: 2,
            name: "Pranav Kumar",
            role: "UI/UX Designer",
        },
        {
            id: 3,
            name: "Arjun Reddy",
            role: "Backend Developer",
        },
        {
            id: 4,
            name: "Sai Krishna",
            role: "Team Member",
        },
        {
            id: 5,
            name: "Vikram Teja",
            role: "Tester",
        },
        {
            id: 6,
            name: "Rahul Sharma",
            role: "Project Manager",
        },
    ]);


    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await instance.get("/api/Team")

                setusers(response.data.message)
            } catch (error: any) {
                if (error.response.status == 401) {
                    return checkuser()
                    // redirect("")

                }

            }
        }
        fetchMembers()

    }, [])

    const addmembersIntoArray = (data: number) => {

        setuserid((prev: number[]) => {

            // already exists
            if (prev.includes(data)) {
                return prev.filter((id) => id !== data);
            }

            // add new member
            return [...prev, data];
        });
    };
    const AddMember = async () => {




        if (userid.length == 0) {
            return toast.info("More Than 1 Members are required to added in these project")
        }

        try {
            const response = await instance.put("/api/ManageProject/AddMembers", {
                data: { userid, projectsid }
            })
            if (response.data.message == "Added") {
                return toast.success("Added")
            }
        } catch (error: any) {
            console.error(error.message)
            if (error.status == 404) {
                toast.info("More Than 1 Members are required to added in these project")
            }

        }

    }
    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
                <ToastContainer position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                ></ToastContainer>
                {/* Popup */}
                <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200">

                    {/* Close Button */}
                    <button
                        onClick={onclose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
                    >
                        <MdOutlineClose size={20} />
                    </button>

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <FaUserPlus className="text-blue-600 text-xl" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Add Members
                            </h2>
                            <p className="text-sm text-gray-500">
                                Add team members to project
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Project ID
                            </label>

                            <input
                                type="text"
                                value={projectsid}
                                readOnly
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Role Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Team Role
                            </label>

                            <div className="relative w-full">

                                {/* DROPDOWN BUTTON */}
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 flex items-center justify-between shadow-sm hover:border-blue-400 transition"
                                >
                                    <span className="text-sm text-gray-700">
                                        Select Team Members
                                    </span>

                                    <FaChevronDown
                                        className={`text-gray-500 transition-transform duration-300 ${open ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {/* DROPDOWN MENU */}
                                {open && (
                                    <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto p-2 space-y-1">

                                        {users.map((role, index) => (
                                            <label
                                                key={index}
                                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 accent-blue-600"
                                                    onClick={() => addmembersIntoArray(role._id)}
                                                />

                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-800">
                                                        {role.Username}-({role.userrole == "tl" ? "Team Leader" : role.userrole})
                                                    </span>

                                                    <span className="text-xs text-gray-500">
                                                        {!role.dept ? "No Dept" : role.dept}
                                                    </span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={onclose}
                                className="w-full border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>

                            <button
                                className={`w-full bg-blue-600 text-white py-3 rounded-xl font-medium  transition ${userid.length == 0 ? 'bg-green-100 hover:cursor-not-allowed' : 'hover:bg-blue-700'}`}
                                onClick={AddMember}
                                disabled={userid.length == 0}
                            >
                                Add Member
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-5 text-xs text-gray-400 text-center">
                        Project ID: {projectsid}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddMembers;