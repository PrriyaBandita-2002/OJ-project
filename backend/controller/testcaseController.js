// import TestCase from "../models/testcase.model.js";
// import { getTestCases } from "../utils/testCaseUtils.js";

// export const createTestCase = async (req, res) => {
//   try {
//     const { input, output, problem, hidden = false } = req.body;

//     if (!input || !output || !problem) {
//       return res.status(400).json({
//         success: false,
//         message: "Input, output, and problem are required.",
//       });
//     }

//     const newTestCase = new TestCase({ input, output, problem, hidden });
//     await newTestCase.save();

//     res.status(201).json({ success: true, data: newTestCase });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// export const getTestCasesByProblem = async (req, res) => {
//   try {
//     const { problemId } = req.params;

//     if (!problemId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Problem ID is required." });
//     }

//     const testCases = await getTestCases(problemId);
//     if (!testCases.length) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No test cases found." });
//     }

//     res.status(200).json({ success: true, data: testCases });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// export const updateTestCase = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { input, output, hidden } = req.body;

//     if (!input && !output && hidden === undefined) {
//       return res.status(400).json({ message: "No fields provided for update" });
//     }
//     const fieldsToUpdate = {};
//     if (input !== undefined) fieldsToUpdate.input = input;
//     if (output !== undefined) fieldsToUpdate.output = output;
//     if (hidden !== undefined) fieldsToUpdate.hidden = hidden;

//     const updated = await TestCase.findByIdAndUpdate(id, fieldsToUpdate, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updated) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Test case not found." });
//     }

//     res.status(200).json({ success: true, data: updated });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// export const deleteTestCase = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deleted = await TestCase.findByIdAndDelete(id);
//     if (!deleted) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Test case not found." });
//     }

//     res.status(200).json({ success: true, message: "Deleted successfully." });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// export const updateAllTestCasesForProblem = async (req, res) => {
//   try {
//     const { problemId } = req.params;
//     const testCases = req.body;

//     if (!Array.isArray(testCases)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Test cases must be an array." });
//     }

//     // Optional: Validate structure of test cases
//     for (const tc of testCases) {
//       if (typeof tc.input !== "string" || typeof tc.output !== "string") {
//         return res.status(400).json({
//           success: false,
//           message: "Each test case must have 'input' and 'output' as strings.",
//         });
//       }
//     }

//     // Delete all old test cases for this problem
//     await TestCase.deleteMany({ problem: problemId });

//     // Insert new test cases
//     const inserted = await TestCase.insertMany(
//       testCases.map((tc) => ({
//         ...tc,
//         problem: problemId,
//         hidden: tc.hidden || false, // default false if not provided
//       }))
//     );

//     res.status(200).json({ success: true, data: inserted });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };
import TestCase from "../models/testcase.model.js";
import { getTestCases } from "../utils/testCaseUtils.js";

// Create a new test case
export const createTestCase = async (req, res) => {
  try {
    const { input, output, problem, hidden = false } = req.body;

   if (!input || !output || !problem) {
      return res.status(400).json({
        success: false,
        error: {
          type: "ValidationError",
          message: "Input, output, and problem ID are required.",
        },
      });
    }

    const newTestCase = new TestCase({ input, output, problem, hidden });
    await newTestCase.save();

    res.status(201).json({ success: true, data: newTestCase });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all test cases for a given problem
export const getTestCasesByProblem = async (req, res) => {
  try {
    const { problemId } = req.params;
    const { includeHidden } = req.query;

    if (!problemId) {
      return res.status(400).json({
        success: false,
        message: "Problem ID is required.",
      });
    }

    const isAdmin = req.user?.role === "admin";
    const testCases = await getTestCases(problemId, isAdmin && includeHidden);

    if (!testCases.length) {
      return res
        .status(404)
        .json({ success: false, message: "No test cases found." });
    }

    res.status(200).json({ success: true, data: testCases });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a single test case by ID
export const updateTestCase = async (req, res) => {
  try {
    const { id } = req.params;
    const { input, output, hidden } = req.body;

    if (input === undefined && output === undefined && hidden === undefined) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update.",
      });
    }

    const updated = await TestCase.findByIdAndUpdate(
      id,
      { input, output, hidden },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Test case not found." });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a test case by ID
export const deleteTestCase = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await TestCase.findByIdAndDelete(id);
    if (!deleted) {
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

// Replace all test cases for a given problem
export const updateAllTestCasesForProblem = async (req, res) => {
  try {
    const { problemId } = req.params;
    const testCases = req.body;

    if (!Array.isArray(testCases)) {
      return res.status(400).json({
        success: false,
        message: "Test cases must be an array.",
      });
    }

    for (const tc of testCases) {
      if (typeof tc.input !== "string" || typeof tc.output !== "string") {
        return res.status(400).json({
          success: false,
          message: "Each test case must have 'input' and 'output' as strings.",
        });
      }
    }

    await TestCase.deleteMany({ problem: problemId });

    const inserted = await TestCase.insertMany(
      testCases.map((tc) => ({
        ...tc,
        problem: problemId,
        hidden: tc.hidden || false,
      }))
    );

    res.status(200).json({ success: true, data: inserted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
