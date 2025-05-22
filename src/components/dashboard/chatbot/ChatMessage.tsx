
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

export function ChatMessage({ message, isLoading = false }: ChatMessageProps) {
  return (
    <div
      className={cn("flex w-full mb-2", {
        "justify-end": message.sender === "user",
        "justify-start": message.sender === "bot",
      })}
    >
      <div
        className={cn("rounded-lg px-4 py-2 max-w-[80%]", {
          "bg-primary text-primary-foreground": message.sender === "user",
          "bg-muted": message.sender === "bot",
        })}
      >
        <div className="text-sm whitespace-pre-wrap break-words">
          {message.text}
          {isLoading && message.sender === "bot" && (
            <Loader2 className="inline ml-2 h-4 w-4 animate-spin" />
          )}
        </div>
        <div 
          className={cn("text-[10px] mt-1 opacity-70", {
            "text-primary-foreground/70": message.sender === "user",
          })}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
}
