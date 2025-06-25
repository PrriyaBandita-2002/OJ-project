// ● Collection 1: problems
// Document structure:
// statement: string (CharField)
// name: string (CharField)
// code: string (CharField)
// difficulty: string (CharField, optional)

import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    statement: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      default: "medium",
    },
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
