
// /api/comments/Comment
const handelComment = async (req, res) => {
    try {
        const { data } = req.body
        console.log(data, 'Commented Data')
     

        return res.status(201).json({ message: "Comment Added", status: true })
    } catch (error) {
        return res.status(500).json({ message: "server error", status: false })
    }
}
const handelDeleteComment = async (req, res) => {
    try {
        const { data } = req.body
        console.log(data, 'Commented Data')
     

        return res.status(201).json({ message: "Comment Deleted", status: true })
    } catch (error) {
        return res.status(500).json({ message: "server error", status: false })
    }
}


const handelUpdateComment = async (req, res) => {
    try {
        const { data } = req.body
        console.log(data, 'Commented Data')
     

        return res.status(201).json({ message: "Comment Updated", status: true })
    } catch (error) {
        return res.status(500).json({ message: "server error", status: false })
    }
}




module.exports = {handelComment,handelDeleteComment,handelUpdateComment}