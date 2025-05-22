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
import { FileText, Upload, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
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
    if (file && (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setResumeFile(file);
      setAnalysisResult(null); // Reset analysis when new file is uploaded
    } else {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file",
      });
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    // This is a placeholder for actual file parsing logic
    // In a real implementation, you would use libraries like pdf.js for PDFs
    // and mammoth.js for DOCX files
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
    // Convert both texts to lowercase for case-insensitive matching
    const resumeLower = resumeText.toLowerCase();
    const jobDescLower = jobDescription.toLowerCase();

    // Extract keywords from job description (simple implementation)
    const keywords = jobDescLower
      .split(/[\s,.-]+/)
      .filter(word => word.length > 3)
      .filter((word, index, self) => self.indexOf(word) === index);

    // Find missing keywords
    const missingKeywords = keywords.filter(keyword => !resumeLower.includes(keyword));

    // Calculate score based on keyword matches
    const matchedKeywords = keywords.filter(keyword => resumeLower.includes(keyword));
    const score = Math.round((matchedKeywords.length / keywords.length) * 100);

    // Analyze formatting (placeholder implementation)
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
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6">
              <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
              <Label htmlFor="resume" className="cursor-pointer">
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={handleResumeUpload}
                />
                <Button variant="outline" className="mt-2">
                  Choose File
                </Button>
              </Label>
              {resumeFile && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Selected: {resumeFile.name}
                </p>
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
          <CardContent>
            <Textarea
              placeholder="Paste the job description here..."
              className="h-[200px]"
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                setAnalysisResult(null); // Reset analysis when job description changes
              }}
            />
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
            <CardDescription>Your resume's compatibility score and feedback</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score Display */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">ATS Compatibility Score</span>
                <span className="text-sm text-muted-foreground">{analysisResult.score}%</span>
              </div>
              <Progress value={analysisResult.score} className="h-2" />
            </div>

            {/* Missing Keywords */}
            {analysisResult.missingKeywords.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Missing Keywords</h3>
                <div className="grid gap-2">
                  {analysisResult.missingKeywords.map((keyword, index) => (
                    <Alert key={index} variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>{keyword}</AlertTitle>
                    </Alert>
                  ))}
                </div>
              </div>
            )}

            {/* Formatting Issues */}
            {analysisResult.formattingIssues.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Formatting Issues</h3>
                <div className="grid gap-2">
                  {analysisResult.formattingIssues.map((issue, index) => (
                    <Alert key={index} variant="warning">
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
                <h3 className="font-medium">Optimization Tips</h3>
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