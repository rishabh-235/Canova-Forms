import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
import userRouter from "./routes/user.router.js";
app.use("/api/v1/user", userRouter);
import formRouter from "./routes/form.router.js";
app.use("/api/v1/form", formRouter);
export { app };
