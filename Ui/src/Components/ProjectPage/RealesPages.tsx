import { Plus, Rocket } from 'lucide-react'

import CustomRealseForm from './CustomRealseForm';
import { useState } from 'react';


function RealesPages({ isTheme }: any) {

    const [IsRealseForm, setIsRealseForm] = useState(false);







    return (
        <>


            <div className="mt-10">

                <div className="mb-4 flex items-center justify-between">

                    <div>
                        <h2
                            className={`text-lg font-semibold ${isTheme ? "text-white" : "text-gray-900"
                                }`}
                        >
                            Releases
                        </h2>

                        <p
                            className={`text-sm ${isTheme ? "text-gray-400" : "text-gray-500"
                                }`}
                        >
                            Manage your project versions
                        </p>
                    </div>

                    <button
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm ${isTheme
                            ? "bg-white text-gray-900"
                            : "bg-gray-900 text-white"
                            }`}

                        onClick={() => setIsRealseForm((prev) => !prev)}
                    >
                        <Plus size={16} />
                        New Release
                    </button>

                </div>


                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    {[
                        {
                            version: "v1.0.0",
                            name: "Initial Release",
                            status: "Released",
                        },
                        {
                            version: "v1.1.0",
                            name: "Attendance Feature",
                            status: "In Progress",
                        },
                        {
                            version: "v2.0.0",
                            name: "Online Examination",
                            status: "Planned",
                        },
                    ].map((release) => (

                        <div
                            key={release.version}
                            className={`rounded-xl border p-5 ${isTheme
                                ? "border-gray-800 bg-gray-900"
                                : "border-gray-200 bg-white"
                                }`}
                        >

                            <Rocket size={22} />

                            <h3
                                className={`mt-4 font-semibold ${isTheme ? "text-white" : "text-gray-900"
                                    }`}
                            >
                                {release.version}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                {release.name}
                            </p>

                            <div
                                className={`mt-4 text-xs ${release.status === "Released"
                                    ? "text-green-500"
                                    : release.status === "In Progress"
                                        ? "text-blue-500"
                                        : "text-gray-500"
                                    }`}
                            >
                                {release.status}
                            </div>

                        </div>

                    ))}

                </div>
            </div>

            {IsRealseForm && <CustomRealseForm onClose={() => setIsRealseForm(false)} />}


        </>
    )
}

export default RealesPages