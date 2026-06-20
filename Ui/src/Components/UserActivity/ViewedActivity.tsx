import { useContext, useEffect, useMemo, useState } from "react";
import {
  Eye,
  Clock3,
  ChevronRight,
  User2,
  Layers3,
  Sparkles,
} from "lucide-react";
import { instance } from "../../services/apiservices";
import { getuserInfo } from "../LocalStorage";
import WorkspaceData from "../../Context/workspaceData";
import type { WorkspaceIcon, WorkspaceMember, WorkspaceSetup } from "../EmailApproval/EmailBasedJoinWorkspace";



type ProjectInfo = {
  _id?: string;
  id?: string;
  name?: string;
  badge?: string;
  product?: string;
  type?: string;
  description?: string;
  detailedInfo?: string;
  defaultView?: string;
  icon?: string;
  image?: string;
  workspaceBackground?: string;
  workspaceicon?: WorkspaceIcon;
  createdAt?: string;
  updatedAt?: string;
  WorkSpacememebers?: WorkspaceMember[];
  columns?: any[];
  workspaceSetup?: WorkspaceSetup;
};

type Userid = {
  _id: string;
  Username: string;
  dept: string;
  isactive: boolean;
  lastseen: string;
  userEmail: string;
  userID: string;
  userPassword: string;
  userProfile: string;
  userrole: string;
  __v: number;
};

type ViewedWorkspace = {
  WorkspaceId: ProjectInfo;
  ViewdAt: string;
  _id: string;
};

type UserView = {
  UserId: Userid;
  createdAt: string;
  updatedAt: string;
  viewedWorkspaces: ViewedWorkspace[];
};

function ViewedActivity({ theme }: any) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [spaces, setSpaces] = useState<UserView>();
  const workspaceProvider = useContext(WorkspaceData);
  const { setwork }: any = workspaceProvider;


  const isDark = theme === "Dark";

  useEffect(() => {
    const fetchViewd = async () => {


      try {
        const response = await instance.get("/api/Analytcs/", {
          params: {
            userid: JSON.parse(getuserInfo)._id
          }
        })
        console.log(response?.data?.data, 'tharun')
        setSpaces(response?.data?.data)
      } catch (error: any) {
        console.log(error.message)

      }
    }
    fetchViewd()
  }, [])


  console.log(spaces?.viewedWorkspaces?.length)


  const ViewedWworkspace = (workspace: any) => {
    setwork(workspace);
  };

  const styles = useMemo(
    () => ({
      page: isDark ? "text-white" : "text-slate-900",
      subText: isDark ? "text-slate-400" : "text-slate-500",
      card: isDark
        ? "bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06]"
        : "bg-white border border-slate-200/80 hover:bg-slate-50",
      iconWrap: isDark
        ? "bg-white/[0.06] border border-white/[0.08]"
        : "bg-slate-100 border border-slate-200",
      badge: isDark
        ? "bg-white/[0.05] text-slate-300 border border-white/[0.08]"
        : "bg-slate-100 text-slate-600 border border-slate-200",
      actionBtn: isDark
        ? "bg-white/[0.05] text-slate-300 hover:bg-white/[0.1]"
        : "bg-slate-100 text-slate-600 hover:bg-slate-200",
      primaryBtn: "bg-sky-600 text-white hover:bg-sky-700",
      starred: "bg-amber-400 text-white hover:bg-amber-500",
      section: isDark ? "bg-[#0f1117]" : "bg-[#f8fafc]",
      titleIcon: isDark
        ? "bg-cyan-500/15 text-cyan-300"
        : "bg-cyan-100 text-cyan-700",
    }),
    [isDark]
  );


  return (

    <>


      {spaces?.viewedWorkspaces?.length === 0 ?
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div
            className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${theme === "Dark"
              ? "bg-gray-800 text-gray-400"
              : "bg-gray-100 text-gray-500"
              }`}
          >
            👀
          </div>

          <h3
            className={`text-lg font-semibold ${theme === "Dark" ? "text-white" : "text-gray-900"
              }`}
          >
            No Viewed Workspaces
          </h3>

          <p
            className={`mt-2 max-w-sm text-sm ${theme === "Dark" ? "text-gray-400" : "text-gray-500"
              }`}
          >
            You haven't viewed any workspaces yet. Recently viewed workspaces will
            appear here.
          </p>
        </div>
        :


        <section
          className={`w-full rounded-3xl p-4 sm:p-5 md:p-6 ${styles.section} ${styles.page}`}
        >
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${styles.titleIcon}`}
              >
                <Sparkles size={18} />
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-semibold tracking-tight">
                  Recently Viewed
                </h2>
                <p className={`text-xs sm:text-sm ${styles.subText}`}>
                  Your latest workspace activity
                </p>
              </div>
            </div>

            <div
              className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${styles.badge}`}
            >
              <Layers3 size={14} />
              {spaces?.viewedWorkspaces?.length} workspaces
            </div>
          </div>

          <div className="space-y-3">
            {spaces?.viewedWorkspaces?.map((w: any, i: number) => {


              return (
                <article
                  key={w._id}
                  onMouseEnter={() => setHoveredId(i)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`
                group rounded-2xl p-3 sm:p-4 transition-all duration-300
                shadow-sm hover:shadow-md
                ${styles.card}
              `}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex min-w-0 items-start gap-3 sm:gap-4 flex-1">
                      <div
                        className={`flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl ${styles.iconWrap}`}
                      >
                        {w?.WorkspaceId?.image ? (
                          <img
                            src={w?.WorkspaceId?.image}
                            alt={w?.workspaceSetup?.name || "workspace"}
                            className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
                          />
                        ) : (
                          <Layers3 size={20} className={styles.subText} />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-sm sm:text-[15px] font-semibold">
                            {w?.WorkspaceId?.name}
                          </h3>

                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] sm:text-[11px] font-medium ${styles.badge}`}
                          >
                            Active
                          </span>
                        </div>

                        <div
                          className={`mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs ${styles.subText}`}
                        >
                          <span className="inline-flex items-center gap-1">
                            <User2 size={13} />
                            {w?.workspaceSetup?.createby?.userEmail}
                          </span>

                          <span className="inline-flex items-center gap-1">
                            <Clock3 size={13} />
                            {new Date(w?.ViewdAt).toLocaleString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>

                          <span className="inline-flex items-center gap-1">
                            <Eye size={13} />
                            {w?.role || "Role"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-2">
                      <div className="flex items-center gap-2">


                        <button
                          onClick={() => ViewedWworkspace(w.WorkspaceId)}
                          className={`
                        flex h-10 items-center gap-2 rounded-xl px-3 sm:px-3.5
                        text-sm font-medium transition-all
                        ${styles.primaryBtn}
                      `}
                          title="Open workspace"
                        >
                          <Eye size={16} />
                          <span className="hidden sm:inline">Open</span>
                        </button>
                      </div>

                      <div
                        className={`
                      hidden md:flex items-center justify-center transition-all duration-300
                      ${hoveredId === i
                            ? "translate-x-0 opacity-100"
                            : "translate-x-2 opacity-0"
                          }
                    `}
                      >
                        <ChevronRight size={18} className={styles.subText} />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      }
    </>

  );
}

export default ViewedActivity;