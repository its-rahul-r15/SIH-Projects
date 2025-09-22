import React, { useEffect, useState } from "react";
import axios from "axios";

const Result = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

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

  // Loading Skeleton
  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-6 animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          
          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Data Found</h2>
            <p className="text-gray-600">Please complete your onboarding process first.</p>
          </div>
        </div>
      </div>
    );

  const onboarding = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2">Welcome back, {onboarding.name}! 👋</h1>
            <p className="text-blue-100 text-lg">Here's your personalized career dashboard</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                🎓 {onboarding.stream} Student
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                📍 {onboarding.location?.state || "India"}
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                🎯 Class {onboarding.classCompleted} Completed
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-2 mb-8 flex overflow-x-auto">
          {["overview", "skills", "careers", "colleges", "details"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === tab
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Basic Info Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">👤</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p><span className="font-semibold text-gray-600">Age:</span> {onboarding.age}</p>
                  <p><span className="font-semibold text-gray-600">Gender:</span> {onboarding.gender}</p>
                  <p><span className="font-semibold text-gray-600">Stream:</span> {onboarding.stream}</p>
                </div>
                <div className="space-y-2">
                  <p><span className="font-semibold text-gray-600">Board:</span> {onboarding.board}</p>
                  <p><span className="font-semibold text-gray-600">Class:</span> {onboarding.classCompleted}</p>
                  <p><span className="font-semibold text-gray-600">Subjects:</span> {onboarding.subjects?.length}</p>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">📍</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Location</h2>
              </div>
              <div className="space-y-3">
                <p><span className="font-semibold text-gray-600">State:</span> {onboarding.location?.state || "N/A"}</p>
                <p><span className="font-semibold text-gray-600">District:</span> {onboarding.location?.district || "N/A"}</p>
                <p><span className="font-semibold text-gray-600">Pincode:</span> {onboarding.location?.pincode || "N/A"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Skills & Interests Tab */}
        {activeTab === "skills" && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">💡</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Skills & Interests</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {onboarding.skills?.map((skill, i) => (
                      <span key={i} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    )) || <span className="text-gray-500">No skills added</span>}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {onboarding.interests?.map((interest, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {interest}
                      </span>
                    )) || <span className="text-gray-500">No interests added</span>}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Extracurriculars</h3>
                  <div className="flex flex-wrap gap-2">
                    {onboarding.extracurriculars?.map((activity, i) => (
                      <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {activity}
                      </span>
                    )) || <span className="text-gray-500">No activities added</span>}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Future Goal</h3>
                  <p className="bg-yellow-50 border-l-4 border-yellow-500 pl-4 py-2 rounded">
                    {onboarding.futureGoal || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Suggestions Tab */}
        {activeTab === "careers" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Suggested Streams */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Suggested Streams</h2>
              </div>
              <div className="space-y-3">
                {onboarding.suggestedStreams?.map((stream, i) => (
                  <div key={i} className="flex items-center p-3 bg-indigo-50 rounded-lg">
                    <span className="text-lg mr-3">{(i + 1).toString().padStart(2, '0')}</span>
                    <span className="font-medium">{stream}</span>
                  </div>
                )) || <p className="text-gray-500">No stream suggestions available</p>}
              </div>
            </div>

            {/* Suggested Careers */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">💼</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Suggested Careers</h2>
              </div>
              <div className="space-y-3">
                {onboarding.suggestedCareers?.map((career, i) => (
                  <div key={i} className="flex items-center p-3 bg-teal-50 rounded-lg">
                    <span className="text-lg mr-3">{(i + 1).toString().padStart(2, '0')}</span>
                    <span className="font-medium">{career}</span>
                  </div>
                )) || <p className="text-gray-500">No career suggestions available</p>}
              </div>
            </div>
          </div>
        )}

        {/* College Recommendations Tab */}
        {activeTab === "colleges" && onboarding.collegeRecommendations && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">College Recommendations</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {onboarding.collegeRecommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border-l-4 shadow-lg transition-transform duration-300 hover:scale-105 ${
                    rec.priority === "High"
                      ? "border-green-500 bg-gradient-to-r from-green-50 to-emerald-50"
                      : rec.priority === "Medium"
                      ? "border-yellow-500 bg-gradient-to-r from-yellow-50 to-amber-50"
                      : "border-gray-400 bg-gradient-to-r from-gray-50 to-blue-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-gray-800">{rec.college}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      rec.priority === "High" 
                        ? "bg-green-500 text-white" 
                        : rec.priority === "Medium" 
                        ? "bg-yellow-500 text-white" 
                        : "bg-gray-500 text-white"
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{rec.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Raw Data Tab */}
        {activeTab === "details" && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Detailed Data</h2>
            </div>
            <div className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto">
              <pre className="text-sm">{JSON.stringify(onboarding, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;