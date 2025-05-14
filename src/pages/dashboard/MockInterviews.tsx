
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { studentNavItems } from "@/utils/navItems";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, MessageSquare, Video, Laptop, FileText, CheckCircle } from "lucide-react";

export default function MockInterviews() {
  const { userDetails } = useAuth();
  const userType = userDetails?.user_type || "student";

  return (
    <DashboardLayout userType={userType as "student" | "company"} navItems={studentNavItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mock Interviews</h1>
          <p className="text-muted-foreground">
            Practice your interview skills with AI-powered simulations
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Behavioral Interviews
              </CardTitle>
              <CardDescription>
                Practice answering common behavioral questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Get feedback on your communication skills, body language, and response quality.
              </p>
              <Button variant="outline" className="w-full">
                Start Session
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Laptop className="h-5 w-5 text-primary" />
                Technical Interviews
              </CardTitle>
              <CardDescription>
                Practice coding problems and system design
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Test your problem-solving skills with real technical interview questions.
              </p>
              <Button variant="outline" className="w-full">
                Start Session
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                Video Interviews
              </CardTitle>
              <CardDescription>
                Record yourself answering interview questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Get AI feedback on your video responses and body language.
              </p>
              <Button variant="outline" className="w-full">
                Start Session
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Schedule with Coach
              </CardTitle>
              <CardDescription>
                Book a session with an industry professional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Get personalized feedback and coaching from experienced interviewers.
              </p>
              <Button variant="outline" className="w-full">
                Book Session
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Interview Guides
              </CardTitle>
              <CardDescription>
                Learn interview best practices and tips
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Access resources to prepare for different types of interviews.
              </p>
              <Button variant="outline" className="w-full">
                View Guides
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                My Progress
              </CardTitle>
              <CardDescription>
                Track your interview practice history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                View your performance metrics and improvement over time.
              </p>
              <Button variant="outline" className="w-full">
                View Progress
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
