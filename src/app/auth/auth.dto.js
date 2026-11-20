// dto >> Data Transfer Object
// set contracts between FE and BE

import { z } from "zod";

// list all contracts:

// contract of register:
const registerDto = z.object({
    userName: z.string().trim().min(3).max(20),
    email: z.email().toLowerCase(),
    password: z.string().min(8),
    profilePicPath: z.string().optional(),
});

// contract of verify account:

const verifyAccountDto = z.object({
    email: z.email().toLowerCase(),
    otp: z.string().length(6),
});

// contract of resend otp

const resendOtpDto = z.object({
    email: z.email().toLowerCase(),
});

// contract of login

const loginDto = z.object({
    email: z.email().toLowerCase(),
    password: z.string().min(8),
});

// contarct of login with google

const loginWithGoogleDto = z.object({
    idToken: z.string(),
});

export {
    registerDto,
    verifyAccountDto,
    resendOtpDto,
    loginDto,
    loginWithGoogleDto,
};
