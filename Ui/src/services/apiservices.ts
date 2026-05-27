
import axios from "axios"
export const token = "12"

// const server = import.meta.env.Vite_Env
console.log(import.meta.env.VITE_API)
console.log(import.meta.env.VITE_ENV)


export const instance = axios.create({
    baseURL: import.meta.env.Vite_ENV === 'prod' ? import.meta.env.VITE_API : "http://localhost:5000/"
    ,
    headers: {
        Authorization: `Bearer ${token}`,
    },
})


