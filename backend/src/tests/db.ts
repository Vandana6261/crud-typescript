import mongoose from "mongoose";
import { connectDB } from "../config/db";

export const connectTestDB = async () => {
  await connectDB();
};

export const disconnectTestDB = async () => {
  await mongoose.connection.close();
};
