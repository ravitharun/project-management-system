import { useContext, useState } from "react";
import Data from "./Templetes.json";
import { X } from "lucide-react";
import MoreAboutTemplates from "./MoreAboutTemplates";
import bgthemeContext from "../../Context/ThemeContext";
import { toast } from "react-toastify";
import { FaRocket } from "react-icons/fa";

function TemplatesUi({ setisworkspace }: any) {

    const [templates, settemplates] = useState()
    // console.log(templates ? "new page More about " : null)
    console.log(Data, 'Data')


    const context = useContext(bgthemeContext)
    const { theme }: any = context

    return (
        <>
            <div
                className={`fixed inset-0 z-50 flex flex-col transition-all duration-300
    ${theme === "Dark"
                        ? "bg-[#0f172a]"
                        : "bg-[#f8fafc]"
                    }`}
            >
                {/* ================= TOP BAR ================= */}

                <div
                    className={`sticky top-0 z-20 flex items-center justify-between px-8 py-5 backdrop-blur-md
        ${theme === "Dark"
                            ? "bg-[#0f172a]/95 border-b border-gray-800 shadow-lg"
                            : "bg-white/90 border-b border-gray-200 shadow-sm"
                        }`}
                >
                    <div>
                        <h2
                            className={`text-[22px] font-semibold tracking-tight
                ${theme === "Dark"
                                    ? "text-white"
                                    : "text-[#172B4D]"
                                }`}
                        >
                            Made for you
                        </h2>

                        <p
                            className={`text-sm mt-1
                ${theme === "Dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }`}
                        >
                            Explore templates your team can start with
                        </p>
                    </div>

                    <button
                        onClick={() => setisworkspace(false)}
                        className={`p-2 rounded-xl transition-all duration-200
            ${theme === "Dark"
                                ? "hover:bg-white/10 text-gray-300 hover:text-white"
                                : "hover:bg-gray-100 text-gray-600 hover:text-black"
                            }`}

                    >
                        <X size={22} />
                    </button>
                </div>

                {/* ================= HEADER SECTION ================= */}

                <div className="px-8 pt-7 pb-4">
                    <h2
                        className={`text-[18px] font-semibold
            ${theme === "Dark"
                                ? "text-white"
                                : "text-gray-800"
                            }`}
                    >
                        Choose templates based on how similar teams work
                    </h2>

                    <p
                        className={`mt-2 text-sm
            ${theme === "Dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                    >
                        Pick a workspace style and customize it later.
                    </p>
                </div>

                {/* ================= CONTENT ================= */}

                <div className="flex-1 overflow-y-auto px-8 pb-10 scrollbar-hide">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                        {Data.map((item: any) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    if (item.isDevelop) {
                                        return toast.info("Coming Soon ");
                                    }

                                    settemplates(item);
                                }}
                                className={`group relative rounded-3xl overflow-hidden transition-all duration-300 border
    ${item.isDevelop
                                        ? "cursor-not-allowed"
                                        : "cursor-pointer hover:-translate-y-1"
                                    }
    ${theme === "Dark"
                                        ? `
          bg-[#111827]
          border-gray-800
        `
                                        : `
          bg-white
          border-gray-200
          hover:border-gray-300
          hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)]
        `
                                    }`}

                            >
                                {item.isDevelop && (
                                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[4px]">
                                        <div className="flex flex-col items-center text-center px-6 py-5 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl">

                                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/20 mb-3">
                                                <FaRocket className="text-amber-400 text-2xl" />
                                            </div>

                                            <h3 className="text-white font-semibold text-lg">
                                                Coming Soon
                                            </h3>

                                            <p className="text-gray-300 text-sm mt-1 max-w-[220px]">
                                                This template is currently under development and will be available soon.
                                            </p>

                                            <span className="mt-4 px-3 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                                In Development
                                            </span>

                                        </div>
                                    </div>
                                )}

                                {/* IMAGE */}
                                <div className="p-6 pb-4">
                                    <div
                                        className={`rounded-2xl overflow-hidden h-[230px] flex items-center justify-center transition-all duration-300
        ${theme === "Dark"
                                                ? "bg-[#1e293b]"
                                                : "bg-[#F7F8F9]"
                                            }`}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className={`max-h-full max-w-full object-contain transition-transform duration-300
          ${item.isDevelop
                                                    ? "blur-[3px] opacity-60"
                                                    : "group-hover:scale-[1.04]"
                                                }`}
                                        />
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="px-6 pb-6">
                                    <div className="flex items-start gap-3 flex-wrap">
                                        <h3
                                            className={`text-[20px] leading-7 font-semibold
          ${theme === "Dark"
                                                    ? "text-white"
                                                    : "text-[#172B4D]"
                                                }`}
                                        >
                                            {item.name}
                                        </h3>

                                        {item.isDevelop ? (
                                            <span className="mt-1 text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-lg bg-amber-500/20 text-amber-500 border border-amber-500/30">
                                                Coming Soon
                                            </span>
                                        ) : (
                                            item.badge && (
                                                <span
                                                    className={`mt-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg border
              ${theme === "Dark"
                                                            ? "border-gray-700 bg-[#1e293b] text-gray-300"
                                                            : "border-gray-200 bg-gray-100 text-gray-600"
                                                        }`}
                                                >
                                                    {item.badge}
                                                </span>
                                            )
                                        )}
                                    </div>

                                    <p
                                        className={`mt-3 text-[15px] leading-7 min-h-[90px]
        ${theme === "Dark"
                                                ? "text-gray-400"
                                                : "text-[#5E6C84]"
                                            }`}
                                    >
                                        {item.description}
                                    </p>

                                    {/* FOOTER */}
                                    <div
                                        className={`mt-5 flex items-center gap-3 text-[15px] font-medium
        ${theme === "Dark"
                                                ? "text-white"
                                                : "text-[#172B4D]"
                                            }`}
                                    >
                                        {item.icon && (
                                            <div
                                                className={`p-2 rounded-xl
            ${theme === "Dark"
                                                        ? "bg-[#1e293b]"
                                                        : "bg-gray-100"
                                                    }`}
                                            >
                                                <img
                                                    src={item.icon}
                                                    alt={item.product}
                                                    className="w-5 h-5 rounded-sm object-contain"
                                                />
                                            </div>
                                        )}

                                        <span>{item.product}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {templates ? <MoreAboutTemplates templates={templates} settemplates={settemplates} /> : null}
        </>
    );
}
export default TemplatesUi;