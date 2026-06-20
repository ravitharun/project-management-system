import { instance } from "./apiservices"

export const View = async (id: string, spaceid: string) => {
    try {
        const respone = await instance.post("/api/Analytcs/View", {
            Userid: id,


            WorkspaceId: spaceid

        })
        return respone;
    } catch (error:any) {

        throw error

    }
}