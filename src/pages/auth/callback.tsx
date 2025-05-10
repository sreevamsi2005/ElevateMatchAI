
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // This will automatically handle the tokens in the URL hash and establish the session
      const { data, error } = await supabase.auth.getSession();
      
      console.log("Auth callback session check:", data?.session ? "Session exists" : "No session");
      
      if (error) {
        console.error("Error during auth callback:", error);
        navigate("/login?error=Authentication failed");
        return;
      }
      
      // Check if we have a session after processing the hash
      if (data.session) {
        console.log("Successfully authenticated with provider");
        navigate("/welcome"); // Redirect to welcome page after successful authentication
      } else {
        // If we still don't have a session, something went wrong
        console.error("No session established after auth callback");
        navigate("/login?error=Unable to establish session");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-lg">Completing authentication...</p>
      </div>
    </div>
  );
}
