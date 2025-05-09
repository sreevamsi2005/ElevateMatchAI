
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Welcome from "./pages/Welcome";

// Dashboard pages
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import CompanyDashboard from "./pages/dashboard/CompanyDashboard";
import UpdateProfile from "./pages/dashboard/UpdateProfile";
import ResumeBuilder from "./pages/dashboard/ResumeBuilder";

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
              <Route path="/welcome" element={<Welcome />} />
              
              {/* Student Dashboard */}
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/student-dashboard/resume" element={<ResumeBuilder />} />
              <Route path="/student-dashboard/update-profile" element={<UpdateProfile />} />
              <Route path="/student-dashboard/:section" element={<StudentDashboard />} />
              
              {/* Company Dashboard */}
              <Route path="/company-dashboard" element={<CompanyDashboard />} />
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
