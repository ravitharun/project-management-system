import { getuserInfo } from "../Components/LocalStorage"
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


export const HandelDeleteTask = async (TaskId: any) => {
    try {
        const response = await instance.delete("/api/Task/DeleteTask", {
            params: {
                TaskId: TaskId,
                getuserInfo: JSON.parse(getuserInfo )
            }
        })
        console.log(response)
    } catch (error) {

        console.log(error)
        throw error
    }
}