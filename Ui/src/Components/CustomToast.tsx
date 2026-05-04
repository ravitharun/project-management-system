import { useEffect, useState } from "react";
import type { Toast } from "../types/CustomToast";
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

function CustomToast({ alertmessage, toastType, onclickevent }: Toast) {
    console.log({alertmessage, toastType},'alertmessage, toastType,')
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);

        const timer = setTimeout(() => {
            setShow(false);
            onclickevent && onclickevent();
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // ✅ fixed types
    const toastStyle =
        toastType === "success"
            ? "bg-green-500 text-white"
            : toastType === "failure"
            ? "bg-red-500 text-white"
            : "bg-yellow-400 text-black";

    const Icon =
        toastType === "success"
            ? FaCheckCircle
            : toastType === "failure"
            ? FaExclamationTriangle
            : FaInfoCircle;

    return (
        <>
            {show && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                    
                    {/* TOAST */}
                    <div
                        className={`px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-fadeIn pointer-events-auto ${toastStyle}`}
                    >
                        <Icon size={18} />
                        <span>{alertmessage}</span>

                        {/* CLOSE */}
                        <button
                            onClick={() => {
                                setShow(false);
                                onclickevent && onclickevent();
                            }}
                            className="ml-3 text-sm opacity-80 hover:opacity-100"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default CustomToast;