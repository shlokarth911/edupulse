import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  getPoints,
  getStats,
  getStreak,
} from "../controllers/progress.controller.js";

const router = Router();

router.get("/streak", verifyToken, getStreak);
router.get("/points", verifyToken, getPoints);
router.get("/stats", verifyToken, getStats);

export default router;
