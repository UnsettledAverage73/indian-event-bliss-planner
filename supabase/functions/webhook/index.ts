import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Razorpay from 'https://esm.sh/razorpay@2.9.1';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const razorpay = new Razorpay({
  key_id: Deno.env.get('RAZORPAY_KEY_ID')!,
  key_secret: Deno.env.get('RAZORPAY_KEY_SECRET')!,
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

serve(async (req) => {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get webhook signature
    const signature = req.headers.get('x-razorpay-signature');
    if (!signature) {
      return new Response(
        JSON.stringify({ error: 'Missing signature' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get webhook body
    const body = await req.text();

    // Verify webhook signature
    const isValid = razorpay.validateWebhookSignature(
      body,
      signature,
      Deno.env.get('RAZORPAY_WEBHOOK_SECRET')!
    );

    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse webhook body
    const event = JSON.parse(body);

    // Handle different webhook events
    switch (event.event) {
      case 'payment.captured':
        // Update payment status in database
        await supabase
          .from('payments')
          .update({
            status: 'captured',
            payment_id: event.payload.payment.entity.id,
            updated_at: new Date().toISOString(),
          })
          .eq('order_id', event.payload.payment.entity.order_id);

        // Add payment to transactions table
        await supabase
          .from('transactions')
          .insert({
            payment_id: event.payload.payment.entity.id,
            order_id: event.payload.payment.entity.order_id,
            amount: event.payload.payment.entity.amount / 100, // Convert from paise to rupees
            currency: event.payload.payment.entity.currency,
            status: 'success',
            created_at: new Date().toISOString(),
          });
        break;

      case 'payment.failed':
        // Update payment status in database
        await supabase
          .from('payments')
          .update({
            status: 'failed',
            error: event.payload.payment.entity.error,
            updated_at: new Date().toISOString(),
          })
          .eq('order_id', event.payload.payment.entity.order_id);
        break;

      // Add more event handlers as needed
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to handle webhook' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}); 