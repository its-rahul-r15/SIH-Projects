import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const nav = useNavigate();

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    classCompleted: "12",
    board: "",
    stream: "Other",
    subjects: [],
    skills: [],
    learningStyle: "Visual",
    preferredStudyMode: "Online",
    dreamColleges: [],
    examPreferences: [],
    quizAnswers: {},
    location: {
      state: "",
      district: "",
      pincode: "",
    },
  });

  useEffect(() => {
    setForm((s) => ({ ...s, quizAnswers: {} }));
  }, [form.classCompleted]);

  function update(key, value) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function updateLocation(key, value) {
    setForm((s) => ({
      ...s,
      location: { ...s.location, [key]: value },
    }));
  }

  function toggleArrayField(field, value) {
    setForm((s) => {
      const arr = s[field] || [];
      const newArr = arr.includes(value)
        ? arr.filter((x) => x !== value)
        : [...arr, value];
      return { ...s, [field]: newArr };
    });
  }

  function updateQuizAnswer(qkey, value) {
    setForm((s) => ({
      ...s,
      quizAnswers: { ...(s.quizAnswers || {}), [qkey]: value },
    }));
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const payload = { ...form };
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login again.");
      const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });
      const res = await API.post("https://sih-projects-delta.vercel.app/api/onboarding", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.ok) {
        nav("/dashboard/colleges", { replace: true });
      } else {
        setError("Failed to save onboarding: " + (res.data?.msg || "unknown"));
      }
    } catch (err) {
      setError(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Onboarding Survey
        </h2>

        {/* Step Indicators */}
        <div className="flex justify-between mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition ${
                step === s
                  ? "bg-white text-indigo-700"
                  : "bg-indigo-300 text-white"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        <form onSubmit={submit}>
          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                value={form.age}
                onChange={(e) => update("age", e.target.value)}
                placeholder="Age"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <select
                value={form.gender}
                onChange={(e) => update("gender", e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setStep(2)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Education & Location */}
          {step === 2 && (
            <div className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
              <label className="block font-medium">Class Completed</label>
              <select
                value={form.classCompleted}
                onChange={(e) => update("classCompleted", e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="10">10th</option>
                <option value="12">12th</option>
                <option value="grad">Graduation</option>
                <option value="other">Other</option>
              </select>

              <input
                value={form.board}
                onChange={(e) => update("board", e.target.value)}
                placeholder="Board (CBSE / ICSE / State)"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <label className="block font-medium mt-3">
                Stream (if 12/grad)
              </label>
              <select
                value={form.stream}
                onChange={(e) => update("stream", e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Science</option>
                <option>Commerce</option>
                <option>Arts</option>
                <option>Vocational</option>
                <option>Other</option>
              </select>

              <input
                value={form.subjects.join(", ")}
                onChange={(e) =>
                  update(
                    "subjects",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
                placeholder="Subjects (comma separated)"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {/* Location Fields */}
              <input
                value={form.location.state}
                onChange={(e) => updateLocation("state", e.target.value)}
                placeholder="State"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                value={form.location.district}
                onChange={(e) => updateLocation("district", e.target.value)}
                placeholder="District"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                value={form.location.pincode}
                onChange={(e) => updateLocation("pincode", e.target.value)}
                placeholder="Pincode"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setStep(3)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Quiz */}
          {step === 3 && (
            <div className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
              {form.classCompleted === "10" ? (
                <>
                  <p className="font-semibold text-indigo-700">
                    Quick aptitude (Class 10)
                  </p>
                  <label>Do you enjoy experiments / labs?</label>
                  <select
                    value={form.quizAnswers.i1 || ""}
                    onChange={(e) => updateQuizAnswer("i1", e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select</option>
                    <option value="a">Yes</option>
                    <option value="b">Sometimes</option>
                    <option value="c">No</option>
                  </select>
                </>
              ) : (
                <>
                  <p className="font-semibold text-indigo-700">
                    Focused questions (Class 12)
                  </p>
                  <input
                    type="number"
                    placeholder="Marks / %"
                    value={form.quizAnswers.marks || ""}
                    onChange={(e) => updateQuizAnswer("marks", e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Favorite subjects (comma separated)"
                    value={
                      form.quizAnswers.favoriteSubjects?.join?.(", ") || ""
                    }
                    onChange={(e) =>
                      updateQuizAnswer(
                        "favoriteSubjects",
                        e.target.value.split(",").map((s) => s.trim())
                      )
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </>
              )}

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setStep(4)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Skills / Preferences */}
          {step === 4 && (
            <div className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
              <input
                placeholder="Skills (comma separated)"
                value={form.skills.join(", ")}
                onChange={(e) =>
                  update("skills", e.target.value.split(",").map((s) => s.trim()))
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select
                value={form.learningStyle}
                onChange={(e) => update("learningStyle", e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Visual</option>
                <option>Auditory</option>
                <option>Kinesthetic</option>
                <option>Reading/Writing</option>
              </select>
              <select
                value={form.preferredStudyMode}
                onChange={(e) => update("preferredStudyMode", e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Online</option>
                <option>Offline</option>
                <option>Hybrid</option>
              </select>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                  onClick={() => setStep(3)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setStep(5)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Dream Colleges / Exam Preferences */}
          {step === 5 && (
            <div className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
              <input
                placeholder="Dream Colleges"
                value={form.dreamColleges.join(", ")}
                onChange={(e) =>
                  update(
                    "dreamColleges",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                placeholder="Exam Preferences"
                value={form.examPreferences.join(", ")}
                onChange={(e) =>
                  update(
                    "examPreferences",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                  onClick={() => setStep(4)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  {saving ? "Saving..." : "Finish & Save"}
                </button>
              </div>

              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
