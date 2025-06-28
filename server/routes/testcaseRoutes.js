import express from "express";
import {
  createTestCase,
  getTestCasesByProblem,
  updateTestCase,
  deleteTestCase,
} from "../controller/testcaseController.js";
const router = express.Router();
router.post("/", createTestCase);
router.get("/", getTestCasesByProblem);
router.put("/:id", updateTestCase);
router.delete("/:id", deleteTestCase);

export default router;
