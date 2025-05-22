
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { generateBotResponse } from "./chatbotResponses";

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

// Maximum number of messages allowed
const MAX_MESSAGES = 10;

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    if (messageCount >= MAX_MESSAGES) {
      toast.error("You've reached your daily message limit. Please try again tomorrow!");
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setMessageCount((prev) => prev + 1);

    // Simulate bot typing with a delay
    setTimeout(() => {
      const botResponse = generateBotResponse(input.toLowerCase());
      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return {
    messages,
    input,
    setInput,
    isOpen,
    setIsOpen,
    messageCount,
    sendMessage,
    MAX_MESSAGES
  };
}
