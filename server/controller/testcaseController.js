import TestCase from "../models/testcase.model.js";
import { getTestCases } from "../utils/testCaseUtils.js";
export const createTestCase = async (req, res) => {
  try {
    const { input, output, problem } = req.body;

    // Validate input and output
    if (!input || !output || !problem) {
      return res.status(400).json({
        success: false,
        message: "Input, output, and problem are required.",
      });
    }

    const newTestCase = new TestCase({
      input,
      output,
      problem,
    });

    await newTestCase.save();

    res.status(201).json({ success: true, data: newTestCase });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all test cases for a specific problem
export const getTestCasesByProblem = async (req, res) => {
  try {
    const { problemId } = req.params;

    // Validate problemId
    if (!problemId) {
      return res
        .status(400)
        .json({ success: false, message: "Problem ID is required." });
    }

    const testCases = await getTestCases(problemId);

    if (!testCases || testCases.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No test cases found for this problem.",
      });
    }

    res.status(200).json({ success: true, data: testCases });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// Update a test case by ID

export const updateTestCase = async (req, res) => {
  try {
    const { id } = req.params;
    const { input, output } = req.body;

    // Validate input and output
    if (!input || !output) {
      return res
        .status(400)
        .json({ success: false, message: "Input and output are required." });
    }

    const updatedTestCase = await TestCase.findByIdAndUpdate(
      id,
      { input, output },
      { new: true, runValidators: true }
    );

    if (!updatedTestCase) {
      return res
        .status(404)
        .json({ success: false, message: "Test case not found." });
    }

    res.status(200).json({ success: true, data: updatedTestCase });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a test case by ID
export const deleteTestCase = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTestCase = await TestCase.findByIdAndDelete(id);

    if (!deletedTestCase) {
      return res
        .status(404)
        .json({ success: false, message: "Test case not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Test case deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
