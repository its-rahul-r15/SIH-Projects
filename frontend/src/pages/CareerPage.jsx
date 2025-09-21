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
        const token = localStorage.getItem("token");
        const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });
        const res = await API.get(`/api/career-mapping/${encodeURIComponent(course)}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data?.ok) {
          setMapping(res.data.data.structured || res.data.data);
          setCached(res.data.cached);
        } else {
          setError(res.data?.msg || "No data");
        }
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.msg || err.message || "Failed");
      } finally {
        setLoading(false);
      }
    })();
  }, [course]);

  if (loading) return <div className="p-6">Loading mapping for {course}...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!mapping) return <div className="p-6">No mapping returned.</div>;

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        <h1 className="text-2xl font-bold">{course} — Career Path</h1>
        <p className="text-sm text-gray-600 mt-2">{mapping.summary}</p>
        <div className="text-xs text-gray-500">Confidence: {(mapping.confidence_score ?? mapping.confidence ?? 0).toFixed(2)} {cached ? "(cached)" : ""}</div>
      </motion.div>

      <div style={{ height: 560 }}>
        <CareerFlow mapping={mapping} rootLabel={course} />
      </div>
    </div>
  );
}
