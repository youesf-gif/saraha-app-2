import { model, Schema } from "mongoose";

const schema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 20,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        phone: String,
        password: {
            type: String,
            required: function () {
                return this.provider === "local";
            },
        },
        provider: {
            type: String,
            enum: ["local", "google", "facebook"],
            default: "local",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        profilePicPath: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

const User = model("User", schema);

export { User };
