import { nanoid } from "nanoid"
import { instance } from "./apiservices"


export const HandelTaskDelete = async (taskid: any,GoogleEventId:any,tkn:any) => {
    try {
        // console.log(JSON.parse(userRfToken).googleRefreshToken, 'taskid api')

       const response = instance.delete(
  `/api/Task/${taskid}/${encodeURIComponent(tkn)}/${GoogleEventId}/Delete`
);
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