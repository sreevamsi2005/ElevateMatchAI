
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider } from "@/context/AuthContext";

// Landing pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Auth pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AuthCallback from "./pages/auth/callback";

// Dashboard pages
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import CompanyDashboard from "./pages/dashboard/CompanyDashboard";
import UpdateProfile from "./pages/dashboard/UpdateProfile";
import ResumeBuilder from "./pages/dashboard/ResumeBuilder";
import Settings from "./pages/dashboard/Settings";
import CareerRoadmap from "./pages/dashboard/CareerRoadmap";
import LearningPath from "./pages/dashboard/LearningPath";
import OffCampusCalendar from "./pages/dashboard/OffCampusCalendar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
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
              <Route path="/community" element={<Community />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              
              {/* Redirect old welcome page to dashboard */}
              <Route path="/welcome" element={<Navigate to="/student-dashboard" replace />} />
              
              {/* Student Dashboard */}
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/student-dashboard/resume" element={<ResumeBuilder />} />
              <Route path="/student-dashboard/update-profile" element={<UpdateProfile />} />
              <Route path="/student-dashboard/settings" element={<Settings />} />
              <Route path="/student-dashboard/roadmap" element={<CareerRoadmap />} />
              <Route path="/student-dashboard/learning" element={<LearningPath />} />
              <Route path="/student-dashboard/off-campus" element={<OffCampusCalendar />} />
              <Route path="/student-dashboard/:section" element={<StudentDashboard />} />
              
              {/* Company Dashboard */}
              <Route path="/company-dashboard" element={<CompanyDashboard />} />
              <Route path="/company-dashboard/settings" element={<Settings />} />
              <Route path="/company-dashboard/:section" element={<CompanyDashboard />} />
              
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
