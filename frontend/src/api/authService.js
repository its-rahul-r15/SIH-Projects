import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const register = (payload) => API.post('/api/auth/register', payload).then(r=>r.data);
export const login = (payload) => API.post('/api/auth/login', payload).then(r=>r.data);
export const me = (token) => API.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } }).then(r=>r.data);
