import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const getColleges = (params = {}) => API.get('/api/colleges', { params }).then(r=>r.data);
