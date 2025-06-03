// src/routes/syllabus.js
import { Router } from "express";
import authGuard from "../middlewares/auth.middleware.js";
import {
  listSyllabi,
  getSyllabus,
  createSyllabus,
  updateSyllabus,
  deleteSyllabus,
} from "../controllers/syllabus.controller.js";

const router = Router();

// All routes protected
router.use(authGuard);

// List & create
router.route("/").get(listSyllabi).post(createSyllabus);

// Read, update, delete by ID
router
  .route("/:id")
  .get(getSyllabus)
  .put(updateSyllabus)
  .delete(deleteSyllabus);

export default router;
