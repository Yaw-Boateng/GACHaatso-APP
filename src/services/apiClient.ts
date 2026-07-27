import axios from "axios";

// 1. Environment URL Resolution
const DEFAULT_API_URL = "https://gachaatso-backend.onrender.com/api/v1";
const DEFAULT_SERVER_URL = "https://gachaatso-backend.onrender.com";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_URL;

export const IMAGE_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? new URL(import.meta.env.VITE_API_BASE_URL).origin 
  : DEFAULT_SERVER_URL;

// 2. Create Single Axios Instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Remove default Pragma headers if Axios auto-injected them
delete api.defaults.headers.common["Pragma"];
delete api.defaults.headers.get["Pragma"];

// 3. Request Interceptor (Handles Token + Removes CORS-blocking Headers)
api.interceptors.request.use(
  (config) => {
    try {
      // Remove 'Pragma' header safely across Axios versions
      if (config.headers) {
        if (typeof config.headers.delete === "function") {
          config.headers.delete("Pragma");
        } else {
          delete config.headers["Pragma"];
        }
      }

      // Retrieve and sanitize JWT Token
      const savedUserStr = localStorage.getItem("gac_user");

      if (savedUserStr) {
        const userData = JSON.parse(savedUserStr);
        let token = userData?.token;

        if (token && typeof token === "string") {
          // SANITIZE: Remove control characters, newlines, tabs, and spaces
          token = token.replace(/[\r\n\t]/g, "").trim();

          if (config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        }
      }
    } catch (error) {
      console.error("Error setting up request headers in interceptor:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 4. Response Interceptor (Auto Handles Expired Tokens)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Session expired or unauthorized. Clearing stored credentials...");
      localStorage.removeItem("gac_user");
    }
    return Promise.reject(error);
  }
);

// Export both named and default for compatibility across imports
export const apiClient = api;
export default api;