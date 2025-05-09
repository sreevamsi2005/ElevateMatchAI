
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, GraduationCap, Building } from "lucide-react";

export default function Welcome() {
  const { user, userDetails, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isStudent = userDetails?.user_type === "student";
  const dashboardPath = isStudent ? "/student-dashboard" : "/company-dashboard";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/30">
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <span className="text-sm font-bold text-white">E</span>
            </div>
            <span className="font-bold text-lg">ElevateMatchAI</span>
          </div>

          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
      </header>

      <main className="flex-1 container max-w-6xl px-4 py-12 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to ElevateMatchAI</h1>
          <p className="text-muted-foreground text-lg">
            Hello, {userDetails?.first_name || "there"}! 
            Get started with our {isStudent ? "student" : "company"} tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="bg-card shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isStudent ? (
                  <>
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span>Student Dashboard</span>
                  </>
                ) : (
                  <>
                    <Building className="h-5 w-5 text-primary" />
                    <span>Company Dashboard</span>
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {isStudent
                  ? "Access your AI career tools, resume builder, and more."
                  : "Post jobs, review applications, and manage your talent pipeline."
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {isStudent ? (
                  <>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>AI Resume Builder & Analyzer</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>Mock Interview Simulator</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>Career Roadmap Generator</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>Job Posting & Management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>AI Resume Filtering & Ranking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>Automated Interview Scheduling</span>
                    </li>
                  </>
                )}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="btn-gradient w-full"
                onClick={() => navigate(dashboardPath)}
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-card shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Community & Resources</CardTitle>
              <CardDescription>
                Connect with peers, access learning resources, and stay updated.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Join Forums & Discussion Groups</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Download Resources & Templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Attend Virtual Events & Workshops</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/community")}
              >
                Explore Community
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
