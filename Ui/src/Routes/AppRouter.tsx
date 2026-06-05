import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import SiginUp from "../pages/Login/SignUp";
const App = lazy(() => import("../App"))
const Task = lazy(() => import("../pages/Task"))
const Projects = lazy(() => import("../pages/Projects"))
const Team = lazy(() => import("../pages/Team"))
const ProjetcDeatils = lazy(() => import("../pages/ProjetcDeatils"))
const Notifications = lazy(() => import("../pages/Notifications"))
const Analytics = lazy(() => import("../pages/Analytics"))
const Profile = lazy(() => import("../pages/Profile"))
const Calendra = lazy(() => import("../pages/Calendra"))
const ProjectSettings = lazy(() => import("../Components/ProjectSettings"))
import { lazy, Suspense, useEffect } from "react";
import { socket } from "../Scokets/ScoketConfig";
import { useremail, Usertoekn } from "../Components/LocalStorage";
import { formatProjectNotification } from "../utils/toastMessge";
import Loader from "../Components/Loader";
import { ToastContainer, toast } from "react-toastify";


function AppRouter() {
    const navigate = useNavigate();
    const dev = import.meta.env.VITE_ENV
    console.log(dev, 'dev')
    useEffect(() => {

        const handleCheckuserOnline = (data: any) => {

            const msg =
                data?.userId?.userEmail === useremail
                    ? "You are online"
                    : `${data?.userId.Username || "Someone"} is online`;

            return toast.success(msg)
        };

        const handleCheckuserOffline = (data: any) => {

            const msg =
                data?.userId?.userEmail === useremail
                    ? "Your Offline"
                    : `${data?.userId.Username || "Someone"} is offline`;
            return toast.error(msg)
        };
        const ToastNotify = (data: any) => {
            console.log(data, 'data')
        }
        const handelProjectInfoUpload = (data: any) => {

            toast.success(formatProjectNotification(data, useremail))
        }

        // task notify
        const handelTask = (data: any) => {
            setTimeout(() => {
                toast.success(data.message)
            }, 2000);
        }


        const handelupdateTaskdate = (data: any) => {


            setTimeout(() => {
                toast.success(data)
            }, 2500);
        }

        const HandelDeleteUser = (data: any) => {
            setTimeout(() => {
                toast.success(data)
            }, 2500);
        }
        const handleAddProjectMembers = (data: any) => {
            setTimeout(() => {
                toast.success(data)
            }, 2500);
        }


        const handelprojectStatus = (data: any) => {


            toast.success(data)
        }
        const handelcheck = (task: any) => {
            toast.info("Task updated:", task.prjid);

        };

        socket.on("onlineUser", handleCheckuserOnline);
        socket.on("AddProjectMembers", handleAddProjectMembers);
        socket.on("handelprojectStatus", handelprojectStatus);
        socket.on("offlineUser", handleCheckuserOffline);
        socket.on("HandelDeleteUser", HandelDeleteUser);
        socket.on("AddedNewProject", ToastNotify);
        socket.on("NewTask", handelTask);
        socket.on("updateTaskdate", handelupdateTaskdate)
        const assignedProjects = ["Prj3145", "Prj99", "Prj45"];

        socket.on("task_updated", (data) => {

            const isAllowed = assignedProjects.includes(data.prjid);

            if (!isAllowed) return;

            toast.success(`${data.prjid}: ${data.num}`);
        });


        socket.on("connect", () => {

            console.log("CONNECTED:", socket.id);
        });
        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });
        socket.on("ProjectInfoUpload", handelProjectInfoUpload)

        return () => {

            socket.off("NewTask", handelTask);
            socket.off("task_updated", handelcheck);
            socket.off("handelprojectStatus", handelprojectStatus);
            socket.off("AddProjectMembers", handleAddProjectMembers);
            socket.off("HandelDeleteUser", HandelDeleteUser);
            socket.off("updateTaskdate", handelupdateTaskdate)
            socket.off("AddedNewProject", ToastNotify);
            socket.off("onlineUser", handleCheckuserOnline);
            socket.off("offlineUser", handleCheckuserOffline);
            socket.off("ProjectInfoUpload", handelProjectInfoUpload);
            // socket.off("Teamdata", handelTeamdata);
            socket.off("connect");
            socket.off("disconnect");
        };

    }, []);


    useEffect(() => {
        Usertoekn(navigate, toast);
    }, []);

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
                theme="colored"
            // transition={Bounce}

            ></ToastContainer>

            <Suspense fallback={<Loader />}>
                <Routes>

                    <Route path="/" element={<App />} />
                    {/* <Route path="/foru" element={<ViewWorkspace />} /> */}
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/naviagte-ProjectDeatils" element={<ProjetcDeatils />} />
                    <Route path="/projectSettings" element={<ProjectSettings />} />
                    <Route path="/Tasks" element={<Task />} />
                    <Route path="/Notifications" element={<Notifications />} />
                    <Route path="/Analytics" element={<Analytics />} />
                    <Route path="/Calendar" element={<Calendra />} />
                    <Route path="/Team" element={<Team />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Signup" element={<SiginUp />} />
                </Routes>
            </Suspense>


        </>
    );
}

export default AppRouter;