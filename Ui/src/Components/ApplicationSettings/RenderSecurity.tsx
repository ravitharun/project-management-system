import { FiChevronRight, FiLock, FiShield, FiUser } from "react-icons/fi";
import SecurityItem from "./SecurityItem";

const RenderSecurity = ({ isDark }: any) => (
    <div className="space-y-5 lg:space-y-6">

        <div>
            <h2
                className={`text-xl font-semibold lg:text-2xl ${isDark ? "text-white" : "text-gray-900"
                    }`}
            >
                Security
            </h2>

            <p
                className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-500"
                    }`}
            >
                Protect your account and manage security.
            </p>
        </div>
        <div
            className={`rounded-xl border ${isDark
                ? "border-gray-800 bg-[#111827]"
                : "border-gray-200 bg-white"
                }`}
        >
            <SecurityItem
                icon={<FiLock />}
                title="Change Password"
                description="Update your account password."
                isDark={isDark}
                action={<FiChevronRight />}
            />
            <SecurityItem
            icon={<FiShield />}
            title="Two-Factor Authentication"
            description="Add an extra layer of security to your account."
            isDark={isDark}
            action={
                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${isDark
                        ? "bg-gray-800 text-gray-400"
                        : "bg-gray-100 text-gray-600"
                        }`}
                >
                    Disabled
                </span>
            }
        />

            <SecurityItem
                icon={<FiUser />}
                title="Active Sessions"
                description="View devices currently signed into your account."
                isDark={isDark}
                action={<FiChevronRight />}
            />

        </div>
    </div>
);

export default RenderSecurity
