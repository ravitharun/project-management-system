import type { RequestLogindata } from "../pages/Login/Login"
import { instance } from "./apiservices"

export const AuthNewAccount = async (fromdata: FormData | any) => {
    try {
        const response = await instance.post("/api/auth/register", fromdata, {
            headers: {
                "Content-Type": "multipart/form-data",
            }

        })
        return response
    } catch (error: any) {
        return error
    }
}
export const AuthLoginAccount = async ({ email, password, type }: RequestLogindata | any) => {
    console.log(email, 'email to server ')
    try {
        const response = await instance.get("/api/auth/Login", {
            params: {
                email, password, type
            }
        })
        return response
    } catch (error: any) {
        console.log(error, 'err main')
        throw error
    }
} 