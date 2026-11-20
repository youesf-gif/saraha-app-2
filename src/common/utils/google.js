import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "../config/config.js";

async function verifyGoogleToken(idToken) {
    const client = new OAuth2Client();

    const ticket = await client.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID,
    });

    return ticket.getPayload();
}

export { verifyGoogleToken };
