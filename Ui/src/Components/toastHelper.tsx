
import { CircleX, CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { checkuser } from "./LocalStorage";

export const ShowToast = (
    message: string,
    statusCode: number,
    type: string
) => {
    const redirect = useNavigate();
    const isSuccess = statusCode === 200 || statusCode === 201;
    <Toaster position="bottom-right"></Toaster>
    toast.custom(() => (
        <div className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white shadow-lg">
            {isSuccess ? (
                <CircleCheck size={22} className="text-green-400" />
            ) : (
                <CircleX size={22} className="text-red-400" />
            )}

            <div>
                <p className={isSuccess ? "font-semibold text-green-400" : "font-semibold text-red-400"}>
                    {type}
                </p>

                <p className="text-sm text-gray-300">
                    {message}
                </p>
            </div>
        </div>
    ));


    {
        statusCode == 403 &&


            checkuser(redirect)


    }
};