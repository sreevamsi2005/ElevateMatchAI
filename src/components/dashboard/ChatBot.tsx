
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { MessageSquare, Send, X, ChevronDown } from "lucide-react";
import { ChatMessage } from "./chatbot/ChatMessage";
import { useChatbot } from "./chatbot/useChatbot";

export function ChatBot() {
  const {
    messages,
    input,
    setInput,
    isOpen,
    setIsOpen,
    messageCount,
    sendMessage,
    MAX_MESSAGES
  } = useChatbot();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen ? (
        <Button 
          onClick={() => setIsOpen(true)} 
          className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="w-80 sm:w-96 shadow-xl border border-border">
          <CardHeader className="py-3 px-4 flex flex-row items-center justify-between bg-muted/50">
            <CardTitle className="text-base font-medium flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              ElevateBot
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => setIsOpen(false)}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-80 overflow-y-auto flex flex-col gap-3">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-3 pt-0">
            <form onSubmit={sendMessage} className="flex gap-2 w-full">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 min-h-[40px] h-10 resize-none py-2"
                maxLength={200}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(e);
                  }
                }}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="h-10 w-10 rounded-full"
                disabled={messageCount >= MAX_MESSAGES}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
          <div className="text-xs text-center pb-2 text-muted-foreground">
            {MAX_MESSAGES - messageCount} messages remaining today
          </div>
        </Card>
      )}
    </div>
  );
}
