// client/src/pages/Dashboard.jsx
import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const links = [
    { name: "Home", path: "results" }, // moved to first
    { name: "Nearby Colleges", path: "colleges" },
    { name: "Career Quiz", path: "quiz" },
    { name: "Courses", path: "courses" },
    
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          
          {/* Logo left */}
          <h1 className="text-xl font-bold text-blue-600">Student Dashboard</h1>

          {/* Centered menu (desktop) */}
          <nav className="hidden md:flex flex-1 justify-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors px-2 py-1 rounded-md ${
                  isActive(link.path)
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Profile right */}
<div className="relative ml-auto">
  <button
    onClick={() => setProfileOpen(!profileOpen)}
    className="flex items-center text-gray-700 hover:text-blue-600 focus:outline-none"
  >
    <FaUserCircle size={24} />
  </button>

  {profileOpen && (
    <div className="absolute right-0 top-full mt-1 w-40 bg-white shadow-lg rounded-md py-2 z-50">
      <Link
        to="profile"
        className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
        onClick={() => setProfileOpen(false)}
      >
        Profile
      </Link>
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
      >
        Logout
      </button>
    </div>
  )}
</div>


          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <nav className="flex flex-col px-4 py-2 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors px-2 py-1 rounded-md ${
                    isActive(link.path)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="profile"
                className="flex items-center space-x-2 px-2 py-1 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                <FaUserCircle /> <span>Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-600 font-medium hover:bg-red-50 px-2 py-1 rounded-md"
              >
                Logout
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 mt-16 p-6">
        <Outlet />
      </main>
    </div>
  );
}
