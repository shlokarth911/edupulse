import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("Connected to DB"));
  } catch (error) {
    console.log("Failed to connect to server", error);
    process.exit(1);
  }
};

export default connectToDB;
