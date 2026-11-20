import { toSeconds } from "./time.js";
import { SECRET_KEY } from "../config/config.js";
import jwt from "jsonwebtoken";

function generateAccessToken(payload) {
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: toSeconds(1, "h"),
    });
}

export { generateAccessToken };
