import { useContext } from "react";
import bgthemeContext from "../Context/ThemeContext";

function ApiLoader({ texttyoe, text }: any) {
    const context = useContext(bgthemeContext);
    const { theme }: any = context
    const isDark = theme === "Dark";

    return (
        <>



            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div
                    className={`w-full max-w-sm rounded-lg border p-5 shadow-xl ${isDark
                            ? "border-[#2C333A] bg-[#161A1D] text-white"
                            : "border-gray-200 bg-white text-gray-800"
                        }`}
                >
                    <div className="flex items-center gap-3">
                        {/* Loader icon */}
                        <div className="relative flex h-9 w-9 items-center justify-center">
                            <div className="absolute h-9 w-9 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500" />
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold">
                                {texttyoe || "Please wait"}
                            </h3>

                            <p className="mt-1 text-xs opacity-60">
                                {text || "Processing your request..."}
                            </p>
                        </div>
                    </div>

                    {/* Indeterminate progress bar */}
                    <div
                        className={`mt-5 h-1.5 overflow-hidden rounded-full ${isDark ? "bg-[#2C333A]" : "bg-gray-200"
                            }`}
                    >
                        <div className="h-full w-1/3 animate-[loader_1.5s_ease-in-out_infinite] rounded-full bg-blue-500" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ApiLoader;