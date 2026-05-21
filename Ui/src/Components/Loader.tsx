import { LoaderCircle } from "lucide-react";

function Loader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white shadow-2xl rounded-3xl p-8 flex flex-col items-center gap-5 w-[280px]">
                
                {/* Icon Loader */}
                <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-blue-100"></div>

                    <LoaderCircle
                        className="absolute inset-0 m-auto text-blue-600 animate-spin"
                        size={40}
                    />
                </div>

                {/* Text */}
                <div className="text-center">
                    <h1 className="text-xl font-bold text-gray-800">
                        Project Management
                    </h1>

                    <p className="text-sm text-gray-500 mt-1 animate-pulse">
                        Loading your workspace...
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full animate-[loading_2s_linear_infinite] w-1/2"></div>
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