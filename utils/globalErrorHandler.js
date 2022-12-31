// Sending errors 
const sendError = (error, res) => {
    // Operational errors that we can detect
    if (error.isOperational) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            data: null,
        });
    } else {
        // Errors we cannot detect
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: null
        });
    };
};

const globalErrorHandler = (error, req, res, next) => {
    // statusCode means the code of the status of the request and status is the actual status of the request(coming from the Error class)
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    // Sending errors to client
    sendError(error, res);
}

module.exports = globalErrorHandler;