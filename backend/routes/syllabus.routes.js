import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  getUserSyllabus,
  addSubject,
  deleteSubject,
  addTopic,
  updateTopic,
  deleteTopic,
  toggleTopic,
} from "../controllers/syllabus.controller.js";

const router = Router();

// All routes require authentication
router.use(verifyToken);

// CRUD for subjects
router.get("/user", getUserSyllabus); // GET user syllabus
router.post("/user/subject", addSubject); // CREATE subject
router.delete("/user/subject/:sid", deleteSubject); // DELETE subject
router.post("/user/:subjectId/topic", verifyToken, addTopic); //POST topic
router.put("/user/:subjectId/topic/:topicId", verifyToken, updateTopic);
router.delete("/user/:subjectId/topic/:topicId", verifyToken, deleteTopic);
router.patch(
  "/user/:subjectId/topic/:topicId/toggle",
  verifyToken,
  toggleTopic
);

export default router;
