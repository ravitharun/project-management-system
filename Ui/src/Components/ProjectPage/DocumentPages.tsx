import { FileText, Upload } from "lucide-react"

function DocumentPages({ isTheme }: any) {
    return (
        <>


            <div className="mt-10">

                <div className="mb-4 flex items-center justify-between">

                    <div>
                        <h2
                            className={`text-lg font-semibold ${isTheme ? "text-white" : "text-gray-900"
                                }`}
                        >
                            Documents
                        </h2>

                        <p
                            className={`text-sm ${isTheme ? "text-gray-400" : "text-gray-500"
                                }`}
                        >
                            Project documents and files
                        </p>
                    </div>

                    <button
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm ${isTheme
                            ? "bg-white text-gray-900 hover:bg-gray-200"
                            : "bg-gray-900 text-white hover:bg-gray-800"
                            }`}
                    >
                        <Upload size={16} />
                        Upload
                    </button>

                </div>


                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    {[
                        ["Requirements.pdf", "Updated 2 hours ago"],
                        ["API Documentation", "Updated yesterday"],
                        ["Meeting Notes", "Updated 3 days ago"],
                    ].map(([title, time]) => (

                        <div
                            key={title}
                            className={`rounded-xl border p-5 transition ${isTheme
                                ? "border-gray-800 bg-gray-900 hover:border-gray-700"
                                : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                        >

                            <FileText
                                size={22}
                                className={
                                    isTheme
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                }
                            />

                            <h3
                                className={`mt-4 font-medium ${isTheme ? "text-white" : "text-gray-900"
                                    }`}
                            >
                                {title}
                            </h3>

                            <p className="mt-1 text-xs text-gray-500">
                                {time}
                            </p>

                        </div>

                    ))}

                </div>
            </div>
        </>)
}

export default DocumentPages