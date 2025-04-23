import { useState } from 'react';
import { PaymentButton } from '@/components/PaymentButton';
import { useToast } from '@/hooks/use-toast';

export default function TestPayment() {
  const [amount, setAmount] = useState<number>(100);
  const { toast } = useToast();

  const handlePaymentSuccess = (response: any) => {
    console.log('Payment successful:', response);
    toast({
      title: "Payment Successful",
      description: `Payment ID: ${response.razorpay_payment_id}`,
    });
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
    toast({
      title: "Payment Failed",
      description: error.message || "An error occurred during payment",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wedding-peach to-wedding-pink">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-playfair font-bold mb-6 text-center">
          Test Payment
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (INR)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-gold"
              min="1"
            />
          </div>

          <div className="text-sm text-gray-500">
            <p className="mb-2">Test Card Details:</p>
            <ul className="space-y-1">
              <li>Success: <code>4111 1111 1111 1111</code></li>
              <li>Decline: <code>5104 0600 0000 0008</code></li>
              <li>3D Secure: <code>4012 0010 3714 1112</code></li>
            </ul>
            <p className="mt-2">Use any future date for expiry and any 3 digits for CVV</p>
          </div>

          <PaymentButton
            amount={amount}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>
      </div>
    </div>
  );
} 