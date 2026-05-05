import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import SiginUp from "../pages/Login/SignUp";
import App from "../App";
import Projects from "../pages/Projects";
import Task from "../pages/Task";
import Team from "../pages/Team";
import Calendar from "../pages/Calendra";
import { useEffect } from "react";
import { socket } from "../Scokets/ScoketConfig";
import { useremail } from "../Components/LocalStorage";
import toast, { Toaster } from 'react-hot-toast';

function AppRouter() {
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

        socket.on("onlineUser", handleCheckuserOnline);
        socket.on("offlineUser", handleCheckuserOffline);

        socket.on("connect", () => {
            console.log("Connected:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        return () => {
            socket.off("onlineUser", handleCheckuserOnline);
            socket.off("offlineUser", handleCheckuserOffline);
            socket.off("connect");
            socket.off("disconnect");
        };

    }, []);

    return (
        <>
            <Toaster></Toaster>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/Projects" element={<Projects />} />
                    <Route path="/Tasks" element={<Task />} />
                    <Route path="/Calendar" element={<Calendar />} />
                    <Route path="/Team" element={<Team />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Signup" element={<SiginUp />} />
                </Routes>
            </BrowserRouter>

      
        </>
    );
}

export default AppRouter;