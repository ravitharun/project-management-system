import { CheckCircle2, CircleDot, Clock3, Plus, Rocket, Trash2 } from 'lucide-react'

import CustomRealseForm from './CustomRealseForm';
import { useContext, useEffect, useState } from 'react';
import { instance } from "../../services/apiservices";
import ClickedWorkSpace from '../../Context/ClickedWorkSpace';

import ApiLoader from '../ApiLoader';
import { ShowToast } from '../toastHelper';
import ProjectsNotfound from '../ProjectsNotfound';
import AlertPoup from '../AlertPoup';
import { socket } from '../../Scokets/ScoketConfig';


function RealesPages({ isTheme }: any) {
    const { ClickedSpace }: any = useContext(ClickedWorkSpace)



    const [RealseVersion, setRealseVersion] = useState<any>([])

            useEffect(() => {
        const HandelRealse = (data: any) => {

             setRealseVersion( data)

        }

        socket.on("releases:all", HandelRealse)

        return () => {
            socket.off("releases:all", HandelRealse)

        }
    }, [])

    const [isDelete, setisDelete] = useState<boolean>(false)

    const [IsRealseForm, setIsRealseForm] = useState(false);

    const [loader, setloader] = useState<boolean>(false)

    useEffect(() => {
        const FetchVersions = async () => {


            try {
                setloader(true)
                const response = await instance.get(`/api/projects/${ClickedSpace._id} `)
                console.log(response.data.data);
                setRealseVersion(response.data.data)
                setloader(false)

            } catch (error: any) {


                return ShowToast(
                    error?.response?.data?.message,
                    error?.response?.status,
                    "error"
                );

            }

            finally {

                setloader(false)
            }
        }
        FetchVersions()
    }, [])

    console.log(RealseVersion, 'RealseVersion');




    return (
        <>
            {loader && <ApiLoader
                texttype="Loading Releases"
                text="Please wait while we fetch all project releases..."
            />}

            <div className="mt-10">

                <div className="mb-4 flex items-center justify-between">

                    <div>
                        <h2
                            className={`text-lg font-semibold ${isTheme ? "text-white" : "text-gray-900"
                                }`}
                        >
                            Releases
                        </h2>

                        <p
                            className={`text-sm ${isTheme ? "text-gray-400" : "text-gray-500"
                                }`}
                        >
                            Manage your project versions
                        </p>
                    </div>

                    <button
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm ${isTheme
                            ? "bg-white text-gray-900"
                            : "bg-gray-900 text-white"
                            }`}

                        onClick={() => setIsRealseForm((prev) => !prev)}
                    >
                        <Plus size={16} />
                        New Release
                    </button>

                </div>


                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    {

                        RealseVersion.length == 0 ? <ProjectsNotfound
                            title="Release Versions"
                            message="No release versions have been published yet."
                        /> :
                            RealseVersion?.map((release: any) => (
                                <div
                                    key={release?._id || release?.Version}
                                    className={`group relative rounded-xl border p-5 transition-all duration-200 hover:shadow-md ${isTheme
                                        ? "border-gray-800 bg-gray-900 hover:border-gray-700"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                        }`}
                                >
                                    {/* Top Section */}
                                    <div className="flex items-start justify-between gap-4">
                                        {/* Release Icon + Details */}
                                        <div className="flex min-w-0 items-start gap-3">
                                            <div
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isTheme
                                                    ? "bg-blue-500/10 text-blue-400"
                                                    : "bg-blue-50 text-blue-600"
                                                    }`}
                                            >
                                                <Rocket size={21} />
                                            </div>

                                            <div className="min-w-0">
                                                <h3
                                                    className={`font-semibold ${isTheme ? "text-white" : "text-gray-900"
                                                        }`}
                                                >
                                                    {release?.Version}
                                                </h3>

                                                <p
                                                    className={`mt-1 truncate text-sm ${isTheme ? "text-gray-400" : "text-gray-500"
                                                        }`}
                                                >
                                                    {release?.ReleaseNotes || "No release notes available"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Delete Button */}
                                        <button
                                            type="button"
                                            title="Delete Version"
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${isTheme
                                                ? "text-gray-400 hover:bg-red-500/10 hover:text-red-400"
                                                : "text-gray-400 hover:bg-red-50 hover:text-red-600"
                                                }`}
                                            onClick={() => setisDelete((prev) => !prev)}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    {/* Status */}
                                    <div className="mt-5">
                                        <div
                                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${release?.Status === "Released"
                                                ? isTheme
                                                    ? "bg-green-500/10 text-green-400"
                                                    : "bg-green-50 text-green-600"
                                                : release?.Status === "In Progress"
                                                    ? isTheme
                                                        ? "bg-blue-500/10 text-blue-400"
                                                        : "bg-blue-50 text-blue-600"
                                                    : isTheme
                                                        ? "bg-gray-800 text-gray-400"
                                                        : "bg-gray-100 text-gray-500"
                                                }`}
                                        >
                                            {release?.Status === "Released" ? (
                                                <CheckCircle2 size={14} />
                                            ) : release?.Status === "In Progress" ? (
                                                <Clock3 size={14} />
                                            ) : (
                                                <CircleDot size={14} />
                                            )}

                                            <span>{release?.Status || "Not Released"}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                </div>
            </div>

            {IsRealseForm && <CustomRealseForm onClose={() => setIsRealseForm(false)} />}

            <AlertPoup isPoup={isDelete} setisDelete={setisDelete}></AlertPoup>
        </>
    )
}

export default RealesPages