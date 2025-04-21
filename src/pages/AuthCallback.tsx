import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function AuthCallback() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const processAuthCallback = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if we have a hash in the URL (from OAuth redirect)
        if (window.location.hash) {
          console.log("Processing OAuth callback with hash");
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');

          if (accessToken) {
            console.log("Setting session with access token");
            const { data: { session }, error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || '',
            });

            if (sessionError) {
              console.error("Error setting session:", sessionError);
              throw sessionError;
            }

            if (session) {
              console.log("Session established successfully");
              toast({
                title: "Successfully signed in",
                description: "Welcome back!",
              });
              navigate('/dashboard');
              return;
            }
          }
        }

        // If no hash or session setting failed, try to get the session directly
        console.log("Attempting to get session directly");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Error getting session:", sessionError);
          throw sessionError;
        }

        if (session) {
          console.log("Session retrieved successfully");
          toast({
            title: "Successfully signed in",
            description: "Welcome back!",
          });
          navigate('/dashboard');
        } else {
          console.error("No session found");
          throw new Error("Authentication failed. Please try again.");
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
        toast({
          title: "Authentication failed",
          description: err instanceof Error ? err.message : "An unexpected error occurred",
          variant: "destructive",
        });
        navigate('/auth');
      } finally {
        setIsLoading(false);
      }
    };

    processAuthCallback();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Completing sign in...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Authentication Error</h1>
          <p className="text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate('/auth')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Return to Sign In
          </button>
        </div>
      </div>
    );
  }

  return null;
} 