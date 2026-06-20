import { useMemo, useState } from "react";
import {
  Eye,
  Star,
  Clock3,
  ChevronRight,
  User2,
  Layers3,
  Sparkles,
} from "lucide-react";

const dummyViewedSpaces = [
  {
    _id: "1",
    icon: "https://cdn.simpleicons.org/notion",
    workspaceSetup: {
      workspaceName: "Design System",
      createby: { userName: "Tharun" },
    },
    viewedAt: "2h ago",
    role: "Team Lead",
    isStaredUsers: { userEmail: "tharun@gmail.com" },
  },
  {
    _id: "2",
    icon: "https://cdn.simpleicons.org/slack",
    workspaceSetup: {
      workspaceName: "Marketing Workspace",
      createby: { userName: "Arjun" },
    },
    viewedAt: "5h ago",
    role: "Manager",
    isStaredUsers: { userEmail: "" },
  },
  {
    _id: "3",
    icon: "https://cdn.simpleicons.org/figma",
    workspaceSetup: {
      workspaceName: "UI Kit Planning",
      createby: { userName: "Meena" },
    },
    viewedAt: "1d ago",
    role: "Designer",
    isStaredUsers: { userEmail: "tharun@gmail.com" },
  },
  {
    _id: "4",
    icon: "https://cdn.simpleicons.org/github",
    workspaceSetup: {
      workspaceName: "Dev Workspace",
      createby: { userName: "Ravi" },
    },
    viewedAt: "3d ago",
    role: "Developer",
    isStaredUsers: { userEmail: "" },
  },
];

function ViewedActivity({ theme }: any) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [spaces, setSpaces] = useState(dummyViewedSpaces);

  const useremail = "tharun@gmail.com";
  const isDark = theme === "Dark";

  const HandelStarWorkpsace = (fav: boolean, id: string) => {
    setSpaces((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              isStaredUsers: {
                userEmail:
                  item.isStaredUsers?.userEmail === useremail ? "" : useremail,
              },
            }
          : item
      )
    );
  };

  const ViewedWworkspace = (workspace: any) => {
    console.log("Open workspace:", workspace);
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
          {spaces.length} workspaces
        </div>
      </div>

      <div className="space-y-3">
        {spaces.map((w: any, i: number) => {
          const isStarred = w?.isStaredUsers?.userEmail === useremail;

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
                    {w?.icon ? (
                      <img
                        src={w.icon}
                        alt={w?.workspaceSetup?.workspaceName || "workspace"}
                        className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
                      />
                    ) : (
                      <Layers3 size={20} className={styles.subText} />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-sm sm:text-[15px] font-semibold">
                        {w?.workspaceSetup?.workspaceName}
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
                        {w?.workspaceSetup?.createby?.userName}
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <Clock3 size={13} />
                        {w?.viewedAt}
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <Eye size={13} />
                        {w?.role}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => HandelStarWorkpsace(true, w._id)}
                      className={`
                        flex h-10 w-10 items-center justify-center rounded-xl transition-all
                        ${isStarred ? styles.starred : styles.actionBtn}
                      `}
                      title="Star workspace"
                    >
                      <Star
                        size={16}
                        className={isStarred ? "fill-current" : ""}
                      />
                    </button>

                    <button
                      onClick={() => ViewedWworkspace(w)}
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
                      ${
                        hoveredId === i
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
  );
}

export default ViewedActivity;