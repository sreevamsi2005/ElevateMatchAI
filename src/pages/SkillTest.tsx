import React, { useState } from 'react';
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
  // Add more domains and questions as needed
};

const SkillTest = () => {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<string[]>([]);

  const handleStartTest = () => {
    if (!selectedDomain || questionCount < 1) return;

    const domainQuestions = mockQuestions[selectedDomain as keyof typeof mockQuestions] || [];
    const selectedQuestions = domainQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(questionCount, domainQuestions.length));

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
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
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
                onChange={(e) => setQuestionCount(parseInt(e.target.value) || 1)}
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