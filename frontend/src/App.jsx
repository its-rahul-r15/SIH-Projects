// client/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import CheckOnboarding from './pages/CheckOnboarding';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Colleges from './pages/Colleges';
import Courses from './pages/Courses';
import CareerPage from './pages/CareerPage';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';

import ProtectedRoute from './components/ProtectedRoute';
import 'reactflow/dist/style.css';

// small component to decide where "/" goes
function HomeRedirect() {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/dashboard/results" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />

        {/* Protected routes */}
        <Route
          path="/check-onboarding"
          element={
            <ProtectedRoute>
              <CheckOnboarding />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />

        {/* Dashboard nested routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Default index route */}
          <Route index element={<Navigate to="colleges" replace />} />

          {/* Nested pages */}
          <Route path="colleges" element={<Colleges />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="results" element={<Results />} />
          <Route path="profile" element={<Profile />} />
          <Route path="courses" element={<Courses />} />
          <Route path="career/:course" element={<CareerPage />} />
        </Route>

        {/* Default home redirect */}
        <Route path="/" element={<HomeRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}
