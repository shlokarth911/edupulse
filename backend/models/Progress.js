import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  topicsCompleted: {
    type: Number,
    default: 0,
  },
});

// Ensure one record per user per day
ProgressSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("Progress", ProgressSchema);
