
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

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

  // Redirect if already logged in
  useEffect(() => {
    let ignore = false;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session && !ignore) {
        navigate("/");
      }
    });
    return () => { ignore = true; };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    if (authMode === "signup" && (!firstName || !lastName)) {
      setErrorMsg("Please enter your first and last name.");
      setLoading(false);
      return;
    }

    if (authMode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }
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
      setLoading(false);
      return;
    }
    navigate("/");
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="w-full border px-3 py-2 rounded focus:outline-none"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            type="password"
            className="w-full border px-3 py-2 rounded focus:outline-none"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete={authMode === "login" ? "current-password" : "new-password"}
          />
          {authMode === "signup" && (
            <>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 border px-3 py-2 rounded focus:outline-none"
                  placeholder="First Name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  className="flex-1 border px-3 py-2 rounded focus:outline-none"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
            </>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
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
