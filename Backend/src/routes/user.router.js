import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  getCurrentUser,
  getUserProfile,
  signout,
  signin,
  signup,
  updateUserProfile,
  forgotPassword,
  verifyOTP,
  updatePassword,
} from "../controllers/user.controller.js";
const router = Router();
router.get("/", verifyJWT, getUserProfile);
router.get("/me", verifyJWT, getCurrentUser);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", verifyJWT, signout);
router.post("/update-profile", verifyJWT, updateUserProfile);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/create-password", updatePassword);
export default router;



