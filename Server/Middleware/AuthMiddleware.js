const AuthUserTokeen = async (req, res, next) => {
    try {
        console.log("Verifying the User Token.")
        // return res.status(403).json({ message: "token expry" })
    } catch (error) {
        console.log("Verifying the User Token. error", error)

    }
    next()
}
module.exports = AuthUserTokeen