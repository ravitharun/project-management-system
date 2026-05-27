
import { io } from "socket.io-client";
import { getuserInfo } from "../Components/LocalStorage";

export const socket = io(import.meta.env.VITE_ENV === 'prod' ? import.meta.env.VITE_API : "http://localhost:5000/", {
    auth: { userId: getuserInfo ? JSON.parse(getuserInfo).userEmail : null },

    reconnection: true,

});
