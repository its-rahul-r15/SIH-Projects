// frontend/src/pages/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    classCompleted: "12",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", formData);
      if (res.data.ok) {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        navigate('/onboarding', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <label className="block mb-2">Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          className="w-full border px-3 py-2 rounded-lg mb-3"
          required
        />

        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          className="w-full border px-3 py-2 rounded-lg mb-3"
          required
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          className="w-full border px-3 py-2 rounded-lg mb-3"
          required
        />

        <label className="block mb-2">Class Completed</label>
        <select
          name="classCompleted"
          onChange={handleChange}
          value={formData.classCompleted}
          className="w-full border px-3 py-2 rounded-lg mb-4"
        >
          <option value="10">10th</option>
          <option value="12">12th</option>
          <option value="grad">Graduation</option>
          <option value="other">Other</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
