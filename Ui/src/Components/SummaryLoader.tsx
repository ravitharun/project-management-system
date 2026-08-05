const SummaryPageLoader = ({ theme }: any) => {
    return (
        <div
            className={`flex items-center justify-center h-[70vh] ${theme === "Dark" ? "bg-[#0f172a]" : "bg-white"
                }`}
        >
            <div className="flex flex-col items-center gap-4">
                {/* Spinner */}
                <div
                    className={`w-14 h-14 rounded-full border-4 border-t-transparent animate-spin ${theme === "Dark"
                            ? "border-blue-500"
                            : "border-blue-600"
                        }`}
                />

                {/* Loading Text */}
                <h2
                    className={`text-lg font-semibold ${theme === "Dark"
                            ? "text-white"
                            : "text-gray-800"
                        }`}
                >
                    Loading Summary...
                </h2>

                <p
                    className={`text-sm ${theme === "Dark"
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                >
                    Please wait while we fetch your dashboard.
                </p>
            </div>
        </div>
    );
};

export default SummaryPageLoader;