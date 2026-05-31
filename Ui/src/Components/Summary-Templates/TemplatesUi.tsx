import { useState } from "react";
import Data from "./Templetes.json";
import { X } from "lucide-react";
import MoreAboutTemplates from "./MoreAboutTemplates";

function TemplatesUi({ setisworkspace }: any) {

    const [templates, settemplates] = useState()
    console.log(templates ? "new page More about " : null)

    return (
        <>
            <div className="fixed inset-0 z-50 bg-[#F4F5F7] flex flex-col">
                {/* Top bar */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-[#F4F5F7]">
                    <h2 className="text-[20px] font-semibold text-[#172B4D]">
                        Made for you
                    </h2>

                    <button
                        className="p-2 rounded-md hover:bg-black/5 transition"
                        onClick={() => setisworkspace(false)}
                    >
                        <X size={20} className="text-[#42526E]" />
                    </button>
                </div>

                {/* Intro */}
                <div className="px-8 pb-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Choose templates based on how similar teams work
                    </h2>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-8 pb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {Data.map((item: any) => (
                            <div
                                key={item.id}
                                className="group bg-white border border-[#DFE1E6] rounded-2xl overflow-hidden hover:border-[#C1C7D0] hover:shadow-[0_4px_12px_rgba(9,30,66,0.08)] transition-all duration-200 cursor-pointer"
                                onClick={() => settemplates(item)}
                            >
                                {/* Image area */}
                                <div className="p-6 pb-4">
                                    <div className="rounded-xl overflow-hidden bg-[#F7F8F9] flex items-center justify-center h-[220px]">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="max-h-full max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="px-6 pb-6">
                                    <div className="flex items-start gap-3 flex-wrap">
                                        <h3 className="text-[20px] leading-7 font-semibold text-[#172B4D]">
                                            {item.name}
                                        </h3>

                                        {item.badge && (
                                            <span className="mt-1 text-[12px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md border border-[#DFE1E6] text-[#42526E] bg-[#F7F8F9]">
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>

                                    <p className="mt-3 text-[15px] leading-7 text-[#5E6C84] min-h-[84px]">
                                        {item.description}
                                    </p>

                                    <div className="mt-5 flex items-center gap-2 text-[15px] text-[#172B4D] font-medium">
                                        {item.icon && (
                                            <img
                                                src={item.icon}
                                                alt={item.product}
                                                className="w-5 h-5 rounded-sm object-contain"
                                            />
                                        )}
                                        <span>{item.product}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {templates ? <MoreAboutTemplates templates={templates}  settemplates={settemplates}/> : null}
        </>
    );
}
export default TemplatesUi;