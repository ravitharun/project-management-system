
import axios from "axios"
import { Token } from "../Components/LocalStorage"


export const instance = axios.create({
    baseURL: import.meta.env.VITE_ENV === 'prod' ? import.meta.env.VITE_API : "http://localhost:5000/"
    ,
    headers: {
        Authorization: `Bearer ${Token}`,
    },
})


