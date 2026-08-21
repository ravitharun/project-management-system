import { CheckCircle2, Clock3, User } from "lucide-react"

function ActivityPages({isTheme}:any) {
  return (



<>
 <div className="mt-10">

                <div className="mb-4">
                    <h2
                        className={`text-lg font-semibold ${isTheme ? "text-white" : "text-gray-900"
                            }`}
                    >
                        Activity
                    </h2>

                    <p
                        className={`text-sm ${isTheme ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        Recent activity in your project
                    </p>
                </div>


                <div
                    className={`rounded-xl border ${isTheme
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white"
                        }`}
                >

                    {/* Activity 1 */}
                    <div
                        className={`flex gap-4 border-b p-5 ${isTheme ? "border-gray-800" : "border-gray-200"
                            }`}
                    >

                        <div
                            className={`flex h-9 w-9 items-center justify-center rounded-full ${isTheme ? "bg-gray-800" : "bg-gray-100"
                                }`}
                        >
                            <CheckCircle2 size={18} />
                        </div>

                        <div className="flex-1">

                            <p
                                className={`text-sm ${isTheme ? "text-gray-200" : "text-gray-900"
                                    }`}
                            >
                                <span className="font-medium">
                                    Ravi
                                </span>{" "}
                                completed task{" "}
                                <span className="font-medium">
                                    Login API
                                </span>
                            </p>

                            <p
                                className={`mt-1 text-xs ${isTheme ? "text-gray-500" : "text-gray-500"
                                    }`}
                            >
                                10 minutes ago
                            </p>

                        </div>
                    </div>


                    {/* Activity 2 */}
                    <div
                        className={`flex gap-4 border-b p-5 ${isTheme ? "border-gray-800" : "border-gray-200"
                            }`}
                    >

                        <div
                            className={`flex h-9 w-9 items-center justify-center rounded-full ${isTheme ? "bg-gray-800" : "bg-gray-100"
                                }`}
                        >
                            <User size={18} />
                        </div>

                        <div className="flex-1">

                            <p
                                className={`text-sm ${isTheme ? "text-gray-200" : "text-gray-900"
                                    }`}
                            >
                                <span className="font-medium">
                                    Tharun
                                </span>{" "}
                                assigned a task to{" "}
                                <span className="font-medium">
                                    Ravi
                                </span>
                            </p>

                            <p
                                className="mt-1 text-xs text-gray-500"
                            >
                                30 minutes ago
                            </p>

                        </div>
                    </div>


                    {/* Activity 3 */}
                    <div className="flex gap-4 p-5">

                        <div
                            className={`flex h-9 w-9 items-center justify-center rounded-full ${isTheme ? "bg-gray-800" : "bg-gray-100"
                                }`}
                        >
                            <Clock3 size={18} />
                        </div>

                        <div className="flex-1">

                            <p
                                className={`text-sm ${isTheme ? "text-gray-200" : "text-gray-900"
                                    }`}
                            >
                                Sprint{" "}
                                <span className="font-medium">
                                    Sprint 12
                                </span>{" "}
                                started
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                1 hour ago
                            </p>

                        </div>
                    </div>

                </div>
            </div>



</>
)
}

export default ActivityPages