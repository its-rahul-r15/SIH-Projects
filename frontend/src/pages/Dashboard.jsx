// client/src/pages/Dashboard.jsx
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold mb-6">Student Dashboard</h2>
        <nav className="flex flex-col gap-3">
          <Link to="colleges" className="hover:text-blue-600">Nearby Colleges</Link>
          <Link to="quiz" className="hover:text-blue-600">Career Quiz</Link>
          <Link to="results" className="hover:text-blue-600">Results</Link>
          <Link to="profile" className="hover:text-blue-600">Profile</Link>
          <button
            className="mt-4 text-sm text-red-600"
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login', { replace: true });
            }}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content area — nested routes render here */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
