
import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Cake, Gift, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";

const EventType: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedType = searchParams.get("type");
  const navigate = useNavigate();
  
  const [selectedType, setSelectedType] = React.useState<string | null>(preselectedType);
  
  const handleSelectType = (type: string) => {
    setSelectedType(type);
    
    // After a short delay, navigate to the appropriate page
    setTimeout(() => {
      if (type === "wedding") {
        navigate("/wedding-category");
      } else {
        navigate("/services?eventType=" + type);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-wedding-peach bg-opacity-20 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Event Type</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Select the type of event you're planning, and we'll guide you through the process 
              with personalized recommendations.
            </p>
          </div>
        </div>
        
        {/* Event Type Selection */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div onClick={() => handleSelectType("wedding")}>
                <ServiceCard 
                  title="Wedding"
                  description="Plan your perfect wedding day with our curated selection of venues, caterers, photographers, and more."
                  icon={Users}
                  isSelected={selectedType === "wedding"}
                />
              </div>
              
              <div onClick={() => handleSelectType("birthday")}>
                <ServiceCard 
                  title="Birthday"
                  description="Create memorable birthday celebrations for all ages with our event planning services."
                  icon={Cake}
                  isSelected={selectedType === "birthday"}
                />
              </div>
              
              <div onClick={() => handleSelectType("other")}>
                <ServiceCard 
                  title="Other Events"
                  description="From engagements to corporate events, we've got all your celebration needs covered."
                  icon={Gift}
                  isSelected={selectedType === "other"}
                />
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Each event type offers specialized vendors and services tailored to your needs.
              </p>
              
              <button
                onClick={() => selectedType && handleSelectType(selectedType)}
                disabled={!selectedType}
                className={`bg-wedding-gold text-white font-medium px-8 py-3 rounded-md transition-all 
                  ${selectedType ? 'hover:opacity-90 shadow-md' : 'opacity-50 cursor-not-allowed'}`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="py-16 bg-wedding-softgray">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="mb-4">Why Plan With Us</h2>
              <p className="text-gray-600">
                EventBliss makes event planning simple, stress-free, and enjoyable
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-full bg-wedding-peach flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-2">Verified Vendors</h3>
                <p className="text-gray-600">
                  All our vendors are thoroughly vetted to ensure quality service for your special event.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-full bg-wedding-peach flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-2">Budget Friendly</h3>
                <p className="text-gray-600">
                  Options for every budget with transparent pricing and no hidden fees.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-full bg-wedding-peach flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-2">Time Saving</h3>
                <p className="text-gray-600">
                  All your planning in one place, saving you countless hours of research and coordination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventType;