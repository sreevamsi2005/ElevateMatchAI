
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { userDetails, checkIsAdmin } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // This will automatically handle the tokens in the URL hash and establish the session
      const { data, error } = await supabase.auth.getSession();
      
      console.log("Auth callback session check:", data?.session ? "Session exists" : "No session");
      
      if (error) {
        console.error("Error during auth callback:", error);
        toast.error("Authentication failed. Please try again.");
        navigate("/login?error=Authentication failed");
        return;
      }
      
      // Check if we have a session after processing the hash
      if (data.session) {
        console.log("Successfully authenticated with provider");
        
        // Get the user email and check if they're an admin
        const userEmail = data.session.user.email;
        
        if (userEmail) {
          const isAdmin = await checkIsAdmin(userEmail);
          
          if (isAdmin) {
            toast.success("Successfully logged in as admin!");
            navigate("/admin-dashboard");
            return;
          }
        }
        
        // Get the user metadata to determine which dashboard to redirect to
        const { data: userData } = await supabase.auth.getUser();
        const userType = userData?.user?.user_metadata?.user_type || 'student';
        
        // Redirect to the appropriate dashboard based on user type
        const dashboardPath = userType === "student" 
          ? "/student-dashboard" 
          : "/company-dashboard";
          
        toast.success("Successfully logged in!");
        navigate(dashboardPath);
      } else {
        // If we still don't have a session, something went wrong
        console.error("No session established after auth callback");
        toast.error("Unable to establish session. Please try again.");
        navigate("/login?error=Unable to establish session");
      }
    };

    handleAuthCallback();
  }, [navigate, userDetails, checkIsAdmin]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-lg">Completing authentication...</p>
      </div>
    </div>
  );
}
