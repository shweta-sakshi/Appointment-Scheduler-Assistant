class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        // Mark this error as an operational, trusted error
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;