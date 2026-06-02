import { useremail } from "../Components/LocalStorage"
import { instance } from "./apiservices"

export const fetchworkspace =  () => {
    try {
        const response =  instance.get("/api/WorkSpace/", {
            params: {
                useremail: useremail
            }
        })
        return response
    } catch (error: any) {
        throw error

    }
}