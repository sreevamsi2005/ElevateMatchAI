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
import { AlertCircle, Clock, CheckCircle2, AlertTriangle, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { studentNavItems } from "@/utils/navItems";

const domains = [
  { id: 'frontend', name: 'Frontend Development' },
  { id: 'backend', name: 'Backend Development' },
  { id: 'fullstack', name: 'Full Stack Development' },
  { id: 'devops', name: 'DevOps' },
  { id: 'data-science', name: 'Data Science' },
  { id: 'mobile', name: 'Mobile Development' },
  { id: 'machine-learning', name: 'Machine Learning' },
  { id: 'cloud-computing', name: 'Cloud Computing' },
  { id: 'cybersecurity', name: 'Cybersecurity' },
  { id: 'blockchain', name: 'Blockchain Development' },
  { id: 'game-dev', name: 'Game Development' },
  { id: 'ai', name: 'Artificial Intelligence' },
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
  'machine-learning': [
    "Explain the difference between supervised and unsupervised learning.",
    "What is the purpose of cross-validation in machine learning?",
    "Describe the process of feature engineering in machine learning.",
    "What are the different types of clustering algorithms?",
    "Explain the concept of overfitting and how to prevent it.",
    "What is the difference between classification and regression?",
    "Explain the concept of gradient descent.",
    "What are neural networks and how do they work?",
    "Describe the process of model evaluation and selection.",
    "What are the best practices for handling imbalanced datasets?",
  ],
  'cloud-computing': [
    "Explain the key differences between IaaS, PaaS, and SaaS.",
    "What are the main benefits of cloud computing?",
    "Describe the concept of serverless computing.",
    "What is containerization and how does it work?",
    "Explain the concept of auto-scaling in cloud environments.",
    "What are the different types of cloud deployment models?",
    "Describe the process of cloud migration.",
    "What are the best practices for cloud security?",
    "Explain the concept of cloud storage and its types.",
    "What is cloud orchestration and why is it important?",
  ],
  'cybersecurity': [
    "Explain the CIA triad in cybersecurity.",
    "What are the different types of cyber attacks?",
    "Describe the process of penetration testing.",
    "What is encryption and how does it work?",
    "Explain the concept of network security.",
    "What are the best practices for secure coding?",
    "Describe the process of incident response.",
    "What is authentication and authorization?",
    "Explain the concept of security compliance.",
    "What are the different types of security testing?",
  ],
  'blockchain': [
    "Explain the concept of blockchain technology and its key components.",
    "What are smart contracts and how do they work?",
    "Describe the consensus mechanisms in blockchain networks.",
    "What is the difference between public and private blockchains?",
    "Explain the concept of cryptocurrency mining.",
    "What are the security features of blockchain?",
    "Describe the process of blockchain development.",
    "What is the role of cryptography in blockchain?",
    "Explain the concept of decentralized applications (dApps).",
    "What are the challenges in blockchain implementation?",
  ],
  'game-dev': [
    "Explain the game development lifecycle and its key phases.",
    "What are the different types of game engines and their features?",
    "Describe the process of game physics implementation.",
    "What is the role of game design patterns?",
    "Explain the concept of game AI and pathfinding.",
    "What are the best practices for game optimization?",
    "Describe the process of game testing and quality assurance.",
    "What is the role of game networking and multiplayer?",
    "Explain the concept of game monetization strategies.",
    "What are the different types of game development tools?",
  ],
  'ai': [
    "Explain the difference between narrow AI and general AI.",
    "What are neural networks and how do they work?",
    "Describe the process of natural language processing.",
    "What is computer vision and its applications?",
    "Explain the concept of reinforcement learning.",
    "What are the ethical considerations in AI development?",
    "Describe the process of AI model training.",
    "What is the role of data in AI systems?",
    "Explain the concept of AI bias and fairness.",
    "What are the different types of AI applications?",
  ],
};

const calculateScore = (answer: string): number => {
  if (!answer || answer.trim() === "") return 0;
  
  // Basic scoring logic - can be enhanced based on requirements
  const wordCount = answer.trim().split(/\s+/).length;
  const hasCodeExample = answer.includes("```") || answer.includes("code");
  const hasDetailedExplanation = wordCount > 50;
  
  let score = 1; // Base score
  if (hasCodeExample) score += 2;
  if (hasDetailedExplanation) score += 2;
  
  return Math.min(score, 5); // Maximum score is 5
};

const SkillTestPage = () => {
  const { toast } = useToast();
  const [selectedDomain, setSelectedDomain] = useState("");
  const [questionCount, setQuestionCount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [questionTimer, setQuestionTimer] = useState(119); // 1:59 in seconds
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [isQuestionTimeUp, setIsQuestionTimeUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Timer effect for individual questions
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (questionTimer > 0 && !isTestComplete && questions.length > 0) {
      // Show warning when 30 seconds remaining
      if (questionTimer === 30) {
        setShowTimeWarning(true);
        toast({
          title: "Time Warning",
          description: "30 seconds remaining for this question!",
          variant: "destructive",
        });
      }

      timer = setInterval(() => {
        setQuestionTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsQuestionTimeUp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [questionTimer, isTestComplete, questions.length]);

  // Reset question timer when moving to next question
  useEffect(() => {
    setQuestionTimer(119); // Reset to 1:59
    setIsQuestionTimeUp(false);
  }, [currentQuestionIndex]);

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
    try {
      setError(null);
      
      if (!selectedDomain || !questionCount) {
        toast({
          title: "Error",
          description: "Please select a domain and number of questions",
          variant: "destructive",
        });
        return;
      }

      const count = parseInt(questionCount);
      if (count < 1) {
        toast({
          title: "Error",
          description: "Please select at least 1 question",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        try {
          const domainQuestions = mockQuestions[selectedDomain as keyof typeof mockQuestions];
          if (!domainQuestions) {
            throw new Error(`No questions found for domain: ${selectedDomain}`);
          }

          // Convert questions to objects with IDs
          const questionsWithIds = domainQuestions.map((question, index) => ({
            id: index + 1,
            question: question
          }));

          const selectedQuestions = questionsWithIds
            .sort(() => Math.random() - 0.5)
            .slice(0, count);

          if (selectedQuestions.length === 0) {
            throw new Error("No questions could be selected");
          }

          setQuestions(selectedQuestions);
          setCurrentQuestionIndex(0);
          setAnswers({});
          setIsTestComplete(false);
          setShowTimeWarning(false);
          setQuestionTimer(119); // Start with 1:59
          setTotalScore(selectedQuestions.length * 5); // Set total possible score

          toast({
            title: "Test Started",
            description: `Starting test with ${count} questions`,
          });
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred");
          toast({
            title: "Error",
            description: "Failed to generate questions. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (answer: string) => {
    setAnswers((prev) => {
      const newAnswers = {
        ...prev,
        [questions[currentQuestionIndex].id]: answer,
      };
      
      // Calculate new total score
      const newScore = Object.values(newAnswers).reduce((total, ans) => total + calculateScore(ans), 0);
      setScore(newScore);
      
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setQuestionTimer(119); // Reset to 1:59 for next question
      setIsQuestionTimeUp(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setQuestionTimer(119); // Reset to 1:59 for previous question
      setIsQuestionTimeUp(false);
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
          {questions.length > 0 && !isTestComplete && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-lg font-semibold">
                  Score: {score}/{totalScore}
                </span>
              </div>
              <div className={`flex items-center gap-2 text-lg font-semibold ${getTimeColor(questionTimer)}`}>
                <Clock className="h-5 w-5" />
                <span>{formatTime(questionTimer)}</span>
              </div>
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
                      {domains.map((domain) => (
                        <SelectItem key={domain.id} value={domain.id}>
                          {domain.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Number of Questions</label>
                  <Input
                    type="number"
                    min="1"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(e.target.value)}
                    placeholder="Enter number of questions"
                  />
                  <p className="text-sm text-muted-foreground">
                    You can select any number of questions. Each question has a 2-minute time limit.
                  </p>
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
                  Time is running out for this question! Please complete your answer.
                </AlertDescription>
              </Alert>
            )}

            {isQuestionTimeUp && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Time's up for this question! You can still submit your answer or move to the next question.
                </AlertDescription>
              </Alert>
            )}
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">
                      Current Score: {calculateScore(answers[questions[currentQuestionIndex].id] || "")}/5
                    </span>
                    <span className={`text-sm font-medium ${getTimeColor(questionTimer)}`}>
                      {formatTime(questionTimer)}
                    </span>
                  </div>
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
                      className="w-full min-h-[150px] p-3 border rounded-md bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={answers[questions[currentQuestionIndex].id] || ""}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      placeholder="Type your answer here..."
                      disabled={isQuestionTimeUp}
                    />
                    <div className="text-sm text-muted-foreground">
                      Tip: Include code examples and detailed explanations for better scores
                    </div>
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
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <span className="text-2xl font-bold">Final Score: {score}/{totalScore}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Percentage: {Math.round((score / totalScore) * 100)}%
                </div>
              </div>
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  Thank you for completing the test! Your answers have been submitted.
                </AlertDescription>
              </Alert>
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleStartTest}
                  className="flex items-center gap-2"
                >
                  Start New Test
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SkillTestPage; 