import Problem from "../models/problem.model.js";
import TestCase from "../models/testcase.model.js";
import Contest from "../models/contest.js"; // Required for populate validation (optional)

// CREATE a new problem
export const createProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      input_format,
      output_format,
      constraints,
      topics,
      acceptance,
      example_cases,
      test_cases,
      starter_code,
      contest, // Optional contest assignment
    } = req.body;

    // Step 1: Save the Problem (excluding test_cases)
    const problem = new Problem({
      title,
      description,
      difficulty,
      input_format,
      output_format,
      constraints,
      topics,
      acceptance,
      example_cases,
      starter_code,
      contest: contest || null,
    });

    await problem.save();

    // Step 2: Validate and Save Test Cases
    if (Array.isArray(test_cases) && test_cases.length > 0) {
      const validTestCases = test_cases
        .filter(
          (tc) => typeof tc.input === "string" && typeof tc.output === "string"
        )
        .map((tc) => ({
          input: tc.input,
          output: tc.output,
          hidden: tc.hidden || false,
          problem: problem._id,
        }));
      console.log("Valid test cases:", validTestCases);

      if (validTestCases.length > 0) {
        await TestCase.insertMany(validTestCases);
        console.log("Test cases inserted!");
      } else {
        console.log("No valid test cases to insert.");
      }
    }

    res.status(201).json({ success: true, data: problem });
  } catch (error) {
    console.error("Error creating problem:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
};

// GET all problems
export const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: problems });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET a problem with its test cases
export const getProblemWithTestCases = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res
        .status(404)
        .json({ success: false, message: "Problem not found" });
    }

    const testCases = await TestCase.find({ problem: problem._id });

    res.status(200).json({ success: true, data: { problem, testCases } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET a single problem by ID
export const getproblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res
        .status(404)
        .json({ success: false, message: "Problem not found" });
    }
    res.status(200).json({ success: true, data: problem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET a contest problem by ID with contest validation
export const getContestProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id).populate("contest");

    if (!problem) {
      return res
        .status(404)
        .json({ success: false, message: "Problem not found" });
    }

    if (!problem.contest) {
      return res
        .status(400)
        .json({ success: false, message: "This is not a contest problem" });
    }

    const now = new Date();
    const start = new Date(problem.contest.startTime);
    const end = new Date(problem.contest.endTime);

    if (now < start) {
      return res
        .status(403)
        .json({ success: false, message: "Contest has not started yet" });
    }

    if (now > end) {
      return res
        .status(403)
        .json({ success: false, message: "Contest has ended" });
    }

    res.status(200).json({ success: true, data: problem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// UPDATE a problem by ID
export const updateproblem = async (req, res) => {
  try {
    const updatedProblem = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProblem) {
      return res
        .status(404)
        .json({ success: false, message: "Problem not found" });
    }

    res.status(200).json({ success: true, data: updatedProblem });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE a problem by ID
export const deleteproblem = async (req, res) => {
  try {
    const deletedProblem = await Problem.findByIdAndDelete(req.params.id);
    if (!deletedProblem) {
      return res
        .status(404)
        .json({ success: false, message: "Problem not found" });
    }

    // Delete associated test cases
    await TestCase.deleteMany({ problem: req.params.id });

    res.status(200).json({
      success: true,
      message: "Problem and related test cases deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET count of all problems
export const getProblemsCount = async (req, res) => {
  try {
    const count = await Problem.countDocuments();
    res.status(200).json({ success: true, count });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get problems count" });
  }
};
