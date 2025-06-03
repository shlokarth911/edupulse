import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },
});

const chapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  topics: [topicSchema],
});

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  chapters: [chapterSchema],
});

const syllabusSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "My Syllabus",
      trim: true,
    },

    subjects: [subjectSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Syllabus", syllabusSchema);
