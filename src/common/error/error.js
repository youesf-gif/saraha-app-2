export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const UserNotFound = new AppError("User not found", 404);
const UserNotVerified = new AppError("User not verified", 403);
const InvalidEmailOrPassword = new AppError("Invalid email or password", 401);
const UserAlreadyExists = new AppError("User already exists", 409);
const InvalidOrExpiredOTP = new AppError("Invalid or expired OTP", 400);
const InvalidOTP = new AppError("Invalid OTP", 400);

export {
    UserNotFound,
    UserNotVerified,
    InvalidEmailOrPassword,
    UserAlreadyExists,
    InvalidOrExpiredOTP,
    InvalidOTP,
};
