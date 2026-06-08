const mongoose = require("mongoose");

const CommetedBy = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true }
});

const WorkspaceCommentsReply = new mongoose.Schema({
    workSpaceId: { type: String, required: true },
    TaskId: { type: String, required: true },
    ReplyFromCommentId: {
        type: String, 
    },
    ReplyToCommentId: {
        type: String, unique: true
    },

    comment_text: {
        type: String,
    },

    CommentedBy: CommetedBy,
});

const WorkspaceComments = new mongoose.Schema({
    workSpaceId: {
        type: String,
        required: true
    
    },
    Taskid: {
        type: String,
        required: true, 
    },

    CommentId: {
        type: String,
        required: true, 
    },

    comment_text: {
        type: String,
        required: true
    },

    CommentedBy: CommetedBy,

    CommentsReply: [WorkspaceCommentsReply]

});

module.exports = mongoose.model("Comments", WorkspaceComments);