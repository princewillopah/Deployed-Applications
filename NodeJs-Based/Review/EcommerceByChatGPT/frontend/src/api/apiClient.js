import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api'
});

// attach token
api.interceptors.request.use(cfg => {
  try {
    const raw = localStorage.getItem('user');
    if (raw) {
      const { token } = JSON.parse(raw);
      if (token) cfg.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) { /* ignore */ }
  return cfg;
});

export default api;
