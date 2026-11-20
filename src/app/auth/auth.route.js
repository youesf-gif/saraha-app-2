import { Router } from "express";
import authController from "./auth.controller.js";
import { validationMiddleware } from "../../middleware/validation.middleware.js";
import {
    registerDto,
    verifyAccountDto,
    resendOtpDto,
    loginDto,
    loginWithGoogleDto,
} from "./auth.dto.js";

const authRouter = Router();

authRouter.post(
    "/register",
    validationMiddleware(registerDto),
    authController.register,
);
authRouter.patch(
    "/verify-account",
    validationMiddleware(verifyAccountDto),
    authController.verifyAccount,
);
authRouter.post(
    "/resend-otp",
    validationMiddleware(resendOtpDto),
    authController.resendOTP,
);
authRouter.post("/login", validationMiddleware(loginDto), authController.login);
authRouter.post(
    "/login-with-google",
    validationMiddleware(loginWithGoogleDto),
    authController.loginWithGoogle,
);

export default authRouter;
