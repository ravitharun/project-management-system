const express = require("express")
const { UploadFiles, FetchUploadFiles } = require("../controller/FileUploadProject")
const AuthUserTokeen = require("../Middleware/AuthMiddleware")
const { Pdfupload } = require("../conifg/mutler")
const FileUploadRouter = express.Router()
FileUploadRouter.post("/upload",AuthUserTokeen,Pdfupload.single("uploadfile"),UploadFiles)

FileUploadRouter.get("/Fileuploads",AuthUserTokeen,FetchUploadFiles)
module.exports = FileUploadRouter