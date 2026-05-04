import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUserTie } from "react-icons/fa";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import CustomToast from "../../Components/CustomToast";
import { Link } from "react-router-dom";
type response = {
    message: string;
    types: "success" | "failure" | "warning";
} | null;
function Login() {
    const [role, setrole] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [responsetext, setresponsetext] = useState<response>(null)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!role || !email || !password) {
            setresponsetext({ message: 'input value is null', types: "warning" })
            return
        }
        const data = { role, email, password }
        console.log(data)
        setresponsetext({ message: 'Good', types: "success" })
        return

    }
    console.log(responsetext, 'responsetext')

    return (
        <>



            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">

                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

                    {/* TITLE */}
                    <h2 className="text-2xl font-bold text-center mb-6">
                        Welcome Back
                    </h2>

                    <p className="text-center text-gray-500 mb-8">
                        Login to your dashboard
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* EMAIL */}
                        <div className="relative">
                            <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChangeevent={(e) => setemail(e.target.value)}
                                classNameStyle="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="relative">
                            <FaLock className="absolute top-3.5 left-3 text-gray-400" />
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChangeevent={(e) => setpassword(e.target.value)}
                                classNameStyle="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                            />
                        </div>

                        {/* ROLE */}
                        <div className="relative">
                            <FaUserTie className="absolute top-3.5 left-3 text-gray-400" />

                            <select
                                name="role"
                                value={role}
                                onChange={(e) => setrole(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="employee">Employee</option>
                                <option value="tl">Team Lead (TL)</option>
                                <option value="manager">Manager</option>
                            </select>
                        </div>


                        <Button
                            type="submit"
                            classaName="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            Btnname="Login"

                        >
                        </Button>

                    </form>
                    <div className="mt-6 text-center space-y-3">

                        {/* SIGNUP LINK */}
                        <p className="text-sm text-gray-600">
                            Don’t have an account?{" "}
                            <Link to="/SignUp">
                                <a
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    Create one
                                </a>
                            </Link>
                        </p>

                        {/* DIVIDER */}
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="text-xs text-gray-400">or</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>

                        {/* EXTRA INFO */}
                        <p className="text-xs text-gray-400">
                            Secure login for team access
                        </p>

                    </div>

                </div>
            </div>
            {responsetext && <CustomToast alertmessage={responsetext.message} toastType={responsetext.types == 'success' ? "success" : "waning"} onclickevent={() => setresponsetext(null)} />}
        </>
    );
}

export default Login;