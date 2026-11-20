export function globalErrorHandler(error, req, res, next) {
    res.status(error.statusCode).json({ message: error.message });
}
