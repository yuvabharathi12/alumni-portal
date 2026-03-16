import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://alumni-portal-production-fd47.up.railway.app/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

// UI: improved (nested api)
