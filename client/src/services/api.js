import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
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

export const forgotPassword = (email) => api.post("/auth/forgot-password", { email });
export const resetPassword = (token, password) => api.post(`/auth/reset-password/${token}`, { password });

// UI: improved
