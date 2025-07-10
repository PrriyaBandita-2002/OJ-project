import mongoose from "mongoose";

// Example case sub-schema (for display purposes)
const exampleCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
});

// Main problem schema
const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Prevent duplicate titles
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    constraints: {
      type: [String],
      required: true,
      validate: (v) => v.length > 0,
    },
    topics: {
      type: [String],
      required: true,
      validate: (v) => v.length > 0,
    },
    acceptance: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    example_cases: {
      type: [exampleCaseSchema],
      required: true,
      validate: (v) => v.length > 0,
    },
    input_format: {
      type: String,
      required: true,
    },
    output_format: {
      type: String,
      required: true,
    },
    starter_code: {
      type: Map,
      of: String,
      default: {},
    },

    contest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
      default: null,
    },
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
