import { LoaderCircle } from "lucide-react";

function Loader({ theme }: any) {
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm transition-all duration-300
        ${theme === "Dark"
                    ? "bg-black/60"
                    : "bg-black/40"
                }`}
        >
            <div
                className={`shadow-2xl rounded-3xl p-8 flex flex-col items-center gap-5 w-[280px] border transition-all duration-300
            ${theme === "Dark"
                        ? "bg-[#111827] border-white/10"
                        : "bg-white border-gray-200"
                    }`}
            >

                {/* Icon Loader */}
                <div className="relative">
                    <div
                        className={`w-20 h-20 rounded-full border-4
                    ${theme === "Dark"
                                ? "border-blue-900/40"
                                : "border-blue-100"
                            }`}
                    ></div>

                    <LoaderCircle
                        className={`absolute inset-0 m-auto animate-spin
                    ${theme === "Dark"
                                ? "text-blue-400"
                                : "text-blue-600"
                            }`}
                        size={40}
                    />
                </div>

                {/* Text */}
                <div className="text-center">
                    <h1
                        className={`text-xl font-bold
                    ${theme === "Dark"
                                ? "text-white"
                                : "text-gray-800"
                            }`}
                    >
                        Project Management
                    </h1>

                    <p
                        className={`text-sm mt-1 animate-pulse
                    ${theme === "Dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                    >
                        Loading your workspace...
                    </p>
                </div>

                {/* Progress Bar */}
                <div
                    className={`w-full rounded-full h-2 overflow-hidden
                ${theme === "Dark"
                            ? "bg-gray-800"
                            : "bg-gray-200"
                        }`}
                >
                    <div
                        className={`h-full rounded-full animate-[loading_2s_linear_infinite] w-1/2
                    ${theme === "Dark"
                                ? "bg-blue-400"
                                : "bg-blue-600"
                            }`}
                    ></div>
                </div>
            </div>

            {/* Custom Animation */}
            <style>
                {`
            @keyframes loading {
                0% {
                    transform: translateX(-100%);
                }
                100% {
                    transform: translateX(250%);
                }
            }
        `}
            </style>
        </div>
    );
}

export default Loader;