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