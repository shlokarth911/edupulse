// src/controllers/syllabusController.js
import Syllabus from "../models/Syllabus.js";

// GET all syllabi for the logged‑in user
export async function listSyllabi(req, res) {
  const syllabi = await Syllabus.find({ user: req.user._id });
  res.json(syllabi);
}

// GET a single syllabus by ID (ensuring it belongs to user)
export async function getSyllabus(req, res) {
  const syllabus = await Syllabus.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!syllabus) return res.status(404).json({ error: "Not found" });
  res.json(syllabus);
}

// POST create a new syllabus
export async function createSyllabus(req, res) {
  const { title, subjects } = req.body;
  const syllabus = await Syllabus.create({
    user: req.user._id,
    title,
    subjects: subjects || [],
  });
  res.status(201).json(syllabus);
}

// PUT update an existing syllabus (replace title or subjects)
export async function updateSyllabus(req, res) {
  const { title, subjects } = req.body;
  const syllabus = await Syllabus.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { title, subjects },
    { new: true }
  );
  if (!syllabus) return res.status(404).json({ error: "Not found" });
  res.json(syllabus);
}

// DELETE a syllabus
export async function deleteSyllabus(req, res) {
  const result = await Syllabus.deleteOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (result.deletedCount === 0)
    return res.status(404).json({ error: "Not found" });
  res.status(204).end();
}
