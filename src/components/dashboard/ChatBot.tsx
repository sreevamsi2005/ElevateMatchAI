
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { MessageSquare, Send, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Message {
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

// Pre-defined responses for common queries
const BOT_RESPONSES = {
  resume: [
    "Your resume is your professional story! Make sure to highlight your academic achievements, projects, and any internships.",
    "For a standout resume, quantify your achievements whenever possible and tailor it to each job application.",
    "Don't forget to use our AI Resume Builder tool to get personalized suggestions for your resume!"
  ],
  interview: [
    "For interviews, prepare by researching the company and practicing common questions. Remember to have questions ready for them too!",
    "Mock interviews can significantly boost your confidence. Have you tried our mock interview feature yet?",
    "Remember to follow up with a thank-you note after your interview. It shows professionalism and genuine interest."
  ],
  study: [
    "Try the Pomodoro technique - 25 minutes of focused study followed by a 5-minute break. It works wonders!",
    "Creating a study group can help you stay accountable and provide different perspectives on challenging topics.",
    "Don't forget to review regularly rather than cramming before exams. Spaced repetition is key to long-term retention."
  ],
  motivation: [
    "Remember why you started this journey. Your future self will thank you for persisting through challenges!",
    "Break big goals into smaller, manageable tasks. Each small win will fuel your motivation.",
    "It's okay to take breaks! Balance is essential for sustainable progress and preventing burnout."
  ],
  career: [
    "Explore different career paths by talking to professionals in fields that interest you.",
    "Consider how your strengths and interests align with potential career paths.",
    "Building a professional network now can open doors later. Attend industry events and connect with alumni."
  ],
  general: [
    "I'm here to help! What specific area would you like guidance on?",
    "Is there a particular challenge you're facing right now that I can assist with?",
    "Remember, every successful person started somewhere. Persistence is key to achieving your goals!"
  ]
};

// Maximum number of messages allowed
const MAX_MESSAGES = 10;

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageCount, setMessageCount] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
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
      const botMessage = generateBotResponse(input.toLowerCase());
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): Message => {
    let responseCategory = "general";
    
    if (userInput.includes("resume") || userInput.includes("cv")) {
      responseCategory = "resume";
    } else if (userInput.includes("interview") || userInput.includes("hire")) {
      responseCategory = "interview";
    } else if (userInput.includes("study") || userInput.includes("learn") || userInput.includes("class")) {
      responseCategory = "study";
    } else if (userInput.includes("motivate") || userInput.includes("inspire") || userInput.includes("discourage")) {
      responseCategory = "motivation";
    } else if (userInput.includes("career") || userInput.includes("job") || userInput.includes("profession")) {
      responseCategory = "career";
    }

    const responses = BOT_RESPONSES[responseCategory];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return {
      id: Date.now().toString(),
      text: randomResponse,
      sender: "bot",
      timestamp: new Date(),
    };
  };

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
                <div
                  key={message.id}
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
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-3 pt-0">
            <form onSubmit={handleSubmit} className="flex gap-2 w-full">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 min-h-[40px] h-10 resize-none py-2"
                maxLength={200}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
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
