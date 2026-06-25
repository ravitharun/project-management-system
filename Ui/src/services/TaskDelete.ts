import { instance } from "./apiservices"

export const HandelTaskDelete = async (taskid: any) => {
    try {
        console.log(taskid,'taskid api')
        const response = instance.delete(`/api/Task/${taskid}/Delete`)
        return response
    } catch (error) {
        throw error

    }
}