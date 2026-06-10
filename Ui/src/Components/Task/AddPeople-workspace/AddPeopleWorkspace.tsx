import { useState } from "react";
import {
    FiMail,
    FiUsers,
    FiX,
    FiUserPlus,
} from "react-icons/fi";
import { instance } from "../../../services/apiservices";
import { toast } from "react-toastify";

function AddPeopleWorkspace({ theme, closesetAddMembers, workspace }: any) {
    const [emails, setEmails] = useState("");
    console.log(emails)
    const dark = theme === "Dark";


    const Submit = async () => {
        try {
            if (!emails) { return toast.info("email is requried to add the Memeber") }
            const arr_email = emails.split(",")
            const data = {
                workspace,
                arr_email
            }
            const response = await instance.post("/api/WorkSpace/AddTOWorkSpace", { data })
            if (response.status == 200) {
                toast.success("Email Sent.")
                if (response.data.Samemember) {
                    setTimeout(() => {
                        return toast.info(response.data.Samemember)
                    }, 1000);
                }
            }
        } catch (error: any) {

            console.log(error?.response.status)
            if (error?.response.status == 400) {
                return toast.info(error?.response?.data?.message)
            }


            // console.log(error?.response?.status)

        }
    }

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm
      ${dark ? "bg-black/60" : "bg-black/30"}
    `}
        >
            <div
                className={`w-full max-w-md rounded-3xl border overflow-hidden shadow-2xl
        ${dark
                        ? "bg-[#0f172a] border-white/10 text-white"
                        : "bg-white border-gray-200 text-black"
                    }
      `}
            >
                {/* Header */}
                <div
                    className={`flex items-center justify-between px-6 py-5 border-b
          ${dark ? "border-white/10" : "border-gray-200"}
        `}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className={`p-3 rounded-2xl
              ${dark ? "bg-white/10" : "bg-gray-100"}
            `}
                        >
                            <FiUsers size={22} />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold">
                                Add Members
                            </h2>

                            <p
                                className={`text-sm mt-1
                ${dark ? "text-gray-400" : "text-gray-500"}
              `}
                            >
                                Add multiple emails separated by commas
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => closesetAddMembers(false)}
                        className={`p-2 rounded-xl transition-all duration-200
            ${dark
                                ? "hover:bg-white/10"
                                : "hover:bg-gray-100"
                            }
          `}
                    >
                        <FiX size={22} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <label className="text-sm font-medium mb-3 block">
                        Email Addresses
                    </label>

                    <div
                        className={`flex items-start gap-3 px-4 py-4 rounded-2xl border
            ${dark
                                ? "border-white/10 bg-white/[0.03]"
                                : "border-gray-200 bg-gray-50"
                            }
          `}
                    >
                        <FiMail
                            className={`mt-1
              ${dark ? "text-gray-400" : "text-gray-500"}
            `}
                        />

                        <textarea
                            rows={5}
                            value={emails}
                            onChange={(e) => setEmails(e.target.value)}
                            placeholder="example1@gmail.com, example2@gmail.com, example3@gmail.com"
                            className={`w-full bg-transparent outline-none resize-none text-sm
              ${dark
                                    ? "placeholder:text-gray-500"
                                    : "placeholder:text-gray-400"
                                }
            `}
                        />
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <button
                            onClick={() => closesetAddMembers(false)}
                            className={`flex-1 py-3 rounded-2xl font-medium transition-all duration-200
              ${dark
                                    ? "bg-white/10 hover:bg-white/20"
                                    : "bg-gray-100 hover:bg-gray-200"
                                }
            `}
                        >
                            Cancel
                        </button>

                        <button className="flex-1 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-medium flex items-center justify-center gap-2"

                            onClick={Submit}
                        >
                            <FiUserPlus />
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPeopleWorkspace;