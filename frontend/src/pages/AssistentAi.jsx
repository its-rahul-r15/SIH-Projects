// client/src/pages/Assistant.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function Assistant() {
  const [messages, setMessages] = useState([]); // {role, text, createdAt}
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });
        const token = localStorage.getItem('token');
        const res = await API.get('/api/assistant/history', { headers: { Authorization: `Bearer ${token}` }});
        if (res.data?.ok) setMessages(res.data.data || []);
      } catch (err) {
        console.error('failed to fetch history', err);
      }
    })();
  }, []);

  useEffect(() => { // scroll down on new messages
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  async function send() {
    if (!input.trim()) return;
    const text = input.trim();
    // optimistic UI
    const userMsg = { role: 'user', text, createdAt: new Date().toISOString() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setSending(true);

    try {
      const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });
      const token = localStorage.getItem('token');
      const res = await API.post('/api/assistant/chat', { message: text }, { headers: { Authorization: `Bearer ${token}` }});
      if (res.data?.ok) {
        const ai = { role: 'assistant', text: res.data.data.reply, createdAt: new Date().toISOString() };
        setMessages(m => [...m, ai]);
      } else {
        setMessages(m => [...m, { role:'assistant', text: 'Assistant failed to respond.' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(m => [...m, { role: 'assistant', text: 'Error contacting assistant.' }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 h-[70vh] border rounded flex flex-col">
      <h2 className="text-xl font-semibold mb-2">AI Assistant</h2>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-2 space-y-3 bg-gray-50 rounded">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'} shadow`}>
              <div className="whitespace-pre-wrap">{m.text}</div>
              <div className="text-xs text-gray-400 mt-1">{new Date(m.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input className="flex-1 p-2 border rounded" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send(); }} placeholder="Ask about courses, scholarships, deadlines..." />
        <button className="bg-green-600 text-white px-4 rounded" onClick={send} disabled={sending}>{sending ? 'Sending...' : 'Send'}</button>
      </div>
    </div>
  );
}
