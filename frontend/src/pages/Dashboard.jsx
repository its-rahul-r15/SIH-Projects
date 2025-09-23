// client/src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle, FaHome, FaGraduationCap, FaMapMarkerAlt, FaMoneyCheckAlt, FaRobot, FaChevronDown } from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: "Dashboard", path: "results", icon: FaHome },
    { name: "Courses", path: "courses", icon: FaGraduationCap },
    { name: "Nearby Colleges", path: "colleges", icon: FaMapMarkerAlt },
    { name: "Scholarships", path: "scholarships", icon: FaMoneyCheckAlt },
    { name: "AI Assistant", path: "assistant", icon: FaRobot },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const isActive = (path) => location.pathname.includes(path);

  // Get current page name for mobile header
  const getCurrentPageName = () => {
    const currentLink = links.find(link => isActive(link.path));
    return currentLink ? currentLink.name : "Dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-xl' 
          : 'bg-white/90 backdrop-blur-md shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-10 h-10 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">🎓</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CareerPath
                </h1>
                <p className="text-xs text-gray-500">Education Advisor</p>
              </div>
            </div>

            {/* Centered menu (desktop) */}
            <nav className="hidden lg:flex flex-1 justify-center space-x-1">
              {links.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-2 font-medium transition-all duration-300 px-4 py-2 rounded-xl ${
                      isActive(link.path)
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                        : "text-gray-600 hover:text-blue-600 hover:bg-white/50"
                    }`}
                  >
                    <IconComponent className="text-sm" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Profile Section - FIXED: Removed hidden class */}
            <div className="flex items-center space-x-4">
              {/* Desktop Profile - FIXED: Changed from hidden md:relative to relative */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 bg-white/50 hover:bg-white/80 px-3 py-2 rounded-xl transition-all duration-300 border border-gray-200"
                >
                  <FaUserCircle className="text-blue-600 text-xl" />
                  <span className="text-gray-700 font-medium hidden md:block">Profile</span>
                  <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${
                    profileOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-lg shadow-2xl rounded-xl border border-gray-200 py-2 z-50">
                    <Link
                      to="profile"
                      className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      <FaUserCircle className="text-blue-500" />
                      <span>My Profile</span>
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <span>🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden flex items-center">
                <button 
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                >
                  {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile dropdown menu */}
          {menuOpen && (
            <div className="lg:hidden bg-white/95 backdrop-blur-lg shadow-2xl rounded-2xl border border-gray-200 mb-4">
              {/* Mobile Header */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-700">{getCurrentPageName()}</h2>
              </div>
              
              <nav className="flex flex-col p-2 space-y-1">
                {links.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center space-x-3 font-medium transition-all duration-300 px-4 py-3 rounded-lg ${
                        isActive(link.path)
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                          : "text-gray-700 hover:bg-blue-50"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <IconComponent className="text-lg" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}

                {/* Mobile Profile Links */}
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <Link
                    to="profile"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaUserCircle />
                    <span>My Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="pt-16 min-h-screen">
        <Outlet />
      </main>

      {/* Floating AI Assistant Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          to="assistant"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-bounce"
        >
          <FaRobot size={24} />
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-lg border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🎓</span>
              </div>
              <span className="text-gray-700 font-semibold">CareerPath Advisor</span>
            </div>
            <div className="text-sm text-gray-500">
              © 2024 One-Stop Personalized Career & Education Advisor
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}