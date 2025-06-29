import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import EventSelector from "../components/EventSelector";
import FeaturedVendors from "../components/FeaturedVendors";
import TestimonialCarousel from "../components/TestimonialCarousel";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <EventSelector />
        
        <FeaturedVendors />
        
        <TestimonialCarousel />
        
        {/* How It Works Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="mb-4">How It Works</h2>
              <p className="text-gray-600">
                Planning your perfect event is easy with our simple step-by-step process
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-wedding-pink flex items-center justify-center text-2xl font-bold text-gray-700 mb-4">
                  1
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-2">Choose Event Type</h3>
                <p className="text-gray-600">
                  Select the type of event you're planning to get tailored recommendations.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-wedding-pink flex items-center justify-center text-2xl font-bold text-gray-700 mb-4">
                  2
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-2">Select Vendors</h3>
                <p className="text-gray-600">
                  Browse and choose from our curated list of top-rated vendors.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-wedding-pink flex items-center justify-center text-2xl font-bold text-gray-700 mb-4">
                  3
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-2">Book and Relax</h3>
                <p className="text-gray-600">
                  Finalize your bookings and let us handle the rest while you enjoy your special day.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="py-16 bg-gradient-to-r from-wedding-pink to-wedding-peach">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Plan Your Special Event?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Start your journey to a perfect celebration today. Our platform makes event planning simple and stress-free.
            </p>
            <a 
              href="/event-type" 
              className="bg-wedding-gold text-white font-medium px-8 py-4 rounded-md hover:opacity-90 transition-all shadow-lg inline-block"
            >
              Begin Planning Now
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;