import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Separator } from "@/components/ui/separator";

type AuthMode = "login" | "signup";

const Auth: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useSupabaseAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      if (authMode === "signup" && (!firstName || !lastName)) {
        setErrorMsg("Please enter your first and last name.");
        setLoading(false);
        return;
      }

      if (authMode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setErrorMsg(error.message);
          toast({
            title: "Login failed",
            description: error.message,
            variant: "destructive",
          });
          return;
        }
        
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        navigate("/");
        return;
      }

      // Signup
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });
      
      if (error) {
        setErrorMsg(error.message);
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
      navigate("/");
    } catch (error) {
      console.error("Authentication error:", error);
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      
      const redirectUrl = `${window.location.origin}/auth/callback`;
      console.log("Redirecting to:", redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      
      if (error) {
        console.error("Google sign-in error:", error);
        setErrorMsg(error.message);
        toast({
          title: "Sign-in failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data?.url) {
        console.log("Redirecting to Google OAuth URL:", data.url);
        window.location.href = data.url;
      } else {
        console.error("No redirect URL received from Supabase");
        setErrorMsg("Failed to initiate Google sign-in. Please try again.");
        toast({
          title: "Sign-in failed",
          description: "Failed to initiate Google sign-in. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Unexpected error during Google sign-in:", err);
      setErrorMsg("An unexpected error occurred. Please try again.");
      toast({
        title: "Sign-in failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wedding-peach to-wedding-pink">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-playfair font-bold mb-4 text-center">
          {authMode === "login" ? "Sign In" : "Create Account"}
        </h2>
        {errorMsg && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-md text-center">
            {errorMsg}
          </div>
        )}
        
        <Button 
          type="button" 
          variant="outline" 
          className="w-full mb-4 flex items-center justify-center gap-2"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
          Continue with Google
        </Button>
        
        <div className="relative my-4">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-2 text-gray-500 text-sm">or</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="w-full"
              placeholder="Email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="w-full"
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete={authMode === "login" ? "current-password" : "new-password"}
            />
          </div>
          
          {authMode === "signup" && (
            <>
              <div className="flex gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    className="w-full"
                    placeholder="First Name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    className="w-full"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
          
          <Button type="submit" className="w-full bg-wedding-gold hover:bg-wedding-gold/90" disabled={loading}>
            {loading
              ? (authMode === "login" ? "Signing in..." : "Signing up...")
              : (authMode === "login" ? "Sign In" : "Sign Up")}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          {authMode === "login" ? (
            <>
              <span>Don't have an account? </span>
              <button
                type="button"
                className="text-wedding-gold font-medium underline hover:opacity-70"
                onClick={() => setAuthMode("signup")}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              <span>Already have an account? </span>
              <button
                type="button"
                className="text-wedding-gold font-medium underline hover:opacity-70"
                onClick={() => setAuthMode("login")}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
