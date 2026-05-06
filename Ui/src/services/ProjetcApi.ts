import { instance } from "./apiservices"

export const fetchProjects = () => {
    try {
        const response = instance.get("/api/ManageProject/Projects")
        return response

    } catch (error) {
        throw error

    }
}