// backend/src/models/College.js
import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: String,
  district: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [lon, lat]
  },
  courses: [String],
  facilities: { hostel: Boolean, library: Boolean, lab: Boolean },
  avg_cutoff: { type: Map, of: Number },
  contact: { phone: String }
}, { timestamps: true });

collegeSchema.index({ location: '2dsphere' });

export default mongoose.model('College', collegeSchema);
