const SecurityItem = ({
    icon,
    title,
    description,
    isDark,
    action,
}: any) => {

    return (
        <>
      
            <div
                className={`flex items-center justify-between gap-4 border-b p-4 last:border-b-0 sm:p-5 ${isDark
                    ? "border-gray-800"
                    : "border-gray-200"
                    }`}
            >

                <div className="flex min-w-0 items-center gap-3 sm:gap-4">

                    <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isDark
                            ? "bg-gray-800 text-gray-300"
                            : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {icon}
                    </div>

                    <div className="min-w-0">

                        <h3
                            className={`text-sm font-medium ${isDark
                                ? "text-white"
                                : "text-gray-900"
                                }`}
                        >
                            {title}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                            {description}
                        </p>

                    </div>

                </div>

                <div className="shrink-0 text-gray-400">
                    {action}
                </div>

            </div>
        </>
    );
};


export default SecurityItem
