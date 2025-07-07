import Contest from "../models/contest.js";

export const createContest = async (req, res) => {
  try {
    const { title, description, startTime, endTime, problems } = req.body;
    const contest = new Contest({
      title,
      description,
      startTime,
      endTime,
      problems,
    });
    await contest.save();
    res.status(201).json(contest);
  } catch (error) {
    console.error("Create contest error:", error);
    res.status(500).json({ message: "Failed to create contest" });
  }
};

export const getAllContests = async (req, res) => {
  try {
    const contests = await Contest.find().populate("problems");
    res.json(contests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contests" });
  }
};

export const getContestById = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id).populate("problems");
    if (!contest) return res.status(404).json({ message: "Contest not found" });

    const now = new Date();
    if (now < contest.startTime) {
      return res.status(403).json({
        message: "Contest hasn't started yet",
        startTime: contest.startTime,
      });
    }

    res.json(contest);
  } catch (error) {
    console.error("Error fetching contest:", error);
    res.status(500).json({ message: "Error fetching contest" });
  }
};
export const getContestsCount = async (req, res) => {
  try {
    const count = await Contest.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to get contests count" });
  }
};
