import Problem from "../model/problems";
export const createProblem = async (req, res) => {
  try {
    const problem = new Problem(req.body);
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
