
function WorkLoadPages({isTheme}:any) {
  return (
    <>
    
    
      <div className="mt-10">

                <div className="mb-4">

                    <h2
                        className={`text-lg font-semibold ${isTheme ? "text-white" : "text-gray-900"
                            }`}
                    >
                        Team Workload
                    </h2>

                    <p className="text-sm text-gray-500">
                        Current workload of team members
                    </p>

                </div>


                <div
                    className={`rounded-xl border p-6 ${isTheme
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white"
                        }`}
                >

                    {[
                        ["Ravi", "8 tasks", "80%"],
                        ["Arun", "4 tasks", "40%"],
                        ["Tharun", "6 tasks", "60%"],
                    ].map(([name, tasks, width]) => (

                        <div
                            key={name}
                            className="mb-6 last:mb-0"
                        >

                            <div className="mb-2 flex justify-between">

                                <span
                                    className={`text-sm font-medium ${isTheme
                                        ? "text-white"
                                        : "text-gray-900"
                                        }`}
                                >
                                    {name}
                                </span>

                                <span className="text-xs text-gray-500">
                                    {tasks}
                                </span>

                            </div>

                            <div
                                className={`h-2 rounded-full ${isTheme
                                    ? "bg-gray-800"
                                    : "bg-gray-100"
                                    }`}
                            >

                                <div
                                    style={{ width }}
                                    className={`h-2 rounded-full ${isTheme
                                        ? "bg-white"
                                        : "bg-gray-900"
                                        }`}
                                />

                            </div>

                        </div>

                    ))}

                </div>
            </div>
    </>
  )
}

export default WorkLoadPages