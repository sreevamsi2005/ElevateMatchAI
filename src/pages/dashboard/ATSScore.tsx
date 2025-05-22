import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { navItems } from "@/utils/navItems";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, Upload, AlertCircle, CheckCircle2, Loader2, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AnalysisResult {
  score: number;
  missingKeywords: string[];
  formattingIssues: string[];
  optimizationTips: string[];
}

export default function ATSScore() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
        });
        return;
      }

      // Check file type
      if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setResumeFile(file);
        setAnalysisResult(null); // Reset analysis when new file is uploaded
        toast({
          title: "Resume uploaded",
          description: "Your resume has been uploaded successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF or DOCX file",
        });
      }
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        resolve(text);
      };
      reader.readAsText(file);
    });
  };

  const analyzeResume = async (resumeText: string, jobDescription: string): Promise<AnalysisResult> => {
    const resumeLower = resumeText.toLowerCase();
    const jobDescLower = jobDescription.toLowerCase();

    // Extract keywords from job description
    const keywords = jobDescLower
      .split(/[\s,.-]+/)
      .filter(word => word.length > 3)
      .filter((word, index, self) => self.indexOf(word) === index);

    // Find missing keywords
    const missingKeywords = keywords.filter(keyword => !resumeLower.includes(keyword));

    // Calculate score based on keyword matches
    const matchedKeywords = keywords.filter(keyword => resumeLower.includes(keyword));
    const score = Math.round((matchedKeywords.length / keywords.length) * 100);

    // Analyze formatting
    const formattingIssues = [];
    if (resumeText.length < 200) {
      formattingIssues.push("Resume appears too short");
    }
    if (resumeText.split('\n').length < 10) {
      formattingIssues.push("Resume may lack proper section separation");
    }

    // Generate optimization tips
    const optimizationTips = [];
    if (missingKeywords.length > 0) {
      optimizationTips.push("Add missing keywords naturally in your experience descriptions");
    }
    if (score < 70) {
      optimizationTips.push("Consider adding more relevant skills and experiences");
    }
    if (formattingIssues.length > 0) {
      optimizationTips.push("Improve resume structure and formatting");
    }

    return {
      score,
      missingKeywords,
      formattingIssues,
      optimizationTips,
    };
  };

  const calculateATSScore = async () => {
    if (!resumeFile || !jobDescription) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please upload a resume and provide a job description",
      });
      return;
    }

    if (jobDescription.length < 50) {
      toast({
        variant: "destructive",
        title: "Job description too short",
        description: "Please provide a more detailed job description for better analysis",
      });
      return;
    }

    setIsLoading(true);
    try {
      const resumeText = await extractTextFromFile(resumeFile);
      const result = await analyzeResume(resumeText, jobDescription);
      setAnalysisResult(result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: "There was an error analyzing your resume. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const content = (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ATS Score</h1>
        <p className="text-muted-foreground">
          Upload your resume and job description to check ATS compatibility
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Resume Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Resume Upload</CardTitle>
            <CardDescription>Upload your resume in PDF or DOCX format</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Tips for best results</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-4 mt-2 space-y-1">
                  <li>Use a clear, well-formatted resume</li>
                  <li>Include relevant skills and experiences</li>
                  <li>Keep file size under 5MB</li>
                  <li>Use standard fonts and formatting</li>
                </ul>
              </AlertDescription>
            </Alert>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6">
              <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
              <div className="flex flex-col items-center gap-2">
                <Label htmlFor="resume" className="cursor-pointer">
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={handleResumeUpload}
                  />
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => document.getElementById('resume')?.click()}
                  >
                    Choose File
                  </Button>
                </Label>
                <p className="text-sm text-muted-foreground">
                  Supported formats: PDF, DOC, DOCX (max 5MB)
                </p>
              </div>
              {resumeFile && (
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>Selected: {resumeFile.name}</p>
                  <p className="text-xs">Size: {(resumeFile.size / 1024 / 1024).toFixed(2)}MB</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Job Description Section */}
        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
            <CardDescription>Paste the job description to analyze</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Tips for best results</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-4 mt-2 space-y-1">
                  <li>Include the full job description</li>
                  <li>Copy directly from the job posting</li>
                  <li>Include required skills and qualifications</li>
                  <li>Minimum 50 characters recommended</li>
                </ul>
              </AlertDescription>
            </Alert>
            <Textarea
              placeholder="Paste the job description here..."
              className="h-[200px]"
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                setAnalysisResult(null);
              }}
            />
            <div className="text-sm text-muted-foreground">
              Characters: {jobDescription.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Button
        className="w-full"
        onClick={calculateATSScore}
        disabled={!resumeFile || !jobDescription || isLoading}
      >
        {isLoading ? (
          <React.Fragment>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </React.Fragment>
        ) : (
          "Calculate ATS Score"
        )}
      </Button>

      {/* Results Section */}
      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle>ATS Analysis Results</CardTitle>
            <CardDescription>Your resume's compatibility score and improvement suggestions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score Display */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">ATS Compatibility Score</span>
                <span className={`text-lg font-bold ${
                  analysisResult.score >= 80 ? 'text-green-600' :
                  analysisResult.score >= 60 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {analysisResult.score}%
                </span>
              </div>
              <Progress 
                value={analysisResult.score} 
                className={`h-3 ${
                  analysisResult.score >= 80 ? 'bg-green-100' :
                  analysisResult.score >= 60 ? 'bg-yellow-100' :
                  'bg-red-100'
                }`}
              />
              <div className="mt-4">
                {analysisResult.score >= 80 ? (
                  <div className="space-y-2">
                    <h3 className="font-medium text-green-700">Excellent ATS Compatibility</h3>
                    <p className="text-sm text-gray-600">
                      Your resume is well-optimized for ATS systems. Keep maintaining these best practices:
                    </p>
                    <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                      <li>Continue using relevant keywords naturally in your content</li>
                      <li>Maintain clear section headings and formatting</li>
                      <li>Keep your resume concise and well-structured</li>
                    </ul>
                  </div>
                ) : analysisResult.score >= 60 ? (
                  <div className="space-y-2">
                    <h3 className="font-medium text-yellow-700">Good ATS Compatibility</h3>
                    <p className="text-sm text-gray-600">
                      Your resume has decent ATS compatibility. Here's how to improve it further:
                    </p>
                    <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                      <li>Add more relevant keywords from the job description</li>
                      <li>Ensure all sections are properly formatted</li>
                      <li>Make your achievements more quantifiable</li>
                      <li>Use bullet points for better readability</li>
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="font-medium text-red-700">Needs Improvement</h3>
                    <p className="text-sm text-gray-600">
                      Your resume needs optimization to pass ATS screening. Focus on these areas:
                    </p>
                    <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                      <li>Incorporate more keywords from the job description</li>
                      <li>Improve section organization and formatting</li>
                      <li>Add specific achievements and metrics</li>
                      <li>Ensure all text is selectable (not in images)</li>
                      <li>Use standard fonts and formatting</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Formatting Issues */}
            {analysisResult.formattingIssues.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Formatting Improvements Needed</h3>
                <div className="grid gap-2">
                  {analysisResult.formattingIssues.map((issue, index) => (
                    <Alert key={index} variant="default">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>{issue}</AlertTitle>
                    </Alert>
                  ))}
                </div>
              </div>
            )}

            {/* Optimization Tips */}
            {analysisResult.optimizationTips.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Key Optimization Tips</h3>
                <div className="grid gap-2">
                  {analysisResult.optimizationTips.map((tip, index) => (
                    <Alert key={index} variant="default">
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle>{tip}</AlertTitle>
                    </Alert>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <DashboardLayout userType="student" navItems={navItems}>
      {content}
    </DashboardLayout>
  );
} 