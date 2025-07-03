// ● Collection 2: solutions
// Document structure:
// problem: reference to the problem document (Foreign Key)
// verdict: string (CharField)
// submitted_at: date and time (Auto DateTime Field)

import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  verdict: {
    type: String, // e.g. 'Accepted', 'Wrong Answer', 'Time Limit Exceeded'
    required: true,
  },
  submitted_at: {
    type: Date,
    default: Date.now,
  },
});

const Solution = mongoose.model("Solution", solutionSchema);
export default Solution;
