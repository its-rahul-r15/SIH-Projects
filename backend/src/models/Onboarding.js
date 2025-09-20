import mongoose from "mongoose";

const OnboardingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // ek user ek hi onboarding karega
    },

    // 🔹 Basic Info
    name: { type: String, required: true, trim: true },
    age: { type: Number },
    gender: { type: String, enum: ["Male", "Female", "Other"] },

    // 🔹 Academic Info
    classCompleted: {
      type: String,
      enum: ["10", "12", "grad", "other"],
      default: "12",
    },
    board: { type: String },
    stream: {
      type: String,
      enum: ["Science", "Commerce", "Arts", "Vocational", "Other"],
      default: "Other",
    },
    subjects: [String],

    // 🔹 Location Info
    location: {
      state: { type: String },
      district: { type: String },
      pincode: { type: String },
    },

    // 🔹 Career Interests & Goals
    interests: [String], // ["Engineering", "Medical", "Law"]
    skills: [String], // ["Analytical", "Creative"]
    extracurriculars: [String], // ["Sports", "Debate", "Music"]
    futureGoal: { type: String }, // e.g. "IAS prep", "Software Engineer"

    // 🔹 Preferences
    preferredStudyMode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
    },
    learningStyle: {
      type: String,
      enum: ["Visual", "Auditory", "Kinesthetic", "Reading/Writing"],
    },

    // 🔹 Self-reflection
    strengths: [String],
    weaknesses: [String],

    // 🔹 Aspirations
    dreamColleges: [String],
    examPreferences: [String], // ["JEE", "NEET", "CAT"]

  },
  { timestamps: true }
);

export default mongoose.model("Onboarding", OnboardingSchema);
