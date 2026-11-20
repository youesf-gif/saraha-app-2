import authService from "./auth.service.js";

async function register(req, res, next) {
    try {
        const { userName, email, password } = req.body;
        await authService.register(userName, email, password);

        res.status(201).json({ message: "User created" });
    } catch (error) {
        next(error);
    }
}

async function verifyAccount(req, res, next) {
    try {
        const { email, otp } = req.body;
        await authService.verifyAccount(email, otp);
        res.status(200).json({ message: "Account verified" });
    } catch (error) {
        next(error);
    }
}

async function resendOTP(req, res, next) {
    try {
        const { email } = req.body;
        await authService.resendOTP(email);
        res.status(200).json({ message: "OTP sent" });
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.status(200).json({ message: "Login successful", data: token });
    } catch (error) {
        next(error);
    }
}

async function loginWithGoogle(req, res, next) {
    try {
        const token = await authService.loginWithGoogle(req.body);
        res.status(200).json({ message: "Login successful", data: token });
    } catch (error) {
        next(error);
    }
}

export default { register, verifyAccount, resendOTP, login, loginWithGoogle };
