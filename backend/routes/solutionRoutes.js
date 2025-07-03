import express from "express";
import {
  createsolution,
  getAllSolutions,
} from "../controller/solutionController.js";

const router = express.Router();

router.post("/", createsolution);
router.get("/", getAllSolutions);

export default router;
