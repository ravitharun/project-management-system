
import { io } from "socket.io-client";
import { getuserInfo } from "../Components/LocalStorage";

export const socket = io("http://localhost:5000", {
    auth: { userId: getuserInfo ? JSON.parse(getuserInfo).userEmail : null },

    reconnection: true,

});
