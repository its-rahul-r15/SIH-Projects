import { sendAssistantMessage } from '../services/assistantService.js';
import ChatMessage from '../models/ChatMessage.js';
import mongoose from 'mongoose';

export const postChat = async (req, res) => {
  try {
    const userId = req.userId || (req.user && req.user.id);
    if (!userId) return res.status(401).json({ ok: false, msg: 'Unauthorized' });

    // Convert to ObjectId if needed
    const uid = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId;

    let { message } = req.body;
    if (!message || !message.toString().trim()) {
      return res.status(400).json({ ok:false, msg:'message required' });
    }

    // Sanitize / trim / limit
    message = message.toString().trim();
    if (message.length > 5000) return res.status(400).json({ ok:false, msg:'message too long' });

    const reply = await sendAssistantMessage(uid, message);
    return res.json({ ok:true, data: { reply }});
  } catch (err) {
    console.error('assistant.postChat error', err);
    return res.status(500).json({ ok:false, msg:'Assistant error' });
  }
};

export const getHistory = async (req, res) => {
  try {
    const userId = req.userId || (req.user && req.user.id);
    if (!userId) return res.status(401).json({ ok:false, msg: 'Unauthorized' });

    // Convert to ObjectId if needed
    const uid = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId;

    const msgsRaw = await ChatMessage.find({ userId: uid }).sort({ createdAt: 1 }).lean();
    const msgs = (msgsRaw || [])
      .filter(m => m.createdAt && !isNaN(new Date(m.createdAt)))
      .map(m => ({
        ...m,
        createdAt: new Date(m.createdAt).toISOString()
      }));

    return res.json({ ok:true, data: msgs });
  } catch (err) {
    console.error('assistant.getHistory error', err);
    return res.status(500).json({ ok:false, msg: 'Failed to fetch history' });
  }
};
