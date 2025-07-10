import express from "express";
import {
  createProblem,
  getAllProblems,
  getproblemById,
  updateproblem,
  deleteproblem,
  getProblemWithTestCases,
  getContestProblemById,
  getProblemsCount,
} from "../controller/problemController.js";
import verifyToken from "../Middleware/verifyToken.js";
import isAdmin from "../Middleware/isAdmin.js";

const router = express.Router();
router.post("/createProblem", verifyToken, isAdmin, createProblem);
router.get("/problemlist", getAllProblems);
router.get("/count", getProblemsCount);
router.get("/:id", getproblemById);
router.get("/with-testcases/:id", getProblemWithTestCases);
router.get("/contest/:id", getContestProblemById);
router.get("/edit/:id", getproblemById); // ✅ Now GET /edit/:id will work

router.put("/edit/:id", verifyToken, isAdmin, updateproblem);
router.delete("/deleteProblem/:id", verifyToken, isAdmin, deleteproblem);

export default router;
