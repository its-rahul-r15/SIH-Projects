import express from "express";
import { saveOnboarding} from "../controllers/onboardingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

// Save or update onboarding
router.post("/", authMiddleware, saveOnboarding);



export default router;
