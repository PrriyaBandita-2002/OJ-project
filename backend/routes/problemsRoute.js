import express from "express";
import {
  createProblem,
  getAllProblems,
  getproblemById,
  updateproblem,
  deleteproblem,
} from "../controller/problemController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import { isAdmin } from "../Middleware/isAdmin.js";

const router = express.Router();
router.post("/createProblem", verifyToken, isAdmin, createProblem);
router.get("/problemlist", getAllProblems);
router.get("/:id", getproblemById);
router.put("/:id", verifyToken, isAdmin, updateproblem);
router.delete("/:id", verifyToken, isAdmin, deleteproblem);

export default router;
