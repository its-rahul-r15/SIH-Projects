// client/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import CheckOnboarding from './pages/CheckOnboarding';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Colleges from './pages/Colleges';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

// small component to decide where "/" goes
function HomeRedirect() {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/dashboard/colleges" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/check-onboarding" element={<ProtectedRoute><CheckOnboarding/></ProtectedRoute>} />
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding/></ProtectedRoute>} />

        {/* Nested dashboard route: children render into Dashboard's <Outlet /> */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          {/* index route -> when user opens /dashboard, redirect to /dashboard/colleges */}
          <Route index element={<Navigate to="colleges" replace />} />
          <Route path="colleges" element={<Colleges />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="results" element={<Results />} />
        </Route>

        {/* default route "/" */}
        <Route path="/" element={<HomeRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}
