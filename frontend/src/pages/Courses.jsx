import React from "react";
import { useNavigate } from "react-router-dom";

const COURSES = ["B.Sc", "B.Com", "B.A", "B.Tech", "BBA", "BCA"];

export default function Courses() {
  const nav = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Choose a course</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {COURSES.map((c) => (
          <div
            key={c}
            onClick={() => nav(`/dashboard/career/${encodeURIComponent(c)}`)}
            className="cursor-pointer p-6 rounded-lg shadow hover:shadow-lg transform hover:-translate-y-1 transition"
          >
            <h3 className="text-xl font-semibold">{c}</h3>
            <p className="text-sm text-gray-600 mt-2">Click to view career paths, exams, jobs & higher studies.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
