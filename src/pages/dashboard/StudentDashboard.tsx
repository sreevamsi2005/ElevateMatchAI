
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  BarChart4,
  BookOpen,
  Briefcase,
  FileText,
  GraduationCap,
  Home,
  MessageSquare,
  Settings,
  Sparkles,
  BarChart,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Play,
  Award,
} from "lucide-react";

const navItems = [
  {
    title: "Overview",
    href: "/student-dashboard",
    icon: Home,
  },
  {
    title: "Resume Builder",
    href: "/student-dashboard/resume",
    icon: FileText,
  },
  {
    title: "Mock Interviews",
    href: "/student-dashboard/interviews",
    icon: MessageSquare,
  },
  {
    title: "Career Roadmap",
    href: "/student-dashboard/roadmap",
    icon: GraduationCap,
  },
  {
    title: "Skill Tests",
    href: "/student-dashboard/skills",
    icon: Sparkles,
  },
  {
    title: "Job Board",
    href: "/student-dashboard/jobs",
    icon: Briefcase,
  },
  {
    title: "Learning Path",
    href: "/student-dashboard/learning",
    icon: BookOpen,
  },
  {
    title: "Analytics",
    href: "/student-dashboard/analytics",
    icon: BarChart,
  },
  {
    title: "Settings",
    href: "/student-dashboard/settings",
    icon: Settings,
  },
];

export default function StudentDashboard() {
  const [progress, setProgress] = useState(65);

  return (
    <DashboardLayout userType="student" navItems={navItems}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alex!</h1>
            <p className="text-muted-foreground">Track your progress and career development</p>
          </div>
          <div className="hidden md:block">
            <Button className="btn-gradient">Update Profile</Button>
          </div>
        </div>

        {/* Career Readiness */}
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg">Career Readiness</CardTitle>
              <CardDescription>Your overall preparation score</CardDescription>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Level 3: Rising Star
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress: {progress}%</span>
                <span className="text-sm text-muted-foreground">{progress}/100</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2 md:grid-cols-4">
              <div className="flex flex-col items-center gap-2 rounded-md border border-border bg-background p-3">
                <FileText className="h-6 w-6 text-primary" />
                <div className="text-center">
                  <p className="text-sm font-medium">Resume</p>
                  <p className="text-xs text-muted-foreground">80% Complete</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-md border border-border bg-background p-3">
                <MessageSquare className="h-6 w-6 text-primary" />
                <div className="text-center">
                  <p className="text-sm font-medium">Interviews</p>
                  <p className="text-xs text-muted-foreground">3 Completed</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-md border border-border bg-background p-3">
                <Sparkles className="h-6 w-6 text-primary" />
                <div className="text-center">
                  <p className="text-sm font-medium">Skills</p>
                  <p className="text-xs text-muted-foreground">5/8 Verified</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-md border border-border bg-background p-3">
                <Award className="h-6 w-6 text-primary" />
                <div className="text-center">
                  <p className="text-sm font-medium">Certificates</p>
                  <p className="text-xs text-muted-foreground">2 Earned</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Recommended Jobs */}
          <Card className="glass-card md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Recommended Jobs</CardTitle>
              <CardDescription>Based on your profile and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start justify-between rounded-md border p-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10">
                      {i === 0 ? (
                        <BarChart4 className="h-5 w-5 text-primary" />
                      ) : i === 1 ? (
                        <GraduationCap className="h-5 w-5 text-primary" />
                      ) : (
                        <Briefcase className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {i === 0
                          ? "Junior Software Developer"
                          : i === 1
                          ? "UX Research Assistant"
                          : "Data Analyst Intern"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {i === 0
                          ? "TechCorp Inc. • Remote • Full-time"
                          : i === 1
                          ? "DesignHub • Hybrid • Part-time"
                          : "DataWise • On-site • Internship"}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {i === 0 ? "92% Match" : i === 1 ? "87% Match" : "83% Match"}
                  </Badge>
                </div>
              ))}

              <Button variant="ghost" className="w-full" asChild>
                <a href="/student-dashboard/jobs">
                  View all opportunities <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
              <CardDescription>Your scheduled activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 rounded-md border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Mock Interview</p>
                    <p className="text-sm text-muted-foreground">Today, 3:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-md border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">JavaScript Assessment</p>
                    <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-md border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Career Counseling</p>
                    <p className="text-sm text-muted-foreground">May 12, 2:30 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resume Builder Demo Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle>AI Resume Builder</CardTitle>
            <CardDescription>
              Create and optimize your resume with AI guidance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-md flex items-center gap-3">
                <CheckCircle2 className="text-green-500 h-5 w-5" />
                <div className="text-sm">
                  <p className="font-medium">AI Optimization</p>
                  <p className="text-xs text-muted-foreground">Improve wording and structure</p>
                </div>
              </div>
              <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-md flex items-center gap-3">
                <CheckCircle2 className="text-green-500 h-5 w-5" />
                <div className="text-sm">
                  <p className="font-medium">ATS Compatible</p>
                  <p className="text-xs text-muted-foreground">Pass resume screening systems</p>
                </div>
              </div>
              <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-md flex items-center gap-3">
                <CheckCircle2 className="text-green-500 h-5 w-5" />
                <div className="text-sm">
                  <p className="font-medium">Expert Templates</p>
                  <p className="text-xs text-muted-foreground">20+ professional designs</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button className="btn-gradient">
                Build Your Resume
              </Button>
              <Button variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
