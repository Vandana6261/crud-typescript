import "dotenv/config";
import app from "./app";
import { connectDB } from "./config/db";
console.log(process.env.MONGO_URI);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    console.log("Mongo DB connected")
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error(`Error starting server: ${(error as Error).message}`);
    process.exit(1);
  }
}

startServer();
