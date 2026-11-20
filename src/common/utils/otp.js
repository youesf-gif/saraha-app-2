import crypto from "node:crypto";

async function generateOTP() {
    return crypto.randomInt(100000, 999999);
}

export { generateOTP };
