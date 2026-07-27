import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  getMessages, 
  getMessageById, 
  sendContactMessage, 
  ContactMessagePayload, 
  ContactMessage 
} from "../api/messages";

export const MESSAGES_QUERY_KEY = ["messages"] as const;

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: ContactMessagePayload) => sendContactMessage(formData),
    onSuccess: () => {
      // Invalidate message list cache when a new contact inquiry is sent
      queryClient.invalidateQueries({ queryKey: MESSAGES_QUERY_KEY });
    },
    onError: (error) => {
      console.error('Error submitting contact message:', error);
    },
  });
};

export const useGetMessages = () => {
  return useQuery<ContactMessage[], Error>({
    queryKey: MESSAGES_QUERY_KEY,
    queryFn: getMessages,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes garbage collection
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useGetMessageById = (id?: string) => {
  return useQuery<ContactMessage, Error>({
    queryKey: [...MESSAGES_QUERY_KEY, id],
    queryFn: async () => {
      if (!id) throw new Error("Message ID is required");
      return getMessageById(id);
    },
    enabled: Boolean(id && id.trim().length > 0), // Guard against empty strings
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};