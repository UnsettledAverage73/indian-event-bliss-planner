
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Camera, MapPin, Music, Utensils, Image as ImageIcon, LucideIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";

interface ServiceOption {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const serviceOptions: ServiceOption[] = [
  {
    id: "venue",
    title: "Venue",
    description: "Find the perfect location for your event",
    icon: MapPin
  },
  {
    id: "catering",
    title: "Catering",
    description: "Delicious food options for your guests",
    icon: Utensils
  },
  {
    id: "photography",
    title: "Photography",
    description: "Capture your special moments",
    icon: Camera
  },
  {
    id: "decoration",
    title: "Decoration",
    description: "Beautiful decorations for your venue",
    icon: ImageIcon
  },
  {
    id: "music",
    title: "Music & DJ",
    description: "Entertainment for your celebration",
    icon: Music
  },
  // Additional services can be added here
];

const Services: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const eventType = searchParams.get("eventType") || "";
  const category = searchParams.get("category") || "";
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };
  
  const handleContinue = () => {
    if (selectedServices.length > 0) {
      const queryParams = new URLSearchParams({
        eventType,
        ...(category && { category }),
        services: selectedServices.join(",")
      });
      
      navigate(`/vendor-listing?${queryParams.toString()}`);
    }
  };
  
  // Get event type display name
  const getEventTypeDisplayName = () => {
    switch (eventType) {
      case "wedding":
        return "Wedding";
      case "birthday":
        return "Birthday";
      case "other":
        return "Event";
      default:
        return "Event";
    }
  };
  
  // Get category display name
  const getCategoryDisplayName = () => {
    switch (category) {
      case "budget":
        return "Budget Wedding";
      case "traditional":
        return "Traditional Wedding";
      case "destination":
        return "Destination Wedding";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-wedding-peach bg-opacity-20 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Select Services for Your {getCategoryDisplayName() || getEventTypeDisplayName()}
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Choose the services you need for your event, and we'll find the best vendors for you
            </p>
          </div>
        </div>
        
        {/* Services Selection */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {serviceOptions.map(service => (
                <div key={service.id} onClick={() => toggleService(service.id)}>
                  <ServiceCard 
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    isSelected={selectedServices.includes(service.id)}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                {selectedServices.length === 0 
                  ? "Please select at least one service to continue" 
                  : `You've selected ${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''}`}
              </p>
              
              <button
                onClick={handleContinue}
                disabled={selectedServices.length === 0}
                className={`bg-wedding-gold text-white font-medium px-8 py-3 rounded-md transition-all 
                  ${selectedServices.length > 0 ? 'hover:opacity-90 shadow-md' : 'opacity-50 cursor-not-allowed'}`}
              >
                Continue to Vendors
              </button>
            </div>
          </div>
        </div>
        
        {/* Service Information */}
        <div className="py-16 bg-wedding-softgray">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="mb-4">Our Comprehensive Services</h2>
              <p className="text-gray-600">
                We offer end-to-end services to make your {getEventTypeDisplayName().toLowerCase()} planning seamless
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-playfair text-xl font-semibold mb-3">Venue Selection</h3>
                <p className="text-gray-600 mb-4">
                  We partner with the best venues across India, from luxury hotels to picturesque outdoor locations.
                  Our venues are carefully selected to ensure they meet our high standards for quality and service.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-wedding-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Banquet halls
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-wedding-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Garden venues
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-wedding-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Heritage properties
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-wedding-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Beach resorts
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-playfair text-xl font-semibold mb-3">Catering Excellence</h3>
                <p className="text-gray-600 mb-4">
                  Our catering partners offer a wide range of culinary options to delight your guests,
                  from traditional Indian cuisine to international flavors.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-wedding-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom menus
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-wedding-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Multi-cuisine options
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-wedding-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Special dietary requirements
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-wedding-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Live cooking stations
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-playfair text-xl font-semibold mb-3">Photography & Videography</h3>
                <p className="text-gray-600 mb-4">
                  Capture your special moments with our professional photographers and videographers who specialize in
                  wedding and event photography.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-wedding-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Pre-event photoshoots
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-wedding-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Cinematic videos
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-wedding-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Drone photography
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-wedding-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Same-day edits
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
