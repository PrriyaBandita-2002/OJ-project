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
import { isProblem_setter } from "../Middleware/isProblem_setter.js";
const router = express.Router();
router.get("/", getAllProblems);
router.get("/:id", getproblemById);
router.post("/", verifyToken, isProblem_setter, createProblem);
router.put("/:id", verifyToken, isProblem_setter, updateproblem);
router.delete("/:id", verifyToken, isProblem_setter, deleteproblem);

export default router;
