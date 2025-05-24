import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { studentNavItems } from "@/utils/navItems";

// Mock questions database
const mockQuestions = {
  frontend: [
    {
      id: 1,
      question: "Explain the concept of Virtual DOM in React and its benefits.",
      difficulty: "medium",
    },
    {
      id: 2,
      question: "What are React Hooks? Explain useState and useEffect with examples.",
      difficulty: "medium",
    },
    {
      id: 3,
      question: "Describe the difference between controlled and uncontrolled components in React.",
      difficulty: "medium",
    },
    {
      id: 4,
      question: "Explain the concept of CSS-in-JS and its advantages.",
      difficulty: "medium",
    },
    {
      id: 5,
      question: "What is the purpose of the useCallback hook in React?",
      difficulty: "medium",
    },
  ],
  backend: [
    {
      id: 1,
      question: "Explain the concept of middleware in Express.js and its use cases.",
      difficulty: "medium",
    },
    {
      id: 2,
      question: "What is the difference between SQL and NoSQL databases?",
      difficulty: "medium",
    },
    {
      id: 3,
      question: "Describe RESTful API design principles and best practices.",
      difficulty: "medium",
    },
    {
      id: 4,
      question: "Explain the concept of database indexing and its importance.",
      difficulty: "medium",
    },
    {
      id: 5,
      question: "What are the different types of authentication methods in web applications?",
      difficulty: "medium",
    },
  ],
  fullstack: [
    {
      id: 1,
      question: "Explain the MERN stack architecture and its components.",
      difficulty: "medium",
    },
    {
      id: 2,
      question: "Describe the process of deploying a full-stack application.",
      difficulty: "medium",
    },
    {
      id: 3,
      question: "What are the best practices for securing a full-stack application?",
      difficulty: "medium",
    },
    {
      id: 4,
      question: "Explain the concept of microservices architecture.",
      difficulty: "medium",
    },
    {
      id: 5,
      question: "How do you handle state management in a full-stack application?",
      difficulty: "medium",
    },
  ],
  devops: [
    {
      id: 1,
      question: "Explain the concept of CI/CD and its importance in DevOps.",
      difficulty: "medium",
    },
    {
      id: 2,
      question: "What are Docker containers and how do they work?",
      difficulty: "medium",
    },
    {
      id: 3,
      question: "Describe the role of Kubernetes in container orchestration.",
      difficulty: "medium",
    },
    {
      id: 4,
      question: "What is Infrastructure as Code (IaC) and its benefits?",
      difficulty: "medium",
    },
    {
      id: 5,
      question: "Explain the concept of monitoring and logging in DevOps.",
      difficulty: "medium",
    },
  ],
  data_science: [
    {
      id: 1,
      question: "Explain the difference between supervised and unsupervised learning.",
      difficulty: "medium",
    },
    {
      id: 2,
      question: "What is the purpose of cross-validation in machine learning?",
      difficulty: "medium",
    },
    {
      id: 3,
      question: "Describe the process of feature engineering in data science.",
      difficulty: "medium",
    },
    {
      id: 4,
      question: "What are the different types of clustering algorithms?",
      difficulty: "medium",
    },
    {
      id: 5,
      question: "Explain the concept of overfitting and how to prevent it.",
      difficulty: "medium",
    },
  ],
  mobile: [
    {
      id: 1,
      question: "Explain the difference between native and cross-platform mobile development.",
      difficulty: "medium",
    },
    {
      id: 2,
      question: "What are the key considerations for mobile app performance optimization?",
      difficulty: "medium",
    },
    {
      id: 3,
      question: "Describe the process of implementing push notifications in mobile apps.",
      difficulty: "medium",
    },
    {
      id: 4,
      question: "What are the best practices for mobile app security?",
      difficulty: "medium",
    },
    {
      id: 5,
      question: "Explain the concept of mobile app state management.",
      difficulty: "medium",
    },
  ],
};

const SkillTestPage = () => {
  const { toast } = useToast();
  const [selectedDomain, setSelectedDomain] = useState("");
  const [questionCount, setQuestionCount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTestComplete, setIsTestComplete] = useState(false);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0 && !isTestComplete) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isTestComplete]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleStartTest = () => {
    if (!selectedDomain || !questionCount) {
      toast({
        title: "Error",
        description: "Please select a domain and number of questions",
        variant: "destructive",
      });
      return;
    }

    const count = parseInt(questionCount);
    if (count < 1 || count > 5) {
      toast({
        title: "Error",
        description: "Please select between 1 and 5 questions",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const domainQuestions = mockQuestions[selectedDomain as keyof typeof mockQuestions];
      const selectedQuestions = domainQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
      setQuestions(selectedQuestions);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setIsTestComplete(false);
      // Set timer: 2 minutes per question
      setTimeLeft(count * 120);
      setIsLoading(false);
    }, 1000);
  };

  const handleAnswerChange = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsTestComplete(true);
    toast({
      title: "Test Complete",
      description: "Your answers have been submitted successfully!",
    });
  };

  const progress = (currentQuestionIndex / questions.length) * 100;

  return (
    <DashboardLayout userType="student" navItems={studentNavItems}>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Skill Assessment Test</h1>
          {timeLeft > 0 && !isTestComplete && (
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="h-5 w-5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>

        {!questions.length && !isLoading && (
          <Card>
            <CardHeader>
              <CardTitle>Start Your Skill Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Domain</label>
                  <Select
                    value={selectedDomain}
                    onValueChange={setSelectedDomain}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">Frontend Development</SelectItem>
                      <SelectItem value="backend">Backend Development</SelectItem>
                      <SelectItem value="fullstack">Full Stack Development</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="data_science">Data Science</SelectItem>
                      <SelectItem value="mobile">Mobile Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Number of Questions</label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(e.target.value)}
                    placeholder="Enter number of questions (1-5)"
                  />
                </div>

                <Button
                  onClick={handleStartTest}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? "Loading..." : "Start Test"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {questions.length > 0 && !isTestComplete && (
          <div className="space-y-6">
            <Progress value={progress} className="h-2" />
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    {questions[currentQuestionIndex].question}
                  </h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Answer</label>
                    <textarea
                      className="w-full min-h-[150px] p-3 border rounded-md"
                      value={answers[questions[currentQuestionIndex].id] || ""}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      placeholder="Type your answer here..."
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  {currentQuestionIndex === questions.length - 1 ? (
                    <Button onClick={handleSubmit}>Submit Test</Button>
                  ) : (
                    <Button onClick={handleNext}>Next</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {isTestComplete && (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              Thank you for completing the test! Your answers have been submitted.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SkillTestPage; 