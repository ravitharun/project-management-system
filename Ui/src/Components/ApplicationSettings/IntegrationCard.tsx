import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import GoogleCalendarManage from "./GoogleCalendarManage";

const IntegrationCard = ({
    icon,
    title,
    description,
    connected,
    isDark,
}: any) => {
    const [Manage, SetManage] = useState(false)
    const handelManage = () => {
        SetManage((prev) => !prev)

    }
    return (
        <>


            {Manage && <GoogleCalendarManage isDark={isDark} SetManage={SetManage} />}
            <div
                className={`rounded-xl border p-4 sm:p-5 ${isDark
                    ? "border-gray-800 bg-[#111827]"
                    : "border-gray-200 bg-white"
                    }`}
            >
                <div className="flex items-start justify-between gap-3">
                    <div
                        className={`flex h-11 w-11 items-center justify-center rounded-lg ${isDark
                            ? "bg-gray-800 text-white"
                            : "bg-gray-100 text-gray-700"
                            }`}
                    >
                        {icon}
                    </div>

                    {connected && (
                        <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                            <FiCheck />
                            Connected
                        </span>
                    )}
                </div>

                <h3
                    className={`mt-4 text-base font-semibold ${isDark ? "text-white" : "text-gray-900"
                        }`}
                >
                    {title}
                </h3>

                <p className="mt-1 text-sm leading-5 text-gray-500">
                    {description}
                </p>

                <button
                    className={`mt-5 w-full rounded-lg border px-4 py-2.5 text-sm font-medium transition ${isDark
                        ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                    onClick={handelManage}
                >
                    {connected ? "Manage" : "Connect"}
                </button>
            </div>
        </>

    );
};


export default IntegrationCard