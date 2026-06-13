function ApiLoader({ theme = "Light" }: any) {
    const isDark = theme === "Dark";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div
                className={`flex flex-col items-center gap-4 px-8 py-6 rounded-xl shadow-xl ${
                    isDark
                        ? "bg-[#0B1120] text-white"
                        : "bg-white text-gray-700"
                }`}
            >
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                <div className="text-center">
                    <h3 className="text-lg font-semibold">Updating</h3>
                    <p className="text-sm opacity-70">
                        Please wait while we save your changes...
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ApiLoader;