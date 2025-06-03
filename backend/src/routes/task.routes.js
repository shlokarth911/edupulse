// src/routes/tasks.js
import { Router } from "express";
import authGuard from "../middlewares/auth.middleware.js";
import {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleComplete,
} from "../controllers/task.controller.js";

const router = Router();

// All routes require authentication
router.use(authGuard);

// GET   /api/tasks?date=YYYY-MM-DD
// POST  /api/tasks
router.route("/").get(listTasks).post(createTask);

// PUT    /api/tasks/:id
// DELETE /api/tasks/:id
router.route("/:id").put(updateTask).delete(deleteTask);

// PATCH  /api/tasks/:id/toggle
router.patch("/:id/toggle", toggleComplete);

export default router;
