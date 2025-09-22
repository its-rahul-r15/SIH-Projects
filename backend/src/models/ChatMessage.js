// backend/src/models/ChatMessage.js
import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
  text: { type: String },
  meta: { type: mongoose.Schema.Types.Mixed } // store any parsed metadata if needed
}, { timestamps: true });

export default mongoose.model('ChatMessage', ChatMessageSchema);
