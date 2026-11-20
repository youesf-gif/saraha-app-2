import express from "express";
import mongoose from "mongoose";

import authRouter from "./app/auth/auth.route.js";
import { connectDB } from "./common/db/connection.js";
import { PORT } from "./common/config/config.js";
import { globalErrorHandler } from "./common/error/globalErrorHandler.js";

const app = express();
await connectDB();

app.use(express.json());
app.use("/api/auth", authRouter);

app.use(globalErrorHandler);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const shutdown = async () => {
    await mongoose.disconnect();
    server.close();
    console.log("Server is shutting down...");
    process.exit(0);
};

process.on("sigint", shutdown);

process.on("sigterm", shutdown);
