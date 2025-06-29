import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Star, IndianRupee, Sparkles, Filter } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VendorCard from "../components/VendorCard";

// Sample vendor data
const allVendors = [
  // Venues
  {
    id: "v1",
    name: "Royal Palace Banquet",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
    price: 75000,
    location: "Delhi",
    rating: 4.8,
    category: "venue",
    tags: ["luxury", "indoor", "central"]
  },
  {
    id: "v2",
    name: "Garden Paradise",
    image: "https://images.unsplash.com/photo-1604014491931-9f9c7feada60?q=80&w=2070&auto=format&fit=crop",
    price: 60000,
    location: "Mumbai",
    rating: 4.6,
    category: "venue",
    tags: ["outdoor", "garden", "western"]
  },
  {
    id: "v3",
    name: "Heritage Resort",
    image: "https://images.unsplash.com/photo-1464047736614-af63643285bf?q=80&w=2074&auto=format&fit=crop",
    price: 120000,
    location: "Jaipur",
    rating: 4.9,
    category: "venue",
    tags: ["luxury", "heritage", "northern"]
  },
  
  // Catering
  {
    id: "c1",
    name: "Divine Caterers",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop",
    price: 45000,
    location: "Mumbai",
    rating: 4.7,
    category: "catering",
    tags: ["multi-cuisine", "vegetarian", "western"]
  },
  {
    id: "c2",
    name: "Spice Route",
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=2070&auto=format&fit=crop",
    price: 38000,
    location: "Delhi",
    rating: 4.5,
    category: "catering",
    tags: ["north-indian", "mughlai", "central"]
  },
  {
    id: "c3",
    name: "Flavors of India",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
    price: 52000,
    location: "Bangalore",
    rating: 4.8,
    category: "catering",
    tags: ["south-indian", "multi-cuisine", "southern"]
  },
  
  // Photography
  {
    id: "p1",
    name: "Moments Photography",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=2070&auto=format&fit=crop",
    price: 35000,
    location: "Bangalore",
    rating: 4.9,
    category: "photography",
    tags: ["candid", "cinematic", "southern"]
  },
  {
    id: "p2",
    name: "Capture Dreams",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop",
    price: 42000,
    location: "Mumbai",
    rating: 4.6,
    category: "photography",
    tags: ["traditional", "western"]
  },
  {
    id: "p3",
    name: "Frame Stories",
    image: "https://images.unsplash.com/photo-1505939374277-8d746c530068?q=80&w=1974&auto=format&fit=crop",
    price: 28000,
    location: "Delhi",
    rating: 4.7,
    category: "photography",
    tags: ["candid", "central"]
  },
  
  // Decoration
  {
    id: "d1",
    name: "Floral Dreams Decor",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
    price: 28000,
    location: "Chennai",
    rating: 4.6,
    category: "decoration",
    tags: ["floral", "southern"]
  },
  {
    id: "d2",
    name: "Royal Decorators",
    image: "https://images.unsplash.com/photo-1511795409834-432f5522567d?q=80&w=2070&auto=format&fit=crop",
    price: 36000,
    location: "Delhi",
    rating: 4.8,
    category: "decoration",
    tags: ["luxury", "traditional", "central"]
  },
  {
    id: "d3",
    name: "Elegant Designs",
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=2069&auto=format&fit=crop",
    price: 32000,
    location: "Mumbai",
    rating: 4.5,
    category: "decoration",
    tags: ["modern", "western"]
  },
  
  // Music
  {
    id: "m1",
    name: "Rhythm Beats",
    image: "https://images.unsplash.com/photo-1504509497403-2c8a621aad51?q=80&w=2070&auto=format&fit=crop",
    price: 25000,
    location: "Delhi",
    rating: 4.7,
    category: "music",
    tags: ["dj", "bollywood", "central"]
  },
  {
    id: "m2",
    name: "Melody Makers",
    image: "https://images.unsplash.com/photo-1603052875302-d376b7c0638a?q=80&w=2070&auto=format&fit=crop",
    price: 32000,
    location: "Mumbai",
    rating: 4.9,
    category: "music",
    tags: ["live-band", "western"]
  },
  {
    id: "m3",
    name: "Classical Ensemble",
    image: "https://images.unsplash.com/photo-1533826418470-0cef7eb8bdaa?q=80&w=2070&auto=format&fit=crop",
    price: 38000,
    location: "Bangalore",
    rating: 4.8,
    category: "music",
    tags: ["classical", "instrumental", "southern"]
  }
];

