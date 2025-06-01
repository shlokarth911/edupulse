import { Router } from "express";
import authGuard from "../middlewares/auth.middleware.js";
import { getProfile, updateProfile } from "../controllers/user.controller.js";

const router = Router();

// Protect all /api/users routes
router.use(authGuard);

router.get("/profile", getProfile);
router.put("/profile", updateProfile);

export default router;
