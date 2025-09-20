import Onboarding from "../models/Onboarding.js";
import User from "../models/User.js";

export const saveOnboarding = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ ok:false, msg:'Unauthorized' });

    const data = req.body;

    const onboarding = await Onboarding.findOneAndUpdate(
      { userId },
      { userId, ...data },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // mark user as onboarding completed
    await User.findByIdAndUpdate(userId, { onboardingCompleted: true });

    res.json({ ok: true, data: onboarding });
  } catch (err) {
    console.error("Onboarding save error:", err);
    res.status(500).json({ ok: false, msg: "Failed to save onboarding" });
  }
};

export const getOnboarding = async (req, res) => {
  try {
    const userId = req.userId;
    const onboarding = await Onboarding.findOne({ userId });
    if (!onboarding) return res.status(404).json({ ok:false, msg:'No onboarding data' });
    res.json({ ok:true, data: onboarding });
  } catch (err) {
    console.error("Onboarding fetch error:", err);
    res.status(500).json({ ok:false, msg: "Failed to fetch onboarding" });
  }
};
