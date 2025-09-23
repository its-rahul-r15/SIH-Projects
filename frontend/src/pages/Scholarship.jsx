// src/pages/Scholarship.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Scholarship = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await axios.get("https://sih-projects-alwb.vercel.app/api/onboarding", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.ok && res.data.data) {
          setScholarships(res.data.data.scholarshipRecommendations || []);
        }
      } catch (err) {
        console.error("Error fetching scholarships:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  // Filter scholarships based on search and filter
  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.eligibility.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    if (filter === "high") return matchesSearch && scholarship.priority === "High";
    if (filter === "medium") return matchesSearch && scholarship.priority === "Medium";
    if (filter === "low") return matchesSearch && scholarship.priority === "Low";
    
    return matchesSearch;
  });

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Skeleton */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-6 animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          
          {/* Filter Skeleton */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-6 animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded w-24"></div>
              ))}
            </div>
          </div>
          
          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty State
  if (!scholarships.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-12 max-w-2xl mx-auto">
              <div className="text-6xl mb-4">🎓</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No Scholarships Found</h2>
              <p className="text-gray-600 mb-6">
                We couldn't find any scholarship recommendations for your profile. 
                Complete your profile to get personalized scholarship suggestions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300">
                  📝 Update Profile
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300">
                  🔍 Browse All Scholarships
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
          <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold mb-2">💰 Scholarship Opportunities</h1>
            <p className="text-blue-100 text-lg">
              Personalized scholarship recommendations based on your profile
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-semibold">{scholarships.length}</span> Scholarships Found
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                💰 Financial Aid
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                🎓 Education Support
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Search scholarships by name or eligibility..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
              {[
                { key: "all", label: "All", emoji: "📚" },
                { key: "high", label: "High Priority", emoji: "🔥" },
                { key: "medium", label: "Medium", emoji: "⚡" },
                { key: "low", label: "Low", emoji: "💡" }
              ].map(({ key, label, emoji }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    filter === key
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {emoji} {label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center text-gray-600">
            Showing {filteredScholarships.length} of {scholarships.length} scholarships
          </div>
        </motion.div>

        {/* Scholarships Grid */}
        <AnimatePresence>
          {filteredScholarships.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Matching Scholarships</h3>
              <p className="text-gray-600">Try changing your search or filter criteria</p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredScholarships.map((scholarship, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-blue-500"
                >
                  {/* Scholarship Header */}
                  <div className={`p-4 text-white ${
                    scholarship.priority === "High" 
                      ? "bg-gradient-to-r from-green-500 to-emerald-500" 
                      : scholarship.priority === "Medium" 
                      ? "bg-gradient-to-r from-yellow-500 to-amber-500" 
                      : "bg-gradient-to-r from-gray-500 to-blue-gray-500"
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{scholarship.name}</h3>
                      <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold">
                        {scholarship.priority} Priority
                      </span>
                    </div>
                    <div className="text-sm opacity-90">{scholarship.amount}</div>
                  </div>

                  {/* Scholarship Content */}
                  <div className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1 flex items-center">
                          <span className="mr-2">🎯</span> Eligibility
                        </h4>
                        <p className="text-sm text-gray-600">{scholarship.eligibility}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1 flex items-center">
                          <span className="mr-2">💡</span> Why Recommended
                        </h4>
                        <p className="text-sm text-gray-600">{scholarship.reason}</p>
                      </div>

                      {/* Additional Info */}
                      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-500">
                          🕒 Apply before: {scholarship.deadline || "Not specified"}
                        </span>
                        <span className="text-xs text-gray-500">
                          🌍 {scholarship.type || "Merit-based"}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                        Apply Now
                      </button>
                      <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                        💾
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Need More Options?</h3>
            <p className="text-gray-600 mb-4">
              Explore thousands of scholarships tailored to your profile and aspirations.
            </p>
            <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300">
              🌟 Explore All Scholarships
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Scholarship;