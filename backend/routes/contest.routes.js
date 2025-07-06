import express from "express";
import {
  createContest,
  getAllContests,
  getContestById,
} from "../controller/contestController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import { isAdmin } from "../Middleware/isAdmin.js";

const router = express.Router();

router.post("/", verifyToken, isAdmin, createContest);
router.get("/", getAllContests);
router.get("/:id", getContestById);

export default router;
