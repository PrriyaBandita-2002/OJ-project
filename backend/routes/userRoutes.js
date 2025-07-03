import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controller/userController.js";
import {
  signupValidation,
  loginValidation,
} from "../Middleware/authMiddleware.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import { isAdmin } from "../Middleware/isAdmin.js";
const router = express.Router();

router.post("/register", signupValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.post("/logout", verifyToken, logoutUser);

//  admin route
router.get("/admin-only", verifyToken, isAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome, admin!" });
});
// routes/userRoutes.js
// router.patch("/:id/role", verifyToken, isAdmin, updateUserRole);

export default router;
