import mongoose from "mongoose";

export const connectDB = async (uri = process.env.MONGO_URI!) => {
    try {
        const connection = await mongoose.connect(uri);
        // console.log(`MongoDB Connected: ${connection.connection.host}`);
        console.log("MongoDB connected:", connection.connection.name);
    } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
        process.exit(1);
    }
}