import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Please  enter a valid email address",
      },
    },

    password: {
      type: String,
      required: true,
    },

    points: {
      type: Number,
      default: 0,
    },

    badge: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
