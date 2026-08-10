import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler";
import requireAuth from "../middleware/requireAuth";
import validateSignupToken from "../middleware/validateSignupToken";
import validateRefreshToken from "../middleware/validateRefreshToken";
import { registerUser, signupInit, verifyOtp, login, logout, me, refresh } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", asyncHandler(signupInit));
router.post("/verify-otp",validateSignupToken, asyncHandler(verifyOtp));
router.post("/register", validateSignupToken, asyncHandler(registerUser));
router.post("/login", asyncHandler(login));
router.post("/logout", requireAuth, asyncHandler(logout));
router.get("/me", requireAuth, asyncHandler(me));
router.post("/refresh", validateRefreshToken, asyncHandler(refresh));

export default router;
