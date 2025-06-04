import jwt from "jsonwebtoken";
import User from "../models/User.js";

const { JWT_SECRET } = process.env;

export default async function authGuard(req, res, next) {
  // 1) Read the token from the cookie
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized — no token" });
  }

  // 2) Verify and extract the payload
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Unauthorized — invalid or expired token" });
  }

  // 3) Fetch the user (without the password hash) and attach to req
  try {
    const user = await User.findById(payload.userId).select("-passwordHash");
    if (!user) {
      return res.status(401).json({ error: "Unauthorized — user not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("authGuard error fetching user:", err);
    res.status(500).json({ error: "Server error" });
  }
}
