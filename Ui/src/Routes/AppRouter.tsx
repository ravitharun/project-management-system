import { BrowserRouter, Route, Routes } from "react-router-dom"
// import Dashboard from "../pages/homePages/Dashboard"
import Login from "../pages/Login/Login"
import SiginUp from "../pages/Login/SignUp"

function AppRouter() {
    return (
        <>

            <BrowserRouter>



                <Routes >

                    <Route path="/Login" element={<Login />} />
                    <Route path="/Signup" element={<SiginUp />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouter