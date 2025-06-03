// src/controllers/taskController.js
import Task from "../models/Task.js";
import User from "../models/User.js";

// List tasks for a given date (query param ?date=YYYY-MM-DD)
export async function listTasks(req, res) {
  const { date } = req.query;
  if (!date)
    return res.status(400).json({ error: "Missing date query parameter" });

  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const tasks = await Task.find({
    user: req.user._id,
    date: { $gte: start, $lte: end },
  }).sort("priority createdAt");

  res.json(tasks);
}

// Create a new task
export async function createTask(req, res) {
  const { name, subject, topic, estimatedMinutes, priority, date } = req.body;
  if (!name || !date) {
    return res.status(400).json({ error: "Name and date are required" });
  }

  const task = await Task.create({
    user: req.user._id,
    name,
    subject: subject || "",
    topic: topic || "",
    estimatedMinutes: estimatedMinutes || 0,
    priority: priority || "Medium",
    date,
  });

  res.status(201).json(task);
}

// Update an existing task
export async function updateTask(req, res) {
  const updates = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    updates,
    { new: true }
  );
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
}

// Delete a task
export async function deleteTask(req, res) {
  const result = await Task.deleteOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (result.deletedCount === 0)
    return res.status(404).json({ error: "Task not found" });
  res.status(204).end();
}

// Toggle completion (swipe-to-complete)
export async function toggleComplete(req, res) {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ error: "Task not found" });

  // Toggle state
  task.completed = !task.completed;
  task.completedAt = task.completed ? new Date() : undefined;
  await task.save();

  // Only award on completion (not un-completing)
  if (task.completed) {
    const user = await User.findById(req.user._id);

    // 1) Award points
    const POINTS_PER_TASK = 10;
    user.points += POINTS_PER_TASK;

    // 2) Update streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (user.lastCompletionDate) {
      const yesterday = new Date(user.lastCompletionDate);
      yesterday.setDate(yesterday.getDate() + 1);
      yesterday.setHours(0, 0, 0, 0);

      if (today.getTime() === yesterday.getTime()) {
        user.streak += 1;
      } else if (
        today.getTime() !==
        new Date(user.lastCompletionDate).setHours(0, 0, 0, 0)
      ) {
        user.streak = 1;
      }
    } else {
      user.streak = 1;
    }

    user.lastCompletionDate = new Date();

    // 3) Award badges
    const badgesToCheck = [
      {
        name: "First Task Completed",
        condition: user.points === POINTS_PER_TASK,
      },
      { name: "1-Day Streak", condition: user.streak === 1 },
      { name: "7-Day Streak", condition: user.streak === 7 },
      { name: "30-Day Streak", condition: user.streak === 30 },
    ];

    for (const { name, condition } of badgesToCheck) {
      if (condition && !user.badges.some((b) => b.name === name)) {
        user.badges.push({ name });
      }
    }

    await user.save();

    // Return updated user stats alongside the task
    return res.json({
      task,
      gamification: {
        points: user.points,
        streak: user.streak,
        badges: user.badges,
      },
    });
  }

  // If un-completing, just return the task
  res.json({ task });
}
