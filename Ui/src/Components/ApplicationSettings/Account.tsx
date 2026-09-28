
import { FiSave, FiUser } from 'react-icons/fi'
import { Toaster } from 'sonner'
import { instance } from '../../services/apiservices'
import Profile from '../../pages/Profile'
import { ShowToast } from '../toastHelper'
import { useEffect, useState } from 'react'
import { userid } from '../LocalStorage'

function Account({ isDark }: any) {
    let user: any = localStorage.getItem("userinfo")

    const [profile, setProfile] = useState({
        name: JSON.parse(user)?.Username,
        email: JSON.parse(user)?.userEmail,
    });


    useEffect(() => {
        const FetchSettings = async () => {



            try {


                const response = await instance.get("/api/Settings/Profile", {

                    params: {

                        Uid: userid
                    }
                })


                setProfile(response.data.message)

            } catch (error: any) {
                console.log(error?.response?.status)
                if (error?.response?.status == 400) {
                    return ShowToast(error?.response.data.message, error?.response.status, "Error")
                }

            }
        }
        FetchSettings()
    }, [])

    // HandelAccount


    const HandelAccount = async () => {


        try {

            const response = await instance.put("/api/setting", { profile: Profile })
            console.log(response)

            return ShowToast(response?.data?.message, response?.status, "Sucess")
        } catch (error: any) {

            return ShowToast(error?.response?.data?.message, error?.response?.status, "Error")
        }
    }


    return (
        <>
            <Toaster></Toaster>


            <div className="space-y-5 lg:space-y-6">

                <div>
                    <h2
                        className={`text-xl font-semibold lg:text-2xl ${isDark ? "text-white" : "text-gray-900"
                            }`}
                    >
                        Account
                    </h2>

                    <p
                        className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        Manage your personal account information.
                    </p>
                </div>

                <div
                    className={`rounded-xl border p-4 sm:p-5 lg:p-6 ${isDark
                        ? "border-gray-800 bg-[#111827]"
                        : "border-gray-200 bg-white"
                        }`}
                >

                    <div className="mb-6 flex items-center justify-between">

                        <div>
                            <h3
                                className={`text-base font-semibold ${isDark ? "text-white" : "text-gray-900"
                                    }`}
                            >
                                Profile Information
                            </h3>

                            <p
                                className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-500"
                                    }`}
                            >
                                Update your account details.
                            </p>
                        </div>

                        <div
                            className={`flex h-11 w-11 items-center justify-center rounded-full ${isDark
                                ? "bg-blue-500/10 text-blue-400"
                                : "bg-blue-50 text-blue-600"
                                }`}
                        >
                            <FiUser size={21} />
                        </div>

                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <div>
                            <label
                                className={`mb-2 block text-sm font-medium ${isDark
                                    ? "text-gray-300"
                                    : "text-gray-700"
                                    }`}
                            >
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        name: e.target.value,
                                    })
                                }
                                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 ${isDark
                                    ? "border-gray-700 bg-[#1e293b] text-white"
                                    : "border-gray-300 bg-white text-gray-900"
                                    }`}
                            />
                        </div>

                        <div>
                            <label
                                className={`mb-2 block text-sm font-medium ${isDark
                                    ? "text-gray-300"
                                    : "text-gray-700"
                                    }`}
                            >
                                Email
                            </label>

                            <input
                                type="email"
                                value={profile.email}
                                readOnly

                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        email: e.target.value,
                                    })
                                }
                                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 ${isDark
                                    ? "border-gray-700 bg-[#1e293b] text-white"
                                    : "border-gray-300 bg-white text-gray-900"
                                    } hover:cursor-not-allowed`

                                }
                                disabled
                            />
                        </div>

                    </div>

                    <button className="mt-5 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"

                        onClick={HandelAccount}
                    >
                        <FiSave size={16} />
                        Save Changes
                    </button>

                </div>
                <Toaster></Toaster>
            </div>


        </>
    )
}

export default Account