import dotenv from "dotenv";
import { app } from "./app.js";
import connectToDB from "./config/db.js";

dotenv.config();

connectToDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