const VendorListing: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const eventType = searchParams.get("eventType") || "";
  const category = searchParams.get("category") || "";
  const servicesParam = searchParams.get("services") || "";
  const services = servicesParam ? servicesParam.split(",") : [];
  
  const [filteredVendors, setFilteredVendors] = useState(allVendors);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  
  // Get all locations for filter
  const allLocations = [...new Set(allVendors.map(vendor => vendor.location))];
  
  // Filter vendors based on selected services and filters
  useEffect(() => {
    let vendors = allVendors;
    
    // Filter by selected services
    if (services.length > 0) {
      vendors = vendors.filter(vendor => services.includes(vendor.category));
    }
    
    // Apply price filter
    vendors = vendors.filter(
      vendor => vendor.price >= priceRange[0] && vendor.price <= priceRange[1]
    );
    
    // Apply location filter
    if (selectedLocations.length > 0) {
      vendors = vendors.filter(vendor => selectedLocations.includes(vendor.location));
    }
    
    // Apply rating filter
    if (minRating > 0) {
      vendors = vendors.filter(vendor => vendor.rating >= minRating);
    }
    
    setFilteredVendors(vendors);
  }, [services, priceRange, selectedLocations, minRating]);
  
  const toggleVendorSelection = (vendorId: string) => {
    setSelectedVendors(prev => 
      prev.includes(vendorId)
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };
  
  const handleContinue = () => {
    if (selectedVendors.length > 0) {
      const queryParams = new URLSearchParams({
        eventType,
        ...(category && { category }),
        services: servicesParam,
        vendors: selectedVendors.join(",")
      });
      
      navigate(`/package-builder?${queryParams.toString()}`);
    }
  };
  
  const toggleLocationFilter = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location)
        ? prev.filter(loc => loc !== location)
        : [...prev, location]
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-wedding-peach bg-opacity-20 py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Select Your Vendors
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Choose the best vendors for your event. Select multiple vendors if needed.
            </p>
          </div>
        </div>
        
        <div className="bg-white py-8">
          <div className="container mx-auto px-4">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-6">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md"
              >
                <Filter size={18} className="mr-2" />
                {isFilterOpen ? "Hide Filters" : "Show Filters"}
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Filters - Desktop (always visible) and Mobile (toggleable) */}
              <div 
                className={`md:w-1/4 bg-wedding-softgray p-4 rounded-lg ${isFilterOpen ? 'block' : 'hidden md:block'}`}
              >
                <div className="sticky top-24">
                  <h3 className="font-playfair text-xl font-semibold mb-4">Filters</h3>
                  
                  {/* Price Range Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Price Range</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">₹{priceRange[0].toLocaleString('en-IN')}</span>
                      <span className="text-sm">₹{priceRange[1].toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="150000"
                      step="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-wedding-pink rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  {/* Location Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Location</h4>
                    <div className="space-y-2">
                      {allLocations.map(location => (
                        <div key={location} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`location-${location}`}
                            checked={selectedLocations.includes(location)}
                            onChange={() => toggleLocationFilter(location)}
                            className="mr-2"
                          />
                          <label htmlFor={`location-${location}`} className="text-sm">
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Rating Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Rating</h4>
                    <div className="space-y-2">
                      {[0, 3, 3.5, 4, 4.5].map(rating => (
                        <div key={rating} className="flex items-center">
                          <input
                            type="radio"
                            id={`rating-${rating}`}
                            name="rating"
                            checked={minRating === rating}
                            onChange={() => setMinRating(rating)}
                            className="mr-2"
                          />
                          <label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                            {rating === 0 ? (
                              "All Ratings"
                            ) : (
                              <>
                                {rating}+ <Star size={14} className="ml-1 text-wedding-gold" />
                              </>
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Selected Filters Summary */}
                  <div className="p-3 bg-white rounded-md shadow-sm">
                    <h4 className="font-medium mb-2">Selected Filters:</h4>
                    <div className="text-sm text-gray-600">
                      <p>Price: Up to ₹{priceRange[1].toLocaleString('en-IN')}</p>
                      <p>Locations: {selectedLocations.length > 0 ? selectedLocations.join(', ') : 'All'}</p>
                      <p>Min Rating: {minRating > 0 ? `${minRating}+` : 'Any'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Vendor Listings */}
              <div className="md:w-3/4">
                {/* Selected Services */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {services.map(service => (
                    <div key={service} className="bg-wedding-peach px-3 py-1 rounded-full text-sm">
                      {service.charAt(0).toUpperCase() + service.slice(1)}
                    </div>
                  ))}
                </div>
                
                {/* Results Count and Sort */}
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600">
                    {filteredVendors.length} vendors found
                  </p>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                    <select 
                      className="border rounded-md px-2 py-1 text-sm"
                      defaultValue="rating"
                    >
                      <option value="rating">Highest Rated</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>
                </div>
                
                {/* Vendors Grid */}
                {filteredVendors.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVendors.map(vendor => (
                      <div key={vendor.id} onClick={() => toggleVendorSelection(vendor.id)}>
                        <VendorCard 
                          id={vendor.id}
                          name={vendor.name}
                          image={vendor.image}
                          price={vendor.price}
                          location={vendor.location}
                          rating={vendor.rating}
                          category={vendor.category}
                          isSelected={selectedVendors.includes(vendor.id)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-wedding-softgray rounded-lg">
                    <p className="text-lg text-gray-600 mb-2">No vendors match your filters</p>
                    <p className="text-gray-500">Try adjusting your filters to see more results</p>
                  </div>
                )}
                
                {/* Continue Button */}
                <div className="mt-10 text-center">
                  <p className="text-gray-600 mb-4">
                    {selectedVendors.length === 0 
                      ? "Please select at least one vendor to continue" 
                      : `You've selected ${selectedVendors.length} vendor${selectedVendors.length > 1 ? 's' : ''}`}
                  </p>
                  
                  <button
                    onClick={handleContinue}
                    disabled={selectedVendors.length === 0}
                    className={`bg-wedding-gold text-white font-medium px-8 py-3 rounded-md transition-all 
                      ${selectedVendors.length > 0 ? 'hover:opacity-90 shadow-md' : 'opacity-50 cursor-not-allowed'}`}
                  >
                    Continue to Package Builder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VendorListing;