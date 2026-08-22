import { nanoid } from "nanoid"
import { instance } from "./apiservices"
import { ActivityFormatJson } from "../Components/ActivityFormat"
import { getuserInfo } from "../Components/LocalStorage"

export const HandelTaskDelete = async (taskid: any) => {
    try {
        console.log(taskid, 'taskid api')
        const response = instance.delete(`/api/Task/${taskid}/Delete`)
        return response
    } catch (error) {
        throw error

    }
}
export const HandelDuplicateTask = async (taskid: any, Tasks: any) => {
    try {
        const data = ActivityFormatJson({
            projectId: Tasks.projectid,
            userId: JSON.parse(getuserInfo)._id,
            action: "updated",
            entityType: "task",
            entityId: Tasks._id,
            entityName: Tasks.taskName,
            message: `Task ${Tasks.taskName} was duplicated`
        });
        
        const response = instance.post(`/api/Task/${taskid}/DuplicateTask`, { NewTaskid: `Task-${nanoid()}`, data: data })
        return response
    } catch (error) {
        throw error

    }
}