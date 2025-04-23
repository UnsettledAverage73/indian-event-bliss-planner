import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export default function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-wedding-peach to-wedding-pink py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for your booking. We have sent a confirmation email with all the details.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
            <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                <span>Check your email for booking confirmation and details</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                <span>Our team will contact you within 24 hours to discuss your event</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                <span>You can view and manage your booking in your dashboard</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-wedding-gold text-white rounded-md hover:opacity-90 transition-colors"
            >
              View Dashboard
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 