const Toggle = ({ enabled, onChange, isDark }: any) => (
    <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
            enabled
                ? "bg-blue-600"
                : isDark
                    ? "bg-gray-700"
                    : "bg-gray-300"
        }`}
    >
        <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                enabled ? "translate-x-6" : "translate-x-1"
            }`}
        />
    </button>
);

export const NotificationItem = ({
    icon,
    title,
    description,
    enabled,
    onChange,
    isDark,
}: any) => {
    return (
        <div className="flex w-full items-start gap-3 p-4 sm:items-center sm:gap-4 sm:p-5">

            <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
                <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isDark
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {icon}
                </div>

                <div className="min-w-0 flex-1">
                    <h3
                        className={`break-words text-sm font-medium ${isDark ? "text-white" : "text-gray-900"
                            }`}
                    >
                        {title}
                    </h3>
                    <p className="mt-1 break-words text-xs leading-5 text-gray-500">
                        {description}
                    </p>
                </div>
            </div>

            <div className="shrink-10 pt-1 sm:pt-0">
                <Toggle
                    enabled={enabled}
                    onChange={onChange}
                    isDark={isDark}
                />
            </div>
        </div>
    );
};