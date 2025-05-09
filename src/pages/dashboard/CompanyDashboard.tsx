
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
  BarChart,
  Briefcase,
  Calendar,
  Clock,
  FileText,
  Filter,
  Home,
  MessageSquare,
  Settings,
  UsersRound,
  Plus,
  CheckCircle2,
  Play,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";

const navItems = [
  {
    title: "Overview",
    href: "/company-dashboard",
    icon: Home,
  },
  {
    title: "Job Postings",
    href: "/company-dashboard/jobs",
    icon: Briefcase,
  },
  {
    title: "Candidates",
    href: "/company-dashboard/candidates",
    icon: UsersRound,
  },
  {
    title: "Interviews",
    href: "/company-dashboard/interviews",
    icon: MessageSquare,
  },
  {
    title: "Assessments",
    href: "/company-dashboard/assessments",
    icon: FileText,
  },
  {
    title: "Analytics",
    href: "/company-dashboard/analytics",
    icon: BarChart,
  },
  {
    title: "Settings",
    href: "/company-dashboard/settings",
    icon: Settings,
  },
];

export default function CompanyDashboard() {
  const [openPositions, setOpenPositions] = useState(5);
  const [totalCandidates, setTotalCandidates] = useState(127);
  const [interviewsScheduled, setInterviewsScheduled] = useState(14);
  
  return (
    <DashboardLayout userType="company" navItems={navItems}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">TechCorp Dashboard</h1>
            <p className="text-muted-foreground">Manage your recruitment process efficiently</p>
          </div>
          <div className="hidden md:block">
            <Button className="btn-gradient">
              <Plus className="mr-2 h-4 w-4" />
              Post New Job
            </Button>
          </div>
        </div>

        {/* Stats overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Open Positions</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{openPositions}</div>
              <p className="text-xs text-muted-foreground">
                Across 3 departments
              </p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Total Candidates</CardTitle>
              <UsersRound className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCandidates}</div>
              <p className="text-xs text-muted-foreground">
                +23 this week
              </p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Interviews Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{interviewsScheduled}</div>
              <p className="text-xs text-muted-foreground">
                Next 7 days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Hiring Pipeline Overview */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Hiring Pipeline</CardTitle>
            <CardDescription>Active recruitment progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Senior Frontend Developer</h3>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    High Priority
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">18 candidates</div>
              </div>
              <div className="grid grid-cols-5 gap-1">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Applied</span>
                    <span className="font-medium">18</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Screening</span>
                    <span className="font-medium">12</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Interview</span>
                    <span className="font-medium">5</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Assessment</span>
                    <span className="font-medium">3</span>
                  </div>
                  <Progress value={17} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Offer</span>
                    <span className="font-medium">1</span>
                  </div>
                  <Progress value={6} className="h-2" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">UX Designer</h3>
                  <Badge variant="outline" className="bg-muted text-foreground">
                    Standard
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">24 candidates</div>
              </div>
              <div className="grid grid-cols-5 gap-1">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Applied</span>
                    <span className="font-medium">24</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Screening</span>
                    <span className="font-medium">16</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Interview</span>
                    <span className="font-medium">8</span>
                  </div>
                  <Progress value={33} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Assessment</span>
                    <span className="font-medium">5</span>
                  </div>
                  <Progress value={21} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Offer</span>
                    <span className="font-medium">2</span>
                  </div>
                  <Progress value={8} className="h-2" />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="ghost" asChild>
                <a href="/company-dashboard/jobs">
                  View all positions <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Upcoming Interviews */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Interviews</CardTitle>
              <CardDescription>Scheduled for the next 48 hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 rounded-md border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">David Chen</p>
                    <div className="flex gap-2 items-center">
                      <p className="text-sm text-muted-foreground">Frontend Developer</p>
                      <Badge variant="outline" className="text-xs">Technical</Badge>
                    </div>
                  </div>
                  <div className="text-sm text-right">
                    <p className="font-medium">Today</p>
                    <p className="text-muted-foreground">2:30 PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-md border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Sarah Johnson</p>
                    <div className="flex gap-2 items-center">
                      <p className="text-sm text-muted-foreground">UX Designer</p>
                      <Badge variant="outline" className="text-xs">Portfolio</Badge>
                    </div>
                  </div>
                  <div className="text-sm text-right">
                    <p className="font-medium">Today</p>
                    <p className="text-muted-foreground">4:15 PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-md border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Michael Park</p>
                    <div className="flex gap-2 items-center">
                      <p className="text-sm text-muted-foreground">Backend Developer</p>
                      <Badge variant="outline" className="text-xs">Final</Badge>
                    </div>
                  </div>
                  <div className="text-sm text-right">
                    <p className="font-medium">Tomorrow</p>
                    <p className="text-muted-foreground">11:00 AM</p>
                  </div>
                </div>
              </div>

              <Button variant="ghost" className="w-full" asChild>
                <a href="/company-dashboard/interviews">
                  Manage all interviews <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Featured AI Tool */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle>AI Interview Assistant</CardTitle>
              <CardDescription>
                Automate initial candidate screening with AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-md flex items-center gap-3">
                  <CheckCircle2 className="text-green-500 h-5 w-5" />
                  <div className="text-sm">
                    <p className="font-medium">Save 80% Time</p>
                    <p className="text-xs text-muted-foreground">Automated pre-screening</p>
                  </div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-md flex items-center gap-3">
                  <CheckCircle2 className="text-green-500 h-5 w-5" />
                  <div className="text-sm">
                    <p className="font-medium">Custom Questions</p>
                    <p className="text-xs text-muted-foreground">Tailored assessments</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button className="btn-gradient">
                  Setup AI Interviews
                </Button>
                <Button variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
