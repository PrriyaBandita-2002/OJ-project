import express from "express";
import {
  createProblem,
  getAllProblems,
  getproblemById,
  updateproblem,
  deleteproblem,
} from "../controller/problemController";
const router = express.Router();
router.post("/", createProblem);
router.get("/", getAllProblems);
router.get("/:id", getproblemById);
router.update("/:id", updateproblem);
router.delete("/:id", deleteproblem);

export default router;
