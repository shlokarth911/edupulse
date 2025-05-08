import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Helpers
const sendError = (res, status, message) =>
  res.status(status).json({ success: false, message });
const sendSuccess = (res, data) => res.json({ success: true, ...data });

export const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // 1) All fields required
    if (!email || !name || !password) {
      return sendError(res, 400, "Please fill all fields");
    }

    // 2) Must not already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, 400, "User already exists");
    }

    // 3) Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4) Create user
    const user = await User.create({ name, email, passwordHash });

    // 5) Verify secret
    if (!process.env.JWT_SECRET) {
      console.error("⚠️  No JWT_SECRET in .env!");
      return sendError(res, 500, "Server configuration error");
    }

    // 6) Sign a JWT
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 7) Return success
    return sendSuccess(res, {
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("Error in signup controller:", err);
    return sendError(res, 500, "Server error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Find user
    const user = await User.findOne({ email });
    if (!user) {
      return sendError(res, 404, "No account with this email");
    }

    // 2) Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return sendError(res, 400, "Incorrect password");
    }

    // 3) Verify secret
    if (!process.env.JWT_SECRET) {
      console.error("⚠️  No JWT_SECRET in .env!");
      return sendError(res, 500, "Server configuration error");
    }

    // 4) Sign token
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5) Return success
    return sendSuccess(res, {
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("Error in login controller:", err);
    return sendError(res, 500, "Server error");
  }
};
