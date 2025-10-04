const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    console.error('ERROR ', err);
    res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!',
    });
};

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'production') {
        // Make a copy to avoid mutating the original error object
        let error = { ...err, message: err.message };
        sendErrorProd(error, res);
    } else {
        sendErrorDev(err, res);
    }
};

export default globalErrorHandler;