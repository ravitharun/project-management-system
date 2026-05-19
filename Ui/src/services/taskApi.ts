import { instance } from "./apiservices"

export const fetchtaskApi = async () => {
    try {
        const response = await instance.get("/api/Task/fetchalltaskes")
        console.log(response, 'response')
        return response
    } catch (error: any) {
        throw error

    }
}