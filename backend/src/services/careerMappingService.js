// backend/src/services/careerMappingService.js
import Onboarding from "../models/Onboarding.js";

import { callGeminiRaw } from "../lib/gemini.js";
/**
 * Try robust JSON parse — tries full text then extracts first {...} block.
 */
function safeParseJSON(text) {
  if (!text) return null;
  try { return JSON.parse(text); } catch (e) {}
  const m = text.match(/(\{[\s\S]*\})/);
  if (m) {
    try { return JSON.parse(m[1]); } catch (e) {}
  }
  return null;
}

/**
 * A conservative fallback mapping (if LLM fails).
 * Keep this simple but useful.
 */
function fallbackMapping(course) {
  const map = {
    "B.Sc": {
      industries: ["IT/Data", "Pharma", "Research", "Education"],
      govtExams: ["CSIR-NET", "State PSC"],
      jobs: ["Data Analyst", "Lab Technician", "Research Assistant"],
      higherEducation: ["M.Sc.", "MCA", "M.Tech", "PhD"],
      entrepreneurship: ["Small-scale lab", "EdTech tutoring"]
    },
    "B.Com": {
      industries: ["Banking", "Accounting", "Finance", "Insurance"],
      govtExams: ["Bank PO", "SSC", "State PSC"],
      jobs: ["Accountant", "Financial Analyst", "Tax Consultant"],
      higherEducation: ["M.Com", "MBA", "CFA"],
      entrepreneurship: ["Accounting firm", "Business services"]
    },
    "B.A": {
      industries: ["Public Sector", "Education", "Media"],
      govtExams: ["State PSC", "UPSC eligibility"],
      jobs: ["Content Writer", "Teacher", "Social Worker"],
      higherEducation: ["M.A", "Law (LLB)", "MBA (specialisations)"],
      entrepreneurship: ["Content studio", "NGO / Social enterprise"]
    },
    "B.Tech": {
      industries: ["Software", "Manufacturing", "Core Engineering", "R&D"],
      govtExams: ["GATE", "PSU exams"],
      jobs: ["Software Engineer", "Design Engineer", "Systems Engineer"],
      higherEducation: ["M.Tech", "MBA", "MS Abroad"],
      entrepreneurship: ["Product startup", "Hardware/IoT"]
    }
  };
  // return if exists else generic suggestion
  return map[course] || {
    industries: ["Private sector", "Public sector"],
    govtExams: ["State exams"],
    jobs: ["Graduate roles"],
    higherEducation: ["PG courses"],
    entrepreneurship: ["Small business"]
  };
}

/**
 * Build a strict prompt (system + user)
 * We request JSON only using the schema below.
 */
function buildPrompt(profile, course) {
  const system = `
You are an expert Indian career counselor. Return only valid JSON (no explanation).
Schema:
{
 "summary": "<short 1-2 sentence summary>",
 "industries": ["..."],
 "govtExams": ["..."],
 "jobs": [{"title":"...","why":"..."}],
 "higherEducation": ["..."],
 "entrepreneurship": ["..."],
 "confidence_score": 0.0-1.0
}
Reasons should be <= 20 words each. Prioritize government colleges and local options when relevant.
`;

  const user = `Student profile: ${JSON.stringify(profile, null, 2)}
Course to map: "${course}"
Please produce JSON per schema.`;

  return { system, user };
}

/**
 * Main exported function:
 * - tries to read cached mapping from Onboarding.aiCareerMapping[course]
 * - if absent or forceRefresh, calls Gemini, parses, saves to onboarding.aiCareerMapping[course]
 */
export async function generateCareerMapping(userId, course, { forceRefresh = false } = {}) {
  const onboarding = await Onboarding.findOne({ userId });
  if (!onboarding) throw new Error("Onboarding not found");

  onboarding.aiCareerMapping = onboarding.aiCareerMapping || {};

  // use cached if exists and not forceRefresh
  if (!forceRefresh && onboarding.aiCareerMapping[course]) {
    return { cached: true, mapping: onboarding.aiCareerMapping[course] };
  }

  // Build prompt content (profile subset)
  const profile = {
    classCompleted: onboarding.classCompleted,
    subjects: onboarding.subjects,
    quizAnswers: onboarding.quizAnswers || onboarding.aptitudeResponses || {},
    interests: onboarding.interests,
    skills: onboarding.skills,
    futureGoal: onboarding.futureGoal,
    location: onboarding.location,
    examPreferences: onboarding.examPreferences
  };

  const { system, user } = buildPrompt(profile, course);

  // Call Gemini (with retry)
  let rawText = null;
  let parsed = null;
  try {
    const resp = await callGeminiRaw(user, { system, temperature: 0.2, maxOutputTokens: 700 });
    rawText = resp.rawText;
    parsed = safeParseJSON(rawText);
    if (!parsed) {
      // retry with a stricter instruction
      const retryUser = `Previous response wasn't valid JSON. Return ONLY valid JSON following the schema exactly. Student profile: ${JSON.stringify(profile)} Course: ${course}`;
      const resp2 = await callGeminiRaw(retryUser, { system, temperature: 0.0, maxOutputTokens: 700 });
      rawText = resp2.rawText;
      parsed = safeParseJSON(rawText);
    }
  } catch (err) {
    console.error("LLM call failed:", err.message);
  }

  // If parsing failed, use fallback
  if (!parsed) {
    parsed = {
      summary: "Fallback mapping provided (LLM failed).",
      ...fallbackMapping(course),
      jobs: (fallbackMapping(course).jobs || []).map(j => ({ title: j, why: "Common job for this course" })),
      confidence_score: 0.25
    };
    rawText = rawText || JSON.stringify(parsed);
  } else {
    // normalize jobs array to objects with title and why
    if (Array.isArray(parsed.jobs)) {
      parsed.jobs = parsed.jobs.map(j => (typeof j === "string" ? { title: j, why: "" } : j));
    }
    parsed.confidence_score = parsed.confidence_score ?? parsed.confidence ?? 0.8;
  }

  // Save into onboarding.aiCareerMapping[course]
  onboarding.aiCareerMapping[course] = {
    generatedAt: new Date(),
    rawText,
    structured: parsed
  };

  await onboarding.save();

  return { cached: false, mapping: onboarding.aiCareerMapping[course] };
}
