import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Fallback to the string if the env variable isn't loading for some reason
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://gachaatso-backend.onrender.com";

export const useSendMessage = () => {
  return useMutation({
    mutationFn: async (messageData) => {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/messages/send`, 
        messageData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });
};