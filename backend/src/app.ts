import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute";
import authRoute from "./routes/auth.route";
import { logger } from "./middleware/logger";
import movieRoute from "./routes/movie.route";
import jobRoute from "./routes/job.route";
import errorMiddleware from "./middleware/middleware";

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use((req: Request, res: Response, next) => {
  console.log(req.method, "method", req.path, "path");
  next();
})


app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Hello TypeScript Express!"
  });
});

app.use("/users", userRoute);
app.use("/api/auth", authRoute);

app.use("/api/movies", movieRoute);
app.use("/api/jobs", jobRoute);

app.use(errorMiddleware);
export default app;