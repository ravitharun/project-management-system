import { useContext } from "react";
import {
    AlertTriangle,
    X,
    Trash2,
} from "lucide-react";
import bgthemeContext from "../Context/ThemeContext";
import { instance } from "../services/apiservices";
import { ShowToast } from "./toastHelper";
import {  Toaster } from "sonner";

function AlertPoup({ isPoup, setisDelete, RealseVersionId }: any) {


    const { theme }: any = useContext(bgthemeContext);
    const isTheme = theme === "Dark";




    const handelRealseVersion = async () => {
        try {
            if (!RealseVersionId) {

                return
            }
            const response = await instance.delete(`/api/projects/${RealseVersionId}/delete`)


            console.log(response, 'efrgg')

            if (response.status == 200) {


          
                ShowToast(
                    response.data.message,
                    response.status,
                    "Success"
                );
                return setisDelete(false)
            }
        } catch (error: any) {



            const status = error?.response?.status

            const Err_msg = error?.response?.data?.message

            console.log({ status, Err_msg });

            return ShowToast(
                Err_msg,
                status,
                "Error"
            );
        }



    }

    return (
        <>
            <Toaster closeButton></Toaster>
            {isPoup && (
                <div
                    className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="delete-title"
                >
                    <div
                        className={`relative w-full max-w-md overflow-hidden rounded-2xl border shadow-2xl ${isTheme
                            ? "border-gray-800 bg-[#111827] text-white"
                            : "border-gray-200 bg-white text-gray-900"
                            }`}
                    >
                        {/* Close Button */}
                        <button
                            type="button"
                            aria-label="Close"
                            className={`absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${isTheme
                                ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                                : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                                }`}
                            onClick={() => setisDelete(false)}
                        >
                            <X size={19} />
                        </button>

                        {/* Content */}
                        <div className="px-6 pb-6 pt-7 sm:px-7">
                            {/* Warning Icon */}
                            <div className="flex justify-center">
                                <div
                                    className={`flex h-14 w-14 items-center justify-center rounded-full ${isTheme
                                        ? "bg-red-500/10 text-red-400"
                                        : "bg-red-50 text-red-600"
                                        }`}

                                >
                                    <AlertTriangle size={28} />
                                </div>
                            </div>

                            {/* Title */}
                            <div className="mt-5 text-center">
                                <h2
                                    id="delete-title"
                                    className="text-lg font-semibold sm:text-xl"
                                >
                                    Delete Release Version?
                                </h2>

                                <p
                                    className={`mx-auto mt-2 max-w-sm text-sm leading-6 ${isTheme
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                        }`}
                                >
                                    Are you sure you want to delete this
                                    release version? This action cannot be
                                    undone.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
                                <button
                                    type="button"
                                    className={`flex h-10 w-full items-center justify-center rounded-lg border px-5 text-sm font-medium transition-colors sm:w-auto ${isTheme
                                        ? "border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                        }`}
                                    onClick={() => setisDelete(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-sm font-medium text-white transition-colors hover:bg-red-700 active:bg-red-800 sm:w-auto"

                                    onClick={handelRealseVersion}
                                >
                                    <Trash2 size={16} />
                                    Delete Version
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AlertPoup;