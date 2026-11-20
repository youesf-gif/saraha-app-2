import mongoose from "mongoose";
import { MONGODB_URI, MONGODB_NAME } from "../config/config.js";

async function connectDB() {
    try {
        await mongoose.connect(`${MONGODB_URI}${MONGODB_NAME}`);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed");
        console.log(error);
    }
}

export { connectDB };
