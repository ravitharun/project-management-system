export default function Card({ title, value, icon, theme }: any) {

    return (

        <div
            className={`
                rounded-3xl
                p-5 overflow-hidden
                transition-all duration-300
                hover:translate-y-[-2px]
                min-h-[130px]
                ${theme === "Dark"
                    ? "bg-[#111827] border border-gray-800"
                    : "bg-white border border-gray-200 shadow-sm"
                }
            `}
        >

            <div className="flex items-start justify-between gap-4">

                {/* LEFT */}

                <div className="flex-1 min-w-0">

                    <p
                        className={`
                            text-sm font-medium tracking-wide
                            ${theme === "Dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }
                        `}
                    >
                        {title}
                    </p>

                    <h2
                        className={`
                            mt-3
                            text-2xl xl:text-3xl
                            font-semibold
                            leading-tight
                            break-all
                            ${theme === "Dark"
                                ? "text-white"
                                : "text-gray-900"
                            }
                        `}
                    >
                        {value}
                    </h2>

                </div>

                {/* ICON */}

                <div
                    className={`
                        shrink-0
                        w-14 h-14
                        rounded-2xl
                        flex items-center justify-center
                        text-2xl
                        ${theme === "Dark"
                            ? "bg-gray-800 text-white"
                            : "bg-gray-100 text-gray-700 border border-gray-200"
                        }
                    `}
                >
                    {icon}
                </div>

            </div>

        </div>

    );
}