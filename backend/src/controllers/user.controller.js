// src/controllers/userController.js
import User from "../models/User.js";

// GET /api/users/profile
export async function getProfile(req, res) {
  // `authGuard` has already populated `req.user`
  res.json(req.user);
}

// PUT /api/users/profile
export async function updateProfile(req, res) {
  const { grade, board, country } = req.body;
  const user = req.user;

  if (grade !== undefined) user.grade = grade;
  if (board !== undefined) user.board = board;
  if (country !== undefined) user.country = country;

  await user.save();
  res.json({ message: "Profile updated", user });
}
