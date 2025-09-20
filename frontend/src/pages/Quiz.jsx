import React from 'react';
import { submitQuiz } from '../api/quizService';
import { useNavigate } from 'react-router-dom';

export default function Quiz(){
  const nav = useNavigate();
  const [answers,setAnswers] = React.useState({ q1:'', q2:'' });
  const token = localStorage.getItem('token');

  async function handleSubmit(e){
    e.preventDefault();
    const payload = { location: { lat: 34.08, lon: 74.80 }, answers };
    const res = await submitQuiz(payload, token);
    // store results in local state or navigate to results page with data
    localStorage.setItem('lastResults', JSON.stringify(res.data));
    nav('/results');
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl">Quick Quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <p>Q1. Do you like experiments?</p>
          <select value={answers.q1} onChange={e=>setAnswers(a=>({...a,q1:e.target.value}))} className="p-2 border rounded">
            <option value="">Choose</option>
            <option value="a">Yes - experiments</option>
            <option value="b">No - I prefer reading</option>
            <option value="c">I like business</option>
            <option value="d">I like hands-on work</option>
          </select>
        </div>
        <div>
          <p>Q2. Do you prefer working with numbers or people?</p>
          <select value={answers.q2} onChange={e=>setAnswers(a=>({...a,q2:e.target.value}))} className="p-2 border rounded">
            <option value="">Choose</option>
            <option value="a">Numbers</option>
            <option value="b">People</option>
            <option value="c">Creative tasks</option>
            <option value="d">Technical hands-on</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white p-2 rounded">See Suggestions</button>
      </form>
    </div>
  );
}
