import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

const app = express();

//Routers
import authRoutes from "./routes/auth.routes.js";
import syllabusRoutes from "./routes/syllabus.routes.js";
import progressRoutes from "./routes/progress.routes.js";

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Global Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Using Routes
app.use("/api/auth", authRoutes);
app.use("/api/syllabus", syllabusRoutes);
app.use("/api/progress", progressRoutes);

// Global Error Handler (placeholder)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Server error" });
});

export default app;
