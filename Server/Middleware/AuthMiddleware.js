const jwt = require("jsonwebtoken");

const AuthTokenVerification = async (req, res, next) => {
    try {

        const token = req.headers.authorization;

        if (!token) {
            const err = new Error("Token is required");
            err.status = 401;
            return next(err);
        }

        const actualToken = token.split(" ")[1];

        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

        // attach user data
        req.user = decoded;
        console.log("user token is vaild")

        return next();

    } catch (error) {

        console.log("JWT Error:", error.message);

        const err = new Error("Invalid or expired token");
        err.status = 401;
        return next(err);
    }
};

module.exports = AuthTokenVerification;