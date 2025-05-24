import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  ],
  backend: [
    "Explain the concept of RESTful APIs.",
    "What is the difference between SQL and NoSQL databases?",
    "How does authentication work in web applications?",
    "Explain the concept of middleware in Express.js.",
    "What are microservices and their benefits?",
  ],
  fullstack: [
    "Explain the MERN stack architecture.",
    "How do you handle state management in a full-stack application?",
    "What are the best practices for API design?",
    "How do you implement authentication in a full-stack application?",
    "Explain the concept of server-side rendering.",
  ],
  devops: [
    "What is CI/CD and why is it important?",
    "Explain containerization and its benefits.",
    "What is Infrastructure as Code (IaC)?",
    "How do you handle monitoring and logging in a production environment?",
    "Explain the concept of microservices architecture.",
  ],
  'data-science': [
    "What is the difference between supervised and unsupervised learning?",
    "Explain the concept of overfitting and how to prevent it.",
    "What are the common evaluation metrics for classification problems?",
    "How do you handle missing data in a dataset?",
    "Explain the concept of feature engineering.",
  ],
  mobile: [
    "What are the key differences between native and cross-platform development?",
    "Explain the concept of mobile app architecture.",
    "How do you handle offline functionality in mobile apps?",
    "What are the best practices for mobile app security?",
    "Explain the concept of mobile app testing strategies.",
  ],
};

const SkillTest = () => {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<string[]>([]);

  useEffect(() => {
    console.log('SkillTest component mounted');
  }, []);

  const handleStartTest = () => {
    console.log('Starting test with domain:', selectedDomain, 'and question count:', questionCount);
    
    if (!selectedDomain || questionCount < 1) {
      console.log('Invalid domain or question count');
      return;
    }

    const domainQuestions = mockQuestions[selectedDomain as keyof typeof mockQuestions] || [];
    console.log('Available questions for domain:', domainQuestions.length);
    
    const selectedQuestions = domainQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(questionCount, domainQuestions.length));

    console.log('Selected questions:', selectedQuestions);
    setCurrentQuestions(selectedQuestions);
    setShowQuestions(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Skill Assessment Test</h1>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Configure Your Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Domain</label>
              <Select value={selectedDomain} onValueChange={(value) => {
                console.log('Domain selected:', value);
                setSelectedDomain(value);
              }}>
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
                max="20"
                value={questionCount}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  console.log('Question count changed:', value);
                  setQuestionCount(value);
                }}
              />
            </div>

            <Button 
              className="w-full"
              onClick={handleStartTest}
              disabled={!selectedDomain || questionCount < 1}
            >
              Start Test
            </Button>
          </div>
        </CardContent>
      </Card>

      {showQuestions && (
        <Card className="max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>Your Test Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentQuestions.map((question, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <p className="font-medium">Question {index + 1}:</p>
                  <p className="mt-2">{question}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SkillTest; 