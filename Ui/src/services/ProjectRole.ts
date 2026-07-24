import { instance } from "./apiservices"

export const UpdateRole = async (userId: any, projid: any, ProjectRole: String) => {
    try {
        const response = await instance.patch(`/api/project-roles/${userId}/${projid}/${ProjectRole}`)
        return response
    } catch (error) {
        throw error

    }


}
export const RemoveTeamMember = async (id: any, pid: any,) => {
    try {
        const response = await instance.delete(`/api/project-roles/${id}/${pid}`)
        return response
    } catch (error) {
        throw error

    }


}


