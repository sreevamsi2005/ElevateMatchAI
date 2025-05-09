
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  MessageSquare,
  FileText,
  Briefcase,
  Users,
  LayoutDashboard,
  BarChart4,
  Shield,
} from "lucide-react";

export function Features() {
  return (
    <section className="container space-y-12 py-16 md:py-20" id="features">
      <div className="mx-auto text-center md:max-w-[58rem]">
        <h2 className="text-3xl font-bold leading-tight text-balance md:text-4xl lg:text-5xl">
          Comprehensive Features for{" "}
          <span className="gradient-text">Career Success</span>
        </h2>
        <p className="mt-4 text-balance text-muted-foreground md:text-lg">
          Personalized tools for students to prepare for their careers and for companies to find the perfect talent match.
        </p>
      </div>

      <Tabs defaultValue="students" className="w-full">
        <div className="flex justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="students">For Students</TabsTrigger>
            <TabsTrigger value="companies">For Companies</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="mt-8">
          <TabsContent value="students" className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <Card className="glass-card transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="space-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">AI Resume Builder</CardTitle>
                  <CardDescription>
                    Create ATS-friendly resumes with intelligent suggestions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>AI-powered content suggestions based on job descriptions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Multiple professional templates with customization options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>ATS optimization score with improvement recommendations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="glass-card transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="space-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Mock Interviews</CardTitle>
                  <CardDescription>
                    Practice with AI-simulated interviews for various roles.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Industry-specific interview questions and scenarios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Real-time feedback on responses and communication skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Video & audio recording with playback analysis tools</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="glass-card transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="space-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Career Roadmap</CardTitle>
                  <CardDescription>
                    Personalized career development path based on your goals.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Custom skill development recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Industry trends analysis and career path visualization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Milestone tracking with achievement certificates</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="glass-card transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="space-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Skill Assessments</CardTitle>
                  <CardDescription>
                    Verify and showcase your technical and soft skills.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Industry-standard assessments for technical skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Behavioral and soft skills evaluation tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Blockchain-verified skill badges for your profile</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="glass-card transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="space-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Job Matching</CardTitle>
                  <CardDescription>
                    Discover opportunities aligned with your skills and goals.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>AI-powered job recommendations based on your profile</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Personalized company matching algorithm</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Automated application tracking and follow-up reminders</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="glass-card transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="space-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <BarChart4 className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Performance Analytics</CardTitle>
                  <CardDescription>
                    Track your progress and identify areas for improvement.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Comprehensive skills development tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Interview performance metrics and improvement trends</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Application success rate and feedback analytics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="companies" className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <Card className="glass-card transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="space-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">AI Talent Matching</CardTitle>
                  <CardDescription>
                    Find the perfect candidates based on skills and culture fit.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Advanced matching algorithm based on skills and experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Culture fit analysis through behavioral assessment data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Candidate suggestions with compatibility percentage</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="glass-card transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="space-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">AI Interviewing</CardTitle>
                  <CardDescription>
                    Streamline initial screening with automated interviews.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Customizable AI interview questions for any role</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Automated scoring and candidate ranking system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Video and text interview options with sentiment analysis</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="glass-card transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="space-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Skill Assessments</CardTitle>
                  <CardDescription>
                    Create and administer custom assessments for candidates.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Custom assessment builder with industry templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Automated grading and detailed performance analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Anti-cheating measures and proctoring capabilities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="glass-card transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="space-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Job Post Optimization</CardTitle>
                  <CardDescription>
                    Create effective job postings that attract top talent.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>AI writing assistance for compelling job descriptions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Keyword optimization for maximum visibility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Bias detection for more inclusive recruitment</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="glass-card transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="space-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <LayoutDashboard className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Hiring Pipeline</CardTitle>
                  <CardDescription>
                    Streamlined recruitment workflow and candidate management.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Customizable hiring stages and workflow automation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Team collaboration tools with permission settings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Calendar integration for interview scheduling</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="glass-card transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="space-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Blockchain Verification</CardTitle>
                  <CardDescription>
                    Verify candidate credentials with tamper-proof technology.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Secure verification of academic credentials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Skills certification through immutable records</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                      <span>Employment history verification without manual checks</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
