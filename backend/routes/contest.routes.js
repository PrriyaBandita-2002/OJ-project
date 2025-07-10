import express from "express";
import {
  createContest,
  getAllContests,
  getContestById,
  getContestsCount,
} from "../controller/contestController.js";
import verifyToken from "../Middleware/verifyToken.js";
import isAdmin from "../Middleware/isAdmin.js";

const router = express.Router();

router.post("/create", verifyToken, isAdmin, createContest);
router.get("/count", getContestsCount);
router.get("/", getAllContests);
router.get("/:id", getContestById);

export default router;
