import { instance } from "./apiservices"

export const FetchStarWorkspace = async (useremail: any) => {
    try {
        const response = await instance.get("/api/workspace/Star", {
            params: {
                email: useremail
            }
        })
        return response
    } catch (error: any) {
        console.log(error)

        throw error

    }
}

