
import React from "react";
import { Link } from "react-router-dom";
import VendorCard from "./VendorCard";

// Sample vendor data
const featuredVendors = [
  {
    id: "v1",
    name: "Royal Palace Banquet",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
    price: 75000,
    location: "Delhi",
    rating: 4.8,
    category: "Venue"
  },
  {
    id: "v2",
    name: "Divine Caterers",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop",
    price: 45000,
    location: "Mumbai",
    rating: 4.7,
    category: "Catering"
  },
  {
    id: "v3",
    name: "Moments Photography",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=2070&auto=format&fit=crop",
    price: 35000,
    location: "Bangalore",
    rating: 4.9,
    category: "Photography"
  },
  {
    id: "v4",
    name: "Floral Dreams Decor",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
    price: 28000,
    location: "Chennai",
    rating: 4.6,
    category: "Decoration"
  }
];

const FeaturedVendors: React.FC = () => {
  return (
    <div className="py-16 bg-wedding-peach bg-opacity-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="mb-2">Featured Vendors</h2>
            <p className="text-gray-600 max-w-xl">
              Discover our hand-picked selection of top-rated vendors for your special occasion
            </p>
          </div>
          
          <Link 
            to="/vendor-listing" 
            className="mt-4 md:mt-0 bg-wedding-gold text-white px-6 py-2 rounded-md hover:opacity-90 transition-all shadow-md"
          >
            View All Vendors
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVendors.map(vendor => (
            <VendorCard 
              key={vendor.id}
              id={vendor.id}
              name={vendor.name}
              image={vendor.image}
              price={vendor.price}
              location={vendor.location}
              rating={vendor.rating}
              category={vendor.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedVendors;
