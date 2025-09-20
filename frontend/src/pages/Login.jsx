import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authService';

export default function Login(){
  const nav = useNavigate();
  const [email,setEmail]=React.useState('');
  const [password,setPassword]=React.useState('');
  const [err,setErr]=React.useState('');

  async function handle(e){
    e.preventDefault();
    try{
      const res = await login({ email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      // After login, check onboarding
      nav('/check-onboarding');
    }catch(err){
      setErr(err?.response?.data?.msg || 'Login failed');
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handle} className="space-y-3">
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
        {err && <div className="text-red-500">{err}</div>}
      </form>
    </div>
  );
}
