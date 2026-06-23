import {  useEffect, useState } from 'react';
import { FiEye, FiStar } from 'react-icons/fi'
import { FetchStarWorkspace } from '../services/FetchStarSpace';
import { useremail } from './LocalStorage';

function StaredWrokspace({ theme }: any) {

    const [StarWorkspace, setStarWorkspace] = useState([])
    const [id, setid] = useState<number | null>(null)

    useEffect(() => {
        const FetchStaredWorkspace = async () => {
            try {
                const response = await FetchStarWorkspace(useremail)



                console.log(response, 'res')
                setStarWorkspace(response.data.Stardata)
            } catch (error: any) {
                const errStatus = error?.response.status
                if (errStatus == 404) {
                    return setStarWorkspace([])
                }


                return console.log(error)

            }
        }
        FetchStaredWorkspace()

    }, [])
    console.log(StarWorkspace, 'StarWorkspace', StarWorkspace.length)
    return (
        <>
            {StarWorkspace.length == 0 && <>


                <div>



                    No StarWorkspace Found.
                </div>
            </>}

            <div className="mt-8 w-full space-y-4">

                {StarWorkspace.map((w: any, i: number) => (

                    <div
                        key={i}
                        onMouseEnter={() => setid(i)}
                        onMouseLeave={() => setid(null)}
                        className={`
        w-full max-w-[820px] mx-auto
        rounded-[20px]
        p-4
        transition-all duration-300
        cursor-pointer

        ${theme === "Dark"
                                ? "bg-white/[0.04] hover:bg-white/[0.06]"
                                : "bg-white hover:bg-gray-50"
                            }
      `}
                    >

                        <div className="
            flex
            items-center
            justify-between
            gap-4
          ">

                            {/* LEFT */}
                            <div className="
              flex
              items-center
              gap-3
              min-w-0
              flex-1
            ">

                                {/* ICON */}
                                <div
                                    className={`
                  w-12 h-12
                  rounded-[14px]
                  flex items-center justify-center
                  shrink-0

                  ${theme === "Dark"
                                            ? "bg-white/[0.06]"
                                            : "bg-gray-100"
                                        }
                `}
                                >
                                    <img
                                        src={w?.workspaceID?.workspaceicon?.img}
                                        alt="workspace"
                                        className="w-7 h-7 object-contain"
                                    />
                                </div>

                                {/* INFO */}
                                <div className="min-w-0">

                                    <h3 className="
                  text-[14px]
                  font-semibold
                  truncate
                ">
                                        {w?.workspaceID.workspaceSetup?.workspaceName}
                                    </h3>

                                    <p
                                        className={`
                    mt-1
                    text-[11px]

                    ${theme === "Dark"
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                            }
                  `}
                                    >
                                        {w?.workspaceID?.workspaceSetup.createby.userEmail || "user"} • Team Lead   -
                                    </p>
                                </div>
                            </div>

                            {/* ACTIONS */}
                            {id == i && <div className="
              flex
              items-center
              gap-2
            ">

                                {/* STAR */}
                                <button
                                    className={`
                  w-9 h-9
                  rounded-[12px]
                  flex items-center justify-center
                  transition-all

                  ${w?.isStaredUsers?.userEmail === useremail
                                            ? "bg-yellow-400 text-white"
                                            : theme === "Dark"
                                                ? "bg-white/[0.06] text-gray-300"
                                                : "bg-gray-100 text-gray-600"
                                        }
                `}
                                // onClick={() => HandelStarWorkpsace(true, w._id)}
                                >
                                    <FiStar
                                        className={`text-[14px] ${w?.isStaredUsers?.userEmail === useremail
                                            ? "fill-current"
                                            : ""
                                            }`}
                                    />
                                </button>

                                {/* VIEW */}
                                <button
                                    // onClick={() => console.log(w)}
                                    onClick={() => console.log(w.workspaceID
                                    )}
                                    className={`
                  w-9 h-9
                  rounded-[12px]
                  flex items-center justify-center
                  transition-all

                  ${theme === "Dark"
                                            ? "bg-white/[0.06] text-gray-300 hover:bg-blue-600 hover:text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white"
                                        }
                `}
                                    title="View"

                                >
                                    {/* <p title="View"></p> */}
                                    <FiEye className="text-[14px]" />
                                </button>
                            </div>}
                        </div>

                    </div>




                ))}


            </div>
        </>)
}

export default StaredWrokspace