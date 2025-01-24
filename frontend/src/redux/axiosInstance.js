import axios from "axios";
import { store } from "./store"; // Import your Redux store

const api = axios.create({
  baseURL: "https://recruitify-bggp.onrender.com/api/v1",
  withCredentials: true,
});

// Interceptor to add token to request headers
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
