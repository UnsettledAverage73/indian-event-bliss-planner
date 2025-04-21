
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileButton = () => {
  const { profile, signOut } = useSupabaseAuth();
  const navigate = useNavigate();

  if (!profile) return null;

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={profile.avatar_url ?? undefined} alt={profile.first_name ?? "Profile"} />
        <AvatarFallback>
          {profile.first_name?.charAt(0)}
          {profile.last_name?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <span className="font-medium">{profile.first_name} {profile.last_name}</span>
      <Button
        size="icon"
        variant="ghost"
        title="Logout"
        onClick={async () => {
          await signOut();
          navigate("/auth");
        }}
      >
        <LogOut size={18} />
      </Button>
    </div>
  );
};

export default ProfileButton;
