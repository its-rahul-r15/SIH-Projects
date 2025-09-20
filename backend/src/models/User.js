// backend/src/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
  passwordHash: { type: String },
  role: { type: String, enum: ['student','admin','counselor'], default: 'student' },

  // existing onboarding fields...
  classCompleted: { type: String, enum: ['10','12','grad','other'], default: '12' },
  board: { type: String },
  stream: { type: String, enum: ['Science','Commerce','Arts','Vocational','Other'], default: 'Other' },
  subjects: [String],
  gender: { type: String, enum: ['Male','Female','Other'] },
  age: { type: Number },
  location: {
    state: { type: String },
    district: { type: String },
    pincode: { type: String }
  },
  interests: [String],
  skills: [String],
  extracurriculars: [String],
  preferredStudyMode: { type: String, enum: ['Online','Offline','Hybrid'] },
  learningStyle: { type: String, enum: ['Visual','Auditory','Kinesthetic','Reading/Writing'] },
  strengths: [String],
  weaknesses: [String],
  futureGoal: { type: String },
  dreamColleges: [String],
  examPreferences: [String],

  // NEW: onboarding completion flag
  onboardingCompleted: { type: Boolean, default: false },

  consentNotifications: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
