// src/pages/HomeRedirect.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeRedirect(){
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard/colleges");  // 🔹 redirect if logged in
    } else {
      navigate("/login"); // 🔹 redirect to login if not logged in
    }
  }, [navigate]);

  return <p>Redirecting...</p>;
}
