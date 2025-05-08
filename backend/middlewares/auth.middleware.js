import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("🔒 verifyToken authHeader:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token missing or malformed",
    });
  }

  const token = authHeader.split(" ")[1];
  console.log("🔑 verifyToken token extracted:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ verifyToken decoded payload:", decoded);

    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("❌ verifyToken error:", err.message);
    return res
      .status(403)
      .json({ success: false, message: "Token is invalid or has expired" });
  }
};
