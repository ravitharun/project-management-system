import { Scheduler } from "@aldabil/react-scheduler";
import bgthemeContext from "../../../Context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { checkuser } from "../../LocalStorage";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { instance } from "../../../services/apiservices";

function MyCalendar({ ProjectId }: any) {
  // console.log(ProjectId,'ProjectId');

  const context = useContext(bgthemeContext);
  const { theme }: any = context

  const redirect = useNavigate()

  const isTheme = theme === 'Dark'


  const [tasks, settasks] = useState<any>([])

  useEffect(() => {
    const GetTasks = async () => {


      try {
        const response = await instance.get(`/api/Calendar/${ProjectId._id}`)


        console.log(response?.data?.data)
        settasks(response?.data?.data)



      } catch (error: any) {
        const status = error?.response?.sattus
        const Err_msg = error?.response?.data?.message


        console.error(Err_msg);


        if (status == 401) {
          toast.error('Session Expired', {
            description: 'Please log in again to continue.',
            unstyled: true,
            classNames: {
              toast: `${isTheme
                ? "bg-red-600 text-white border border-red-500 rounded-xl shadow-xl p-4"
                : "bg-white text-red-800 border border-red-200 rounded-xl shadow-lg p-4"
                }`,

              title: `${isTheme
                ? "font-semibold text-white"
                : "font-semibold text-red-900"
                }`,

              description: `${isTheme
                ? "text-sm text-red-100 mt-1"
                : "text-sm text-red-600 mt-1"
                }`,

              closeButton: `${isTheme
                ? "text-white hover:text-red-200"
                : "text-red-500 hover:text-red-700"
                }`,
            }
          }






          );

          return checkuser(redirect)
        }







      }
    }


    GetTasks()
  }, [ProjectId])



  console.log(tasks, 'taskstaskstasks');

  const Tasks = tasks.map((tsk: any) => tsk)
  console.log(Tasks, 'Tasks');

  return (
    <>

      <Toaster></Toaster>

      <div
        className={`w-260 min-h-screen p-4 md:p-6 transition-all duration-300 ${theme === "Dark" ? "bg-[#0B1120] text-white" : "bg-[#F5F7FB] text-black"
          }`}
      >
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl md:text-2xl font-semibold">
            Project Calendar
          </h1>
          <p className="text-sm opacity-70">
            Manage your meetings and tasks in one place
          </p>
        </div>

        {/* Calendar Card */}
        <div
          className={`rounded-2xl shadow-lg p-2 md:p-4 overflow-hidden ${theme === "Dark"
            ? "bg-[#111827] border border-white/10"
            : "bg-white border border-gray-200"
            }`}
        >
          <div style={{ height: "80vh" }}>
            <Scheduler
              view="week"
              events={[
                {
                  event_id: 1,
                  title: "Event 1",
                  start: new Date("2026/8/17 09:30"),
                  end: new Date("2021/5/2 10:30"),
                },
                {
                  event_id: 2,
                  title: "Event 2",
                  start: new Date("2026/8/17 10:00"),
                  end: new Date("2021/5/4 11:00"),
                },
                {
                  event_id: 2,
                  title: "Event 2",
                  start: new Date("2026/8/19 10:00"),
                  end: new Date("2021/5/4 11:00"),
                },
              ]}

            />
          </div>
        </div>
      </div>
    </>

  );
}

export default MyCalendar;