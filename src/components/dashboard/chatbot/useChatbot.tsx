
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-msg",
    text: "Hi there! I'm ElevateBot, your personal assistant. I can help with career advice, study tips, or just chat if you need motivation. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

// Maximum number of messages allowed per day for free tier
const MAX_MESSAGES = 10;

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Fetch user's message count from database
  useEffect(() => {
    if (user) {
      fetchMessageCount();
    }
  }, [user]);

  // Fetch message count from database
  const fetchMessageCount = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('chat_usage')
        .select('message_count, last_reset')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching message count:', error);
        return;
      }

      // If no record exists, create one
      if (!data) {
        await supabase
          .from('chat_usage')
          .insert({ user_id: user.id, message_count: 0 });
        setMessageCount(0);
        return;
      }

      // Check if we need to reset the counter (it's been more than 24 hours)
      const lastReset = new Date(data.last_reset);
      const now = new Date();
      const hoursSinceReset = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceReset >= 24) {
        // Reset the counter
        await supabase
          .from('chat_usage')
          .update({ message_count: 0, last_reset: now.toISOString() })
          .eq('user_id', user.id);
        setMessageCount(0);
      } else {
        setMessageCount(data.message_count);
      }
    } catch (err) {
      console.error('Error in fetchMessageCount:', err);
    }
  };

  // Update message count in the database
  const updateMessageCount = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('chat_usage')
        .update({ message_count: messageCount + 1 })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating message count:', error);
      }
    } catch (err) {
      console.error('Error in updateMessageCount:', err);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    if (!user) {
      toast.error("Please sign in to use the chatbot");
      return;
    }
    
    if (messageCount >= MAX_MESSAGES) {
      toast.error("You've reached your daily message limit. Please try again tomorrow!");
      return;
    }

    setIsLoading(true);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    try {
      // Update message count
      setMessageCount((prev) => prev + 1);
      await updateMessageCount();
      
      // Generate bot response
      const response = await fetch(`${window.location.origin}/api/generate-chat-response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          apiKey: 'AIzaSyB6j9pcmefpEiVmcBULnVxOhQAlb27iEIs',
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate response');
      }
      
      const data = await response.json();
      
      // Add bot response
      const botMessage: Message = {
        id: Date.now().toString(),
        text: data.response || "I'm having trouble connecting right now. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Add fallback bot response
      const fallbackMessage: Message = {
        id: Date.now().toString(),
        text: "I'm sorry, I couldn't process your request. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, fallbackMessage]);
      
      toast.error("Failed to generate a response");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    isOpen,
    setIsOpen,
    messageCount,
    sendMessage,
    MAX_MESSAGES,
    isLoading
  };
}
