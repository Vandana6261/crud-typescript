import { z } from "zod";


export const signupInitSchema = z.object({email: z.email("Please enter a valid email"),});


export const verifyOtpSchema = z.object({
  email: z.email("Please enter a valid email"),
  otp: z.string().regex(/^\d{6}$/, "OTP must be a 4 to 6 digit number"),
});


export const registerUserSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters").max(30, "Password cannot exceed 30 characters"),
  username: z.string().min(3, "Username must be at least 3 characters").max(30, "Username cannot exceed 30 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscore"),
  role: z.enum(["recruiter", "candidate",]),
});


export const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});