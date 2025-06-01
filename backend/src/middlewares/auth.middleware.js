import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function authGuard(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer "))
    return res.status(401).json({ error: "Unauthorized" });

  const token = header.split(" ")[1];
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(userId).select("-passwordHash");
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
