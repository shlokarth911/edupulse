import express from "express";
import morgan from "morgan";

export const app = express();

//Importing Routes
import testRoutes from "./routes/test.routes.js";
import authRoutes from "./routes/auth.routes.js";

//Global Middlewares
app.use(express.json());
app.use(morgan("dev"));

//Using Routes
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
