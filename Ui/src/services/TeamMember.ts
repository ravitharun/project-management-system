import { ShowToast } from "../Components/toastHelper"
import { instance } from "./apiservices"

export const fetchTeamMembers = async ({ projectid }: any) => {
    console.log("projectid" + projectid)

    try {
        if (!projectid) {
            return ShowToast("SomeThing Wen Wrong.", 400, 'Error')
        }
        const response = await instance.get("/api/WorkSpace/TeamMembers", {
            params: {
                projectid: projectid
            }
        })

        return response
    } catch (error: any) {
        throw error

    }
}