

const ErrorMiddleware = (err, req, res, next) => {
    console.log(err.message,'err from Middleware');

    return res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
module.exports = ErrorMiddleware;