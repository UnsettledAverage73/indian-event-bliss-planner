
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  price: string;
  onClick: () => void;
  isSelected: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  image,
  price,
  onClick,
  isSelected,
}) => {
  return (
    <div 
      className={`
        relative overflow-hidden rounded-lg shadow-lg cursor-pointer
        transition-all duration-300 transform hover:-translate-y-2
        ${isSelected ? 'ring-2 ring-wedding-gold scale-[1.02]' : ''}
      `}
      onClick={onClick}
    >
      <div className="relative h-64 w-full">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
        />
        
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h3 className="font-playfair text-2xl font-bold mb-1">{title}</h3>
          <p className="text-white/90 mb-3">{description}</p>
          <div className="inline-block bg-wedding-gold px-4 py-1 rounded-full font-medium">
            Starting at {price}
          </div>
        </div>
      </div>
    </div>
  );
};

const weddingCategories = [
  {
    id: "budget",
    title: "Budget Wedding",
    description: "Beautiful celebrations that won't break the bank",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    price: "₹1,00,000",
  },
  {
    id: "traditional",
    title: "Traditional Wedding",
    description: "Classic ceremonies with cultural richness",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop",
    price: "₹3,50,000",
  },
  {
    id: "destination",
    title: "Destination Wedding",
    description: "Unforgettable celebrations at stunning locations",
    image: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?q=80&w=2070&auto=format&fit=crop",
    price: "₹7,00,000",
  }
];

const WeddingCategory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    // After a short delay, navigate to services page
    setTimeout(() => {
      navigate(`/services?eventType=wedding&category=${categoryId}`);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-wedding-peach bg-opacity-20 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Wedding Style</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Select the type of wedding you're planning, and we'll help you create the perfect celebration
              with tailored services and vendors.
            </p>
          </div>
        </div>
        
        {/* Categories */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {weddingCategories.map(category => (
                <CategoryCard 
                  key={category.id}
                  title={category.title}
                  description={category.description}
                  image={category.image}
                  price={category.price}
                  onClick={() => handleCategorySelect(category.id)}
                  isSelected={selectedCategory === category.id}
                />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Each package is customizable to match your specific needs and preferences.
              </p>
              
              <button
                onClick={() => selectedCategory && handleCategorySelect(selectedCategory)}
                disabled={!selectedCategory}
                className={`bg-wedding-gold text-white font-medium px-8 py-3 rounded-md transition-all 
                  ${selectedCategory ? 'hover:opacity-90 shadow-md' : 'opacity-50 cursor-not-allowed'}`}
              >
                Continue to Services
              </button>
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="py-16 bg-wedding-softgray">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="mb-4">Your Dream Wedding, Your Way</h2>
                <p className="text-gray-600 mb-6">
                  No matter what style of wedding you choose, our platform ensures your special day is exactly as you envision it. 
                  We work with the best vendors across India to bring your dream wedding to life.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-wedding-pink rounded-full p-1 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-wedding-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Personalized Planning:</span> Customize every aspect of your wedding to reflect your unique style and preferences.
                    </p>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-wedding-pink rounded-full p-1 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-wedding-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Cultural Integration:</span> We respect and incorporate your cultural traditions into the planning process.
                    </p>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-wedding-pink rounded-full p-1 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-wedding-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Stress-Free Experience:</span> Our coordinators ensure everything runs smoothly so you can focus on enjoying your big day.
                    </p>
                  </li>
                </ul>
              </div>
              
              <div className="relative h-96">
                <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1513725673171-537abba17912?q=80&w=2070&auto=format&fit=crop" 
                    alt="Wedding Ceremony"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-lg overflow-hidden shadow-lg border-4 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1519741347686-c1e30c8adffc?q=80&w=2070&auto=format&fit=crop" 
                    alt="Wedding Reception"
                    className="w-full h-full object-cover"
                  />
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

export default WeddingCategory;
