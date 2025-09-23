import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("api/onboarding", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });

        if (res.data.ok) setUser(res.data.data);
      } catch (err) {
        console.error("Fetch profile error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate("/onboarding"); // Or create an edit profile page
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Skeleton */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-6 animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
          
          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 h-64 animate-pulse">
                <div className="h-32 bg-gray-300 rounded-full w-32 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 h-64 animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-12 max-w-2xl mx-auto">
              <div className="text-6xl mb-4">😔</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Not Found</h2>
              <p className="text-gray-600 mb-6">
                We couldn't find your profile data. Please complete your onboarding process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate("/onboarding")}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300"
                >
                  📝 Complete Onboarding
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300"
                >
                  🔄 Try Again
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden mb-6"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div>
                <h1 className="text-4xl font-bold mb-2">👤 {user.name}'s Profile</h1>
                <p className="text-blue-100 text-lg">Your personalized career and education dashboard</p>
              </div>
              
              <div className="flex space-x-3 mt-4 lg:mt-0">
                <button
                  onClick={handleEditProfile}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  ✏️ Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  🚪 Logout
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 mt-6">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                🎓 {user.stream || "No Stream"}
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                📍 {user.location?.state || "Unknown Location"}
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                🎯 Class {user.classCompleted || "N/A"} Completed
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                💡 {user.skills?.length || 0} Skills
              </span>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-2 mb-6 flex overflow-x-auto">
          {["overview", "academic", "skills", "aspirations", "personality"].map((tab) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 text-center sticky top-6"
            >
              {/* Profile Avatar */}
              <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-white font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 mb-2">{user.name}</h2>
              <p className="text-gray-600 mb-4">{user.stream} Student</p>
              
              {/* Quick Info */}
              <div className="space-y-3 text-left">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">🎂</span>
                  <span>Age: {user.age || "N/A"}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">👤</span>
                  <span>Gender: {user.gender || "N/A"}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">📚</span>
                  <span>Class: {user.classCompleted || "N/A"}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">🏫</span>
                  <span>Board: {user.board || "N/A"}</span>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Profile Completion</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Basic Info */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">📋</span> Basic Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem label="Full Name" value={user.name} icon="👤" />
                    <InfoItem label="Age" value={user.age} icon="🎂" />
                    <InfoItem label="Gender" value={user.gender} icon="🚻" />
                    <InfoItem label="Class Completed" value={user.classCompleted} icon="📚" />
                    <InfoItem label="Educational Board" value={user.board} icon="🏫" />
                    <InfoItem label="Stream" value={user.stream} icon="🎓" />
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">📍</span> Location
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InfoItem label="State" value={user.location?.state} icon="🏛️" />
                    <InfoItem label="District" value={user.location?.district} icon="🏘️" />
                    <InfoItem label="Pincode" value={user.location?.pincode} icon="📮" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Academic Tab */}
            {activeTab === "academic" && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">📊</span> Academic Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Subjects</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.subjects?.map((subject, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {subject}
                          </span>
                        )) || <span className="text-gray-500">No subjects added</span>}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Study Preferences</h3>
                      <InfoItem label="Learning Style" value={user.learningStyle} icon="🧠" />
                      <InfoItem label="Preferred Study Mode" value={user.preferredStudyMode} icon="💻" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Skills & Interests Tab */}
            {activeTab === "skills" && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">💡</span> Skills & Interests
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.skills?.map((skill, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        )) || <span className="text-gray-500">No skills added</span>}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.interests?.map((interest, index) => (
                          <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                            {interest}
                          </span>
                        )) || <span className="text-gray-500">No interests added</span>}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Extracurricular Activities</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.extracurriculars?.map((activity, index) => (
                          <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                            {activity}
                          </span>
                        )) || <span className="text-gray-500">No activities added</span>}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Future Goal</h3>
                      <p className="bg-yellow-50 border-l-4 border-yellow-500 pl-4 py-2 rounded text-gray-700">
                        {user.futureGoal || "Not specified yet"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Aspirations Tab */}
            {activeTab === "aspirations" && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">🎯</span> Career Aspirations
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Dream Colleges</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.dreamColleges?.map((college, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {college}
                          </span>
                        )) || <span className="text-gray-500">No dream colleges specified</span>}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Exam Preferences</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.examPreferences?.map((exam, index) => (
                          <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                            {exam}
                          </span>
                        )) || <span className="text-gray-500">No exam preferences specified</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Personality Tab */}
            {activeTab === "personality" && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">🧠</span> Personality Traits
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {user.personalityTraits?.map((trait, index) => (
                      <span key={index} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {trait}
                      </span>
                    )) || <span className="text-gray-500">No personality traits specified</span>}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Info Item Component
const InfoItem = ({ label, value, icon }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100">
    <div className="flex items-center">
      <span className="text-lg mr-3">{icon}</span>
      <span className="font-medium text-gray-700">{label}:</span>
    </div>
    <span className={`font-semibold ${value ? 'text-gray-900' : 'text-gray-400'}`}>
      {value || "Not specified"}
    </span>
  </div>
);

export default Profile;
