import { BrowserRouter, Route, Routes } from "react-router-dom"
// import Dashboard from "../pages/homePages/Dashboard"
import Login from "../pages/Login/Login"
import SiginUp from "../pages/Login/SignUp"
import App from "../App"

function AppRouter() {
    return (
        <>

            <BrowserRouter>



                <Routes >

                    <Route path="/" element={<App />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Signup" element={<SiginUp />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouter