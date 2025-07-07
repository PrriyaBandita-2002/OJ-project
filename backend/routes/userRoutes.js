import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserRole,
  deleteProfile,
  updateProfile,
  getUserCount,
} from "../controller/userController.js";
import {
  signupValidation,
  loginValidation,
} from "../Middleware/authMiddleware.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import { isAdmin } from "../Middleware/isAdmin.js";

import User from "../models/users.model.js";
const router = express.Router();

router.post("/register", signupValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.post("/logout", verifyToken, logoutUser);
// routes/user.js
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // ✅ Capital "User"
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    console.error("Profile fetch error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/count", getUserCount);
//  admin route
router.get("/admin-only", verifyToken, isAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome, admin!" });
});
// routes/userRoutes.js
router.patch("/:id/role", verifyToken, isAdmin, updateUserRole);
router.put("/profile/edit", verifyToken, updateProfile);
router.delete("/profile/delete", verifyToken, deleteProfile);

export default router;
