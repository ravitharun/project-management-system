import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock, FaRocket, FaUsers, FaBolt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import CustomToast from "../../Components/CustomToast";
import { Link } from "react-router-dom";

type ResponseType = {
    message: string;
    types: "success" | "failure" | "warning";
} | null;

function SiginUp() {
    const [role, setrole] = useState("employee");
    const [email, setemail] = useState("");
    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const [responsetext, setresponsetext] = useState<ResponseType>(null);

    // 🔥 Profile preview state
    const [profilePreview, setProfilePreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfilePreview(url);
        }
    };

    // 🔥 Cleanup (important)
    useEffect(() => {
        return () => {
            if (profilePreview) URL.revokeObjectURL(profilePreview);
        };
    }, [profilePreview]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!role || !email || !password || !name) {
            setresponsetext({
                message: "Please fill all fields",
                types: "warning",
            });
            return;
        }

        const data = { role, email, password, name };
        console.log(data);

        setresponsetext({
            message: "Account created successfully 🎉",
            types: "success",
        });
    };

    return (
        <>
            <div className="min-h-screen flex">

                {/* LEFT SIDE */}
                <div className="hidden md:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 text-white p-12">

                    {/* Glow */}
                    <div className="absolute w-72 h-72 bg-white/10 rounded-full top-[-50px] left-[-50px] blur-3xl"></div>
                    <div className="absolute w-72 h-72 bg-purple-400/20 rounded-full bottom-[-50px] right-[-50px] blur-3xl"></div>

                    <div className="relative z-10 flex flex-col justify-center">

                        <h1 className="text-5xl font-extrabold mb-4">
                            Taskora
                        </h1>

                        <p className="text-lg text-white/90 max-w-md">
                            Simplify project management and boost your team's productivity.
                        </p>

                        <div className="mt-10 space-y-5">

                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 flex items-center justify-center bg-white/20 rounded-lg">
                                    <FaRocket />
                                </div>
                                <p className="text-sm">Fast & intuitive task tracking</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 flex items-center justify-center bg-white/20 rounded-lg">
                                    <FaUsers />
                                </div>
                                <p className="text-sm">Team collaboration made easy</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 flex items-center justify-center bg-white/20 rounded-lg">
                                    <FaBolt />
                                </div>
                                <p className="text-sm">Real-time updates & insights</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 px-6">

                    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

                        <h2 className="text-2xl font-bold text-center mb-2">
                            Create Account
                        </h2>

                        <p className="text-center text-gray-500 mb-6">
                            Join your team workspace
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* PROFILE PREVIEW */}
                            <div className="flex items-center gap-4">

                                <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                                    {profilePreview ? (
                                        <img
                                            src={profilePreview}
                                            alt="preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <FaUser className="text-gray-400" />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <label className="text-sm font-medium">
                                        Profile Picture
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="mt-1 w-full text-sm border p-2 rounded-lg cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* NAME */}
                            <div className="relative">
                                <FaUser className="absolute top-3.5 left-3 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChangeevent={(e) => setname(e.target.value)}
                                    classNameStyle="w-full pl-10 py-2 border rounded-lg"
                                />
                            </div>

                            {/* EMAIL */}
                            <div className="relative">
                                <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChangeevent={(e) => setemail(e.target.value)}
                                    classNameStyle="w-full pl-10 py-2 border rounded-lg"
                                />
                            </div>

                            {/* PASSWORD */}
                            <div className="relative">
                                <FaLock className="absolute top-3.5 left-3 text-gray-400" />
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChangeevent={(e) => setpassword(e.target.value)}
                                    classNameStyle="w-full pl-10 py-2 border rounded-lg"
                                />
                            </div>

                            {/* ROLE */}
                            <div>
                                <p className="text-sm mb-2">Select Role</p>
                                <div className="grid grid-cols-3 gap-3">

                                    {["employee", "tl", "manager"].map((r) => (
                                        <div
                                            key={r}
                                            onClick={() => setrole(r)}
                                            className={`p-3 text-center border rounded-lg cursor-pointer
                                            ${role === r ? "bg-blue-600 text-white" : ""}`}
                                        >
                                            {r}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                classaName="w-full bg-blue-600 text-white py-2 rounded-lg"
                                Btnname="Sign Up"
                            />
                        </form>

                        <p className="text-center mt-6 text-sm">
                            Already have an account?{" "}
                            <Link to="/Login">
                                <a className="text-blue-600">
                                    Login
                                </a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* TOAST */}
            {/* TOAST */}
            {responsetext && (
                <CustomToast
                    alertmessage={responsetext.message}
                    toastType={responsetext.types=="success"?"success":"failure"}
                    onclickevent={() => setresponsetext(null)}
                />
            )}
        </>
    );
}

export default SiginUp;