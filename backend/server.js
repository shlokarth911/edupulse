import "dotenv/config"; // load .env
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

connectDB(); // connect to MongoDB

console.log("🔐 JWT_SECRET is:", process.env.JWT_SECRET);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
