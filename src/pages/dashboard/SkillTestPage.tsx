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
import { AlertCircle, Clock, CheckCircle2, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { studentNavItems } from "@/utils/navItems";

const domains = [
  { id: 'frontend', name: 'Frontend Development' },
  { id: 'backend', name: 'Backend Development' },
  { id: 'fullstack', name: 'Full Stack Development' },
  { id: 'devops', name: 'DevOps' },
  { id: 'data-science', name: 'Data Science' },
  { id: 'mobile', name: 'Mobile Development' },
];

// Mock questions database (in a real app, this would come from an API)
const mockQuestions = {
  frontend: [
    "Explain the concept of Virtual DOM in React.",
    "What are the key differences between let, const, and var in JavaScript?",
    "How does CSS specificity work?",
    "Explain the concept of closures in JavaScript.",
    "What are React hooks and how do they work?",
    "Explain the concept of state management in React applications.",
    "What is the difference between controlled and uncontrolled components?",
    "How do you handle form validation in React?",
    "Explain the concept of React Context.",
    "What are the best practices for optimizing React performance?",
  ],
  backend: [
    "Explain the concept of RESTful APIs.",
    "What is the difference between SQL and NoSQL databases?",
    "How does authentication work in web applications?",
    "Explain the concept of middleware in Express.js.",
    "What are microservices and their benefits?",
    "How do you handle database migrations?",
    "Explain the concept of caching in backend applications.",
    "What are the different types of database indexing?",
    "How do you implement rate limiting in an API?",
    "Explain the concept of database transactions.",
  ],
  fullstack: [
    "Explain the MERN stack architecture.",
    "How do you handle state management in a full-stack application?",
    "What are the best practices for API design?",
    "How do you implement authentication in a full-stack application?",
    "Explain the concept of server-side rendering.",
    "How do you handle file uploads in a full-stack application?",
    "What are the best practices for error handling?",
    "How do you implement real-time features?",
    "Explain the concept of WebSockets.",
    "What are the best practices for deployment?",
  ],
  devops: [
    "What is CI/CD and why is it important?",
    "Explain containerization and its benefits.",
    "What is Infrastructure as Code (IaC)?",
    "How do you handle monitoring and logging in a production environment?",
    "Explain the concept of microservices architecture.",
    "What are the best practices for Docker?",
    "How do you implement automated testing in CI/CD?",
    "Explain the concept of Kubernetes.",
    "What are the best practices for cloud security?",
    "How do you handle disaster recovery?",
  ],
  'data-science': [
    "What is the difference between supervised and unsupervised learning?",
    "Explain the concept of overfitting and how to prevent it.",
    "What are the common evaluation metrics for classification problems?",
    "How do you handle missing data in a dataset?",
    "Explain the concept of feature engineering.",
    "What are the different types of clustering algorithms?",
    "How do you handle imbalanced datasets?",
    "Explain the concept of cross-validation.",
    "What are the best practices for data preprocessing?",
    "How do you handle time series data?",
  ],
  mobile: [
    "What are the key differences between native and cross-platform development?",
    "Explain the concept of mobile app architecture.",
    "How do you handle offline functionality in mobile apps?",
    "What are the best practices for mobile app security?",
    "Explain the concept of mobile app testing strategies.",
    "How do you handle push notifications?",
    "What are the best practices for mobile UI/UX?",
    "How do you implement deep linking?",
    "Explain the concept of mobile app performance optimization.",
    "What are the best practices for mobile app deployment?",
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
  const [showTimeWarning, setShowTimeWarning] = useState(false);

  // Timer effect with warning
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0 && !isTestComplete) {
      // Show warning when 30 seconds remaining
      if (timeLeft === 30) {
        setShowTimeWarning(true);
        toast({
          title: "Time Warning",
          description: "30 seconds remaining!",
          variant: "destructive",
        });
      }

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

  const getTimeColor = (seconds: number) => {
    if (seconds <= 30) return "text-red-500";
    if (seconds <= 60) return "text-yellow-500";
    return "text-green-500";
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
      setShowTimeWarning(false);
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
    const unansweredQuestions = questions.filter(
      (q) => !answers[q.id] || answers[q.id].trim() === ""
    ).length;

    if (unansweredQuestions > 0) {
      const confirmSubmit = window.confirm(
        `You have ${unansweredQuestions} unanswered question(s). Are you sure you want to submit?`
      );
      if (!confirmSubmit) return;
    }

    setIsTestComplete(true);
    toast({
      title: "Test Complete",
      description: "Your answers have been submitted successfully!",
    });
  };

  const progress = (currentQuestionIndex / questions.length) * 100;
  const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = questions.length;

  return (
    <DashboardLayout userType="student" navItems={studentNavItems}>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Skill Assessment Test</h1>
          {timeLeft > 0 && !isTestComplete && (
            <div className={`flex items-center gap-2 text-lg font-semibold ${getTimeColor(timeLeft)}`}>
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
            <div className="flex justify-between items-center">
              <Progress value={progress} className="h-2 flex-1" />
              <span className="ml-4 text-sm text-muted-foreground">
                {answeredQuestions}/{totalQuestions} Answered
              </span>
            </div>
            
            {showTimeWarning && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Time is running out! Please complete your answers.
                </AlertDescription>
              </Alert>
            )}
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </CardTitle>
                  <span className={`text-sm font-medium ${getTimeColor(timeLeft)}`}>
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
                      className="w-full min-h-[150px] p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  {currentQuestionIndex === questions.length - 1 ? (
                    <Button 
                      onClick={handleSubmit}
                      className="flex items-center gap-2"
                    >
                      Submit Test
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNext}
                      className="flex items-center gap-2"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
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