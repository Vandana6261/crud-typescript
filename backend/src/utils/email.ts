import nodemailer from "nodemailer";
import AppError from "./AppError";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.ethereal.email",
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: process.env.SMTP_USER
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    : undefined,
});

export async function sendOtpEmail(email: string, otp: string) {
  const fromAddress = process.env.EMAIL_FROM || "no-reply@example.com";
  const subject = "Your signup OTP code";
  const text = `Your verification code is ${otp}. It is valid for 5 minutes.`;
  const html = `<p>Your verification code is <strong>${otp}</strong>. It is valid for 5 minutes.</p>`;

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: email,
      subject,
      text,
      html,
    });
    console.log(`OTP email sent to ${email}`);
  } catch (error) {
    console.warn("OTP email  could not be delivered, logging code instead:", otp);
    throw new AppError("Failed to send OTP ", 500);
  }
}
