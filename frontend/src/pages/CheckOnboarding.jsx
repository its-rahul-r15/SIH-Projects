import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CheckOnboarding() {
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.onboardingCompleted) {
          nav('/dashboard/colleges', { replace: true });
          return;
        }

        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });
        const res = await API.get('/api/onboarding/status', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data?.data?.onboardingCompleted) {
          nav('/dashboard/colleges', { replace: true });
        } else {
          nav('/onboarding', { replace: true });
        }
      } catch (err) {
        nav('/onboarding', { replace: true });
      }
    })();
  }, [nav]);

  return <div className="p-6 text-center">Checking onboarding...</div>;
}
