import express from "express";
import {
  createTestCase,
  getTestCasesByProblem,
  updateTestCase,
  deleteTestCase,
} from "../controller/testcaseController";
const router = express.Router();
router.post("/", createTestCase);
router.get("/", getTestCasesByProblem);
router.update("/:id", updateTestCase);
router.delete("/:id", deleteTestCase);

export default router;
