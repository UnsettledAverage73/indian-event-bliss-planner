
import React, { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya & Vikram",
    role: "Wedding Couple",
    image: "https://images.unsplash.com/photo-1621784563330-caee0b138a00?q=80&w=1974&auto=format&fit=crop",
    quote: "EventBliss made our wedding planning stress-free. The vendors they connected us with were perfect, and everything went smoothly on our big day!"
  },
  {
    id: 2,
    name: "Ananya Sharma",
    role: "Birthday Celebration",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?q=80&w=1974&auto=format&fit=crop",
    quote: "I planned my daughter's 16th birthday through EventBliss, and it was magical! The decorations, cake, and entertainment were exactly what we wanted."
  },
  {
    id: 3,
    name: "Rahul & Neha",
    role: "Engagement Ceremony",
    image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=1969&auto=format&fit=crop",
    quote: "The engagement ceremony we planned through EventBliss exceeded our expectations. Their vendor recommendations were top-notch, and our families were impressed!"
  }
];

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative overflow-hidden bg-wedding-softgray py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-12">What Our Clients Say</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative h-full">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`transition-opacity duration-500 absolute w-full
                  ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                `}
                style={{ transform: index === currentIndex ? 'translateX(0)' : 'translateX(100%)' }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-2 border-wedding-gold">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <blockquote className="text-lg md:text-xl italic text-gray-700 mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <p className="font-playfair font-semibold text-xl text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 mx-1 rounded-full transition-all
                  ${currentIndex === index ? 'bg-wedding-gold w-6' : 'bg-gray-300'}
                `}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
