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
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, Upload, AlertCircle, CheckCircle2, Loader2, Info, Target } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AnalysisResult {
  score: number;
  formattingIssues: string[];
  optimizationTips: string[];
  jobMatchScore?: number;
  matchingKeywords?: string[];
  missingKeywords?: string[];
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

  const analyzeResume = async (resumeText: string): Promise<AnalysisResult> => {
    const resumeLower = resumeText.toLowerCase();

    // Calculate section scores
    const sections = {
      skills: resumeLower.includes('skills') ? 1 : 0,
      experience: resumeLower.includes('experience') || resumeLower.includes('work') ? 1 : 0,
      education: resumeLower.includes('education') || resumeLower.includes('academic') ? 1 : 0,
      projects: resumeLower.includes('projects') || resumeLower.includes('portfolio') ? 1 : 0
    };

    // Calculate formatting score
    const formattingScore = calculateFormattingScore(resumeText);

    // Calculate content score
    const contentScore = calculateContentScore(resumeText, sections);

    // Calculate total score
    const totalScore = Math.round((formattingScore * 0.4) + (contentScore * 0.6));

    // Analyze job description match if provided
    let jobMatchScore = undefined;
    let matchingKeywords = undefined;
    let missingKeywords = undefined;

    if (jobDescription) {
      const jobAnalysis = analyzeJobMatch(resumeLower, jobDescription.toLowerCase());
      jobMatchScore = jobAnalysis.matchScore;
      matchingKeywords = jobAnalysis.matchingKeywords;
      missingKeywords = jobAnalysis.missingKeywords;
    }

    return {
      score: totalScore,
      formattingIssues: [],
      optimizationTips: [],
      jobMatchScore,
      matchingKeywords,
      missingKeywords
    };
  };

  const calculateFormattingScore = (resumeText: string): number => {
    let score = 100;
    
    // Check for proper section separation
    const sections = ['skills', 'experience', 'education', 'projects'];
    const hasSections = sections.some(section => resumeText.toLowerCase().includes(section));
    if (!hasSections) score -= 20;

    // Check for bullet points
    if (!resumeText.includes('•') && !resumeText.includes('-')) score -= 15;

    // Check for proper length
    if (resumeText.length < 200) score -= 20;
    if (resumeText.length > 2000) score -= 10;

    // Check for proper line breaks
    const lineCount = resumeText.split('\n').length;
    if (lineCount < 10) score -= 15;

    // Check for proper spacing
    if (resumeText.includes('  ')) score -= 10; // Double spaces
    if (resumeText.includes('\t')) score -= 10; // Tabs

    return Math.max(0, score);
  };

  const calculateContentScore = (resumeText: string, sections: { [key: string]: number }): number => {
    let score = 100;

    // Section completeness (40% of content score)
    const sectionScore = Object.values(sections).reduce((sum, score) => sum + score, 0) * 25;
    score = (score * 0.6) + (sectionScore * 0.4);

    // Content quality checks
    if (!resumeText.match(/\d+/)) score -= 10; // No numbers/quantifiable achievements
    if (!resumeText.match(/[A-Z][a-z]+/)) score -= 10; // No proper capitalization
    if (resumeText.split('.').length < 5) score -= 10; // Too few sentences

    return Math.max(0, score);
  };

  const analyzeJobMatch = (resumeText: string, jobDesc: string) => {
    // Extract keywords from job description
    const keywords = new Set<string>();
    const requiredKeywords = new Set<string>();
    const preferredKeywords = new Set<string>();

    // Split job description into lines and analyze each line
    const lines = jobDesc.split('\n');
    lines.forEach(line => {
      const words = line.split(/[\s,.-]+/).filter(word => word.length > 3);
      words.forEach(word => {
        if (line.includes('required') || line.includes('must have') || line.includes('essential')) {
          requiredKeywords.add(word);
        } else if (line.includes('preferred') || line.includes('nice to have')) {
          preferredKeywords.add(word);
        }
        keywords.add(word);
      });
    });

    // Find matching and missing keywords
    const matchingKeywords = Array.from(keywords).filter(keyword => 
      resumeText.includes(keyword) || 
      resumeText.includes(keyword + 's') || 
      resumeText.includes(keyword + 'ing')
    );

    const missingKeywords = Array.from(keywords).filter(keyword => 
      !resumeText.includes(keyword) && 
      !resumeText.includes(keyword + 's') && 
      !resumeText.includes(keyword + 'ing')
    );

    // Calculate match score with weights
    const requiredMatches = Array.from(requiredKeywords).filter(keyword => 
      resumeText.includes(keyword) || 
      resumeText.includes(keyword + 's') || 
      resumeText.includes(keyword + 'ing')
    ).length;

    const preferredMatches = Array.from(preferredKeywords).filter(keyword => 
      resumeText.includes(keyword) || 
      resumeText.includes(keyword + 's') || 
      resumeText.includes(keyword + 'ing')
    ).length;

    const requiredScore = requiredKeywords.size > 0 ? (requiredMatches / requiredKeywords.size) * 100 : 100;
    const preferredScore = preferredKeywords.size > 0 ? (preferredMatches / preferredKeywords.size) * 100 : 100;
    const generalScore = keywords.size > 0 ? (matchingKeywords.length / keywords.size) * 100 : 100;

    // Weighted score calculation
    const matchScore = Math.round(
      (requiredScore * 0.5) + // Required keywords are most important
      (preferredScore * 0.3) + // Preferred keywords are secondary
      (generalScore * 0.2) // General keyword matches
    );

    return {
      matchScore,
      matchingKeywords,
      missingKeywords
    };
  };

  const calculateATSScore = async () => {
    if (!resumeFile) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please upload a resume",
      });
      return;
    }

    setIsLoading(true);
    try {
      const resumeText = await extractTextFromFile(resumeFile);
      const result = await analyzeResume(resumeText);
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
          Upload your resume to check ATS compatibility
        </p>
      </div>

      <div className="space-y-6">
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
                  <li>Include all relevant sections (Skills, Experience, Education)</li>
                  <li>Keep file size under 5MB</li>
                  <li>Use standard fonts and formatting</li>
                  <li>Include quantifiable achievements</li>
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
            <CardFooter>
              <Button
                className="w-full"
                onClick={calculateATSScore}
                disabled={!resumeFile || isLoading}
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
            </CardFooter>
          </CardContent>
        </Card>

        {/* ATS Score Card */}
        {analysisResult && (
          <Card>
            <CardHeader>
              <CardTitle>ATS Compatibility Analysis</CardTitle>
              <CardDescription>Your resume's general ATS compatibility score</CardDescription>
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
              </div>
            </CardContent>
          </Card>
        )}

        {/* Job Description Section */}
        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
            <CardDescription>Paste the job description to analyze match percentage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Target className="h-4 w-4" />
              <AlertTitle>Tips for best results</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-4 mt-2 space-y-1">
                  <li>Include the complete job description</li>
                  <li>Copy directly from the job posting</li>
                  <li>Include required skills and qualifications</li>
                  <li>Include preferred qualifications if any</li>
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
          <CardFooter>
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
                "Calculate Match Percentage"
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Job Description Match Card */}
        {analysisResult && analysisResult.jobMatchScore !== undefined && (
          <Card>
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Job Description Match Analysis</CardTitle>
                  <CardDescription>How well your resume matches the job requirements</CardDescription>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${
                    analysisResult.jobMatchScore >= 80 ? 'text-green-600' :
                    analysisResult.jobMatchScore >= 60 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {analysisResult.jobMatchScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">Match Score</div>
                </div>
              </div>
              <Progress 
                value={analysisResult.jobMatchScore} 
                className={`h-2 ${
                  analysisResult.jobMatchScore >= 80 ? 'bg-green-100' :
                  analysisResult.jobMatchScore >= 60 ? 'bg-yellow-100' :
                  'bg-red-100'
                }`}
              />
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score Breakdown */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-700">Required Keywords</h4>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round((analysisResult.matchingKeywords?.filter(k => 
                      jobDescription.toLowerCase().includes('required') || 
                      jobDescription.toLowerCase().includes('must have') || 
                      jobDescription.toLowerCase().includes('essential')
                    ).length || 0) / (analysisResult.missingKeywords?.filter(k => 
                      jobDescription.toLowerCase().includes('required') || 
                      jobDescription.toLowerCase().includes('must have') || 
                      jobDescription.toLowerCase().includes('essential')
                    ).length || 1) * 100)}%
                  </div>
                  <p className="text-sm text-green-600">Match rate for required qualifications</p>
                </div>
                <div className="space-y-2 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-700">Preferred Keywords</h4>
                  <div className="text-2xl font-bold text-yellow-600">
                    {Math.round((analysisResult.matchingKeywords?.filter(k => 
                      jobDescription.toLowerCase().includes('preferred') || 
                      jobDescription.toLowerCase().includes('nice to have')
                    ).length || 0) / (analysisResult.missingKeywords?.filter(k => 
                      jobDescription.toLowerCase().includes('preferred') || 
                      jobDescription.toLowerCase().includes('nice to have')
                    ).length || 1) * 100)}%
                  </div>
                  <p className="text-sm text-yellow-600">Match rate for preferred qualifications</p>
                </div>
                <div className="space-y-2 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-700">Overall Match</h4>
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round((analysisResult.matchingKeywords?.length || 0) / 
                      ((analysisResult.matchingKeywords?.length || 0) + (analysisResult.missingKeywords?.length || 0)) * 100)}%
                  </div>
                  <p className="text-sm text-blue-600">Total keyword match rate</p>
                </div>
              </div>

              {/* Keyword Analysis */}
              <div className="grid gap-6">
                {/* Matching Keywords */}
                {analysisResult.matchingKeywords && analysisResult.matchingKeywords.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-600">Matching Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.matchingKeywords.map((keyword, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tips for Improvement */}
                <div className="space-y-4">
                  <h4 className="font-medium text-primary">Tips to Improve Your Score</h4>
                  <div className="grid gap-3">
                    <Alert>
                      <Target className="h-4 w-4" />
                      <AlertTitle>Optimize Your Resume Format</AlertTitle>
                      <AlertDescription>
                        Use standard fonts (Arial, Calibri, Times New Roman), clear section headers, and consistent formatting throughout your resume.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <Target className="h-4 w-4" />
                      <AlertTitle>Enhance Your Content</AlertTitle>
                      <AlertDescription>
                        Include quantifiable achievements (e.g., "Increased sales by 25%") and use industry-specific keywords naturally in your experience descriptions.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <Target className="h-4 w-4" />
                      <AlertTitle>Structure Your Resume</AlertTitle>
                      <AlertDescription>
                        Ensure you have all essential sections: Contact Information, Summary, Experience, Education, and Skills. List experiences in reverse chronological order.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout userType="student" navItems={navItems}>
      {content}
    </DashboardLayout>
  );
} 