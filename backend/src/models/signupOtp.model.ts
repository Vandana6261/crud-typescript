import mongoose, { Schema } from "mongoose";
import { ISignupOtp } from "../types/auth.types";


const signupOtpSchema = new Schema<ISignupOtp>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },

    otp: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // 5 minutes
    },
  }
);


const SignupOtp = mongoose.model<ISignupOtp>(
  "SignupOtp",
  signupOtpSchema
);


export default SignupOtp;