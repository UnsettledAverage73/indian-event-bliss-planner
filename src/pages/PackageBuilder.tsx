
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Check, Trash, CircleDollarSign, Plus, Minus, Edit } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Import vendor data
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

// Add-on options
const addOns = [
  {
    id: "addon1",
    name: "Welcome Drinks",
    description: "Welcome drinks and refreshments for all guests",
    price: 8000
  },
  {
    id: "addon2",
    name: "Valet Parking",
    description: "Professional valet service for guest vehicles",
    price: 12000
  },
  {
    id: "addon3",
    name: "Photo Booth",
    description: "Fun photo booth with props for guests",
    price: 15000
  },
  {
    id: "addon4",
    name: "Event Coordination",
    description: "On-site event coordinator to manage the event",
    price: 20000
  }
];

interface PackageItem {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
}

const PackageBuilder: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const eventType = searchParams.get("eventType") || "";
  const category = searchParams.get("category") || "";
  const vendorsParam = searchParams.get("vendors") || "";
  const selectedVendorIds = vendorsParam ? vendorsParam.split(",") : [];
  
  const [packageItems, setPackageItems] = useState<PackageItem[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [guestCount, setGuestCount] = useState(100);
  const [eventDate, setEventDate] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  
  // Calculate totals
  const subtotal = packageItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const addOnsTotal = addOns
    .filter(addon => selectedAddOns.includes(addon.id))
    .reduce((sum, addon) => sum + addon.price, 0);
  const taxRate = 0.18; // 18% GST
  const tax = (subtotal + addOnsTotal) * taxRate;
  const total = subtotal + addOnsTotal + tax;
  
  // Initialize package items from selected vendors
  useEffect(() => {
    const items = selectedVendorIds
      .map(id => {
        const vendor = allVendors.find(v => v.id === id);
        if (vendor) {
          return {
            id: vendor.id,
            name: vendor.name,
            image: vendor.image,
            price: vendor.price,
            category: vendor.category,
            quantity: 1
          };
        }
        return null;
      })
      .filter(item => item !== null) as PackageItem[];
    
    setPackageItems(items);
  }, [vendorsParam]);
  
  const handleAddOnToggle = (addonId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };
  
  const handleRemoveItem = (itemId: string) => {
    setPackageItems(prev => prev.filter(item => item.id !== itemId));
  };
  
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setPackageItems(prev => 
      prev.map(item => 
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };
  
  const handleProceedToBooking = () => {
    const queryParams = new URLSearchParams({
      eventType,
      ...(category && { category }),
      vendors: vendorsParam,
      addons: selectedAddOns.join(","),
      guests: guestCount.toString(),
      ...(eventDate && { date: eventDate }),
      subtotal: subtotal.toString(),
      total: total.toString()
    });
    
    navigate(`/booking-summary?${queryParams.toString()}`);
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
        <div className="bg-wedding-peach bg-opacity-20 py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Build Your Package
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Customize your {getCategoryDisplayName() || getEventTypeDisplayName()} package with the selected vendors and additional services.
            </p>
          </div>
        </div>
        
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Selected Items */}
              <div className="lg:w-2/3">
                <div className="bg-wedding-softgray p-6 rounded-lg shadow-sm mb-8">
                  <h2 className="text-2xl font-playfair font-semibold mb-6">Selected Services</h2>
                  
                  {packageItems.length > 0 ? (
                    <div className="space-y-4">
                      {packageItems.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center">
                          <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="sm:ml-4 flex-grow">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                              <h3 className="font-medium text-lg">{item.name}</h3>
                              <div className="text-wedding-gold font-semibold">
                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                              </div>
                            </div>
                            
                            <div className="text-sm text-gray-500 capitalize mb-3">
                              {item.category}
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <button 
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="bg-gray-100 p-1 rounded-md"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus size={16} className="text-gray-600" />
                                </button>
                                <span className="mx-3">{item.quantity}</span>
                                <button 
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="bg-gray-100 p-1 rounded-md"
                                >
                                  <Plus size={16} className="text-gray-600" />
                                </button>
                              </div>
                              
                              <button 
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-gray-500 hover:text-red-500 transition-colors"
                              >
                                <Trash size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No items selected</p>
                      <button 
                        onClick={() => navigate(-1)}
                        className="mt-4 text-wedding-gold hover:underline"
                      >
                        Go back to select vendors
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="bg-wedding-softgray p-6 rounded-lg shadow-sm mb-8">
                  <h2 className="text-2xl font-playfair font-semibold mb-6">Add-ons</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addOns.map(addon => (
                      <div 
                        key={addon.id}
                        onClick={() => handleAddOnToggle(addon.id)}
                        className={`
                          p-4 rounded-lg cursor-pointer transition-all
                          ${selectedAddOns.includes(addon.id) 
                            ? 'bg-wedding-pink border-2 border-wedding-gold' 
                            : 'bg-white border border-gray-200 hover:border-wedding-gold'}
                        `}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{addon.name}</h3>
                          <div className="text-wedding-gold font-semibold">
                            ₹{addon.price.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{addon.description}</p>
                        <div className={`
                          flex items-center text-sm font-medium
                          ${selectedAddOns.includes(addon.id) ? 'text-wedding-gold' : 'text-gray-500'}
                        `}>
                          {selectedAddOns.includes(addon.id) ? (
                            <>
                              <Check size={16} className="mr-1" />
                              Added to package
                            </>
                          ) : (
                            'Add to package'
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-wedding-softgray p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-playfair font-semibold mb-6">Event Details</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Number of Guests</label>
                      <div className="flex items-center">
                        <button 
                          onClick={() => setGuestCount(prev => Math.max(50, prev - 50))}
                          className="bg-gray-100 p-2 rounded-l-md border border-gray-300"
                        >
                          <Minus size={16} className="text-gray-600" />
                        </button>
                        <input
                          type="number"
                          value={guestCount}
                          onChange={(e) => setGuestCount(Math.max(50, parseInt(e.target.value) || 50))}
                          className="w-20 text-center py-2 border-t border-b border-gray-300 focus:outline-none"
                        />
                        <button 
                          onClick={() => setGuestCount(prev => prev + 50)}
                          className="bg-gray-100 p-2 rounded-r-md border border-gray-300"
                        >
                          <Plus size={16} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Event Date</label>
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Special Requests</label>
                      <textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                        placeholder="Any special requirements for your event..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Summary and Pricing */}
              <div className="lg:w-1/3">
                <div className="bg-wedding-softgray p-6 rounded-lg shadow-sm sticky top-24">
                  <h2 className="text-2xl font-playfair font-semibold mb-6">Package Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Selected Services ({packageItems.length})</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Add-ons ({selectedAddOns.length})</span>
                      <span>₹{addOnsTotal.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes (18% GST)</span>
                      <span>₹{tax.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="border-t pt-4 flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span className="text-wedding-gold">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-md mb-6">
                    <div className="flex items-center text-gray-700 mb-2">
                      <CircleDollarSign size={18} className="text-wedding-gold mr-2" />
                      <span className="font-medium">Payment Options</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Pay just 30% (₹{(total * 0.3).toLocaleString('en-IN')}) to confirm your booking
                    </p>
                    <p className="text-xs text-gray-500">
                      Remaining balance due 30 days before event
                    </p>
                  </div>
                  
                  <button
                    onClick={handleProceedToBooking}
                    disabled={packageItems.length === 0 || !eventDate}
                    className={`
                      w-full py-3 rounded-md font-medium text-white text-center
                      ${(packageItems.length > 0 && eventDate) 
                        ? 'bg-wedding-gold hover:opacity-90' 
                        : 'bg-gray-400 cursor-not-allowed'}
                    `}
                  >
                    Proceed to Booking
                  </button>
                  
                  {(packageItems.length === 0 || !eventDate) && (
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      {packageItems.length === 0 
                        ? "Please select at least one service" 
                        : "Please select an event date"}
                    </p>
                  )}
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

export default PackageBuilder;