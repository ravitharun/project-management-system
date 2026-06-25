import { FolderKanban } from "lucide-react";
import bgthemeContext from "../Context/ThemeContext";
import { useContext } from "react";



function Loader() {
   const context = useContext(bgthemeContext);
      const { theme }: any = context
  const isDark = theme === "Dark";

  const shimmer = isDark
    ? "bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_25%,rgba(255,255,255,0.09)_50%,rgba(255,255,255,0.04)_75%)]"
    : "bg-[linear-gradient(90deg,#e2e8f0_25%,#f8fafc_50%,#e2e8f0_75%)]";

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isDark ? "bg-[#0b1020]" : "bg-slate-50"
      }`}
    >
      <div className="flex h-full">
        {/* Sidebar */}
        <aside
          className={`hidden w-[250px] border-r p-5 md:block ${
            isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
          }`}
        >
          <div className="mb-8 flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                isDark ? "bg-cyan-500/10 text-cyan-300" : "bg-blue-100 text-blue-600"
              }`}
            >
              <FolderKanban size={20} />
            </div>
            <div className="space-y-2">
              <div className={`h-3 w-24 rounded ${shimmer} bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]`} />
              <div className={`h-2 w-16 rounded ${shimmer} bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]`} />
            </div>
          </div>

          <div className="space-y-3">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`h-10 rounded-2xl ${shimmer} bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]`}
              />
            ))}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="space-y-3">
                <div className={`h-5 w-44 rounded ${shimmer} bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]`} />
                <div className={`h-3 w-72 max-w-[80vw] rounded ${shimmer} bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]`} />
              </div>

              <div
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  isDark
                    ? "bg-cyan-500/10 text-cyan-300"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                Loading board...
              </div>
            </div>

            {/* Board columns */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[...Array(3)].map((_, col) => (
                <div
                  key={col}
                  className={`rounded-3xl border p-4 ${
                    isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`h-4 w-24 rounded ${shimmer} bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]`} />
                    <div className={`h-6 w-6 rounded-full ${shimmer} bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]`} />
                  </div>

                  <div className="space-y-3">
                    {[...Array(4)].map((_, card) => (
                      <div
                        key={card}
                        className={`rounded-2xl p-4 ${
                          isDark ? "bg-[#11182b]" : "bg-slate-50"
                        }`}
                      >
                        <div className={`h-3 w-3/4 rounded ${shimmer} bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]`} />
                        <div className={`mt-3 h-2 w-1/2 rounded ${shimmer} bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]`} />
                        <div className="mt-4 flex items-center justify-between">
                          <div className={`h-6 w-16 rounded-full ${shimmer} bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]`} />
                          <div className={`h-7 w-7 rounded-full ${shimmer} bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

export default Loader;