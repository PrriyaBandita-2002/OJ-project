import Solution from "../models/solution.model.js";

// Create a new solution
export const createsolution = async (req, res) => {
  try {
    const { problem, verdict } = req.body;

    const newSolution = new Solution({
      problem,
      verdict,
    });

    await newSolution.save();

    res.status(201).json({ success: true, data: newSolution });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all solutions with populated problem info
export const getAllSolutions = async (req, res) => {
  try {
    const solutions = await Solution.find().populate("problem");
    res.status(200).json({ success: true, data: solutions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// Get a single solution by ID with populated problem info
export const getSolutionById = async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id).populate("problem");
    if (!solution) {
      return res
        .status(404)
        .json({ success: false, message: "Solution not found" });
    }
    res.status(200).json({ success: true, data: solution });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// Update a solution by ID
export const updateSolution = async (req, res) => {
  try {
    const updatedSolution = await Solution.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSolution) {
      return res
        .status(404)
        .json({ success: false, message: "Solution not found" });
    }
    res.status(200).json({ success: true, data: updatedSolution });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a solution by ID
export const deleteSolution = async (req, res) => {
  try {
    const deletedSolution = await Solution.findByIdAndDelete(req.params.id);
    if (!deletedSolution) {
      return res
        .status(404)
        .json({ success: false, message: "Solution not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Solution deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
