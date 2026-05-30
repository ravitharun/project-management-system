import React, { useState } from "react";
import { FaEnvelope, FaGoogle, FaLock } from "react-icons/fa";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import CustomToast from "../../Components/Toasts/CustomToast";
import { Link } from "react-router-dom";
import { AuthLoginAccount } from "../../services/AuthApi";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebaseConfig";

type response = {
    message: string;
    types: "success" | "failure" | "warning";
} | null;

export type RequestLogindata = {
    // role: string,
    email: string | null,
    type?: string,
    password?: string,

}
function Login() {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [responsetext, setresponsetext] = useState<response>(null)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            setresponsetext({ message: 'input value is null', types: "warning" })
            return
        }

        try {
            const response = await AuthLoginAccount({ email, password })
            console.log(response, 'response')
            if (response.status == 403) {
                console.log(response.data.errmessage, 'errmessage')
            }
            if (response.status == 200) {
                console.log(response.data.token)
                localStorage.setItem("LoginToken", response.data.token);
                localStorage.setItem("userinfo", JSON.stringify(response.data.userinfo));
                setresponsetext({ message: response.data.message, types: "success" })
                return window.location.href = "/"

            }

            return
        } catch (error: any) {
            return console.log(error)
        }

    }
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();

        try {

            const result = await signInWithPopup(
                auth,
                provider
            );

            const email = result.user.providerData[0].email
            const type = result.user.providerId
            const response = await AuthLoginAccount({ email, type });
            console.log(response, 'response')
            if (response.data.message == "userLogedin.") {

                setresponsetext({
                    message: "Account Logined successfully 🎉",
                    types: "success",
                });

                if (response.status == 200) {
                    localStorage.setItem("LoginToken", response.data.token);
                    localStorage.setItem("userinfo", JSON.stringify(response.data.userinfo));
                    setresponsetext({ message: response.data.message, types: "success" })
                    return window.location.href = "/"
                }
            }

        } catch (error: any) {

            setresponsetext({
                message: error.message,
                types: "failure",
            });

        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

                <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">

                    {/* TITLE */}
                    <div className="text-center mb-6">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <FaLock className="text-blue-600 text-xl" />
                        </div>

                        <h2 className="text-2xl font-bold">
                            Welcome Back
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Login to continue
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* EMAIL */}
                        <div className="relative">
                            <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />

                            <Input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                classNameStyle="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="relative">
                            <FaLock className="absolute top-3.5 left-3 text-gray-400" />

                            <Input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                classNameStyle="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* LOGIN BUTTON */}
                        <Button
                            type="submit"
                            Btnname="Login"
                            classaName="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
                        />

                    </form>

                    {/* GOOGLE LOGIN */}
                    <button
                        onClick={handleGoogleLogin}
                        type="button"
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 mt-4 hover:bg-gray-50 transition"
                    >
                        <FaGoogle className="text-red-500" />
                        Continue with Google
                    </button>

                    {/* SIGNUP */}
                    <p className="text-sm text-center text-gray-500 mt-6">
                        Don’t have an account?{" "}
                        <Link
                            to="/SignUp"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>

                </div>

            </div>


            {responsetext && <CustomToast alertmessage={responsetext.message} toastType={responsetext.types == 'success' ? "success" : "waning"} onclickevent={() => setresponsetext(null)} />}
        </>
    );
}

export default Login;