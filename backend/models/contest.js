import mongoose from "mongoose";

const contestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

contestSchema.methods.isActive = function () {
  const now = new Date();
  return now >= this.startTime && now <= this.endTime;
};

const Contest = mongoose.model("Contest", contestSchema);
export default Contest;
