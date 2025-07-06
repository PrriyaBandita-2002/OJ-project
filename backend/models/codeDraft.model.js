import mongoose from "mongoose";

const codeDraftSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    language: { type: String, enum: ["cpp", "java", "python"], required: true },
    code: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

codeDraftSchema.index({ user: 1, problem: 1, language: 1 }, { unique: true });

export default mongoose.model("CodeDraft", codeDraftSchema);
