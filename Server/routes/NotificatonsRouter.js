const express=require("express")
const NotificatonsRouter=express.Router()
const Notificatons=require("../controller/Notification")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")
NotificatonsRouter.get("/",AuthTokenVerification,Notificatons)


module.exports=NotificatonsRouter