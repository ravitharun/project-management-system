import { CheckCircle2, Target } from "lucide-react"

function MileStonespages({isTheme}:any) {
  return (


<>
          <div className="mt-10">

                <div className="mb-4">
                    <h2
                        className={`text-lg font-semibold ${isTheme ? "text-white" : "text-gray-900"
                            }`}
                    >
                        Milestones
                    </h2>

                    <p className="text-sm text-gray-500">
                        Important project targets
                    </p>
                </div>


                <div
                    className={`rounded-xl border p-6 ${isTheme
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white"
                        }`}
                >

                    <div className="space-y-6">

                        {[
                            {
                                name: "Backend Development",
                                status: "Completed",
                                completed: true,
                            },
                            {
                                name: "Frontend Development",
                                status: "In Progress",
                                completed: false,
                            },
                            {
                                name: "Testing",
                                status: "Upcoming",
                                completed: false,
                            },
                        ].map((item) => (

                            <div
                                key={item.name}
                                className="flex gap-4"
                            >

                                {item.completed ? (
                                    <CheckCircle2 className="text-green-500" />
                                ) : (
                                    <Target
                                        className={
                                            isTheme
                                                ? "text-gray-400"
                                                : "text-gray-600"
                                        }
                                    />
                                )}

                                <div>

                                    <h3
                                        className={`font-medium ${isTheme
                                            ? "text-white"
                                            : "text-gray-900"
                                            }`}
                                    >
                                        {item.name}
                                    </h3>

                                    <p className="text-xs text-gray-500">
                                        {item.status}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>
            </div>


</>

)
}

export default MileStonespages