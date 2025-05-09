
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error during auth callback:", error);
        navigate("/login?error=Unable to authenticate");
        return;
      }
      
      navigate("/welcome"); // Redirect to welcome page after successful authentication
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-lg">Authenticating...</p>
      </div>
    </div>
  );
}
