import Progress from "../models/Progress.js";
import User from "../models/User.js";

export const getStreak = async (req, res, next) => {
  const userId = req.userId;
  try {
    // Fetch the last 30 days of progress
    const records = await Progress.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    })
      .sort("date")
      .lean();

    let currentStreak = 0;
    let bestStreak = 0;
    let yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0);

    // Walk backwards from today
    for (let i = records.length - 1; i >= 0; i--) {
      const recDate = new Date(records[i].date);
      recDate.setHours(0, 0, 0, 0);
      if (
        records[i].topicsCompleted > 0 &&
        recDate.getTime() === yesterday.getTime()
      ) {
        currentStreak++;
        bestStreak = Math.max(bestStreak, currentStreak);
        yesterday.setDate(yesterday.getDate() - 1);
      } else if (recDate.getTime() < yesterday.getTime()) {
        // Break on the first gap
        break;
      }
    }

    return res.json({ success: true, currentStreak, bestStreak });
  } catch (err) {
    next(err);
  }
};

export const getPoints = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId, "points badges").lean();
    res.json({ success: true, points: user.points, badges: user.badges });
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req, res, next) => {
  const userId = req.userId;

  try {
    // 1) Fetch user points & badges
    const user = await User.findById(userId, "points badges").lean();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // 2) Compute streaks (reuse your existing logic)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const records = await Progress.find({
      userId,
      date: { $gte: thirtyDaysAgo },
    })
      .sort("date")
      .lean();

    let currentStreak = 0;
    let bestStreak = 0;
    let cursorDate = new Date();
    cursorDate.setHours(0, 0, 0, 0);

    for (let i = records.length - 1; i >= 0; i--) {
      const recDate = new Date(records[i].date);
      recDate.setHours(0, 0, 0, 0);

      if (
        recDate.getTime() === cursorDate.getTime() &&
        records[i].topicsCompleted > 0
      ) {
        currentStreak++;
        bestStreak = Math.max(bestStreak, currentStreak);
        cursorDate.setDate(cursorDate.getDate() - 1);
      } else {
        break;
      }
    }

    // 3) Send combined stats
    return res.json({
      success: true,
      data: {
        points: user.points,
        badges: user.badges,
        currentStreak,
        bestStreak,
      },
    });
  } catch (err) {
    next(err);
  }
};
