import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/onboarding", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });

        if (res.data.ok) setUser(res.data.data);
      } catch (err) {
        console.error("Fetch profile error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-lg font-medium">Loading...</div>
    );

  if (!user)
    return (
      <div className="text-center mt-20 text-red-500 font-semibold">
        No profile data found
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <div className="flex justify-between items-center bg-indigo-50 p-6 rounded-lg shadow">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">
            {user.name}'s Profile
          </h1>
          <p className="mt-1 text-gray-700">
            Welcome to your profile page
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          Logout
        </button>
      </div>

      {/* Basic Info */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Basic Info</h2>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-semibold">Age:</span> {user.age || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {user.gender || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Class Completed:</span>{" "}
            {user.classCompleted || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Board:</span> {user.board || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Stream:</span> {user.stream || "N/A"}
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Location</h2>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-semibold">State:</span>{" "}
            {user.location?.state || "N/A"}
          </p>
          <p>
            <span className="font-semibold">District:</span>{" "}
            {user.location?.district || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Pincode:</span>{" "}
            {user.location?.pincode || "N/A"}
          </p>
        </div>
      </div>

      {/* Skills & Interests */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Skills & Interests</h2>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-semibold">Skills:</span>{" "}
            {user.skills?.join(", ") || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Extracurriculars:</span>{" "}
            {user.extracurriculars?.join(", ") || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Interests:</span>{" "}
            {user.interests?.join(", ") || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Future Goal:</span>{" "}
            {user.futureGoal || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Learning Style:</span>{" "}
            {user.learningStyle || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Preferred Study Mode:</span>{" "}
            {user.preferredStudyMode || "N/A"}
          </p>
        </div>
      </div>

      {/* Personality Traits */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Personality Traits</h2>
        <p>{user.personalityTraits?.join(", ") || "N/A"}</p>
      </div>

      {/* Dream Colleges & Exam Preferences */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Aspirations</h2>
        <p>
          <span className="font-semibold">Dream Colleges:</span>{" "}
          {user.dreamColleges?.join(", ") || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Exam Preferences:</span>{" "}
          {user.examPreferences?.join(", ") || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
