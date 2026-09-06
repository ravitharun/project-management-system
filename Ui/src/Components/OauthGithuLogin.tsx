import { useContext } from "react"
import bgthemeContext from "../Context/ThemeContext"
import { FiGithub, FiX, FiLink } from "react-icons/fi";

function OauthGithuLogin({ isLogin, setIsLogin }: any) {

    const { theme }: any = useContext(bgthemeContext)

    const Istheme: boolean = theme == "Dark";

    return (
        <>


            {isLogin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div
                        className={`w-[420px] rounded-xl border p-6 shadow-2xl ${Istheme
                            ? "border-gray-700 bg-gray-900 text-white"
                            : "border-gray-200 bg-white text-gray-900"
                            }`}
                    >
                        {/* Header */}
                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Connect GitHub
                                </h2>

                                <p
                                    className={`mt-1 text-sm ${Istheme ? "text-gray-400" : "text-gray-500"
                                        }`}
                                >
                                    Connect your GitHub account to this project
                                </p>
                            </div>

                            <button
                                onClick={() => setIsLogin(false)}
                                className={`rounded-lg p-2 ${Istheme
                                    ? "text-gray-400 hover:bg-gray-800"
                                    : "text-gray-500 hover:bg-gray-100"
                                    }`}
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* GitHub Button */}
                        <button
                            className={`flex w-full items-center justify-center gap-3 rounded-lg px-4 py-3 font-medium transition ${Istheme
                                ? "bg-white text-black hover:bg-gray-200"
                                : "bg-black text-white hover:bg-gray-800"
                                }`}
                        >
                            <FiGithub size={22} />
                            Connect with GitHub
                        </button>

                        {/* Information */}
                        <div
                            className={`mt-5 flex gap-3 rounded-lg border p-4 text-sm ${Istheme
                                ? "border-gray-700 bg-gray-800 text-gray-300"
                                : "border-gray-200 bg-gray-50 text-gray-600"
                                }`}
                        >
                            <FiLink size={18} className="mt-0.5 shrink-0" />

                            <p>
                                Connect GitHub to select a repository and view
                                commits, branches, pull requests and deployments.
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`rounded-lg border px-4 py-2 text-sm transition ${Istheme
                                    ? "border-gray-700 hover:bg-gray-800"
                                    : "border-gray-200 hover:bg-gray-100"
                                    }`}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}




        </>
    )
}

export default OauthGithuLogin