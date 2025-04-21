
import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <div className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1464047736614-af63643285bf?q=80&w=1974&auto=format&fit=crop')",
          backgroundPosition: "center 30%",
          filter: "brightness(0.7)"
        }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"
      />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-white mb-4 drop-shadow-lg">
            Plan Your Perfect Wedding or Event
          </h1>
          
          <p className="text-white text-lg md:text-xl mb-8 max-w-xl drop-shadow-md">
            Create magical moments with our comprehensive planning platform. Find the best vendors for your special day.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/event-type" 
              className="bg-wedding-gold text-white font-medium px-8 py-4 rounded-md hover:opacity-90 transition-all shadow-lg text-center"
            >
              Start Planning Now
            </Link>
            
            <Link 
              to="/vendor-listing" 
              className="bg-white text-gray-800 font-medium px-8 py-4 rounded-md hover:bg-gray-50 transition-all shadow-lg text-center"
            >
              Browse Vendors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
