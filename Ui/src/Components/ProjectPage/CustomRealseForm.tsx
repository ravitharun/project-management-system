// import React from "react";
import {
    X,
    Rocket,
    Tag,
    FileText,
    Calendar,
    Sparkles,
    Plus,
    CheckCircle2,
} from "lucide-react";
import { useContext } from "react";
import bgthemeContext from "../../Context/ThemeContext";
import { toast, Toaster } from "sonner";

function CustomRealseForm({ onClose }: any) {
    const { theme }: any = useContext(bgthemeContext)
    const is_theme = theme == 'Dark'





    const AddNewRealse = async () => {
        toast.custom(() => (
            <div className="flex items-center gap-3 rounded-lg bg-gray-900 px-4 py-3 text-white shadow-lg">
                <CheckCircle2
                    size={22}
                    className="shrink-0 text-green-400"
                />

                <div>
                    <p className="font-semibold">Success</p>
                    <p className="text-sm text-gray-300">
                        New Release created successfully
                    </p>
                </div>
            </div>
        ));


    }
    return (
        <>
            <Toaster></Toaster>


            <div
                className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${is_theme ? "bg-black/60" : "bg-black/40"
                    }`}
            >
                <div
                    className={`relative w-[calc(100vw-2rem)] sm:w-[90vw] md:w-[75vw] lg:w-[650px] max-h-[90vh] overflow-hidden rounded-2xl border shadow-2xl ${is_theme
                        ? "border-gray-700 bg-gray-900"
                        : "border-gray-200 bg-white"
                        }`}
                >
                    {/* Header */}
                    <div
                        className={`flex items-start justify-between border-b px-4 py-3 ${is_theme ? "border-gray-700" : "border-gray-200"
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${is_theme
                                    ? "bg-indigo-500/10 text-indigo-400"
                                    : "bg-indigo-100 text-indigo-600"
                                    }`}
                            >
                                <Rocket size={20} />
                            </div>

                            <div>
                                <h2
                                    className={`text-base font-semibold ${is_theme ? "text-white" : "text-gray-900"
                                        }`}
                                >
                                    Create Release
                                </h2>

                                <p
                                    className={`mt-0.5 text-xs ${is_theme ? "text-gray-400" : "text-gray-500"
                                        }`}
                                >
                                    Manage your project versions
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className={`rounded-lg p-1.5 transition ${is_theme
                                ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Form */}
                    <div className="max-h-[65vh] overflow-y-auto px-4 py-4">
                        {/* Release Name */}
                        <div className="mb-4">
                            <label
                                className={`mb-1.5 block text-xs font-medium ${is_theme ? "text-gray-300" : "text-gray-700"
                                    }`}
                            >
                                Release Name
                            </label>

                            <div className="relative">
                                <Tag
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    placeholder="e.g. Version 1.4.0"
                                    className={`w-full rounded-lg border py-2.5 pl-9 pr-3 text-sm outline-none transition ${is_theme
                                        ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-indigo-500"
                                        : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-indigo-500"
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Version */}
                        <div className="mb-4">
                            <label
                                className={`mb-1.5 block text-xs font-medium ${is_theme ? "text-gray-300" : "text-gray-700"
                                    }`}
                            >
                                Version
                            </label>

                            <input
                                type="text"
                                placeholder="e.g. v1.4.0"
                                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${is_theme
                                    ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-indigo-500"
                                    : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-indigo-500"
                                    }`}
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label
                                className={`mb-1.5 block text-xs font-medium ${is_theme ? "text-gray-300" : "text-gray-700"
                                    }`}
                            >
                                Description
                            </label>

                            <div className="relative">
                                <FileText
                                    size={16}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <textarea
                                    rows={3}
                                    placeholder="Describe what's included in this release..."
                                    className={`w-full resize-none rounded-lg border py-2.5 pl-9 pr-3 text-sm outline-none transition ${is_theme
                                        ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-indigo-500"
                                        : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-indigo-500"
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Date + Status */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* Release Date */}
                            <div>
                                <label
                                    className={`mb-1.5 block text-xs font-medium ${is_theme ? "text-gray-300" : "text-gray-700"
                                        }`}
                                >
                                    Release Date
                                </label>

                                <div className="relative">
                                    <Calendar
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="date"
                                        className={`w-full rounded-lg border py-2.5 pl-9 pr-2 text-sm outline-none ${is_theme
                                            ? "border-gray-700 bg-gray-800 text-white focus:border-indigo-500"
                                            : "border-gray-300 bg-white text-gray-900 focus:border-indigo-500"
                                            }`}
                                    />
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label
                                    className={`mb-1.5 block text-xs font-medium ${is_theme ? "text-gray-300" : "text-gray-700"
                                        }`}
                                >
                                    Status
                                </label>

                                <select
                                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none ${is_theme
                                        ? "border-gray-700 bg-gray-800 text-white focus:border-indigo-500"
                                        : "border-gray-300 bg-white text-gray-900 focus:border-indigo-500"
                                        }`}
                                >
                                    <option>Planned</option>
                                    <option>In Progress</option>
                                    <option>Released</option>
                                </select>
                            </div>
                        </div>

                        {/* Release Highlights */}
                        <div
                            className={`mt-4 rounded-lg border border-dashed p-3 ${is_theme
                                ? "border-indigo-500/30 bg-indigo-500/5"
                                : "border-indigo-300 bg-indigo-50"
                                }`}
                        >
                            <div className="flex gap-2.5">
                                <Sparkles
                                    size={17}
                                    className="mt-0.5 shrink-0 text-indigo-500"
                                />

                                <div>
                                    <p
                                        className={`text-xs font-medium ${is_theme ? "text-indigo-400" : "text-indigo-700"
                                            }`}
                                    >
                                        Release highlights
                                    </p>

                                    <p
                                        className={`mt-0.5 text-[11px] leading-4 ${is_theme ? "text-gray-400" : "text-gray-600"
                                            }`}
                                    >
                                        Add important features, improvements, and fixes included in
                                        this version.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div
                        className={`flex flex-col-reverse gap-2 border-t px-4 py-3 sm:flex-row sm:justify-end ${is_theme
                            ? "border-gray-700 bg-gray-900"
                            : "border-gray-200 bg-gray-50"
                            }`}
                    >
                        <button
                            onClick={onClose}
                            className={`w-full rounded-lg border px-4 py-2 text-xs font-medium sm:w-auto ${is_theme
                                ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                                : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            Cancel
                        </button>

                        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 sm:w-auto"


                            onClick={AddNewRealse}
                        >
                            <Plus size={16} />
                            Create Release
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomRealseForm;