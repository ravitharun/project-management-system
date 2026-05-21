const express=require("express")
const NotificatonsRouter=express.Router()
const Notificatons=require("../controller/Notification")
NotificatonsRouter.get("/Notificatons",Notificatons)


module.exports=NotificatonsRouter