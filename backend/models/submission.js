import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema({
  input: String,
  expectedOutput: String,
  userOutput: String,
  passed: Boolean,
  execTime: Number,
});

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    problemTitle: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: ["cpp", "java", "python"],
      required: true,
    },
    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
      default: null,
    },
    rank: {
      type: Number,
      default: null,
    },

    code: {
      type: String,
      required: true,
    },
    verdict: {
      type: String,
      enum: [
        "Accepted",
        "Wrong Answer",
        "Time Limit Exceeded",
        "Compilation Error",
        "Runtime Error",
      ],
      required: true,
    },
    testResults: {
      type: [testResultSchema],
      required: true,
    },

    passed: {
      type: Number,
    },
    total: {
      type: Number,
    },

    // Optional: Add user reference in the future
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: false
    // },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
