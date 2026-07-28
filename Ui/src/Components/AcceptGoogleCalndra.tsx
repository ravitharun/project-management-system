
import { FcGoogle } from "react-icons/fc";
import { MdCalendarMonth } from "react-icons/md";
import { getuserInfo } from "./LocalStorage";
const AcceptGoogleCalendar = ({ setOpen }: any) => {
    

    const onConnect = () => {


        window.location.href = `${import.meta.env.VITE_ENV === "prod" ? import.meta.env.VITE_API : "http://localhost:5000"}/api/auth/google?uid=${JSON.parse(getuserInfo).Firbaseuid}`;
    };

    return (
  
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

                {/* Icon */}
                <div className="mb-5 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                        <MdCalendarMonth className="text-4xl text-blue-600" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-center text-2xl font-bold text-gray-800">
                    Connect Google Calendar
                </h2>

                <p className="mt-3 text-center text-gray-600">
                    Sync your assigned tasks with Google Calendar and receive reminders
                    automatically.
                </p>

                {/* Google Button */}
                <button
                    onClick={onConnect}
                    className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-5 py-3 text-base font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
                >
                    <FcGoogle className="text-2xl" />
                    Continue with Google
                </button>

                {/* Later Button */}
                <button
                    onClick={setOpen}
                    className="mt-4 w-full rounded-xl border border-gray-200 py-3 font-medium text-gray-600 transition hover:bg-gray-100"
                >
                    Maybe Later
                </button>

                <p className="mt-5 text-center text-xs text-gray-400">
                    You can connect or disconnect Google Calendar anytime from your
                    account settings.
                </p>

            </div>
        </div>
    );
};

export default AcceptGoogleCalendar;