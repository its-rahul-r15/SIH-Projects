import Onboarding from "../models/Onboarding.js";
import User from "../models/User.js";
import { generatePlanForOnboarding } from "../services/aiService.js";

export const saveOnboarding = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId)
      return res.status(401).json({ ok: false, msg: "Unauthorized" });

    const payload = req.body || {};

    // 1️⃣ Save or update onboarding data from frontend
    let onboarding = await Onboarding.findOneAndUpdate(
      { userId },
      { userId, ...payload },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // 2️⃣ Mark user as onboardingCompleted
    await User.findByIdAndUpdate(userId, { onboardingCompleted: true });

    // 3️⃣ Generate AI recommendations
    const aiResult = await generatePlanForOnboarding(onboarding);

    // 4️⃣ Map AI fields to schema
    const suggestedStreams = aiResult.ranked_streams?.map(s => s.stream) || [];
    const suggestedCareers =
      aiResult.career_paths?.flatMap(c => c.careers) || [];
    const collegeRecommendations = aiResult.college_recommendations || [];

    // 5️⃣ Update onboarding doc with AI suggestions
    onboarding = await Onboarding.findOneAndUpdate(
      { userId },
      {
        $set: {
          suggestedStreams,
          suggestedCareers,
          collegeRecommendations, // store detailed AI suggestions
        },
      },
      { new: true }
    );

    // 6️⃣ Return onboarding + AI result to frontend
    return res.json({ ok: true, data: { onboarding, aiResult } });
  } catch (err) {
    console.error("Onboarding save error:", err);
    return res
      .status(500)
      .json({ ok: false, msg: "Failed to save onboarding" });
  }
};

export const getOnboarding = async (req, res) => {
  try {
    const onboarding = await Onboarding.findOne({ userId: req.userId });
    console.log('JWT userId:', req.userId);

console.log('Found onboarding:', onboarding);

    if (!onboarding)
      return res.status(404).json({ ok: false, msg: "No onboarding found" });
    res.json({ ok: true, data: onboarding });
  } catch (err) {
    console.error("Onboarding fetch error:", err);
    res.status(500).json({ ok: false, msg: "Server error" });
  }
};
