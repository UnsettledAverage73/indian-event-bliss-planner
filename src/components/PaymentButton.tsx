import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface PaymentButtonProps {
  amount: number;
  currency?: string;
  orderId?: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  buttonText?: string;
  disabled?: boolean;
  className?: string;
}

export function PaymentButton({
  amount,
  currency = 'INR',
  orderId,
  onSuccess,
  onError,
  buttonText = 'Pay Now',
  disabled = false,
  className = '',
}: PaymentButtonProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isTestMode] = useState(true); // Always true for development

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      setIsLoading(true);

      // Validate amount
      if (amount <= 0) {
        throw new Error('Amount must be greater than 0');
      }

      // Create order if not provided
      if (!orderId) {
        const response = await fetch('/api/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount, currency }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create order');
        }

        const data = await response.json();
        orderId = data.id; // Use 'id' instead of 'orderId'
      }

      // Initialize Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount * 100, // Amount in paise
        currency,
        name: "Indian Event Bliss Planner",
        description: "Event Payment",
        order_id: orderId,
        handler: function (response: any) {
          console.log('Payment successful:', response);
          toast({
            title: "Payment Successful",
            description: `Payment ID: ${response.razorpay_payment_id}`,
          });
          onSuccess?.(response);
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#3399cc"
        },
        modal: {
          ondismiss: function() {
            toast({
              title: "Payment Cancelled",
              description: "You have cancelled the payment.",
              variant: "destructive",
            });
            onError?.({ message: "Payment cancelled by user" });
          }
        },
        notes: {
          address: "Test Address"
        },
        // Enable test mode
        test: isTestMode
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error('Payment failed:', error);
      toast({
        title: "Payment Failed",
        description: error.message || "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || isLoading}
      className={`w-full py-3 rounded-md font-medium text-white text-center bg-wedding-gold hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          {isTestMode && (
            <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">
              TEST MODE
            </span>
          )}
          {buttonText}
        </>
      )}
    </button>
  );
} 