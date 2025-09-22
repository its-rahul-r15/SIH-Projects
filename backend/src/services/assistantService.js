import { callGemini } from "../lib/gemini.js";
import mongoose from 'mongoose';
import User from '../models/User.js';
import Onboarding from '../models/Onboarding.js';
import ChatMessage from '../models/ChatMessage.js';

function redactProfile(user, onboarding) {
  return {
    name: user?.name || 'Student',
    classCompleted: onboarding?.classCompleted,
    stream: onboarding?.stream,
    subjects: onboarding?.subjects || [],
    interests: onboarding?.interests || [],
    skills: onboarding?.skills || [],
    futureGoal: onboarding?.futureGoal || '',
    location: onboarding?.location || {},
    examPreferences: onboarding?.examPreferences || []
  };
}

export async function sendAssistantMessage(userId, userMessage) {
  if (!userId) throw new Error('sendAssistantMessage: missing userId');

  // sanitize message
  userMessage = (userMessage || '').toString().trim();
  if (!userMessage) throw new Error('sendAssistantMessage: empty message');
  if (userMessage.length > 5000) userMessage = userMessage.slice(0, 5000);

  const uid = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId;

  // 1) load profile & onboarding
  let user = null, onboarding = null;
  try {
    [user, onboarding] = await Promise.all([
      User.findById(uid).lean().catch(()=>null),
      Onboarding.findOne({ userId: uid }).lean().catch(()=>null)
    ]);
  } catch (err) {
    console.error('DB read error (user/onboarding):', err);
  }

  const profile = redactProfile(user, onboarding);

  // 2) load recent conversation safely
  let historyMessages = [];
  try {
    historyMessages = await ChatMessage.find({ userId: uid })
      .sort({ createdAt: -1 })
      .limit(12)
      .lean()
      .catch(()=>[]);
  } catch (err) {
    console.error('DB read error (historyMessages):', err);
  }

  const convo = (historyMessages || [])
    .filter(m => m.createdAt && !isNaN(new Date(m.createdAt)))
    .slice().reverse()
    .map(m => ({
      role: m.role,
      text: typeof m.text === 'string' ? (m.text.length > 1000 ? m.text.slice(0,1000)+'...' : m.text) : '',
      createdAt: new Date(m.createdAt).toISOString()
    }));

  // 3) build prompt
  const systemInstruction = `
You are a friendly, helpful Indian career & scholarship assistant for students.
Be concise and practical. Use available profile to personalize answers.
`;

  const prompt = `
SYSTEM:
${systemInstruction}

PROFILE:
${JSON.stringify(profile, null, 2)}

RECENT CONVERSATION (most recent first):
${JSON.stringify(convo, null, 2)}

USER QUESTION:
${userMessage}

Answer succinctly, provide next concrete steps, and give 1-3 recommendations.
`;

  // 4) save user message
  try {
    await ChatMessage.create({ userId: uid, role: 'user', text: userMessage });
  } catch (err) {
    console.error('Failed to save user message:', err);
  }

  // 5) call Gemini
  let aiText = '';
  try {
    aiText = await callGemini(prompt);
    if (!aiText || typeof aiText !== 'string') aiText = String(aiText || 'Sorry, I could not generate an answer.');
  } catch (err) {
    console.error('Assistant LLM error', err);
    aiText = "Sorry — I'm facing issues contacting the AI assistant right now. Please try again later.";
  }

  // 6) save assistant reply
  try {
    await ChatMessage.create({ userId: uid, role: 'assistant', text: aiText });
  } catch (err) {
    console.error('Failed to save assistant reply:', err);
  }

  return aiText;
}
