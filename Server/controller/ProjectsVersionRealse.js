const CreateRealse = async (req, res) => {

    try {

        return res.status(200).json({ message: "New Version Realsed.." })

    }

    catch (err) {
        return res.status(500).json({ message: "server error.." })
    }
}



module.exports=CreateRealse