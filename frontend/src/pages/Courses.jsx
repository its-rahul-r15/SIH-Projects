import React from "react";
import { useNavigate } from "react-router-dom";

const COURSES = [
  {
    name: "B.Sc (Bachelor of Science)",
    icon: "🔬",
    description: "Science, Research, Technology",
    careers: ["Research Scientist", "Data Analyst", "Lab Technician", "Professor"],
    duration: "3 years",
    popularFields: ["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science"]
  },
  {
    name: "B.Com (Bachelor of Commerce)",
    icon: "💼",
    description: "Commerce, Business, Finance",
    careers: ["Accountant", "Financial Analyst", "Banker", "Tax Consultant"],
    duration: "3 years",
    popularFields: ["Accounting", "Finance", "Banking", "Business Management"]
  },
  {
    name: "B.A (Bachelor of Arts)",
    icon: "🎨",
    description: "Humanities, Arts, Social Sciences",
    careers: ["Journalist", "Teacher", "Psychologist", "Social Worker"],
    duration: "3 years",
    popularFields: ["Psychology", "Sociology", "History", "Political Science", "English"]
  },
  {
    name: "B.Tech (Bachelor of Technology)",
    icon: "⚙️",
    description: "Engineering, Technology, Innovation",
    careers: ["Software Engineer", "Mechanical Engineer", "Civil Engineer", "Data Scientist"],
    duration: "4 years",
    popularFields: ["Computer Science", "Mechanical", "Civil", "Electronics", "AI & ML"]
  },
  {
    name: "BBA (Bachelor of Business Administration)",
    icon: "📊",
    description: "Business, Management, Entrepreneurship",
    careers: ["Business Analyst", "Marketing Manager", "HR Manager", "Entrepreneur"],
    duration: "3 years",
    popularFields: ["Marketing", "HR", "Finance", "International Business"]
  },
  {
    name: "BCA (Bachelor of Computer Applications)",
    icon: "💻",
    description: "Computer Applications, Software Development",
    careers: ["Software Developer", "Web Developer", "System Analyst", "Database Administrator"],
    duration: "3 years",
    popularFields: ["Software Development", "Web Technologies", "Database Management", "Networking"]
  },
  {
    name: "MBBS (Bachelor of Medicine)",
    icon: "🩺",
    description: "Medical Science, Healthcare",
    careers: ["Doctor", "Surgeon", "Medical Researcher", "Healthcare Administrator"],
    duration: "5.5 years",
    popularFields: ["General Medicine", "Surgery", "Pediatrics", "Cardiology"]
  },
  {
    name: "B.Arch (Bachelor of Architecture)",
    icon: "🏛️",
    description: "Architecture, Design, Planning",
    careers: ["Architect", "Urban Planner", "Interior Designer", "Construction Manager"],
    duration: "5 years",
    popularFields: ["Urban Design", "Landscape Architecture", "Sustainable Design"]
  },
  {
    name: "B.Des (Bachelor of Design)",
    icon: "🎨",
    description: "Design, Creativity, Innovation",
    careers: ["Graphic Designer", "UI/UX Designer", "Fashion Designer", "Product Designer"],
    duration: "4 years",
    popularFields: ["Graphic Design", "Fashion", "Industrial Design", "Animation"]
  }
];

export default function Courses() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden mb-6">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-4">🎓 Explore Career Paths</h1>
              <p className="text-blue-100 text-lg max-w-3xl mx-auto">
                Choose your undergraduate course and discover exciting career opportunities, 
                entrance exams, job prospects, and higher studies options.
              </p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-blue-600">{COURSES.length}+</div>
              <div className="text-sm text-gray-600">Courses</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-green-600">50+</div>
              <div className="text-sm text-gray-600">Career Paths</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-purple-600">100+</div>
              <div className="text-sm text-gray-600">Job Roles</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-orange-600">∞</div>
              <div className="text-sm text-gray-600">Opportunities</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 text-xl">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search courses (B.Sc, B.Tech, Medical, Arts...)"
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-lg border-0 rounded-2xl shadow-xl focus:ring-2 focus:ring-blue-500 focus:shadow-2xl transition-all duration-300 text-lg"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((course) => (
            <div
              key={course.name}
              onClick={() => nav(`/dashboard/career/${encodeURIComponent(course.name.split(' ')[0])}`)}
              className="group cursor-pointer bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-blue-500"
            >
              {/* Course Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{course.icon}</span>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                    {course.duration}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{course.name.split(' (')[0]}</h3>
                <p className="text-blue-100 text-sm">{course.description}</p>
              </div>

              {/* Course Content */}
              <div className="p-6">
                {/* Popular Fields */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="mr-2">📚</span> Popular Fields
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {course.popularFields.slice(0, 3).map((field, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {field}
                      </span>
                    ))}
                    {course.popularFields.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        +{course.popularFields.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Career Opportunities */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="mr-2">💼</span> Career Opportunities
                  </h4>
                  <div className="space-y-1">
                    {course.careers.slice(0, 3).map((career, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {career}
                      </div>
                    ))}
                    {course.careers.length > 3 && (
                      <div className="text-xs text-gray-500 mt-1">
                        +{course.careers.length - 3} more career paths
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Explore Career Path →
                </button>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Help Choosing?</h2>
            <p className="text-gray-600 mb-6">
              Take our AI-powered career assessment test to discover which course best matches your skills and interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300">
                🧠 Take Career Assessment
              </button>
              <button className="border-2 border-blue-500 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300">
                💬 Talk to Counselor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}