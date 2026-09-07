import { getuserInfo } from "../Components/LocalStorage"
import { instance } from "./apiservices"

export const GitPermessaionApi = async ({ id }: any) => {


    try {
        const response = await instance.get(`/api/github/${id}/${JSON.parse(getuserInfo)._id}`)

        return response;
    } catch (error) {
        throw error
    }
}

