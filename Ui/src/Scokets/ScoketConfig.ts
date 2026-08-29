
import { io } from "socket.io-client";
import { getuserInfo } from "../Components/LocalStorage";

export const socket = io(import.meta.env.VITE_Prod=="Local"? "http://localhost:5000":import.meta.env.VITE_API, {
  auth: { userId: getuserInfo ? JSON.parse(getuserInfo).userEmail : null },
  reconnection: true,
});

console.log(socket,'socketsocketsocket');

