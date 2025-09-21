// backend/src/controllers/careerMappingController.js
import { generateCareerMapping } from "../services/careerMappingService.js";

export const getCareerMapping = async (req, res) => {
  try {
    const userId = req.userId;
    const { course } = req.params;
    const force = req.query.force === "1";

    if (!course) return res.status(400).json({ ok: false, msg: "Course required" });

    const result = await generateCareerMapping(userId, course, { forceRefresh: force });
    return res.json({ ok: true, data: result.mapping, cached: result.cached });
  } catch (err) {
    console.error("getCareerMapping error:", err);
    return res.status(500).json({ ok: false, msg: err.message || "Server error" });
  }
};
