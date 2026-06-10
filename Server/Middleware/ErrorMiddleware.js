const ErrorMiddleware = (err, req, res, next) => {

    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid MongoDB ObjectId"
        });
    }

    return res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

module.exports = ErrorMiddleware;