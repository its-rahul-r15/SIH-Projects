// services/gemini.js
import axios from "axios";

const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL = "gemini-1.5-flash";
const API_KEY = "";


export async function callGemini(prompt) {
  try {
    const response = await axios.post(
      `${GEMINI_ENDPOINT}/${MODEL}:generateContent?key=${API_KEY}`,
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
  } catch (error) {
    console.error("❌ Gemini API error:", error.response?.data || error.message);
    throw new Error("Gemini API call failed");
  }
}

// 🔹 Raw version (agar tumhe poora response chahiye ho to)
export async function callGeminiRaw(prompt) {
  const response = await axios.post(
    `${GEMINI_ENDPOINT}/${MODEL}:generateContent?key=${API_KEY}`,
    {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data; // pura JSON return karega
}
