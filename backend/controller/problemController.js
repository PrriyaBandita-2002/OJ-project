import Problem from "../models/problem.model.js";

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
    } = req.body;
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
      test_cases,
      starter_code,
    });
    await problem.save();
    res.status(201).json({ success: true, data: problem });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//get all the problems
export const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json({ success: true, data: problems });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//get a single problem by id
export const getproblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res
        .status(404)
        .json({ success: false, message: "problem not found" });
    }
    res.status(200).json({ success: true, data: problem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
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
      return res.status(403).json({
        success: false,
        message: "Contest has not started yet",
      });
    }

    if (now > end) {
      return res.status(403).json({
        success: false,
        message: "Contest has ended",
      });
    }

    res.status(200).json({ success: true, data: problem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//update a problem
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

//delete a problem
export const deleteproblem = async (req, res) => {
  try {
    const deletedProblem = await Problem.findByIdAndDelete(req.params.id);
    if (!deletedProblem) {
      return res
        .status(404)
        .json({ success: false, message: "Problem not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
