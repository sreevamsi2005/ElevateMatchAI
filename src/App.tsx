import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider } from "@/context/AuthContext";
import { HelmetProvider } from "react-helmet-async";

// Landing pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import JobApplication from "./pages/JobApplication";

// Auth pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AuthCallback from "./pages/auth/callback";
import ResetPassword from "./pages/auth/ResetPassword";

// Dashboard pages
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import CompanyDashboard from "./pages/dashboard/CompanyDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminUsers from "./pages/dashboard/AdminUsers";
import UpdateProfile from "./pages/dashboard/UpdateProfile";
import ResumeBuilder from "./pages/dashboard/ResumeBuilder";
import Settings from "./pages/dashboard/Settings";
import CareerRoadmap from "./pages/dashboard/CareerRoadmap";
import LearningPath from "./pages/dashboard/LearningPath";
import OffCampusCalendar from "./pages/dashboard/OffCampusCalendar";
import MockInterviews from "./pages/dashboard/MockInterviews";
import ATSScore from "./pages/dashboard/ATSScore";

// Company pages
import CompanyProfile from "./pages/dashboard/companyPages/CompanyProfile";
import Overview from "./pages/dashboard/companyPages/overview/Overview";
import JobPostings from "./pages/dashboard/companyPages/jobPostings/JobPostings";
import CandidateDatabase from "./pages/dashboard/companyPages/candidateDatabase/CandidateDatabase";
import Applications from "./pages/dashboard/companyPages/applications/Applications";
import Interviews from "./pages/dashboard/companyPages/interviews/Interviews";
import Analytics from "./pages/dashboard/companyPages/analytics/Analytics";
import TalentPool from "./pages/dashboard/companyPages/talentPool/TalentPool";
import Notifications from "./pages/dashboard/companyPages/notifications/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <HelmetProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/community" element={<Community />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/job-application/:jobId" element={<JobApplication />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                
                {/* Redirect old welcome page to dashboard */}
                <Route path="/welcome" element={<Navigate to="/student-dashboard" replace />} />
                
                {/* Student Dashboard */}
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/student-dashboard/resume" element={<ResumeBuilder />} />
                <Route path="/student-dashboard/interviews" element={<MockInterviews />} />
                <Route path="/student-dashboard/update-profile" element={<UpdateProfile />} />
                <Route path="/student-dashboard/settings" element={<Settings />} />
                <Route path="/student-dashboard/roadmap" element={<CareerRoadmap />} />
                <Route path="/student-dashboard/learning" element={<LearningPath />} />
                <Route path="/student-dashboard/off-campus" element={<OffCampusCalendar />} />
                <Route path="/student-dashboard/ats-score" element={<ATSScore />} />
                <Route path="/student-dashboard/:section" element={<StudentDashboard />} />
                
                {/* Company Dashboard */}
                <Route path="/company-dashboard" element={<Overview />} />
                <Route path="/company-dashboard/jobs" element={<JobPostings />} />
                <Route path="/company-dashboard/candidates" element={<CandidateDatabase />} />
                <Route path="/company-dashboard/applications" element={<Applications />} />
                <Route path="/company-dashboard/interviews" element={<Interviews />} />
                <Route path="/company-dashboard/analytics" element={<Analytics />} />
                <Route path="/company-dashboard/talent" element={<TalentPool />} />
                <Route path="/company-dashboard/notifications" element={<Notifications />} />
                <Route path="/company-dashboard/profile" element={<CompanyProfile />} />
                <Route path="/company-dashboard/settings" element={<Settings />} />
                
                {/* Admin Dashboard */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin-dashboard/users" element={<AdminUsers />} />
                <Route path="/admin-dashboard/settings" element={<Settings />} />
                <Route path="/admin-dashboard/:section" element={<AdminDashboard />} />
                
                {/* Catch-all route for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </HelmetProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
