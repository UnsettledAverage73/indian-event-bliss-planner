import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ProfileButton = () => {
  const { profile, signOut, loading } = useSupabaseAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="h-10 w-24 animate-pulse rounded-md bg-gray-200"></div>
    );
  }
  
  if (!profile) return null;

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account",
      });
      navigate("/auth");
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive",
      });
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={profile.avatar_url ?? undefined} alt={profile.first_name ?? "Profile"} />
        <AvatarFallback className="bg-wedding-gold text-white">
          {profile.first_name?.charAt(0) || <User size={16} />}
          {profile.last_name?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <span className="font-medium hidden md:inline">{profile.first_name} {profile.last_name}</span>
      <Button
        size="icon"
        variant="ghost"
        title="Logout"
        onClick={handleLogout}
      >
        <LogOut size={18} />
      </Button>
    </div>
  );
};

export default ProfileButton;