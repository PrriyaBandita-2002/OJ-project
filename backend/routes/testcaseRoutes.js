import express from "express";
import {
  createTestCase,
  getTestCasesByProblem,
  updateTestCase,
  deleteTestCase,
  updateAllTestCasesForProblem,
} from "../controller/testcaseController.js";
import verifyToken from "../Middleware/verifyToken.js";
import isAdmin from "../Middleware/isAdmin.js";
const router = express.Router();

router.post("/", verifyToken, isAdmin, createTestCase);
router.put("/:id", verifyToken, isAdmin, updateTestCase);
router.delete("/:id", verifyToken, isAdmin, deleteTestCase);
router.put(
  "/updateMany/:problemId",
  verifyToken,
  isAdmin,
  updateAllTestCasesForProblem
);

export default router;
