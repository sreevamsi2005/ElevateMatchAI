
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  showBackButton?: boolean;
}

export function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  showBackButton = true 
}: AuthLayoutProps) {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Background image and branding */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 h-full flex flex-col justify-between p-12">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-md bg-white/90 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">E</span>
            </div>
            <span className="text-2xl font-bold text-white font-heading">ElevateMatchAI</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Elevate Your Career Journey
            </h1>
            <p className="text-white/80 max-w-md">
              Join thousands of students and companies using AI to bridge the gap between education and employment.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-white/70 text-sm">Companies</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-3xl font-bold text-white">10k+</p>
                <p className="text-white/70 text-sm">Students</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-3xl font-bold text-white">85%</p>
                <p className="text-white/70 text-sm">Success Rate</p>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-white/60">
            © {new Date().getFullYear()} ElevateMatchAI. All rights reserved.
          </div>
        </div>
        
        {/* Abstract patterns */}
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute top-1/4 right-0 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
      </div>
      
      {/* Right side - Auth form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)} 
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground mt-2">{subtitle}</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
}
