import { config } from "dotenv";
import { resolve } from "node:path";

const env = process.env.NODE_ENV || "development";
const envPath = `.env.${env}`;

config({ path: resolve(envPath) });

export const MONGODB_URI = process.env.MONGODB_URI;
export const MONGODB_NAME = process.env.MONGODB_NAME;
export const PORT = process.env.PORT;
export const GOOGLE_USER = process.env.GOOGLE_USER;
export const GOOGLE_PASS = process.env.GOOGLE_PASS;
export const SECRET_KEY = process.env.SECRET_KEY;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
