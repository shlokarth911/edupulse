import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

//Importing Routes
import testRoutes from "./routes/test.routes.js";
import authRoutes from "./routes/auth.routes.js";

//Global Middlewares
app.use(
  cors({
    origin: "http://localhost:3000", // Allow your Next.js frontend
    credentials: true, // If you plan to use cookies for JWTs later
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//Using Routes
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
