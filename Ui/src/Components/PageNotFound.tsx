import { useContext } from "react";
import { FiAlertCircle, FiArrowLeft, FiHome } from "react-icons/fi";
import bgthemeContext from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
// import Navbar from "../Components/Navbar"
const PageNotFound = () => {
    const { theme }: any = useContext(bgthemeContext);

    const isTheme: boolean = theme == "Dark"
    // console.log(isTheme,'isTheme')
    

    const redirect=useNavigate()

    return (
     <>
     {/* <Navbar></Navbar> */}

        <div
            className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-300 ${isTheme
                    ? "bg-[#101214] text-white"
                    : "bg-[#F7F8F9] text-[#172B4D]"
                }`}
        >
            <div className="w-full max-w-lg text-center">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isTheme
                                ? "bg-blue-500/10 text-blue-400"
                                : "bg-blue-50 text-blue-600"
                            }`}
                    >
                        <FiAlertCircle size={34} />
                    </div>
                </div>

                {/* 404 */}
                <h1
                    className={`text-8xl font-bold tracking-tight ${isTheme ? "text-white" : "text-[#172B4D]"
                        }`}
                >
                    404
                </h1>

                {/* Title */}
                <h2
                    className={`mt-3 text-2xl font-semibold ${isTheme ? "text-gray-100" : "text-[#172B4D]"
                        }`}
                >
                    Page not found
                </h2>

                {/* Description */}
                <p
                    className={`mt-3 text-sm leading-6 ${isTheme ? "text-gray-400" : "text-gray-600"
                        }`}
                >
                    The page you're looking for doesn't exist or may have
                    been moved. Check the URL or return to your workspace.
                </p>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-3 mt-8">

                    <button
                        onClick={() => window.history.back()}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 ${isTheme
                                ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                                : "border-gray-300 text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <FiArrowLeft size={16} />
                        Go Back
                    </button>

                    <button
                        onClick={() => redirect("/")}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-sm"
                    >
                        <FiHome size={16} />
                        Go to Home
                    </button>

                </div>

                {/* Bottom hint */}
                <div
                    className={`mt-10 text-xs ${isTheme ? "text-gray-500" : "text-gray-400"
                        }`}
                >
                    Error code: 404 · Page not found
                </div>
            </div>
        </div>
     </>
    );
};

export default PageNotFound;