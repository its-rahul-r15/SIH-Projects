import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const nav = useNavigate();

  const [step, setStep] = useState(1); // multi-step survey
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: 'Male',
    classCompleted: '12',
    board: 'State',
    stream: 'Other',
    subjects: [],
    state: '',
    district: '',
    pincode: '',
    interests: [],
    skills: [],
    extracurriculars: [],
    preferredStudyMode: 'Online',
    learningStyle: 'Visual',
    strengths: [],
    weaknesses: [],
    futureGoal: '',
    dreamColleges: [],
    examPreferences: []
  });

  function update(key, value) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function toggleArrayField(field, value) {
    setForm((s) => {
      const arr = s[field].includes(value)
        ? s[field].filter((x) => x !== value)
        : [...s[field], value];
      return { ...s, [field]: arr };
    });
  }

  async function submit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });
      await API.post('/api/onboarding', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
       navigate("/dashboard/colleges", { replace: true });
    } catch (err) {
      alert('Error saving onboarding');
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Onboarding Survey</h2>

      <form onSubmit={submit} className="space-y-4">
        {/* STEP 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-3">
            <input
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Full Name"
              className="w-full p-2 border rounded"
            />
            <input
              value={form.age}
              onChange={(e) => update('age', e.target.value)}
              placeholder="Age"
              className="w-full p-2 border rounded"
            />
            <select
              value={form.gender}
              onChange={(e) => update('gender', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <div className="flex justify-between">
              <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setStep(2)}>Next</button>
            </div>
          </div>
        )}

        {/* STEP 2: Academic Info */}
        {step === 2 && (
          <div className="space-y-3">
            <select
              value={form.classCompleted}
              onChange={(e) => update('classCompleted', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="10">10th</option>
              <option value="12">12th</option>
              <option value="grad">Graduation</option>
              <option value="other">Other</option>
            </select>

            <input
              value={form.board}
              onChange={(e) => update('board', e.target.value)}
              placeholder="Board (CBSE / ICSE / State)"
              className="w-full p-2 border rounded"
            />

            <select
              value={form.stream}
              onChange={(e) => update('stream', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option>Science</option>
              <option>Commerce</option>
              <option>Arts</option>
              <option>Vocational</option>
              <option>Other</option>
            </select>

            <input
              value={form.subjects.join(', ')}
              onChange={(e) => update('subjects', e.target.value.split(',').map(s => s.trim()))}
              placeholder="Subjects (comma separated)"
              className="w-full p-2 border rounded"
            />

            <div className="flex justify-between">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setStep(1)}>Back</button>
              <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setStep(3)}>Next</button>
            </div>
          </div>
        )}

        {/* STEP 3: Career Interests */}
        {step === 3 && (
          <div className="space-y-3">
            <p>Select your interests:</p>
            <div className="grid grid-cols-2 gap-2">
              {['Engineering', 'Medical', 'Banking', 'Law', 'Arts', 'Research'].map((opt) => (
                <label key={opt}>
                  <input type="checkbox" checked={form.interests.includes(opt)} onChange={() => toggleArrayField('interests', opt)} /> {opt}
                </label>
              ))}
            </div>

            <textarea
              value={form.futureGoal}
              onChange={(e) => update('futureGoal', e.target.value)}
              placeholder="What is your ultimate goal?"
              className="w-full p-2 border rounded"
            />

            <div className="flex justify-between">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setStep(2)}>Back</button>
              <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setStep(4)}>Next</button>
            </div>
          </div>
        )}

        {/* STEP 4: Skills & Preferences */}
        {step === 4 && (
          <div className="space-y-3">
            <input
              value={form.skills.join(', ')}
              onChange={(e) => update('skills', e.target.value.split(',').map(s => s.trim()))}
              placeholder="Your skills (comma separated)"
              className="w-full p-2 border rounded"
            />
            <select
              value={form.learningStyle}
              onChange={(e) => update('learningStyle', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option>Visual</option>
              <option>Auditory</option>
              <option>Kinesthetic</option>
              <option>Reading/Writing</option>
            </select>
            <select
              value={form.preferredStudyMode}
              onChange={(e) => update('preferredStudyMode', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option>Online</option>
              <option>Offline</option>
              <option>Hybrid</option>
            </select>

            <div className="flex justify-between">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setStep(3)}>Back</button>
              <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setStep(5)}>Next</button>
            </div>
          </div>
        )}

        {/* STEP 5: Final */}
        {step === 5 && (
          <div className="space-y-3">
            <input
              value={form.dreamColleges.join(', ')}
              onChange={(e) => update('dreamColleges', e.target.value.split(',').map(s => s.trim()))}
              placeholder="Dream Colleges (comma separated)"
              className="w-full p-2 border rounded"
            />
            <input
              value={form.examPreferences.join(', ')}
              onChange={(e) => update('examPreferences', e.target.value.split(',').map(s => s.trim()))}
              placeholder="Exam Preferences (JEE, NEET, CAT)"
              className="w-full p-2 border rounded"
            />

            <div className="flex justify-between">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setStep(4)}>Back</button>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Finish & Save</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
