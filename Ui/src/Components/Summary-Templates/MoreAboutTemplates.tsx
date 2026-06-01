import { IoClose } from "react-icons/io5";
import { FaCheckCircle, FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineViewTimeline, MdViewKanban } from "react-icons/md";
import { BsListUl } from "react-icons/bs";
import { useContext, useState } from "react";
import bgthemeContext from "../../Context/ThemeContext";

import TemplateSpace from "./TemplateSpace"
function MoreAboutTemplates({ templates, settemplates }: any) {
    console.log(templates, 'templates')
    const [templatesChoosed, SettemplatesChoosed] = useState<boolean>(false)
    const context = useContext(bgthemeContext)
    const { theme }: any = context
    const templatename = templates?.name || "name"



    return (
        <>

            <div
                className={`fixed inset-0 z-50 flex flex-col
    ${theme === "Dark"
                        ? "bg-[#0f172a]"
                        : "bg-[#F4F5F7]"
                    }`}
            >
                {/* TOP BAR */}

                <div
                    className={`sticky top-0 z-10 flex items-center justify-between px-8 py-5 border-b
        ${theme === "Dark"
                            ? "bg-[#0f172a] border-gray-800"
                            : "bg-[#F4F5F7] border-[#DFE1E6]"
                        }`}
                >
                    <h2
                        className={`text-[20px] font-semibold
            ${theme === "Dark"
                                ? "text-white"
                                : "text-[#172B4D]"
                            }`}
                    >
                        {templates?.name} template
                    </h2>

                    <button
                        className={`p-2 rounded-md transition
            ${theme === "Dark"
                                ? "hover:bg-white/10"
                                : "hover:bg-black/5"
                            }`}
                        onClick={() => settemplates(false)}
                    >
                        <IoClose
                            size={22}
                            className={`${theme === "Dark"
                                ? "text-gray-300"
                                : "text-[#42526E]"
                                }`}
                        />
                    </button>
                </div>

                {/* BODY */}

                <div className="flex-1 overflow-y-auto px-8 py-8 scrollbar-hide">

                    <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[1.6fr_420px] gap-8">

                        {/* LEFT */}

                        <div className="space-y-6">

                            {/* HERO CARD */}

                            <div
                                className={`rounded-2xl overflow-hidden border
                    ${theme === "Dark"
                                        ? "bg-[#111827] border-gray-800"
                                        : "bg-white border-[#DFE1E6]"
                                    }`}
                            >

                                <div
                                    className={`p-8 flex items-center justify-center min-h-[340px]
                        ${theme === "Dark"
                                            ? "bg-[#1e293b]"
                                            : "bg-[#F7F8F9]"
                                        }`}
                                >
                                    <img
                                        src={templates?.image}
                                        alt={templates?.name}
                                        className="max-h-[320px] w-full object-contain"
                                    />
                                </div>

                                <div className="p-8">

                                    <div className="flex flex-wrap items-center gap-3 mb-3">

                                        <h1
                                            className={`text-[30px] leading-[38px] font-semibold
                                ${theme === "Dark"
                                                    ? "text-white"
                                                    : "text-[#172B4D]"
                                                }`}
                                        >
                                            {templates?.name}
                                        </h1>

                                        {templates?.badge && (
                                            <span
                                                className={`text-[12px] font-semibold uppercase tracking-wide px-2 py-1 rounded-md border
                                    ${theme === "Dark"
                                                        ? "bg-[#1e293b] border-gray-700 text-gray-300"
                                                        : "bg-[#F1F2F4] border-[#DFE1E6] text-[#44546F]"
                                                    }`}
                                            >
                                                {templates?.badge}
                                            </span>
                                        )}

                                    </div>

                                    <p
                                        className={`text-[16px] leading-7 max-w-3xl
                            ${theme === "Dark"
                                                ? "text-gray-400"
                                                : "text-[#5E6C84]"
                                            }`}
                                    >
                                        {templates?.description}
                                    </p>

                                    <div className="mt-5 flex items-center gap-3">

                                        {templates?.icon && (
                                            <img
                                                src={templates?.icon}
                                                alt={templates?.product}
                                                className="w-6 h-6 rounded-sm object-contain"
                                            />
                                        )}

                                        <span
                                            className={`text-[15px] font-medium
                                ${theme === "Dark"
                                                    ? "text-white"
                                                    : "text-[#172B4D]"
                                                }`}
                                        >
                                            {templates?.product || "Taskaro"}
                                        </span>

                                    </div>

                                    <button className="mt-6 bg-[#0C66E4] hover:bg-[#0055CC] text-white text-[14px] font-semibold px-5 py-2.5 rounded-lg transition" onClick={() => SettemplatesChoosed(true)}>
                                        Use this template
                                    </button>

                                </div>

                            </div>

                            {/* ABOUT */}

                            <div
                                className={`rounded-2xl p-6 border
                    ${theme === "Dark"
                                        ? "bg-[#111827] border-gray-800"
                                        : "bg-white border-[#DFE1E6]"
                                    }`}
                            >

                                <h3
                                    className={`text-[16px] font-semibold mb-3
                        ${theme === "Dark"
                                            ? "text-white"
                                            : "text-[#172B4D]"
                                        }`}
                                >
                                    About this template
                                </h3>

                                <p
                                    className={`text-[15px] leading-7 whitespace-pre-line
                        ${theme === "Dark"
                                            ? "text-gray-400"
                                            : "text-[#5E6C84]"
                                        }`}
                                >
                                    {templates?.detailedInfo}
                                </p>

                            </div>

                            {/* FEATURES */}

                            <div
                                className={`rounded-2xl p-6 border
                    ${theme === "Dark"
                                        ? "bg-[#111827] border-gray-800"
                                        : "bg-white border-[#DFE1E6]"
                                    }`}
                            >

                                <h3
                                    className={`text-[16px] font-semibold mb-4
                        ${theme === "Dark"
                                            ? "text-white"
                                            : "text-[#172B4D]"
                                        }`}
                                >
                                    What you can do
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    {templates?.features?.map((f: string, i: number) => (

                                        <div
                                            key={i}
                                            className={`flex items-start gap-3 rounded-xl border px-4 py-4
                                ${theme === "Dark"
                                                    ? "bg-[#1e293b] border-gray-700"
                                                    : "bg-[#FAFBFC] border-[#DFE1E6]"
                                                }`}
                                        >

                                            <FaCheckCircle className="text-[#36B37E] mt-1 shrink-0" />

                                            <p
                                                className={`text-[14px] leading-6
                                    ${theme === "Dark"
                                                        ? "text-gray-300"
                                                        : "text-[#44546F]"
                                                    }`}
                                            >
                                                {f}
                                            </p>

                                        </div>

                                    ))}

                                </div>

                            </div>

                            {/* INCLUDED VIEWS */}

                            <div
                                className={`rounded-2xl p-6 border
                    ${theme === "Dark"
                                        ? "bg-[#111827] border-gray-800"
                                        : "bg-white border-[#DFE1E6]"
                                    }`}
                            >

                                <h3
                                    className={`text-[16px] font-semibold mb-4
                        ${theme === "Dark"
                                            ? "text-white"
                                            : "text-[#172B4D]"
                                        }`}
                                >
                                    Included views
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                    {/* CALENDAR */}

                                    <div
                                        className={`rounded-xl border p-4
                            ${theme === "Dark"
                                                ? "bg-[#1e293b] border-gray-700"
                                                : "bg-[#FAFBFC] border-[#DFE1E6]"
                                            }`}
                                    >

                                        <div className="flex items-center gap-3 mb-2">
                                            <FaRegCalendarAlt className="text-[#0C66E4]" />

                                            <span
                                                className={`text-[14px] font-semibold
                                    ${theme === "Dark"
                                                        ? "text-white"
                                                        : "text-[#172B4D]"
                                                    }`}
                                            >
                                                Calendar
                                            </span>
                                        </div>

                                        <p
                                            className={`text-[14px] leading-6
                                ${theme === "Dark"
                                                    ? "text-gray-400"
                                                    : "text-[#5E6C84]"
                                                }`}
                                        >
                                            Visualize work by day, week, or month.
                                        </p>

                                    </div>

                                    {/* TIMELINE */}

                                    <div
                                        className={`rounded-xl border p-4
                            ${theme === "Dark"
                                                ? "bg-[#1e293b] border-gray-700"
                                                : "bg-[#FAFBFC] border-[#DFE1E6]"
                                            }`}
                                    >

                                        <div className="flex items-center gap-3 mb-2">
                                            <MdOutlineViewTimeline className="text-[#6554C0]" />

                                            <span
                                                className={`text-[14px] font-semibold
                                    ${theme === "Dark"
                                                        ? "text-white"
                                                        : "text-[#172B4D]"
                                                    }`}
                                            >
                                                Timeline
                                            </span>
                                        </div>

                                        <p
                                            className={`text-[14px] leading-6
                                ${theme === "Dark"
                                                    ? "text-gray-400"
                                                    : "text-[#5E6C84]"
                                                }`}
                                        >
                                            Track milestones and overlapping schedules.
                                        </p>

                                    </div>

                                    {/* BOARD */}

                                    <div
                                        className={`rounded-xl border p-4
                            ${theme === "Dark"
                                                ? "bg-[#1e293b] border-gray-700"
                                                : "bg-[#FAFBFC] border-[#DFE1E6]"
                                            }`}
                                    >

                                        <div className="flex items-center gap-3 mb-2">
                                            <MdViewKanban className="text-[#FF991F]" />

                                            <span
                                                className={`text-[14px] font-semibold
                                    ${theme === "Dark"
                                                        ? "text-white"
                                                        : "text-[#172B4D]"
                                                    }`}
                                            >
                                                Board
                                            </span>
                                        </div>

                                        <p
                                            className={`text-[14px] leading-6
                                ${theme === "Dark"
                                                    ? "text-gray-400"
                                                    : "text-[#5E6C84]"
                                                }`}
                                        >
                                            Move tasks through workflow stages.
                                        </p>

                                    </div>

                                    {/* LIST */}

                                    <div
                                        className={`rounded-xl border p-4
                            ${theme === "Dark"
                                                ? "bg-[#1e293b] border-gray-700"
                                                : "bg-[#FAFBFC] border-[#DFE1E6]"
                                            }`}
                                    >

                                        <div className="flex items-center gap-3 mb-2">
                                            <BsListUl className="text-[#36B37E]" />

                                            <span
                                                className={`text-[14px] font-semibold
                                    ${theme === "Dark"
                                                        ? "text-white"
                                                        : "text-[#172B4D]"
                                                    }`}
                                            >
                                                List
                                            </span>
                                        </div>

                                        <p
                                            className={`text-[14px] leading-6
                                ${theme === "Dark"
                                                    ? "text-gray-400"
                                                    : "text-[#5E6C84]"
                                                }`}
                                        >
                                            Quickly edit and scan all scheduled items.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}

                        <div className="space-y-5">

                            {/* BEST FOR */}

                            <div
                                className={`rounded-2xl p-5 border
                    ${theme === "Dark"
                                        ? "bg-[#111827] border-gray-800"
                                        : "bg-white border-[#DFE1E6]"
                                    }`}
                            >

                                <h3
                                    className={`text-[14px] font-semibold mb-3
                        ${theme === "Dark"
                                            ? "text-white"
                                            : "text-[#172B4D]"
                                        }`}
                                >
                                    Best for
                                </h3>

                                <div className="flex flex-wrap gap-2">

                                    {(templates?.bestFor || ["Project management", "Marketing"]).map(
                                        (item: string, i: number) => (

                                            <span
                                                key={i}
                                                className={`text-[13px] px-3 py-1.5 rounded-full border
                                    ${theme === "Dark"
                                                        ? "bg-[#1e293b] border-gray-700 text-gray-300"
                                                        : "bg-[#F1F2F4] text-[#44546F] border-[#DFE1E6]"
                                                    }`}
                                            >
                                                {item}
                                            </span>

                                        )
                                    )}

                                </div>

                            </div>

                            {/* KEY FEATURES */}

                            <div
                                className={`rounded-2xl p-5 border
                    ${theme === "Dark"
                                        ? "bg-[#111827] border-gray-800"
                                        : "bg-white border-[#DFE1E6]"
                                    }`}
                            >

                                <h3
                                    className={`text-[14px] font-semibold mb-3
                        ${theme === "Dark"
                                            ? "text-white"
                                            : "text-[#172B4D]"
                                        }`}
                                >
                                    Key features
                                </h3>

                                <div className="space-y-2">

                                    {(templates?.keyFeatures || [
                                        "Task planning",
                                        "Prioritization",
                                        "Pipeline management",
                                    ]).map((item: string, i: number) => (

                                        <div
                                            key={i}
                                            className={`text-[14px] px-3 py-2 rounded-lg border
                                ${theme === "Dark"
                                                    ? "bg-[#1e293b] border-gray-700 text-gray-300"
                                                    : "bg-[#FAFBFC] border-[#DFE1E6] text-[#44546F]"
                                                }`}
                                        >
                                            {item}
                                        </div>

                                    ))}

                                </div>

                            </div>

                            {/* DEFAULT VIEW */}

                            <div
                                className={`rounded-2xl p-5 border
                    ${theme === "Dark"
                                        ? "bg-[#111827] border-gray-800"
                                        : "bg-white border-[#DFE1E6]"
                                    }`}
                            >

                                <h3
                                    className={`text-[14px] font-semibold mb-3
                        ${theme === "Dark"
                                            ? "text-white"
                                            : "text-[#172B4D]"
                                        }`}
                                >
                                    Default view
                                </h3>

                                <p
                                    className={`text-[14px] leading-6
                        ${theme === "Dark"
                                            ? "text-gray-400"
                                            : "text-[#5E6C84]"
                                        }`}
                                >
                                    {templates?.defaultView || "Calendar"}
                                </p>

                            </div>

                            {/* TRACK ITEMS */}

                            <div
                                className={`rounded-2xl p-5 border
                    ${theme === "Dark"
                                        ? "bg-[#111827] border-gray-800"
                                        : "bg-white border-[#DFE1E6]"
                                    }`}
                            >

                                <h3
                                    className={`text-[14px] font-semibold mb-3
                        ${theme === "Dark"
                                            ? "text-white"
                                            : "text-[#172B4D]"
                                        }`}
                                >
                                    Track items like
                                </h3>

                                <div className="space-y-2">

                                    {(templates?.trackItems || [
                                        "Campaign launches",
                                        "Team events",
                                        "Deadlines",
                                        "Meetings",
                                    ]).map((item: string, i: number) => (

                                        <div
                                            key={i}
                                            className={`flex items-center justify-between px-3 py-2 rounded-lg border
                                ${theme === "Dark"
                                                    ? "bg-[#1e293b] border-gray-700"
                                                    : "bg-[#FAFBFC] border-[#DFE1E6]"
                                                }`}
                                        >

                                            <span
                                                className={`text-[14px]
                                    ${theme === "Dark"
                                                        ? "text-gray-300"
                                                        : "text-[#44546F]"
                                                    }`}
                                            >
                                                {item}
                                            </span>

                                        </div>

                                    ))}

                                </div>

                            </div>

                            {/* STICKY CTA */}

                            <div
                                className={`sticky bottom-0 pt-4 pb-4
                    ${theme === "Dark"
                                        ? "bg-[#0f172a]"
                                        : "bg-[#F4F5F7]"
                                    }`}
                            >

                                <div
                                    className={`h-px w-full mb-4
                        ${theme === "Dark"
                                            ? "bg-gray-800"
                                            : "bg-gray-200"
                                        }`}
                                />

                                <div className="px-1">
                                    <button className="w-full bg-[#0C66E4] hover:bg-[#0055CC] text-white text-[14px] font-semibold py-3 rounded-xl transition-all duration-200" onClick={() => SettemplatesChoosed(true)}>
                                        Use this template
                                    </button>
                                </div>

                                <p className="text-[11px] text-gray-500 text-center mt-2">
                                    You can change settings later
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
            {templatesChoosed && <>

                <TemplateSpace SettemplatesChoosed={SettemplatesChoosed} templatename={templatename} templates={templates} />
            </>}
        </>


    );
}

export default MoreAboutTemplates;