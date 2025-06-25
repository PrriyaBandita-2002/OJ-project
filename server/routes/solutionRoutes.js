import express from "express";
import {
  createsolution,
  getAllSolutions,
} from "../controllers/solutionController.js";

const router = express.Router();

router.post("/", createsolution);
router.get("/", getAllSolutions);

export default router;
