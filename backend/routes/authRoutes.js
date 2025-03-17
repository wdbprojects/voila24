import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  logoutUser,
  uploadAvatar,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/authController.js";
import { isAuthenticatedUser } from "../middlewares/authRoutes.js";
import { authorizedRoles } from "../middlewares/authRoutes.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

router.get("/me", isAuthenticatedUser, getUserProfile);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.put("/profile/update", isAuthenticatedUser, updateProfile);
router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  allUsers,
);
router.get(
  "/admin/users/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  getUserById,
);
router.put(
  "/admin/users/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  updateUserById,
);
router.delete(
  "/admin/users/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  deleteUserById,
);
router.put("/me/upload_avatar", isAuthenticatedUser, uploadAvatar);

export default router;
