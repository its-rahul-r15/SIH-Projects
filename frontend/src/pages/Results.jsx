import React, { useEffect, useState } from "react";
import axios from "axios";

const Result = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOnboarding = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/onboarding", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });

        if (res.data.ok) setData(res.data.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOnboarding();
  }, []);

  if (loading)
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  if (!data)
    return (
      <div className="text-center mt-20 text-red-500 font-semibold">
        No data found
      </div>
    );

  const onboarding = data;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Welcome */}
      <div className="bg-indigo-50 rounded-lg p-6 shadow">
        <h1 className="text-3xl font-bold text-indigo-700">
          Welcome, {onboarding.name}!
        </h1>
        <p className="mt-2 text-gray-700">Here’s your onboarding summary.</p>
      </div>

      {/* Basic Info */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Basic Info</h2>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-semibold">Age:</span> {onboarding.age}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {onboarding.gender}
          </p>
          <p>
            <span className="font-semibold">Stream:</span> {onboarding.stream}
          </p>
          <p>
            <span className="font-semibold">Subjects:</span>{" "}
            {onboarding.subjects?.join(", ")}
          </p>
          <p>
            <span className="font-semibold">Class Completed:</span>{" "}
            {onboarding.classCompleted}
          </p>
          <p>
            <span className="font-semibold">Board:</span> {onboarding.board}
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Location</h2>
        <p>
          <span className="font-semibold">State:</span> {onboarding.location?.state || "N/A"}
        </p>
        <p>
          <span className="font-semibold">District:</span> {onboarding.location?.district || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Pincode:</span> {onboarding.location?.pincode || "N/A"}
        </p>
      </div>

      {/* Skills & Interests */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Skills & Interests</h2>
        <p>
          <span className="font-semibold">Skills:</span>{" "}
          {onboarding.skills?.join(", ") || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Extracurriculars:</span>{" "}
          {onboarding.extracurriculars?.join(", ") || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Interests:</span>{" "}
          {onboarding.interests?.join(", ") || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Future Goal:</span>{" "}
          {onboarding.futureGoal || "N/A"}
        </p>
      </div>

      {/* AI Suggested Streams & Careers */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">AI Suggestions</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Suggested Streams:</h3>
            <ul className="list-disc list-inside">
              {onboarding.suggestedStreams?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Suggested Careers:</h3>
            <ul className="list-disc list-inside">
              {onboarding.suggestedCareers?.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* College Recommendations */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">College Recommendations</h2>
        <div className="space-y-4">
          {onboarding.collegeRecommendations?.map((rec, idx) => (
            <div
              key={idx}
              className={`p-4 rounded border-l-4 ${
                rec.priority === "High"
                  ? "border-green-500 bg-green-50"
                  : rec.priority === "Medium"
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-gray-400 bg-gray-50"
              }`}
            >
              <p className="font-semibold">{rec.college}</p>
              <p>
                <span className="font-semibold">Priority:</span> {rec.priority}
              </p>
              <p>
                <span className="font-semibold">Reason:</span> {rec.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Optional: Raw AI Result */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Raw AI Data</h2>
        <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
          {JSON.stringify(onboarding, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Result;
