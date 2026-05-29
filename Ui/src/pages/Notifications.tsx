import Sidebar from "../Components/Navbar";
import { Bell, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { CurrentDateFucntion, timeAgo } from "../Components/timeAgo ";
// import toast from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { instance } from "../services/apiservices";

function Notifications() {

    const [notifications, setnotifications] = useState<any[]>([])

    useEffect(() => {
        const ftechNotification = async () => {
            try {
                const response = await instance.get("/api/Notificatons")
                console.log(response.data.message, 'response')
                setnotifications(response.data.message)

            } catch (error: any) {
                console.log(error)

            }

        }
        ftechNotification()

    }, [])

    const getStyles = (type: any) => {
        switch (type) {
            case "success":
                return {
                    icon: <CheckCircle size={20} />,
                    bg: "bg-green-100",
                    text: "text-green-600",
                };

            case "warning":
                return {
                    icon: <Clock size={20} />,
                    bg: "bg-yellow-100",
                    text: "text-yellow-600",
                };

            case "danger":
                return {
                    icon: <AlertCircle size={20} />,
                    bg: "bg-red-100",
                    text: "text-red-600",
                };

            default:
                return {
                    icon: <Bell size={20} />,
                    bg: "bg-blue-100",
                    text: "text-blue-600",
                };
        }
    };



    const MarkallRead = () => {
        const GetIds: number[] = []

        notifications.forEach(element => {
            if (element.isRead) {

                return GetIds.push(element._id)
            }
        });

        console.log(GetIds,'GetIds')
        // const updatenotificationsisread = notifications.map((notif) => {
        //     console.log(notif, 'notif')
        //     notif.isread = true
        // })
        // setnotifications([...notifications], updatenotificationsisread)
        toast.success("MarkallRead", { position: "top-center" })
    }
    return (

        <>
            <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            // transition={Bounce}

            ></ToastContainer>


            <div className="flex h-screen bg-gray-100 overflow-hidden">
                {/* flex min-h-screen bg-gray-100 overflow-hidden */}

                {/* SIDEBAR */}
                <Sidebar page="Notifications" />

                {/* MAIN CONTENT */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 hide-scrollbar">

                    {/* HEADER */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Notifications
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Track recent project and task updates
                            </p>
                        </div>

                        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition" onClick={MarkallRead}>
                            Mark all as read
                        </button>
                    </div>

                    {/* NOTIFICATION LIST */}
                    <div className="space-y-4">
                        {notifications.map((item: any) => {
                            const styles = getStyles(item.type);

                            return (
                                <div
                                    key={item.id}
                                    className={`${item.isread
                                        ? "bg-white"
                                        : "bg-[#f5f7ff] border-l-4 border-l-blue-500"
                                        } rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300`}
                                >
                                    <div className="flex items-start gap-4">

                                        {/* ICOn */}
                                        <div
                                            className={`p-3 rounded-xl ${styles.bg} ${styles.text}`}
                                        >
                                            {styles?.icon}
                                        </div>

                                        {/* CONTENT */}
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                <h2 className="font-semibold text-gray-800">
                                                    {item?.title}
                                                </h2>
                                                <span className="text-xs text-gray-400">
                                                    {
                                                        CurrentDateFucntion(item.date)
                                                            ? CurrentDateFucntion(item.date)
                                                            : (
                                                                <span className="text-xs text-blue-500 font-medium">
                                                                    {timeAgo(item.date)}
                                                                </span>
                                                            )
                                                    }
                                                </span>
                                            </div>

                                            <p className="text-gray-600 text-sm mt-1">
                                                {item.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* EMPTY STATE */}
                    {/* 
                <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                    <Bell size={60} className="text-gray-300 mb-4" />

                    <h2 className="text-xl font-semibold text-gray-700">
                        No Notifications Yet
                    </h2>

                    <p className="text-gray-500 mt-2">
                        You will see task and project updates here.
                    </p>
                </div> 
                */}
                </main>
            </div>
        </>

    );
}

export default Notifications;