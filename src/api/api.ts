import axios from "axios";

// Baseline fallback server domain origin
const DEFAULT_SERVER_URL = "http://localhost:8080";

// Safely extract the root domain (e.g., http://localhost:8080 or https://xyz.ngrok-free.app)
export const IMAGE_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? new URL(import.meta.env.VITE_API_BASE_URL).origin 
  : DEFAULT_SERVER_URL;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || `${DEFAULT_SERVER_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json", // Tells Ngrok/Backend to skip serving HTML wrappers
    "ngrok-skip-browser-warning": "true", // Skips ngrok interstitial page
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