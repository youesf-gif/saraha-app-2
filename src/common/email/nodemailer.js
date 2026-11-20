import nodemailer from "nodemailer";
import { GOOGLE_PASS, GOOGLE_USER } from "../config/config.js";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: GOOGLE_USER,
        pass: GOOGLE_PASS,
    },
});

export async function sendMail(email, subject, htmlBody) {
    await transporter.sendMail({
        from: GOOGLE_USER,
        to: email,
        subject: subject,
        html: htmlBody,
    });
}
