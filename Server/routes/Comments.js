const express = require("express")
const {handelComment,handelUpdateComment,handelDeleteComment} = require("../controller/TaskComments")
const comments = express.Router()
// /api/comments/
// handelDeleteComment,handelUpdateComment
comments.post("/Comment", handelComment)
comments.put(`/Comment/:taskid`, handelUpdateComment)
comments.delete(`/Comment/:taskid`, handelDeleteComment)
module.exports = comments 