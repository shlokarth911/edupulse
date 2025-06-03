// src/models/User.js
import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  awardedAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    // Onboarding fields:
    grade: {
      type: String,
      default: "",
    },
    board: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },

    //Gamification Felids :

    points: {
      type: Number,
      default: 0,
    },
    streak: {
      type: Number,
      default: 0,
    },
    lastCompletionDate: {
      type: Date,
    },
    badges: [badgeSchema],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
