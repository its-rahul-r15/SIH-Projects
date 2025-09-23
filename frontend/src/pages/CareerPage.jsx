// client/src/pages/CareerPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CareerFlow from "../components/CareerFlow";
import { motion } from "framer-motion";

export default function CareerPage() {
  const { course } = useParams();
  const [loading, setLoading] = useState(true);
  const [mapping, setMapping] = useState(null);
  const [cached, setCached] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");
        const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });
        const res = await API.get(`https://sih-projects-delta.vercel.app/api/career-mapping/${encodeURIComponent(course)}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data?.ok) {
          setMapping(res.data.data.structured || res.data.data);
          setCached(res.data.cached);
        } else {
          setError(res.data?.msg || "No data available for this course");
        }
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.msg || err.message || "Failed to load career data");
      } finally {
        setLoading(false);
      }
    })();
  }, [course]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-6 animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
          
          {/* Content Skeleton */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 h-[600px] animate-pulse">
            <div className="h-full bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-12 max-w-2xl mx-auto">
              <div className="text-6xl mb-4">😔</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Unable to Load Career Data</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300"
                >
                  🔄 Try Again
                </button>
                <button 
                  onClick={() => window.history.back()}
                  className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300"
                >
                  ← Go Back
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // No Data State
  if (!mapping) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-12 max-w-2xl mx-auto">
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Career Mapping Not Available</h2>
              <p className="text-gray-600 mb-6">
                We couldn't generate a career path for {course}. This might be due to limited data for this course.
              </p>
              <button 
                onClick={() => window.history.back()}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300"
              >
                ← Choose Another Course
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const confidenceScore = (mapping.confidence_score ?? mapping.confidence ?? 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden mb-6"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{course} Career Path</h1>
                <p className="text-blue-100 text-lg max-w-3xl">{mapping.summary}</p>
              </div>
              
              {/* Confidence Score Badge */}
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl mt-4 lg:mt-0">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🎯</span>
                  <div>
                    
                  </div>
                </div>
              </div>
            </div>

            {/* Cache Status and Additional Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                {cached ? "⚡ Cached Results" : "🔄 Fresh Analysis"}
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                📊 Career Mapping
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                🎓 {mapping.career_paths?.length || 0} Career Paths
              </span>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with Quick Info */}
          

          {/* Career Flow Visualization */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <span className="mr-2">📈</span> Career Path Visualization
                </h2>
                
              </div>
              
              <div className="h-[600px] border-2 border-dashed border-gray-200 rounded-xl overflow-hidden">
                <CareerFlow mapping={mapping} rootLabel={course} />
              </div>
              
              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Career Paths</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Skills Required</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  <span>Job Roles</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Information Section */}
        {mapping.additional_info && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">📋</span> Additional Information
              </h3>
              <div className="prose max-w-none">
                {mapping.additional_info}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}