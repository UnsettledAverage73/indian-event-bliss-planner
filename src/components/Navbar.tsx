
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ProfileButton from "./ProfileButton";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { profile, loading } = useSupabaseAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="font-playfair text-2xl font-bold bg-gradient-to-r from-wedding-pink to-wedding-gold bg-clip-text text-transparent">
              EventBliss
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-wedding-gold transition-colors">
              Home
            </Link>
            <Link to="/event-type" className="text-gray-700 hover:text-wedding-gold transition-colors">
              Plan Event
            </Link>
            <Link to="/vendor-listing" className="text-gray-700 hover:text-wedding-gold transition-colors">
              Vendors
            </Link>
            <Link to="#" className="text-gray-700 hover:text-wedding-gold transition-colors">
              About
            </Link>
            <Link to="#" className="text-gray-700 hover:text-wedding-gold transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden md:block">
            {!loading && (
              profile ? (
                <ProfileButton />
              ) : (
                <Button
                  className="bg-wedding-gold text-white hover:bg-wedding-gold/90 transition-all"
                  onClick={() => navigate("/auth")}
                >
                  Login / Sign Up
                </Button>
              )
            )}
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-wedding-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/event-type" 
                className="text-gray-700 hover:text-wedding-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Plan Event
              </Link>
              <Link 
                to="/vendor-listing" 
                className="text-gray-700 hover:text-wedding-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Vendors
              </Link>
              <Link 
                to="#" 
                className="text-gray-700 hover:text-wedding-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="#" 
                className="text-gray-700 hover:text-wedding-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {!loading && (
                profile ? (
                  <ProfileButton />
                ) : (
                  <Button
                    className="bg-wedding-gold text-white hover:bg-wedding-gold/90 transition-all w-full"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/auth");
                    }}
                  >
                    Login / Sign Up
                  </Button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
