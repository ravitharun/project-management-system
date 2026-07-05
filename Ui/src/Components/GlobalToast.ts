import { toast } from "react-toastify";



const GlobalToast = ( text:string, type : "success" | "warning" | "error" | "info") => {
    console.log( text,type,'check tharun')
    switch (type) {
        case "success":
            toast.success(text);
            break;

        case "warning":
            toast.warning(text);
            break;

        case "info":
            toast.info(text);
            break;

        default:
            toast.error(text);
    }
};

export default GlobalToast;