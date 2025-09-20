import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CheckOnboarding(){
  const nav = useNavigate();
  useEffect(()=>{
    (async ()=>{
      try {
        const token = localStorage.getItem('token');
        const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });
        const res = await API.get('/api/onboarding/status', { headers: { Authorization: `Bearer ${token}` }});
        const completed = res.data?.data?.onboardingCompleted;
        if (completed) nav('/dashboard/colleges', { replace: true });
        else nav('/onboarding', { replace: true });
      } catch (err) {
        // if 404 or error, go to onboarding
        nav('/onboarding', { replace: true });
      }
    })();
  },[nav]);

  return <div className="p-6">Checking onboarding...</div>;
}
