import mongoose from "mongoose";

// Define sub-schemas
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

const testCaseSchema = new mongoose.Schema({
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
    },
    topics: {
      type: [String],
      required: true,
    },
    acceptance: {
      type: Number,
      default: 0, // You can calculate dynamically later if needed
    },
    example_cases: {
      type: [exampleCaseSchema],
      required: true,
    },
    test_cases: {
      type: [testCaseSchema],
      required: true,
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
      type: String,
      required: false, // or true if you want to make it mandatory
    },
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
