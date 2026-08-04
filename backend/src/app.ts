import express, { Request, Response } from "express";
import userRoute from "./routes/userRoute"
import { logger } from "./middleware/logger";

const app = express();
// console.log(process.env.PORT)
app.use(express.json());

app.use(logger);


app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Hello TypeScript Express!"
  });
});

app.use("/users", userRoute);

// app.use("/api")

export default app;