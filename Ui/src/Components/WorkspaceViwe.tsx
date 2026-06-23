import { useState } from "react";
import {
  FiStar,
  FiEye,

} from "react-icons/fi";

import { getuserInfo, useremail } from "./LocalStorage";
import { instance } from "../services/apiservices";
import StaredWrokspace from "./StaredWrokspace";
import { View } from "../services/View";
import ViewedActivity from "./UserActivity/ViewedActivity";
import { Link } from "react-router-dom";


function WorkspaceViwe({ theme, SpaceJson }: any) {


  const [type, settype] = useState("Recommended");
  const [id, setid] = useState<number | null>(null);
      // const workSpaceData = useContext(WorkspaceData)
      // const { ClickedSpace, setClickedSpace }: any = contextSpace

  const filters = [
    "Recommended",
    "For you",
    "Assigned to me",
    "Starred",
    "Worked on",
    "Viewed",
  ];

  const HandelStarWorkpsace = async (isStared: boolean, id: number | string) => {
    try {
      // console.log({ isStared, id })
      const data = { isStared, id, useremail, UserId: JSON.parse(getuserInfo)._id }


      const api_response = await instance.post("/api/Workspace/MakeStar", { data })
      console.log(api_response, 'star api')

    } catch (error: any) {

      console.log(error.message)
    }
  }


  const ViewedWworkspace = async (w: any) => {
    console.log(w, 'ViewedWworkspace')
    try {
      const response = await View(JSON.parse(getuserInfo)._id, w._id)
      return response
    } catch (error: any) {
      console.log(error.message)
    }


  }




  return (
    <>

      {/* <ApiLoader theme="Dark"></ApiLoader> */}
      <div
        className={`
    min-h-screen
    w-full
    px-3 md:px-5
    py-4

    ${theme === "Dark"
            ? "bg-[#0B1120] text-white"
            : "bg-[#F5F7FB] text-gray-900"
          }
  `}
      >

        {/* ================= CONTAINER ================= */}
        <div className="max-w-[1050px]  ">

          {/* ================= HEADER ================= */}
          <div className="text-center ">

            <h1 className="
        text-2xl md:text-3xl
        font-bold
        tracking-tight
      ">
              Your Workspaces
            </h1>

            <p
              className={`
          mt-2
          text-[12px]

          ${theme === "Dark"
                  ? "text-gray-400"
                  : "text-gray-500"
                }
        `}
            >
              Manage your teams, projects, and collaboration spaces
            </p>
          </div>

          {/* ================= FILTERS ================= */}
          <div className="
  mt-8
  w-full
  flex
  justify-center
">

            <div className="
    flex
    flex-wrap
    gap-2.5
    max-w-[820px]
  ">

              {filters.map((f, i) => (

                <button
                  key={i}
                  onClick={() => settype(f)}
                  className={`
          min-w-[125px]
          h-[42px]
          px-4
          rounded-[16px]
          text-[12px]
          font-medium
          transition-all duration-300

          ${type === f
                      ? `
              bg-blue-600
              text-white
              scale-[1.02]
            `
                      : theme === "Dark"
                        ? `
                bg-white/[0.05]
                text-gray-300
                hover:bg-white/[0.08]
              `
                        : `
                bg-white
                text-gray-700
                hover:bg-gray-100
              `
                    }
        `}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* ================= BUTTON ================= */}
          <div className="
  mt-8
  w-full
  flex
  justify-center
">
            <button
              className="
      h-[44px]
      px-5
      rounded-[16px]
      bg-blue-600
      hover:bg-blue-700
      text-white
      text-[13px]
      font-medium
      transition-all duration-300
    "
            >
              + Create Workspace
            </button>
          </div>



          {type == "Recommended" &&

            <>

              {/* ================= SPACES ================= */}
              <div className="mt-8 w-full space-y-4">

                {SpaceJson.map((w: any, i: number) => (
                  <Link to="/workspace" state={{ data: w }}>
                    <>


                      <div
                        key={i}
                        onMouseEnter={() => setid(i)}
                        onMouseLeave={() => setid(null)}
                        onClick={() => ViewedWworkspace(w)}

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
                                src={w?.icon}
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
                                {w?.workspaceSetup?.workspaceName}
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
                                {w?.workspaceSetup?.createby?.userName || "User"} • Team Lead
                              </p>
                            </div>
                          </div>

                          {/* ACTIONS */}
                          {id === i && <div className="
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
                              onClick={() => HandelStarWorkpsace(true, w._id)}
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
                              onClick={() => ViewedWworkspace(w)}
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
                      <br />
                    </>

                  </Link>





                ))}
                {/* ACTIONS */}


              </div>
            </>
          }



          {type == "Starred" && <>

            <StaredWrokspace theme={theme}></StaredWrokspace>
          </>}
          {type == "For you" && <>


            <h1>{type}</h1>
          </>}
          {type == "Assigned to me" && <>


            <h1>{type}</h1>
          </>}
          {type == "Worked on" && <>


            <h1>{type}</h1>
          </>}
          {type == "Viewed" && <>

            <ViewedActivity theme={theme}></ViewedActivity>
          </>}
        </div>
      </div >
    </>
  );
}

export default WorkspaceViwe;