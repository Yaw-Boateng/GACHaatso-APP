import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/api.ts";

const sendMessage = async (formData) => {
  const payload = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone || "",
    messageType: formData.messageType,
    message: formData.message,
  };
  const response = await api.post("/messages/send", payload);
  return response.data;
};

const fetchMessages = async () => {
  const response = await api.get("/messages");
  return response.data;
};

const fetchMessageById = async (id) => {
  const response = await api.get(`/messages/${id}`);
  return response.data;
};

export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessage,
    onError: (error) => {
      console.error("Backend Validation Error:", error.response?.data);
    }
  });
};

export const useGetMessages = () => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });
};

export const useGetMessageById = (id) => {
  return useQuery({
    queryKey: ["messages", id],
    queryFn: () => fetchMessageById(id),
    enabled: !!id, // Prevents the query from running if id is null
  });
};