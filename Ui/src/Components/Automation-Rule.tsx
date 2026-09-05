import { useContext, useState } from "react";

import {
    X,
    Zap,
    CircleHelp,
    Play,
    GitBranch,
    CheckCircle2,
    Save,
    ChevronDown,

    ArrowRight,

} from "lucide-react";
import bgthemeContext from "../Context/ThemeContext";
import ClickedWorkSpace from "../Context/ClickedWorkSpace";
import { getuserInfo } from "./LocalStorage";
import { instance } from "../services/apiservices";
import { ShowToast } from "./toastHelper";
import { Toaster } from "sonner";

function AutomationRule({ CreateRule, handelonclose }: any) {

    const { theme }: any = useContext(bgthemeContext)



    const { ClickedSpace }: any = useContext(ClickedWorkSpace)



    const is_theme = theme === "Dark";
    const [ruleName, setRuleName] = useState("");
    const [trigger, setTrigger] = useState("");
    const [conditionField, setConditionField] = useState("");
    const [operator, setOperator] = useState("equals");
    const [conditionValue, setConditionValue] = useState("");
    const [action, setAction] = useState("");
    const [actionValue, setActionValue] = useState("");
    const [status, setStatus] = useState(true);

    if (!CreateRule) return null;
    const handleCancel = () => {
        setRuleName("");
        setTrigger("");
        setConditionField("");
        setOperator("equals");
        setConditionValue("");
        setAction("");
        setActionValue("");
        setStatus(true);

        if (handelonclose) handelonclose();
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const rule = {
            name: ruleName,
            trigger,
            condition: conditionField
                ? {
                    field: conditionField,
                    operator,
                    value: conditionValue,
                }
                : null,
            action: {
                type: action,
                value: actionValue || null,
            },
            enabled: status,
            projectId: ClickedSpace?._id,
            createdBy: JSON.parse(getuserInfo)._id
        };


        try {
            const response = await instance.post('/api/automation/rules', { rule: rule })
            if (response.status == 201 || 200) {
                ShowToast(response?.data?.message, response?.status, "sucess")
                setTimeout(() => {
                    handleCancel()
                    if (handelonclose) return handelonclose();
                }, 2500);

            }
        } catch (error: any) {
            // console.error(error)
            return ShowToast(error?.response?.data?.message, error?.response?.status, "Error")
        }


    };



    return (
        <>

            <Toaster closeButton></Toaster>

            <div
                className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${is_theme ? "bg-black/60" : "bg-black/40"
                    }`}
            >
                {/* Popup */}
                <div
                    className={`w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl ${is_theme
                        ? "bg-[#0B1120] text-white"
                        : "bg-white text-gray-900"
                        }`}
                >

                    {/* Header */}
                    <div
                        className={`flex items-center justify-between border-b px-6 py-4 ${is_theme
                            ? "border-gray-800"
                            : "border-gray-200"
                            }`}
                    >
                        <div className="flex items-center gap-3">

                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-lg ${is_theme
                                    ? "bg-indigo-500/10"
                                    : "bg-indigo-100"
                                    }`}
                            >
                                <Zap
                                    className={`h-5 w-5 ${is_theme
                                        ? "text-indigo-400"
                                        : "text-indigo-600"
                                        }`}
                                />
                            </div>

                            <div>
                                <h2
                                    className={`text-lg font-semibold ${is_theme
                                        ? "text-white"
                                        : "text-gray-900"
                                        }`}
                                >
                                    Create Automation Rule
                                </h2>

                                <p
                                    className={`text-xs ${is_theme
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                        }`}
                                >
                                    Automate repetitive project tasks
                                </p>
                            </div>
                        </div>

                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={handelonclose}
                            className={`rounded-lg p-2 transition ${is_theme
                                ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                                : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                }`}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>

                        <div className="max-h-[70vh] space-y-6 overflow-y-auto p-6">

                            {/* Rule Name */}
                            <div>
                                <label
                                    className={`mb-2 flex items-center gap-2 text-sm font-medium ${is_theme
                                        ? "text-gray-200"
                                        : "text-gray-700"
                                        }`}
                                >
                                    <Zap size={16} />
                                    Rule Name
                                    <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    value={ruleName}
                                    onChange={(e) =>
                                        setRuleName(e.target.value)
                                    }
                                    placeholder="e.g. Move completed tasks"
                                    required
                                    className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition ${is_theme
                                        ? "border-gray-700 bg-[#111827] text-white placeholder:text-gray-500 focus:border-indigo-500"
                                        : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-indigo-500"
                                        }`}
                                />
                            </div>

                            {/* WHEN */}
                            <div
                                className={`rounded-xl border p-4 ${is_theme
                                    ? "border-gray-800 bg-[#0F172A]"
                                    : "border-gray-200 bg-gray-50/50"
                                    }`}
                            >
                                <div className="mb-4 flex items-center gap-2">

                                    <div
                                        className={`rounded-lg p-2 ${is_theme
                                            ? "bg-blue-500/10"
                                            : "bg-blue-100"
                                            }`}
                                    >
                                        <Play
                                            size={17}
                                            className={
                                                is_theme
                                                    ? "text-blue-400"
                                                    : "text-blue-600"
                                            }
                                        />
                                    </div>

                                    <div>
                                        <h3
                                            className={`text-sm font-semibold ${is_theme
                                                ? "text-white"
                                                : "text-gray-900"
                                                }`}
                                        >
                                            WHEN
                                        </h3>

                                        <p
                                            className={`text-xs ${is_theme
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                                }`}
                                        >
                                            Choose what starts this automation
                                        </p>
                                    </div>
                                </div>

                                <div className="relative">
                                    <select
                                        value={trigger}
                                        onChange={(e) =>
                                            setTrigger(e.target.value)
                                        }
                                        required
                                        className={`w-full appearance-none rounded-lg border px-4 py-2.5 pr-10 text-sm outline-none focus:border-indigo-500 ${is_theme
                                            ? "border-gray-700 bg-[#111827] text-white"
                                            : "border-gray-300 bg-white text-gray-900"
                                            }`}
                                    >
                                        <option value="">
                                            Select trigger
                                        </option>

                                        <option value="TASK_CREATED">
                                            Task Created
                                        </option>

                                        <option value="TASK_ASSIGNED">
                                            Task Assigned
                                        </option>

                                        <option value="TASK_STATUS_CHANGED">
                                            Task Status Changed
                                        </option>

                                        <option value="TASK_UPDATED">
                                            Task Updated
                                        </option>

                                        <option value="COMMENT_ADDED">
                                            Comment Added
                                        </option>

                                        <option value="TASK_COMPLETED">
                                            Task Completed
                                        </option>
                                    </select>

                                    <ChevronDown
                                        size={17}
                                        className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${is_theme
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                            }`}
                                    />
                                </div>
                            </div>

                            {/* IF */}
                            <div
                                className={`rounded-xl border p-4 ${is_theme
                                    ? "border-gray-800 bg-[#0F172A]"
                                    : "border-gray-200 bg-gray-50/50"
                                    }`}
                            >
                                <div className="mb-4 flex items-center justify-between">

                                    <div className="flex items-center gap-2">

                                        <div
                                            className={`rounded-lg p-2 ${is_theme
                                                ? "bg-amber-500/10"
                                                : "bg-amber-100"
                                                }`}
                                        >
                                            <GitBranch
                                                size={17}
                                                className={
                                                    is_theme
                                                        ? "text-amber-400"
                                                        : "text-amber-600"
                                                }
                                            />
                                        </div>

                                        <div>
                                            <h3
                                                className={`text-sm font-semibold ${is_theme
                                                    ? "text-white"
                                                    : "text-gray-900"
                                                    }`}
                                            >
                                                IF
                                            </h3>

                                            <p
                                                className={`text-xs ${is_theme
                                                    ? "text-gray-400"
                                                    : "text-gray-500"
                                                    }`}
                                            >
                                                Optional condition
                                            </p>
                                        </div>

                                    </div>

                                    <CircleHelp
                                        size={17}
                                        className={
                                            is_theme
                                                ? "text-gray-500"
                                                : "text-gray-400"
                                        }
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

                                    <select
                                        value={conditionField}
                                        onChange={(e) =>
                                            setConditionField(e.target.value)
                                        }
                                        className={`rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-indigo-500 ${is_theme
                                            ? "border-gray-700 bg-[#111827] text-white"
                                            : "border-gray-300 bg-white text-gray-900"
                                            }`}
                                    >
                                        <option value="">Field</option>
                                        <option value="priority">
                                            Priority
                                        </option>
                                        <option value="status">
                                            Status
                                        </option>
                                        <option value="assignee">
                                            Assignee
                                        </option>
                                        <option value="taskType">
                                            Task Type
                                        </option>
                                    </select>

                                    <select
                                        value={operator}
                                        onChange={(e) =>
                                            setOperator(e.target.value)
                                        }
                                        className={`rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-indigo-500 ${is_theme
                                            ? "border-gray-700 bg-[#111827] text-white"
                                            : "border-gray-300 bg-white text-gray-900"
                                            }`}
                                    >
                                        <option value="equals">
                                            Equals
                                        </option>

                                        <option value="not_equals">
                                            Not Equals
                                        </option>

                                        <option value="contains">
                                            Contains
                                        </option>
                                    </select>

                                    <input
                                        type="text"
                                        value={conditionValue}
                                        onChange={(e) =>
                                            setConditionValue(e.target.value)
                                        }
                                        placeholder="Value"
                                        className={`rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-indigo-500 ${is_theme
                                            ? "border-gray-700 bg-[#111827] text-white placeholder:text-gray-500"
                                            : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400"
                                            }`}
                                    />

                                </div>
                            </div>

                            {/* THEN */}
                            <div
                                className={`rounded-xl border p-4 ${is_theme
                                    ? "border-gray-800 bg-[#0F172A]"
                                    : "border-gray-200 bg-gray-50/50"
                                    }`}
                            >
                                <div className="mb-4 flex items-center gap-2">

                                    <div
                                        className={`rounded-lg p-2 ${is_theme
                                            ? "bg-green-500/10"
                                            : "bg-green-100"
                                            }`}
                                    >
                                        <ArrowRight
                                            size={17}
                                            className={
                                                is_theme
                                                    ? "text-green-400"
                                                    : "text-green-600"
                                            }
                                        />
                                    </div>

                                    <div>
                                        <h3
                                            className={`text-sm font-semibold ${is_theme
                                                ? "text-white"
                                                : "text-gray-900"
                                                }`}
                                        >
                                            THEN
                                        </h3>

                                        <p
                                            className={`text-xs ${is_theme
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                                }`}
                                        >
                                            Choose what happens automatically
                                        </p>
                                    </div>
                                </div>

                                <div className="relative">
                                    <select
                                        value={action}
                                        onChange={(e) =>
                                            setAction(e.target.value)
                                        }
                                        required
                                        className={`w-full appearance-none rounded-lg border px-4 py-2.5 pr-10 text-sm outline-none focus:border-indigo-500 ${is_theme
                                            ? "border-gray-700 bg-[#111827] text-white"
                                            : "border-gray-300 bg-white text-gray-900"
                                            }`}
                                    >
                                        <option value="">
                                            Select action
                                        </option>

                                        <option value="SEND_EMAIL">
                                            Send Email
                                        </option>

                                        <option value="SEND_NOTIFICATION">
                                            Send Notification
                                        </option>

                                        <option value="CHANGE_STATUS">
                                            Change Status
                                        </option>

                                        <option value="MOVE_TASK">
                                            Move Task
                                        </option>

                                        <option value="ASSIGN_TASK">
                                            Assign Task
                                        </option>

                                        <option value="ADD_COMMENT">
                                            Add Comment
                                        </option>
                                    </select>

                                    <ChevronDown
                                        size={17}
                                        className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${is_theme
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                            }`}
                                    />
                                </div>

                                {/* Dynamic Action Value */}
                                {(action === "MOVE_TASK" ||
                                    action === "CHANGE_STATUS" ||
                                    action === "ASSIGN_TASK") && (
                                        <input
                                            type="text"
                                            value={actionValue}
                                            onChange={(e) =>
                                                setActionValue(e.target.value)
                                            }
                                            placeholder={
                                                action === "MOVE_TASK"
                                                    ? "e.g. Completed"
                                                    : action === "CHANGE_STATUS"
                                                        ? "e.g. Done"
                                                        : "Enter user"
                                            }
                                            required
                                            className={`mt-3 w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-indigo-500 ${is_theme
                                                ? "border-gray-700 bg-[#111827] text-white placeholder:text-gray-500"
                                                : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400"
                                                }`}
                                        />
                                    )}
                            </div>

                            {/* Status */}
                            <div
                                className={`flex items-center justify-between rounded-xl border p-4 ${is_theme
                                    ? "border-gray-800 bg-[#0F172A]"
                                    : "border-gray-200 bg-gray-50/50"
                                    }`}
                            >
                                <div className="flex items-center gap-3">

                                    <CheckCircle2
                                        size={19}
                                        className={
                                            status
                                                ? "text-green-500"
                                                : "text-gray-400"
                                        }
                                    />

                                    <div>
                                        <p
                                            className={`text-sm font-medium ${is_theme
                                                ? "text-white"
                                                : "text-gray-900"
                                                }`}
                                        >
                                            Rule Status
                                        </p>

                                        <p
                                            className={`text-xs ${is_theme
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                                }`}
                                        >
                                            Enable or disable this automation
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setStatus(!status)}
                                    className={`relative h-6 w-11 rounded-full transition ${status
                                        ? "bg-green-500"
                                        : is_theme
                                            ? "bg-gray-700"
                                            : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${status
                                            ? "left-6"
                                            : "left-1"
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div
                            className={`flex items-center justify-end gap-3 border-t px-6 py-4 ${is_theme
                                ? "border-gray-800"
                                : "border-gray-200"
                                }`}
                        >
                            <button
                                type="button"
                                onClick={handleCancel}
                                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${is_theme
                                    ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                            >
                                <Save size={17} />
                                Save Rule
                            </button>
                        </div>

                    </form>
                </div>
            </div>



        </>
    );
}

export default AutomationRule;