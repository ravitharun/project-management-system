import { instance } from "./apiservices"

export const fetchtaskApi = async (spaceid: any) => {
    console.log(spaceid, 'spaceid')
    try {
        const response = await instance.get("/api/Task/", {
            params: {
                spaceid: spaceid
            }
        })
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

            }
        })
        console.log(response)
    } catch (error) {

        console.log(error)
        throw error
    }
}