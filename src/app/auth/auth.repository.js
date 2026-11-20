import { OTP } from "../../common/db/models/otp.model.js";

async function createOTP(code, userId, expiresAt) {
    return OTP.create({ userId, code, expiresAt });
}

async function findOTPByUserId(userId) {
    return OTP.findOne({ userId });
}

async function deleteOTP(userId) {
    return OTP.deleteOne({ userId });
}

async function deleteAllOTPs(userId) {
    return OTP.deleteMany({ userId });
}

export default {
    createOTP,
    findOTPByUserId,
    deleteOTP,
    deleteAllOTPs,
};
