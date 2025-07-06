import express from "express";
import { verifyToken } from "../Middleware/verifyToken.js";
import { submitSolution } from "../controller/submission.controller.js";
import {
  getFullStats,
  getUserSubmissions,
} from "../controller/submission.controller.js";
import { saveDraft, getDraft } from "../controller/codeDraft.controller.js";
const router = express.Router();

router.post("/", verifyToken, submitSolution);
router.get("/stats/:userId", getFullStats);
router.get("/user/:userId", getUserSubmissions);
router.post("/draft", verifyToken, saveDraft);
router.get("/draft/:problemId/:language", verifyToken, getDraft);
export default router;
