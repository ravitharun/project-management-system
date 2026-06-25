import { nanoid } from "nanoid"
import { instance } from "./apiservices"

export const HandelTaskDelete = async (taskid: any) => {
    try {
        console.log(taskid, 'taskid api')
        const response = instance.delete(`/api/Task/${taskid}/Delete`)
        return response
    } catch (error) {
        throw error

    }
}
export const HandelDuplicateTask = async (taskid: any) => {
    try {
        console.log(taskid, 'taskid api')
        const response = instance.post(`/api/Task/${taskid}/DuplicateTask`, { NewTaskid: `Task-${nanoid()}` })
        return response
    } catch (error) {
        throw error

    }
}