import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/auth.types";


const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["recruiter", "candidate"],
      required: true,
    },

    hashedRefreshToken: {
        type: String,
    },
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model<IUser>("User", userSchema);

export default User;