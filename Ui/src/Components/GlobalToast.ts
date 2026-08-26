import { toast } from "react-toastify";



const GlobalToast = ( text:string, type : "success" | "warning" | "error" | "info") => {
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