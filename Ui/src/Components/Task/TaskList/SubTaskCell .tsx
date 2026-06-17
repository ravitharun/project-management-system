import { useState } from "react";

const SubTaskCell = (params: any) => {
    const [open, setOpen] = useState(false);
    const subTasks = params.value || [];

    return (
        <div className="w-full">
            {/* Header */}
            <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer flex justify-between items-center bg-gray-800/40 px-2 py-1 rounded-md"
            >
                <span className="text-xs text-white">
                    {subTasks.length} SubTasks
                </span>

                <span className="text-xs text-gray-400">
                    {open ? "▲" : "▼"}
                </span>
            </div>

            {/* Expanded content */}
            {open && (
                <div className="mt-1 flex flex-wrap gap-1">
                    {subTasks.length === 0 ? (
                        <span className="text-xs text-gray-400">
                            No SubTasks
                        </span>
                    ) : (
                        subTasks.map((sub: any, i: number) => (
                            <span
                                key={i}
                                className="text-[11px] px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400"
                            >
                                {sub.taskName || sub.title}
                            </span>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default SubTaskCell;