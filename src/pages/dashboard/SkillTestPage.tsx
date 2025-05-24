import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { navItems } from "@/utils/navItems";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Info, Target, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default function SkillTestPage() {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const { toast } = useToast();

  const handleStartTest = async () => {
    try {
      setIsLoading(true);
      
      if (!selectedDomain || questionCount < 1) {
        toast({
          variant: "destructive",
          title: "Invalid Input",
          description: "Please select a domain and specify the number of questions",
        });
        return;
      }

      const domainQuestions = mockQuestions[selectedDomain as keyof typeof mockQuestions];
      if (!domainQuestions || domainQuestions.length === 0) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No questions available for the selected domain",
        });
        return;
      }

      // Randomly select questions
      const selectedQuestions = domainQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(questionCount, domainQuestions.length));

      setQuestions(selectedQuestions);
      
      toast({
        title: "Test Generated",
        description: "Your skill test has been generated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate test questions",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout navItems={navItems} userType="student">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Skill Assessment Test</h1>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Configure Your Test</CardTitle>
            <CardDescription>
              Select your domain and specify the number of questions for your skill assessment test.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="domain">Select Domain</Label>
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
                <Label htmlFor="questionCount">Number of Questions</Label>
                <Input
                  id="questionCount"
                  type="number"
                  min="1"
                  max="20"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(parseInt(e.target.value) || 1)}
                />
              </div>

              <Button 
                className="w-full"
                onClick={handleStartTest}
                disabled={!selectedDomain || questionCount < 1 || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Questions...
                  </>
                ) : (
                  "Start Test"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {questions.length > 0 && (
          <Card className="max-w-2xl mx-auto mt-8">
            <CardHeader>
              <CardTitle>Your Test Questions</CardTitle>
              <CardDescription>
                Answer these questions to assess your skills in {domains.find(d => d.id === selectedDomain)?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <p className="font-medium">Question {index + 1}:</p>
                    <p className="mt-2">{question}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>
                  Take your time to answer each question thoroughly. These questions are designed to test your knowledge and understanding of the selected domain.
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
} 