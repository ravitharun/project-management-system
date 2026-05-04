
import axios from "axios"
export const token = "12"
export const instance  = axios.create({
    baseURL: "http://localhost:5000/"
    ,
    headers: {
        Authorization: `Bearer ${token}`,
    },
})