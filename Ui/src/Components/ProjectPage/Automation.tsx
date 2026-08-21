import { Plus, Zap } from "lucide-react"

function Automation({isTheme}:any) {
  return (
<>

     <div className="mt-10">

                <div className="mb-4 flex items-center justify-between">

                    <div>

                        <h2
                            className={`text-lg font-semibold ${isTheme ? "text-white" : "text-gray-900"
                                }`}
                        >
                            Automation
                        </h2>

                        <p className="text-sm text-gray-500">
                            Automate repetitive project tasks
                        </p>

                    </div>

                    <button
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm ${isTheme
                            ? "bg-white text-gray-900"
                            : "bg-gray-900 text-white"
                            }`}
                    >
                        <Plus size={16} />
                        Create Rule
                    </button>

                </div>


                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    {[
                        {
                            title: "Move completed tasks",
                            status: "Active",
                            enabled: true,
                            when: "Task status becomes Done",
                            then: "Move task to Completed",
                        },
                        {
                            title: "Assign new tasks",
                            status: "Disabled",
                            enabled: false,
                            when: "New task is created",
                            then: "Assign to project manager",
                        },
                    ].map((rule) => (

                        <div
                            key={rule.title}
                            className={`rounded-xl border p-5 ${isTheme
                                ? "border-gray-800 bg-gray-900"
                                : "border-gray-200 bg-white"
                                }`}
                        >

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-3">

                                    <Zap
                                        size={20}
                                        className={
                                            isTheme
                                                ? "text-gray-200"
                                                : "text-gray-700"
                                        }
                                    />

                                    <h3
                                        className={`font-medium ${isTheme
                                            ? "text-white"
                                            : "text-gray-900"
                                            }`}
                                    >
                                        {rule.title}
                                    </h3>

                                </div>

                                <div
                                    className={`text-xs ${rule.enabled
                                        ? "text-green-500"
                                        : "text-gray-500"
                                        }`}
                                >
                                    {rule.status}
                                </div>

                            </div>


                            <div
                                className={`mt-5 rounded-lg p-4 text-sm ${isTheme
                                    ? "bg-gray-800 text-gray-300"
                                    : "bg-gray-50 text-gray-700"
                                    }`}
                            >

                                <p>
                                    <span className="font-medium">
                                        WHEN
                                    </span>{" "}
                                    {rule.when}
                                </p>

                                <p className="mt-2">
                                    <span className="font-medium">
                                        THEN
                                    </span>{" "}
                                    {rule.then}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>


</>


)
}

export default Automation