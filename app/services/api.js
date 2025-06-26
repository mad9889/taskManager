// services/api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// services/api.js
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip CSRF refresh for these cases:
    if (
      error.response?.status === 401 || // Unauthorized
      originalRequest.url.includes("/login") || // Login requests
      originalRequest._retry // Already retried
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 419) {
      // CSRF token mismatch
      try {
        await setupCSRF();
        originalRequest._retry = true; // Mark as retried
        return api(originalRequest);
      } catch (csrfError) {
        return Promise.reject(csrfError);
      }
    }

    return Promise.reject(error);
  }
);
export default api;
