import React from "react";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  onClick?: () => void;
  isSelected?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  onClick,
  isSelected = false,
}) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer
        ${isSelected ? "bg-wedding-pink border-2 border-wedding-gold" : "bg-white"}
      `}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`p-3 rounded-full mb-4 ${isSelected ? "bg-wedding-gold text-white" : "bg-wedding-peach text-gray-700"}`}>
          <Icon size={28} />
        </div>
        <h3 className="font-playfair text-xl font-semibold mb-2">{title}</h3>
        {description && <p className="text-gray-600 text-sm">{description}</p>}
      </div>
    </div>
  );
};

export default ServiceCard;