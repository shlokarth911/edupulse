import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
  }
);

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    topics: {
      type: [TopicSchema],
      default: [],
    },
  },
  {
    _id: true,
  }
);

const UserSyllabusSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    subjects: {
      type: [SubjectSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserSyllabus", UserSyllabusSchema);
