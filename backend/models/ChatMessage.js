// models/ChatMessage.js
import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
  question: String,
  response: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("ChatMessage", ChatMessageSchema);
