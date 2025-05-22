
import React from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn("flex", {
        "justify-end": message.sender === "user",
        "justify-start": message.sender === "bot",
      })}
    >
      <div
        className={cn("rounded-lg px-3 py-2 max-w-[80%] text-sm", {
          "bg-primary text-primary-foreground": message.sender === "user",
          "bg-muted": message.sender === "bot",
        })}
      >
        {message.text}
      </div>
    </div>
  );
}
