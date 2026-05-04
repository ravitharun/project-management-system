import type { RequestLogindata } from "../pages/Login/Login"
import { instance } from "./apiservices"

export const AuthNewAccount = async (fromdata: FormData) => {
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
export const AuthLoginAccount = async ({ role, email, password }: RequestLogindata) => {
    try {
        const response = await instance.get("/api/auth/Login", {
            params: {
                role, email, password
            }
        })
        return response
    } catch (error: any) {
        console.log(error,'err main')
        throw error
    }
} 