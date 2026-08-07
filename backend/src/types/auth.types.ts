import { Document } from "mongoose";

export type UserRole = "recruiter" | "candidate";

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  role: UserRole;
  hashedRefreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface ISignupOtp extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}