import { Router } from "express";
import authGuard from "../middlewares/auth.middleware.js";
import User from "../models/User.js";

const router = Router();
router.use(authGuard);

router.get("/", async (req, res) => {
  const { points, streak, badges } = await User.findById(req.user._id).select(
    "points streak badges"
  );
  res.json({ points, streak, badges });
});

export default router;
