import { FaTools } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

function Progress() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">

            {/* Popup */}
            <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-md w-full text-center border border-gray-100 animate-in fade-in zoom-in duration-300">

                {/* Icon */}
                <div className="flex justify-center">
                    <div className="bg-orange-100 p-5 rounded-full shadow-sm">
                        <FaTools className="text-5xl text-orange-500 animate-pulse" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800 mt-5">
                    Feature In Maintenance
                </h1>

                {/* Description */}
                <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                    The Progress feature is temporarily unavailable.
                    We’re currently improving the experience.
                </p>

                {/* Status */}
                <div className="mt-5 inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-sm font-medium px-4 py-2 rounded-full">
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></span>
                    Coming Back Soon 🚀
                </div>

                {/* Button */}
                <button
                    onClick={() => window.history.back()}
                    className="mt-7 flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                    <IoArrowBack className="text-lg" />
                    Go Back
                </button>

            </div>

        </div>
    )
}
export default Progress