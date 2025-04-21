
import React from "react";
import { Star, MapPin, IndianRupee } from "lucide-react";

interface VendorCardProps {
  id: string;
  name: string;
  image: string;
  price: number; 
  location: string;
  rating: number;
  category: string;
  onClick?: () => void;
  isSelected?: boolean;
}

const VendorCard: React.FC<VendorCardProps> = ({
  id,
  name,
  image,
  price,
  location,
  rating,
  category,
  onClick,
  isSelected = false,
}) => {
  return (
    <div 
      className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer
        ${isSelected ? "ring-2 ring-wedding-gold" : ""}
      `}
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-medium">
          {category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-playfair text-lg font-semibold mb-2">{name}</h3>
        
        <div className="flex items-center mb-2">
          <MapPin size={16} className="text-gray-500 mr-1" />
          <p className="text-gray-600 text-sm">{location}</p>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Star size={16} className="text-wedding-gold mr-1" />
            <p className="text-gray-700 font-medium">{rating.toFixed(1)}</p>
          </div>
          
          <div className="flex items-center font-medium">
            <IndianRupee size={16} className="text-gray-700 mr-1" />
            <p>{price.toLocaleString('en-IN')}</p>
          </div>
        </div>
        
        <button 
          className="w-full py-2 bg-wedding-gold text-white rounded-md hover:opacity-90 transition-all"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default VendorCard;
