import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import SiginUp from "../pages/Login/SignUp";
import App from "../App";
import Projects from "../pages/Projects";
import Task from "../pages/Task";
import Team from "../pages/Team";
import Calendar from "../pages/Calendra";
import { useEffect } from "react";
import { socket } from "../Scokets/ScoketConfig";
import { checkuser, useremail } from "../Components/LocalStorage";
import toast, { Toaster } from 'react-hot-toast';
import ProjetcDeatils from "../pages/ProjetcDeatils";
function AppRouter() {
    const navigate = useNavigate();
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
            toast.success(data)
        }
        socket.on("onlineUser", handleCheckuserOnline);
        socket.on("offlineUser", handleCheckuserOffline);
        socket.on("AddedNewProject", ToastNotify);

        socket.on("connect", () => {
            console.log("Connected:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        return () => {
            socket.off("AddedNewProject", ToastNotify);
            socket.off("onlineUser", handleCheckuserOnline);
            socket.off("offlineUser", handleCheckuserOffline);
            socket.off("connect");
            socket.off("disconnect");
        };

    }, []);


    useEffect(() => {
        checkuser(navigate);
    }, []);

    return (
        <>
            <Toaster></Toaster>

            <Routes>

                <Route path="/" element={<App />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/naviagte-ProjectDeatils" element={<ProjetcDeatils />} />
                <Route path="/Tasks" element={<Task />} />
                <Route path="/Calendar" element={<Calendar />} />
                <Route path="/Team" element={<Team />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Signup" element={<SiginUp />} />
            </Routes>


        </>
    );
}

export default AppRouter;