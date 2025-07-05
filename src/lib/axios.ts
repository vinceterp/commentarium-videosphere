import axios, { AxiosError, AxiosRequestHeaders } from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""; // Change this to your API base URL

const api = axios.create({
  baseURL: BASE_URL,
});

export type CustomAxiosError = AxiosError<{ message: string }>;

const refreshTokenFn = async () => {
  console.log("Refreshing token...");
  const refreshToken = localStorage.getItem("refresh-token");
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }
  try {
    const uninterceptedApi = axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    // set the Authorization header with the refreshToken from the local storage user store
    const response = await uninterceptedApi.post("/auth/refresh-token");
    localStorage.setItem("access-token", response.data.token);
    localStorage.setItem("refresh-token", response.data.refreshToken);
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

// Set the Authorization header from the local storage user store on each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers = (config.headers || {}) as AxiosRequestHeaders;
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// implement an interceptor that calls refreshToken if a 401 error occurs
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshTokenFn(); // Call your refresh token function here
        return api(originalRequest); // Retry the original request
      } catch (refreshError) {
        return Promise.reject(refreshError); // If refresh fails, reject the promise
      }
    }
    return Promise.reject(error); // If not a 401 error, reject the promise
  },
);
export default api;
