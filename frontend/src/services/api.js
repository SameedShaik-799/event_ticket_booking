import axios from "axios";

let authTokenGetter = async () => null;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8082/api"
});

export function setAuthTokenGetter(getter) {
  authTokenGetter = getter;
}

api.interceptors.request.use(async (config) => {
  const token = await authTokenGetter();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
