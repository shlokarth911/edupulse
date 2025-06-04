import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import syllabusRoutes from "./routes/syllabus.routes.js";
import taskRoutes from "./routes/task.routes.js";
import gamificationRoutes from "./routes/gamification.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // your Next.js origin
    credentials: true, // <— allow sending cookies
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);
app.use(express.json());
app.use(cookieParser());

// Public routes
app.use("/api/auth", authRoutes);

// Protected
app.use("/api/users", userRoutes);
app.use("/api/syllabus", syllabusRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/gamification", gamificationRoutes);

// Health check
app.get("/", (req, res) => res.send({ status: "ok" }));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export default app;
