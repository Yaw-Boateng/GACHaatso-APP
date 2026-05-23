import axios from "axios";

// Baseline fallback server domain origins
const DEFAULT_API_URL = "https://gachaatso-backend.onrender.com/api/v1";
const DEFAULT_SERVER_URL = "https://gachaatso-backend.onrender.com";

// Safely extract the root domain for images/assets
export const IMAGE_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? new URL(import.meta.env.VITE_API_BASE_URL).origin 
  : DEFAULT_SERVER_URL;

const api = axios.create({
  // If VITE_API_BASE_URL is 'https://gachaatso-backend.onrender.com/api/v1'
  baseURL: import.meta.env.VITE_API_BASE_URL || DEFAULT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    try {
      const savedUserStr = localStorage.getItem("gac_user");
      
      if (savedUserStr) {
        const userData = JSON.parse(savedUserStr);
        let token = userData?.token;
        
        if (token) {
          // SANITIZE: Strip out accidental newlines, carriage returns, tabs, or trailing whitespace
          // to protect Spring Security/Tomcat filter chains from throwing a 500 parsing error.
          token = token.replace(/[\r\n\t]/g, "").trim();
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error("Error reading token from localStorage:", error);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;