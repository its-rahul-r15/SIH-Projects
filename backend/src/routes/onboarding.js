// backend/src/routes/onboarding.js
import express from "express";
import { saveOnboarding, getOnboarding } from "../controllers/onboardingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, saveOnboarding);
router.get("/", authMiddleware, getOnboarding);

export default router;
