import { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider that listens to auth and profile changes
export const SupabaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Helper to fetch profile
  const fetchProfile = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", uid)
        .single();
        
      if (error) throw error;
      if (data) {
        setProfile(data);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
    }
  };

  // Helper to create or update profile
  const createOrUpdateProfile = async (user: User) => {
    try {
      // Check if profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      // If profile doesn't exist, create it
      if (!existingProfile) {
        // Extract name from user metadata if available (for OAuth providers)
        const userMetadata = user.user_metadata;
        const firstName = userMetadata?.full_name?.split(' ')[0] || userMetadata?.first_name || null;
        const lastName = userMetadata?.full_name?.split(' ').slice(1).join(' ') || userMetadata?.last_name || null;
        const avatarUrl = userMetadata?.avatar_url || null;

        const { error: insertError } = await supabase
          .from("profiles")
          .insert({
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            avatar_url: avatarUrl,
          });

        if (insertError) throw insertError;

        // Fetch the newly created profile
        await fetchProfile(user.id);
      } else {
        setProfile(existingProfile);
      }
    } catch (error) {
      console.error("Error creating/updating profile:", error);
    }
  };

  useEffect(() => {
    // Setup listener first to avoid missing events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Check if this is a new OAuth sign-in
        const isOAuthSignIn = session.user.app_metadata.provider === 'google';
        
        if (isOAuthSignIn) {
          // Create or update profile for OAuth users
          await createOrUpdateProfile(session.user);
        } else {
          // Use setTimeout to avoid Supabase authentication deadlock
          setTimeout(() => fetchProfile(session.user.id), 0);
        }
      } else {
        setProfile(null);
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      
      if (data.session?.user) {
        // Check if this is an OAuth user
        const isOAuthUser = data.session.user.app_metadata.provider === 'google';
        
        if (isOAuthUser) {
          await createOrUpdateProfile(data.session.user);
        } else {
          fetchProfile(data.session.user.id);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line
  }, []);

  // Sign out and clear session
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useSupabaseAuth must be used within SupabaseAuthProvider");
  return ctx;
};
