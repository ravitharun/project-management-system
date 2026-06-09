const express = require("express")
const { UploadFiles, FetchUploadFiles } = require("../controller/FileUploadProject")
const AuthUserTokeen = require("../Middleware/AuthMiddleware")
const { Pdfupload } = require("../config/mutler")
const AuthTokenVerification = require("../Middleware/AuthMiddleware")
const FileUploadRouter = express.Router()
FileUploadRouter.post("/upload",AuthTokenVerification,Pdfupload.single("uploadfile"),UploadFiles)

FileUploadRouter.get("/Fileuploads",AuthTokenVerification,FetchUploadFiles)
module.exports = FileUploadRouter