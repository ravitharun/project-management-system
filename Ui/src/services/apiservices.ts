
import axios from "axios"
export const token = "12"


const instanceurl = import.meta.env.Api === 'prod' ? import.meta.env.VITE_API : "http://localhost:5000/"


export const instance = axios.create({
    baseURL: import.meta.env.Api === 'prod' ? import.meta.env.VITE_API : "http://localhost:5000/"
    ,
    headers: {
        Authorization: `Bearer ${token}`,
    },
})


console.log(instanceurl, 'instance')