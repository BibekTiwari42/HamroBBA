import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: attach token safely
api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// GLOBAL RESPONSE GUARD
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // normalize error
    return Promise.reject({
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });
  }
);

export default api;