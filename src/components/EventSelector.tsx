
import React from "react";
import { Cake, Gift, Users } from "lucide-react";
import { Link } from "react-router-dom";
import ServiceCard from "./ServiceCard";

const EventSelector: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="mb-4">Choose Your Event Type</h2>
          <p className="text-gray-600">
            Select the type of event you're planning, and we'll guide you through the process with 
            tailored vendors and services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Link to="/event-type?type=wedding">
            <ServiceCard 
              title="Wedding"
              description="Plan your perfect wedding day with our curated selection of venues, caterers, photographers, and more."
              icon={Users}
            />
          </Link>
          
          <Link to="/event-type?type=birthday">
            <ServiceCard 
              title="Birthday"
              description="Create memorable birthday celebrations for all ages with our event planning services."
              icon={Cake}
            />
          </Link>
          
          <Link to="/event-type?type=other">
            <ServiceCard 
              title="Other Events"
              description="From engagements to corporate events, we've got all your celebration needs covered."
              icon={Gift}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventSelector;
