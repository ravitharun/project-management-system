import { instance } from "./apiservices"

export const fetchProjects = async (Currentpage: number) => {
    try {
        console.log(Currentpage,'page')
        const response = await instance.get(`/api/ManageProject/Projects?page=${Currentpage}`)
        console.log(response,'response')
        return response

    } catch (error) {
        throw error

    }
}