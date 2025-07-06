import axios from "axios";
import dotenv from "dotenv";
import Problem from "../models/problem.model.js";
import Submission from "../models/submission.js";
import mongoose from "mongoose";
// Required once if not done in server.js

const normalize = (text) => (text || "").trim();

dotenv.config();

// ------------------ SUBMIT SOLUTION ------------------
export const submitSolution = async (req, res) => {
  const { problemId, code, language } = req.body;
  console.log("Received Submission:", { problemId, language });

  try {
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    let allPassed = true;
    const testResults = [];

    for (const testCase of problem.test_cases) {
      const start = Date.now();
      const response = await axios.post(`${process.env.COMPILER_URL}/run`, {
        language,
        code,
        input: testCase.input,
      });
      const execTime = Date.now() - start;
      const userOutput = response.data.output || "";

      const passed = normalize(userOutput) === normalize(testCase.output);
      if (!passed) allPassed = false;

      testResults.push({
        input: testCase.input,
        expectedOutput: testCase.output,
        userOutput,
        passed,
        execTime,
      });
    }

    const verdict = allPassed ? "Accepted" : "Wrong Answer";

    const newSubmission = new Submission({
      user: req.user.id,
      problem: problemId,
      problemTitle: problem.title,
      language,
      code,
      verdict,
      testResults,
      passed: testResults.filter((t) => t.passed).length,
      total: testResults.length,
    });

    await newSubmission.save();

    return res.status(200).json({
      verdict,
      testResults,
      problemTitle: problem.title,
      timestamp: newSubmission.createdAt,
    });
  } catch (error) {
    console.error("Submission error:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};
// ------------------ GET STATS ------------------
export const getFullStats = async (req, res) => {
  const { userId } = req.params;

  console.log(" [getFullStats] userId received:", userId);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error(" Invalid user ID:", userId);
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  try {
    // Step 1: Fetch submissions
    const submissions = await Submission.find({ user: userId }).populate(
      "problem"
    );
    console.log(" Submissions fetched:", submissions.length);

    // Step 2: Initialize stats
    const totalSubmissions = submissions.length;
    const uniqueAcceptedProblems = new Set();
    const difficultyStats = { Easy: 0, Medium: 0, Hard: 0 };
    const contestSubmissions = submissions.filter((s) => s.contestId);
    const uniqueContests = new Set(
      contestSubmissions.map((s) => s.contestId?.toString())
    );
    const bestRank = contestSubmissions.reduce(
      (best, s) =>
        s.rank !== null && (best === null || s.rank < best) ? s.rank : best,
      null
    );

    // Step 3: Process each submission
    submissions.forEach((sub, index) => {
      if (!sub.problem) {
        console.warn(` Submission ${index} has no problem populated`);
        return;
      }

      if (sub.verdict === "Accepted") {
        const pid = sub.problem._id.toString();
        const difficulty = sub.problem.difficulty;

        if (!uniqueAcceptedProblems.has(pid)) {
          uniqueAcceptedProblems.add(pid);
          difficultyStats[difficulty] = (difficultyStats[difficulty] || 0) + 1;
        }
      }
    });

    console.log(" Unique accepted problems:", [...uniqueAcceptedProblems]);
    console.log("Difficulty breakdown:", difficultyStats);

    // Step 4: Calculate accuracy
    const correct = submissions.filter((s) => s.verdict === "Accepted").length;
    const accuracy =
      totalSubmissions > 0
        ? `${Math.round((correct / totalSubmissions) * 100)}%`
        : "-";
    console.log(" Accuracy:", accuracy);

    // Step 5: Submissions over the past 30 days
    const past30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    console.log("Calculating submissions from:", past30.toISOString());

    const submissionsOverTime = await Submission.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: past30 },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$submittedAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    console.log(" Submissions over time:", submissionsOverTime);

    // Step 6: Send response
    const stats = {
      totalSubmissions,
      questionsSolved: uniqueAcceptedProblems.size,
      accuracy,
      avgTime: "-",
      contests: uniqueContests.size,
      bestRank: bestRank !== null ? bestRank : "-",

      difficultyStats,
      submissionsOverTime,
    };

    console.log("Final stats response:", stats);
    return res.json(stats);
  } catch (err) {
    console.error(" Failed to fetch user stats:", err);
    console.error(err.stack);
    res.status(500).json({ error: "Server error" });
  }
};

// ------------------ GET USER SUBMISSIONS ------------------
export const getUserSubmissions = async (req, res) => {
  try {
    const { userId } = req.params;

    const submissions = await Submission.find({ user: userId })
      .sort({ submittedAt: -1 })
      .select(
        "problem problemTitle verdict passed total createdAt submittedAt"
      );

    res.status(200).json({ submissions });
  } catch (err) {
    console.error("Failed to fetch user submissions:", err);
    res
      .status(500)
      .json({ message: "Server error while fetching submissions." });
  }
};
