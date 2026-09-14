
import { FiCalendar } from "react-icons/fi";
import IntegrationCard from "../ApplicationSettings/IntegrationCard"
const renderIntegrations = ({isDark}:any) => (
    <>
        <div className="space-y-5 lg:space-y-6">
            <div>
                <h2
                    className={`text-xl font-semibold lg:text-2xl ${
                        isDark ? "text-white" : "text-gray-900"
                    }`}
                >
                    Integrations
                </h2>

                <p
                    className={`mt-1 text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                    Connect your favorite tools with your workspace.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <IntegrationCard
                    icon={<FiCalendar />}
                    title="Google Calendar"
                    description="Sync project events and deadlines."
                    connected={true}
                    isDark={isDark}
                />

            </div>
        </div>
    </>
);

export default renderIntegrations