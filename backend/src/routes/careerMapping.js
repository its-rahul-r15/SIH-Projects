// backend/src/routes/careerMapping.js
import express from "express";
import { getCareerMapping } from "../controllers/careerMappingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:course", authMiddleware, getCareerMapping);
// optional: regenerate
router.post("/:course/regenerate", authMiddleware, async (req, res) => {
  try {
    const { course } = req.params;
    const { generateCareerMapping } = await import("../services/careerMappingService.js");
    const out = await generateCareerMapping(req.userId, course, { forceRefresh: true });
    res.json({ ok: true, data: out.mapping });
  } catch (e) { res.status(500).json({ ok:false, msg: e.message }) }
});

export default router;
