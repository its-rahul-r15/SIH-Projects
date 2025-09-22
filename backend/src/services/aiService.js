// services/aiService.js
import { callGemini } from "../lib/gemini.js";

/**
 * Safely parse AI-generated JSON.
 */
function safeParseJSON(aiText) {
  try {
    const cleanedText = aiText.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (err) {
    console.error("❌ Failed to parse AI JSON:", aiText);
    return { error: "AI returned invalid JSON" };
  }
}

export async function getCollegeRecommendations(studentData) {
  const prompt = `
You are a personalized career and college guidance AI for Smart India Hackathon (SIH). 
Use the following student data to provide detailed suggestions.

Student Data:
${JSON.stringify(studentData, null, 2)}

Return ONLY a JSON object with this structure:

{
  "ranked_streams": [
    {"stream": "Science", "score": 0.95, "reason": "Matches interests and marks"},
    {"stream": "Commerce", "score": 0.85, "reason": "Good fit for quantitative skills"}
  ],
  "suggested_subjects": [
    {"stream": "Science", "subjects": ["Physics", "Chemistry", "Maths"]},
    {"stream": "Commerce", "subjects": ["Accountancy", "Business Studies", "Economics"]}
  ],
  "suggested_courses": [
    {"stream": "Science", "courses": ["B.Sc", "B.Tech"], "reason": "High employability"},
    {"stream": "Commerce", "courses": ["B.Com", "BBA"], "reason": "Relevant for finance jobs"}
  ],
  "career_paths": [
    {"stream": "Science", "careers": ["Research Scientist", "Software Engineer", "Engineer"]},
    {"stream": "Commerce", "careers": ["Accountant", "Financial Analyst", "Manager"]}
  ],
  "college_recommendations": [
    {
      "priority": "High",
      "college": "XYZ Institute",
      "reason": "Good match for student stream and location"
    },
    {
      "priority": "Medium",
      "college": "ABC University",
      "reason": "Alternative option with decent placements"
    },
    {
      "priority": "Low",
      "college": "DEF College",
      "reason": "Backup choice"
    }
  ],
  "scholarship_recommendations": [
  {
    "name": "Merit Scholarship",
    "amount": "50,000 INR per year",
    "eligibility": "Top 10% marks in previous exams, Science stream",
    "reason": "Reward for academic excellence"
  },
  {
    "name": "Need-Based Scholarship",
    "amount": "30,000 INR per year",
    "eligibility": "Low-income family, any stream",
    "reason": "Financial support for deserving students"
  },
  {
    "name": "Special Talent Scholarship",
    "amount": "25,000 INR per year",
    "eligibility": "Students with sports or arts achievements",
    "reason": "Encourages extracurricular excellence"
  }
]

}

Be concise, precise, and return valid JSON only (no backticks or extra text).
`;

  try {
    const aiText = await callGemini(prompt);
    return safeParseJSON(aiText);
  } catch (err) {
    console.error("❌ AI service error:", err.message);
    return { error: "Failed to generate college recommendations" };
  }
}

export async function generatePlanForOnboarding(studentData) {
  return await getCollegeRecommendations(studentData);
}
