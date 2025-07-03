import TestCase from "../models/testcase.model.js";

/**
 * Fetches all test cases for a given problem ID.
 * @param {string} problemId - The ID of the problem to fetch test cases for.
 * @returns {Promise<Array>} - Returns a list of test cases.
 */
export const getTestCases = async (problemId) => {
  try {
    const testCases = await TestCase.find({ problem: problemId });
    return testCases;
  } catch (err) {
    throw new Error("Failed to fetch test cases: " + err.message);
  }
};
