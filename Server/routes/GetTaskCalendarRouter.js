const express=require("express")
const GetTaskCalendar = require("../controller/Calendar")
const FetchTaskCalendar=express.Router()
FetchTaskCalendar.get('/:ProjectId',GetTaskCalendar)

module.exports=FetchTaskCalendar