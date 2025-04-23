import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Razorpay from 'https://esm.sh/razorpay@2.9.1';

const razorpay = new Razorpay({
  key_id: Deno.env.get('VITE_RAZORPAY_KEY_ID') || '',
  key_secret: Deno.env.get('VITE_RAZORPAY_KEY_SECRET') || '',
});

serve(async (req) => {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const { amount, currency = 'INR' } = await req.json();

    // Validate amount
    if (!amount || amount <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid amount' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt: `order_${Date.now()}`,
    });

    // Return order details
    return new Response(
      JSON.stringify({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create order' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}); 