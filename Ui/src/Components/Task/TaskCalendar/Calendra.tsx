import { Scheduler } from "@aldabil/react-scheduler";
import bgthemeContext from "../../../Context/ThemeContext";
import { useContext } from "react";

function MyCalendar() {
   const context = useContext(bgthemeContext);
      const { theme }: any = context
  return (
    <>


     
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
                  title: "Team Meeting",
                  start: new Date("2026-06-05T10:00:00"),
                  end: new Date("2026-06-05T11:00:00"),
                },
                {
                  event_id: 2,
                  title: "Project Review",
                  start: new Date("2026-06-06T14:00:00"),
                  end: new Date("2026-06-06T15:30:00"),
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