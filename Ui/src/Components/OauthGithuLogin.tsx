import { useContext } from "react"
import bgthemeContext from "../Context/ThemeContext"
import { FiGithub,  } from "react-icons/fi";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { instance } from "../services/apiservices";
import { getuserInfo } from "./LocalStorage";
import ClickedWorkSpace from "../Context/ClickedWorkSpace";
import { ShowToast } from "./toastHelper";
import { Toaster } from "sonner";

function OauthGithuLogin({ setisGithubLogin }: any) {

    const { theme }: any = useContext(bgthemeContext)

    const { ClickedSpace }: any = useContext(ClickedWorkSpace)

    const Istheme: boolean = theme == "Dark";

    // const [isNotGithubpremession, setisNotGithubpremession] = useState<boolean>(false)




    const HandelGithub = async () => {
        try {
            const provider = new GithubAuthProvider();

            const result = await signInWithPopup(
                auth,
                provider
            );

            const data = {
                "user": result,
                "userid": JSON.parse(getuserInfo)?._id,
                "Pid": ClickedSpace?._id

            }
            console.log(data, 'data  ');


            const response = await instance.post("/api/github/access-permission", { data: data })
            if (response.status === 201) {
                setisGithubLogin(false);

                return ShowToast(
                    response.data.message,
                    response.status,
                    "Sucess"
                );
            }

        } catch (error: any) {
            console.error("GitHub Login Error:", error);
            return ShowToast(error?.response?.data.message, error?.response?.status, 'Error')
        }
    };

    return (
        // <>
        //     <Toaster />

        //     <div className="flex min-h-[80vh] items-center justify-center px-4 sm:px-6 lg:px-8">
        //         <div
        //             className={`w-full max-w-2xl rounded-2xl border p-6 sm:p-8 lg:p-10 ${Istheme
        //                 ? "border-gray-700 bg-gray-900 text-white"
        //                 : "border-gray-200 bg-white text-gray-900"
        //                 }`}
        //         >
        //             <div className="text-center">
        //                 <FiGithub
        //                     size={64}
        //                     className="mx-auto mb-5"
        //                 />

        //                 <h1 className="text-2xl font-bold sm:text-3xl">
        //                     Connect Your GitHub Account
        //                 </h1>

        //                 <p
        //                     className={`mx-auto mt-3 max-w-xl text-sm sm:text-base ${Istheme ? "text-gray-400" : "text-gray-500"
        //                         }`}
        //                 >
        //                     Integrate GitHub with your workspace to manage repositories,
        //                     track development progress, monitor pull requests, and keep
        //                     your project data synchronized in one place.
        //                 </p>
        //             </div>

        //             <div className="mt-8 grid gap-4 sm:grid-cols-2">
        //                 <div
        //                     className={`rounded-xl p-4 ${Istheme ? "bg-gray-800" : "bg-gray-50"
        //                         }`}
        //                 >
        //                     <h3 className="font-semibold">Repositories</h3>
        //                     <p className="mt-1 text-sm opacity-80">
        //                         Link and manage project repositories.
        //                     </p>
        //                 </div>

        //                 <div
        //                     className={`rounded-xl p-4 ${Istheme ? "bg-gray-800" : "bg-gray-50"
        //                         }`}
        //                 >
        //                     <h3 className="font-semibold">Pull Requests</h3>
        //                     <p className="mt-1 text-sm opacity-80">
        //                         View and track pull request activity.
        //                     </p>
        //                 </div>

        //                 <div
        //                     className={`rounded-xl p-4 ${Istheme ? "bg-gray-800" : "bg-gray-50"
        //                         }`}
        //                 >
        //                     <h3 className="font-semibold">Commits</h3>
        //                     <p className="mt-1 text-sm opacity-80">
        //                         Monitor commits and development updates.
        //                     </p>
        //                 </div>

        //                 <div
        //                     className={`rounded-xl p-4 ${Istheme ? "bg-gray-800" : "bg-gray-50"
        //                         }`}
        //                 >
        //                     <h3 className="font-semibold">Deployments</h3>
        //                     <p className="mt-1 text-sm opacity-80">
        //                         Keep track of releases and deployments.
        //                     </p>
        //                 </div>
        //             </div>

        //             <button
        //                 onClick={HandelGithub}
        //                 className={`mt-8 flex w-full items-center justify-center gap-3 rounded-xl px-5 py-3 text-sm font-semibold transition sm:text-base ${Istheme
        //                     ? "bg-white text-black hover:bg-gray-200"
        //                     : "bg-black text-white hover:bg-gray-800"
        //                     }`}
        //             >
        //                 <FiGithub size={24} />
        //                 Connect with GitHub
        //             </button>

        //             <p
        //                 className={`mt-4 text-center text-xs sm:text-sm ${Istheme ? "text-gray-500" : "text-gray-400"
        //                     }`}
        //             >
        //                 Secure OAuth authentication. We never store your GitHub password.
        //             </p>
        //         </div>
        //     </div>
        // </>
        <>
            <Toaster />

            <div className="flex min-h-[80vh] items-center justify-center px-4 sm:px-6 lg:px-8">
                <div
                    className={`w-full max-w-2xl rounded-2xl border p-5 sm:p-6 lg:p-8 transition-colors ${Istheme
                        ? "border-gray-700 bg-gray-900 text-white"
                        : "border-gray-200 bg-white text-gray-900"
                        }`}
                >
                    {/* Header */}
                    <div className="text-center">
                        <FiGithub
                            size={44}
                            className={`mx-auto mb-3 ${Istheme ? "text-gray-200" : "text-gray-800"
                                }`}
                        />

                        <h1 className="text-base font-semibold leading-snug sm:text-lg">
                            Connect Your GitHub Account
                        </h1>

                        <p
                            className={`mx-auto mt-1.5 max-w-xl text-[11px] leading-relaxed sm:text-xs ${Istheme ? "text-gray-400" : "text-gray-500"
                                }`}
                        >
                            Integrate GitHub with your workspace to manage repositories, track
                            development progress, monitor pull requests, and keep your project data
                            synchronized in one place.
                        </p>
                    </div>

                    {/* Feature grid */}
                    <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                        <div
                            className={`rounded-xl p-3.5 ${Istheme ? "bg-gray-800" : "bg-gray-50"
                                }`}
                        >
                            <h3 className="text-[11px] font-semibold uppercase tracking-wide">
                                Repositories
                            </h3>
                            <p className="mt-0.5 text-[10px] opacity-80">
                                Link and manage project repositories.
                            </p>
                        </div>

                        <div
                            className={`rounded-xl p-3.5 ${Istheme ? "bg-gray-800" : "bg-gray-50"
                                }`}
                        >
                            <h3 className="text-[11px] font-semibold uppercase tracking-wide">
                                Pull Requests
                            </h3>
                            <p className="mt-0.5 text-[10px] opacity-80">
                                View and track pull request activity.
                            </p>
                        </div>

                        <div
                            className={`rounded-xl p-3.5 ${Istheme ? "bg-gray-800" : "bg-gray-50"
                                }`}
                        >
                            <h3 className="text-[11px] font-semibold uppercase tracking-wide">
                                Commits
                            </h3>
                            <p className="mt-0.5 text-[10px] opacity-80">
                                Monitor commits and development updates.
                            </p>
                        </div>

                        <div
                            className={`rounded-xl p-3.5 ${Istheme ? "bg-gray-800" : "bg-gray-50"
                                }`}
                        >
                            <h3 className="text-[11px] font-semibold uppercase tracking-wide">
                                Deployments
                            </h3>
                            <p className="mt-0.5 text-[10px] opacity-80">
                                Keep track of releases and deployments.
                            </p>
                        </div>
                    </div>

                    {/* Connect button */}
                    <button
                        onClick={HandelGithub}
                        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-[11px] font-semibold transition sm:text-xs ${Istheme
                            ? "bg-white text-black hover:bg-gray-200"
                            : "bg-black text-white hover:bg-gray-800"
                            }`}
                    >
                        <FiGithub size={18} />
                        Connect with GitHub
                    </button>

                    {/* Security note */}
                    <p
                        className={`mt-2 text-center text-[10px] leading-relaxed sm:text-[11px] ${Istheme ? "text-gray-500" : "text-gray-400"
                            }`}
                    >
                        Secure OAuth authentication. We never store your GitHub password.
                    </p>
                </div>
            </div>
        </>
    )
}

export default OauthGithuLogin