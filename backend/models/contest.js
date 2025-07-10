import mongoose from "mongoose";

const contestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Prevent duplicate contest names
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startTime;
        },
        message: "End time must be after start time",
      },
    },
    problems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Instance method to check if the contest is active
contestSchema.methods.isActive = function () {
  const now = new Date();
  return now >= this.startTime && now <= this.endTime;
};

const Contest = mongoose.model("Contest", contestSchema);
export default Contest;
