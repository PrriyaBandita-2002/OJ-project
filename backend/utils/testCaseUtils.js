import TestCase from "../models/testcase.model.js";

/**
 * Fetches test cases for a given problem ID.
 * @param {string} problemId - The ID of the problem to fetch test cases for.
 * @param {boolean} includeHidden - Whether to include hidden test cases.
 * @returns {Promise<Array>} - Returns a list of test cases.
 */
export const getTestCases = async (problemId, includeHidden = false) => {
  try {
    const query = { problem: problemId };
    if (!includeHidden) {
      query.hidden = false; // Only fetch visible if not explicitly including hidden
    }

    const testCases = await TestCase.find(query);
    return testCases;
  } catch (err) {
    throw new Error("Failed to fetch test cases: " + err.message);
  }
};
