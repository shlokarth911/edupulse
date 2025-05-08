import UserSyllabus from "../models/Subject.js";
import Progress from "../models/Progress.js";
import User from "../models/User.js";

export const getUserSyllabus = async (req, res, next) => {
  try {
    const record = await UserSyllabus.findOne({ userId: req.userId }).lean();
    return res.json({ success: true, subjects: record?.subjects || [] });
  } catch (err) {
    return next(err);
  }
};

export const addSubject = async (req, res, next) => {
  try {
    const { name } = req.body;
    const update = await UserSyllabus.findOneAndUpdate(
      { userId: req.userId },
      { $push: { subjects: { name, topics: [] } } },
      { upsert: true, new: true }
    );
    return res.json({ success: true, subjects: update.subjects });
  } catch (err) {
    return next(err);
  }
};

export const deleteSubject = async (req, res, next) => {
  try {
    const { sid } = req.params;
    const update = await UserSyllabus.findOneAndUpdate(
      { userId: req.userId },
      { $pull: { subjects: { _id: sid } } },
      { new: true }
    );
    return res.json({ success: true, subjects: update.subjects });
  } catch (err) {
    return next(err);
  }
};

export const addTopic = async (req, res, next) => {
  const { subjectId } = req.params;
  const { name } = req.body;
  const userId = req.userId; // <-- use req.userId

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Topic name is required" });
  }

  try {
    // Find or create the user's syllabus
    let syllabus = await UserSyllabus.findOne({ userId });
    if (!syllabus) {
      syllabus = await UserSyllabus.create({ userId, subjects: [] });
    }

    // Locate the subject sub-document
    const subject = syllabus.subjects.id(subjectId);
    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }

    // Push new topic
    subject.topics.push({ name, completed: false });
    await syllabus.save();

    return res.json({
      success: true,
      message: "Topic added",
      data: subject.topics,
    });
  } catch (err) {
    return next({ status: 500, message: err.message });
  }
};

export const updateTopic = async (req, res, next) => {
  const { subjectId, topicId } = req.params;
  const { name } = req.body;
  const userId = req.userId; // <-- use req.userId

  try {
    const syllabus = await UserSyllabus.findOne({ userId });
    if (!syllabus) {
      return res
        .status(404)
        .json({ success: false, message: "Syllabus not found" });
    }

    const subject = syllabus.subjects.id(subjectId);
    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }

    const topic = subject.topics.id(topicId);
    if (!topic) {
      return res
        .status(404)
        .json({ success: false, message: "Topic not found" });
    }

    topic.name = name || topic.name;
    await syllabus.save();

    return res.json({ success: true, message: "Topic updated", data: topic });
  } catch (err) {
    return next({ status: 500, message: err.message });
  }
};

export const deleteTopic = async (req, res, next) => {
  const { subjectId, topicId } = req.params;
  const userId = req.userId; // <-- use req.userId

  try {
    const syllabus = await UserSyllabus.findOne({ userId });
    if (!syllabus) {
      return res
        .status(404)
        .json({ success: false, message: "Syllabus not found" });
    }

    const subject = syllabus.subjects.id(subjectId);
    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }

    const topic = subject.topics.id(topicId);
    if (!topic) {
      return res
        .status(404)
        .json({ success: false, message: "Topic not found" });
    }

    topic.remove();
    await syllabus.save();

    return res.json({ success: true, message: "Topic deleted" });
  } catch (err) {
    return next({ status: 500, message: err.message });
  }
};

export const toggleTopic = async (req, res, next) => {
  const { subjectId, topicId } = req.params;
  const userId = req.userId;

  try {
    // 1) Load the user’s syllabus
    const syllabus = await UserSyllabus.findOne({ userId });
    if (!syllabus) {
      return res
        .status(404)
        .json({ success: false, message: "Syllabus not found" });
    }

    // 2) Find the subject and topic subdocs
    const subject = syllabus.subjects.id(subjectId);
    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }
    const topic = subject.topics.id(topicId);
    if (!topic) {
      return res
        .status(404)
        .json({ success: false, message: "Topic not found" });
    }

    // 3) Flip the completed flag
    const wasCompleted = topic.completed;
    topic.completed = !wasCompleted;
    await syllabus.save();

    let user;
    // 4) If marking complete, give points and log progress
    if (!wasCompleted && topic.completed) {
      // a) Award points
      user = await User.findByIdAndUpdate(
        userId,
        { $inc: { points: 10 } },
        { new: true, select: "points badges" }
      );

      // b) Log in Progress model
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      await Progress.findOneAndUpdate(
        { userId, date: today },
        { $inc: { topicsCompleted: 1 } },
        { upsert: true }
      );

      // c) Point-based badges
      const badgeThresholds = [
        { key: "first-topic", threshold: 10 }, // after 10 points (1 topic)
        { key: "novice-50pts", threshold: 50 }, // after 50 points
      ];

      for (const { key, threshold } of badgeThresholds) {
        if (user.points >= threshold && !user.badges.includes(key)) {
          user.badges.push(key);
        }
      }

      // d) Save any new badges
      await user.save();
    }

    // 5) Respond with the updated topic
    return res.json({
      success: true,
      message: `Topic marked ${topic.completed ? "completed" : "incomplete"}`,
      data: topic,
    });
  } catch (err) {
    return next({ status: 500, message: err.message });
  }
};
