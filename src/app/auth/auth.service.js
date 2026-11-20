import userRepo from "../user/user.repository.js";
import authRepo from "./auth.repository.js";
import { toMS } from "../../common/utils/time.js";
import { sendMail } from "../../common/email/nodemailer.js";
import { verifyGoogleToken } from "../../common/utils/google.js";
import { hashedPassword, comparePassword } from "../../common/utils/hash.js";
import { generateAccessToken } from "../../common/utils/token.js";
import { generateOTP } from "../../common/utils/otp.js";
import {
    UserNotFound,
    UserNotVerified,
    InvalidEmailOrPassword,
    UserAlreadyExists,
    InvalidOrExpiredOTP,
    InvalidOTP,
} from "../../common/error/error.js";

async function register(userName, email, password) {
    const user = await userRepo.findUserByEmail(email);

    if (user) throw UserAlreadyExists;

    password = await hashedPassword(password);

    const createdUser = await userRepo.createUser(userName, email, password);

    const otp = generateOTP();

    await authRepo.createOTP(
        otp,
        createdUser._id,
        new Date(Date.now() + toMS(2, "m")),
    );

    sendMail(createdUser.email, "Your OTP", `<h3>Your OTP Code is ${otp}</h3>`);

    createdUser.password = undefined;

    return createdUser;
}

async function verifyAccount(email, otp) {
    const user = await userRepo.findUserByEmail(email);

    if (!user) throw UserNotFound;

    const otpRecord = await authRepo.findOTPByUserId(user._id);

    if (!otpRecord) throw InvalidOrExpiredOTP;

    if (otpRecord.code !== otp) throw InvalidOTP;

    await userRepo.updateUser(user._id, {
        isVerified: true,
    });

    await authRepo.deleteOTP(user._id);
}

async function resendOTP(email) {
    const user = await userRepo.findUserByEmail(email);

    if (!user) throw UserNotFound;

    await authRepo.deleteAllOTPs(user._id);

    const otp = generateOTP();

    await authRepo.createOTP(
        otp,
        user._id,
        new Date(Date.now() + toMS(2, "m")),
    );

    await sendMail(user.email, "Your OTP", `<h3>Your OTP Code is ${otp}</h3>`);
}

async function login(email, password) {
    const user = await userRepo.findUserByEmail(email);

    if (!user) throw UserNotFound;

    if (!user.isVerified) throw UserNotVerified;

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) throw InvalidEmailOrPassword;

    const payload = {
        sub: user._id,
        name: user.userName,
        email: user.email,
    };

    const token = generateAccessToken(payload);

    return token;
}

async function loginWithGoogle(idToken) {
    const payload = await verifyGoogleToken(idToken);

    const user = await userRepo.findUserByEmail(payload.email);

    if (user) {
        return generateAccessToken({
            sub: user._id,
            name: user.userName,
            email: user.email,
        });
    }

    const createdUser = await userRepo.createUser({
        userName: payload.name,
        email: payload.email,
        isVerified: true,
        provider: "google",
        profilePicPath: payload.picture,
    });

    return generateAccessToken({
        sub: createdUser._id,
        name: createdUser.userName,
        email: createdUser.email,
    });
}

export default {
    register,
    verifyAccount,
    resendOTP,
    login,
    loginWithGoogle,
};
