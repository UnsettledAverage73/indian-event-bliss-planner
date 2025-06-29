
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CreditCard, IndianRupee } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// UPI Options
const upiOptions = [
  { id: "gpay", name: "Google Pay", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Google_Pay_%28GPay%29_Logo.svg/1024px-Google_Pay_%28GPay%29_Logo.svg.png" },
  { id: "phonepe", name: "PhonePe", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Phonepe-icn.svg/2048px-Phonepe-icn.svg.png" },
  { id: "paytm", name: "Paytm", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png" }
];

const BookingSummary: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const eventType = searchParams.get("eventType") || "";
  const category = searchParams.get("category") || "";
  const subtotal = parseFloat(searchParams.get("subtotal") || "0");
  const total = parseFloat(searchParams.get("total") || "0");
  const guestCount = parseInt(searchParams.get("guests") || "0");
  const eventDate = searchParams.get("date") || "";
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "paylater">("upi");
  const [selectedUpi, setSelectedUpi] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Format date for display
  const formattedDate = eventDate 
    ? new Date(eventDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : 'Not specified';
  
  // Calculate advance payment (30% of total)
  const advancePayment = total * 0.3;
  
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
  
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email";
    }
    
    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(phone)) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }
    
    if (!address.trim()) errors.address = "Address is required";
    
    if (paymentMethod === "upi" && !selectedUpi) {
      errors.upi = "Please select a UPI option";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        
        // Scroll to top for success message
        window.scrollTo(0, 0);
        
        // Redirect to home after success
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }, 1500);
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
              Booking Summary & Payment
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Review your selections and complete your booking for your {getCategoryDisplayName() || getEventTypeDisplayName()}.
            </p>
          </div>
        </div>
        
        {showSuccess ? (
          <div className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="bg-green-50 p-8 rounded-2xl mb-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-green-800 mb-4">Booking Confirmed!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for your booking. We have sent a confirmation email to <span className="font-medium">{email}</span> with all the details.
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <p className="text-gray-700">Booking Reference: <span className="font-medium">EB{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span></p>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    You will be redirected to the home page in a few seconds...
                  </p>
                </div>
                
                <button
                  onClick={() => navigate("/")}
                  className="bg-wedding-gold text-white font-medium px-8 py-3 rounded-md hover:opacity-90 transition-all"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Booking Form */}
                <div className="lg:w-2/3">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-wedding-softgray p-6 rounded-lg shadow-sm">
                      <h2 className="text-2xl font-playfair font-semibold mb-6">Personal Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 mb-2">Full Name*</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full px-4 py-2 rounded-md border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-wedding-gold`}
                            placeholder="Enter your full name"
                          />
                          {formErrors.name && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 mb-2">Email Address*</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-2 rounded-md border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-wedding-gold`}
                            placeholder="Enter your email"
                          />
                          {formErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 mb-2">Phone Number*</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={`w-full px-4 py-2 rounded-md border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-wedding-gold`}
                            placeholder="Enter your 10-digit phone number"
                            maxLength={10}
                          />
                          {formErrors.phone && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                          )}
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-gray-700 mb-2">Address*</label>
                          <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            rows={3}
                            className={`w-full px-4 py-2 rounded-md border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-wedding-gold`}
                            placeholder="Enter your full address"
                          ></textarea>
                          {formErrors.address && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-wedding-softgray p-6 rounded-lg shadow-sm">
                      <h2 className="text-2xl font-playfair font-semibold mb-6">Payment Method</h2>
                      
                      <div className="space-y-6">
                        <div className="flex flex-wrap gap-4">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod("upi")}
                            className={`
                              flex items-center px-5 py-3 rounded-md border transition-all
                              ${paymentMethod === "upi" 
                                ? 'bg-wedding-pink border-wedding-gold font-medium' 
                                : 'bg-white border-gray-300 hover:border-wedding-gold'}
                            `}
                          >
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/2560px-UPI-Logo-vector.svg.png" alt="UPI" className="h-6 mr-2" />
                            UPI Payment
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setPaymentMethod("card")}
                            className={`
                              flex items-center px-5 py-3 rounded-md border transition-all
                              ${paymentMethod === "card" 
                                ? 'bg-wedding-pink border-wedding-gold font-medium' 
                                : 'bg-white border-gray-300 hover:border-wedding-gold'}
                            `}
                          >
                            <CreditCard size={20} className="mr-2" />
                            Credit/Debit Card
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setPaymentMethod("paylater")}
                            className={`
                              flex items-center px-5 py-3 rounded-md border transition-all
                              ${paymentMethod === "paylater" 
                                ? 'bg-wedding-pink border-wedding-gold font-medium' 
                                : 'bg-white border-gray-300 hover:border-wedding-gold'}
                            `}
                          >
                            <IndianRupee size={20} className="mr-2" />
                            Pay Later
                          </button>
                        </div>
                        
                        {/* UPI Options */}
                        {paymentMethod === "upi" && (
                          <div className="mt-4">
                            <p className="text-gray-700 mb-3">Select UPI Option:</p>
                            <div className="grid grid-cols-3 gap-4 max-w-md">
                              {upiOptions.map(option => (
                                <div 
                                  key={option.id}
                                  onClick={() => setSelectedUpi(option.id)}
                                  className={`
                                    p-4 border rounded-md flex flex-col items-center cursor-pointer transition-all
                                    ${selectedUpi === option.id 
                                      ? 'border-wedding-gold bg-wedding-peach bg-opacity-30' 
                                      : 'border-gray-200 hover:border-wedding-gold'}
                                  `}
                                >
                                  <img src={option.icon} alt={option.name} className="h-8 mb-2" />
                                  <span className="text-sm">{option.name}</span>
                                </div>
                              ))}
                            </div>
                            {formErrors.upi && (
                              <p className="text-red-500 text-sm mt-2">{formErrors.upi}</p>
                            )}
                          </div>
                        )}
                        
                        {/* Card Payment Form */}
                        {paymentMethod === "card" && (
                          <div className="mt-4 bg-white p-4 rounded-md border border-gray-200 max-w-md">
                            <div className="mb-4">
                              <label className="block text-gray-700 mb-2">Card Number</label>
                              <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                              />
                            </div>
                            
                            <div className="flex gap-4 mb-4">
                              <div className="flex-1">
                                <label className="block text-gray-700 mb-2">Expiry Date</label>
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                                />
                              </div>
                              
                              <div className="w-1/3">
                                <label className="block text-gray-700 mb-2">CVV</label>
                                <input
                                  type="text"
                                  placeholder="123"
                                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-gray-700 mb-2">Card Holder Name</label>
                              <input
                                type="text"
                                placeholder="Enter name on card"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                              />
                            </div>
                          </div>
                        )}
                        
                        {/* Pay Later Info */}
                        {paymentMethod === "paylater" && (
                          <div className="mt-4 bg-white p-4 rounded-md border border-gray-200 max-w-md">
                            <p className="text-gray-700 mb-2">
                              Pay only 10% today (₹{(total * 0.1).toLocaleString('en-IN')}) to secure your booking
                            </p>
                            <p className="text-sm text-gray-500">
                              Our representative will contact you to arrange payment details. The remaining balance can be paid in installments.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-wedding-softgray p-6 rounded-lg shadow-sm">
                      <h2 className="text-2xl font-playfair font-semibold mb-6">Terms & Conditions</h2>
                      
                      <div className="bg-white p-4 rounded-md border border-gray-200 mb-6 max-h-48 overflow-y-auto text-sm text-gray-600">
                        <p className="mb-4">
                          Please read and agree to the following terms and conditions:
                        </p>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Booking is confirmed upon receipt of payment.</li>
                          <li>Cancellation policy: 50% refund if cancelled 60 days before event date; no refund thereafter.</li>
                          <li>Any changes to the package must be requested at least 30 days before the event.</li>
                          <li>Final guest count must be confirmed 15 days before the event.</li>
                          <li>Additional services requested on the event day may incur extra charges.</li>
                          <li>EventBliss reserves the right to substitute vendors of equal quality if the original vendor becomes unavailable.</li>
                          <li>All prices are inclusive of applicable taxes and service charges.</li>
                          <li>The remaining balance must be paid 30 days before the event date.</li>
                        </ol>
                      </div>
                      
                      <div className="flex items-start mb-6">
                        <input
                          type="checkbox"
                          id="terms"
                          className="mt-1 mr-3"
                          required
                        />
                        <label htmlFor="terms" className="text-gray-700">
                          I agree to the Terms & Conditions and Privacy Policy
                        </label>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`
                          w-full py-3 rounded-md font-medium text-white text-center
                          ${isSubmitting 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-wedding-gold hover:opacity-90'}
                        `}
                      >
                        {isSubmitting ? "Processing..." : "Confirm and Pay"}
                      </button>
                    </div>
                  </form>
                </div>
                
                {/* Order Summary */}
                <div className="lg:w-1/3">
                  <div className="bg-wedding-softgray p-6 rounded-lg shadow-sm sticky top-24">
                    <h2 className="text-2xl font-playfair font-semibold mb-6">Order Summary</h2>
                    
                    <div className="bg-white p-4 rounded-lg mb-6">
                      <h3 className="font-medium text-lg mb-3">{getCategoryDisplayName() || getEventTypeDisplayName()}</h3>
                      
                      <div className="space-y-2 text-gray-700">
                        <div className="flex justify-between">
                          <span>Event Date:</span>
                          <span className="font-medium">{formattedDate}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>Guest Count:</span>
                          <span className="font-medium">{guestCount} guests</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>₹{subtotal.toLocaleString('en-IN')}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taxes</span>
                        <span>₹{(total - subtotal).toLocaleString('en-IN')}</span>
                      </div>
                      
                      <div className="border-t pt-4 flex justify-between font-bold text-lg">
                        <span>Total Amount</span>
                        <span className="text-wedding-gold">₹{total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    
                    <div className="bg-wedding-peach bg-opacity-30 p-4 rounded-md">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-wedding-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Payment Details</span>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Advance Payment:</strong> ₹{advancePayment.toLocaleString('en-IN')} (30%)
                      </p>
                      
                      <p className="text-xs text-gray-600">
                        Remaining balance of ₹{(total - advancePayment).toLocaleString('en-IN')} due 30 days before event
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingSummary;