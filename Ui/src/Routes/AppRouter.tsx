import { BrowserRouter, Route, Routes } from "react-router-dom"
// import Dashboard from "../pages/homePages/Dashboard"
import Login from "../pages/Login/Login"
import SiginUp from "../pages/Login/SignUp"
import App from "../App"
import Projects from "../pages/Projects"
import Task from "../pages/Task"
import Team from "../pages/Team"
import Calendar from "../pages/Calendra"
import { useEffect } from "react"
import { socket } from "../Scokets/ScoketConfig"

function AppRouter() {
    useEffect(() => {
        const handleCheck = (data: any) => {
            console.log(data);
        };
        socket.on("join_room", handleCheck);
       

        return () => {
            socket.off("room_joined", handleCheck);
        };
    }, []);

    return (
        <>

            <BrowserRouter>



                <Routes >

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
    )
}

export default AppRouter