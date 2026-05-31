import { IoClose } from "react-icons/io5";
import { FaCheckCircle, FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineViewTimeline, MdViewKanban } from "react-icons/md";
import { BsListUl } from "react-icons/bs";


function MoreAboutTemplates({ templates,settemplates }: any) {

    return (
        <>




            <div className="fixed inset-0 z-50 bg-[#F4F5F7] flex flex-col">
                {/* TOP BAR */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-[#F4F5F7] border-b border-[#DFE1E6]">
                    <h2 className="text-[20px] font-semibold text-[#172B4D]">
                        {templates?.name} template
                    </h2>

                    <button
                        className="p-2 rounded-md hover:bg-black/5 transition"
                        onClick={() => settemplates(false)}
                    >
                        <IoClose size={22} className="text-[#42526E]" />
                    </button>
                </div>

                {/* BODY */}
                <div className="flex-1 overflow-y-auto px-8 py-8">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[1.6fr_420px] gap-8">
                        {/* LEFT */}
                        <div className="space-y-6">
                            {/* HERO CARD */}
                            <div className="bg-white border border-[#DFE1E6] rounded-2xl overflow-hidden">
                                <div className="bg-[#F7F8F9] p-8 flex items-center justify-center min-h-[340px]">
                                    <img
                                        src={templates?.image}
                                        alt={templates?.name}
                                        className="max-h-[320px] w-full object-contain"
                                    />
                                </div>

                                <div className="p-8">
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <h1 className="text-[30px] leading-[38px] font-semibold text-[#172B4D]">
                                            {templates?.name}
                                        </h1>

                                        {templates?.badge && (
                                            <span className="text-[12px] font-semibold uppercase tracking-wide px-2 py-1 rounded-md bg-[#F1F2F4] border border-[#DFE1E6] text-[#44546F]">
                                                {templates?.badge}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-[16px] leading-7 text-[#5E6C84] max-w-3xl">
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

                                        <span className="text-[15px] font-medium text-[#172B4D]">
                                            {templates?.product || "Taskaro"}
                                        </span>
                                    </div>

                                    <button className="mt-6 bg-[#0C66E4] hover:bg-[#0055CC] text-white text-[14px] font-semibold px-5 py-2.5 rounded-lg transition">
                                        Use this template
                                    </button>
                                </div>
                            </div>

                            {/* ABOUT */}
                            <div className="bg-white border border-[#DFE1E6] rounded-2xl p-6">
                                <h3 className="text-[16px] font-semibold text-[#172B4D] mb-3">
                                    About this template
                                </h3>

                                <p className="text-[15px] leading-7 text-[#5E6C84] whitespace-pre-line">
                                    {templates?.detailedInfo}
                                </p>
                            </div>

                            {/* FEATURES */}
                            <div className="bg-white border border-[#DFE1E6] rounded-2xl p-6">
                                <h3 className="text-[16px] font-semibold text-[#172B4D] mb-4">
                                    What you can do
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {templates?.features?.map((f: string, i: number) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 rounded-xl border border-[#DFE1E6] bg-[#FAFBFC] px-4 py-4"
                                        >
                                            <FaCheckCircle className="text-[#36B37E] mt-1 shrink-0" />
                                            <p className="text-[14px] leading-6 text-[#44546F]">{f}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* INCLUDED VIEWS */}
                            <div className="bg-white border border-[#DFE1E6] rounded-2xl p-6">
                                <h3 className="text-[16px] font-semibold text-[#172B4D] mb-4">
                                    Included views
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="rounded-xl border border-[#DFE1E6] p-4 bg-[#FAFBFC]">
                                        <div className="flex items-center gap-3 mb-2">
                                            <FaRegCalendarAlt className="text-[#0C66E4]" />
                                            <span className="text-[14px] font-semibold text-[#172B4D]">
                                                Calendar
                                            </span>
                                        </div>
                                        <p className="text-[14px] leading-6 text-[#5E6C84]">
                                            Visualize work by day, week, or month.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-[#DFE1E6] p-4 bg-[#FAFBFC]">
                                        <div className="flex items-center gap-3 mb-2">
                                            <MdOutlineViewTimeline className="text-[#6554C0]" />
                                            <span className="text-[14px] font-semibold text-[#172B4D]">
                                                Timeline
                                            </span>
                                        </div>
                                        <p className="text-[14px] leading-6 text-[#5E6C84]">
                                            Track milestones and overlapping schedules.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-[#DFE1E6] p-4 bg-[#FAFBFC]">
                                        <div className="flex items-center gap-3 mb-2">
                                            <MdViewKanban className="text-[#FF991F]" />
                                            <span className="text-[14px] font-semibold text-[#172B4D]">
                                                Board
                                            </span>
                                        </div>
                                        <p className="text-[14px] leading-6 text-[#5E6C84]">
                                            Move tasks through workflow stages.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-[#DFE1E6] p-4 bg-[#FAFBFC]">
                                        <div className="flex items-center gap-3 mb-2">
                                            <BsListUl className="text-[#36B37E]" />
                                            <span className="text-[14px] font-semibold text-[#172B4D]">
                                                List
                                            </span>
                                        </div>
                                        <p className="text-[14px] leading-6 text-[#5E6C84]">
                                            Quickly edit and scan all scheduled items.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-5">
                            <div className="bg-white border border-[#DFE1E6] rounded-2xl p-5">
                                <h3 className="text-[14px] font-semibold text-[#172B4D] mb-3">
                                    Best for
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {(templates?.bestFor || ["Project management", "Marketing"]).map(
                                        (item: string, i: number) => (
                                            <span
                                                key={i}
                                                className="text-[13px] px-3 py-1.5 rounded-full bg-[#F1F2F4] text-[#44546F] border border-[#DFE1E6]"
                                            >
                                                {item}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="bg-white border border-[#DFE1E6] rounded-2xl p-5">
                                <h3 className="text-[14px] font-semibold text-[#172B4D] mb-3">
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
                                            className="text-[14px] text-[#44546F] px-3 py-2 rounded-lg bg-[#FAFBFC] border border-[#DFE1E6]"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white border border-[#DFE1E6] rounded-2xl p-5">
                                <h3 className="text-[14px] font-semibold text-[#172B4D] mb-3">
                                    Default view
                                </h3>
                                <p className="text-[14px] leading-6 text-[#5E6C84]">
                                    {templates?.defaultView || "Calendar"}
                                </p>
                            </div>

                            <div className="bg-white border border-[#DFE1E6] rounded-2xl p-5">
                                <h3 className="text-[14px] font-semibold text-[#172B4D] mb-3">
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
                                            className="flex items-center justify-between px-3 py-2 rounded-lg border border-[#DFE1E6] bg-[#FAFBFC]"
                                        >
                                            <span className="text-[14px] text-[#44546F]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>



                            {/* other cards above ... */}

                            {/* STICKY BOTTOM CTA */}
                            <div className="sticky bottom-0 bg-[#F4F5F7] pt-4 pb-4">

                                {/* soft divider (Jira style) */}
                                <div className="h-px w-full bg-gray-200 mb-4" />

                                {/* button container with subtle lift */}
                                <div className="px-1">
                                    <button className="w-full bg-[#0C66E4] hover:bg-[#0055CC] active:scale-[0.99] text-white text-[14px] font-semibold py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
                                        Use this template
                                    </button>
                                </div>

                                {/* optional subtle hint text */}
                                <p className="text-[11px] text-gray-500 text-center mt-2">
                                    You can change settings later
                                </p>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>


    );
}

export default MoreAboutTemplates;