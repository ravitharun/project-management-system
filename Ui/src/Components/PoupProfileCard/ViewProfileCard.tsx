import { Mail, User } from "lucide-react";

function ViewProfileCard({ userInof, theme }: any) {
    const isDark = theme === "Dark";
    return (
        <div
            className={`
                absolute
                left-0
                top-8
                z-[999999999]
                w-80
                rounded-2xl
                border
                p-5
                shadow-2xl
                transition-all duration-300

                ${isDark
                    ? "bg-[#0f172a] border-white/10 text-white"
                    : "bg-white border-gray-200 text-black"
                }
            `}
        >
            <div className="flex items-start gap-4">

                {/* Profile Icon */}
                <div
                    className={`
                        flex h-16 w-16 items-center justify-center rounded-full
                        ${isDark
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-blue-100 text-blue-600"
                        }
                    `}
                >
                    <User size={28} />
                </div>

                {/* User Info */}
                <div>
                    <h2
                        className={`
                            text-lg font-semibold
                            ${isDark ? "text-white" : "text-gray-800"}
                        `}
                    >
                        {userInof?.data?.AssiginMember?.Name || "Name"}
                    </h2>

                    <a
                        href={`mailto:${userInof?.data?.AssiginMember?.Email}`}
                        className={`
                            mt-1 flex items-center gap-2 text-sm transition-colors
                            ${isDark
                                ? "text-gray-300 hover:text-blue-400"
                                : "text-gray-500 hover:text-blue-600"
                            }
                        `}
                    >
                        <Mail size={14} />
                        {userInof?.data?.AssiginMember?.Email|| "Email"}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ViewProfileCard;