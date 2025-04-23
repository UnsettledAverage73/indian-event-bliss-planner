# Indian Event Bliss Planner

A modern web application for planning and managing Indian events, celebrations, and ceremonies.

![Indian Event Bliss Planner](https://img.shields.io/badge/Indian%20Event%20Bliss%20Planner-v1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6)
![Supabase](https://img.shields.io/badge/Supabase-Powered-3ECF8E)

## 🌟 Features

- **User Authentication**: Secure sign-up and login with email or Google
- **Event Planning**: Create, manage, and track Indian events
- **Guest Management**: Invite and manage guest lists
- **Budget Tracking**: Monitor expenses and stay within budget
- **Timeline Management**: Create detailed event timelines
- **Vendor Directory**: Find and connect with local vendors
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/atharvapatil1210/indian-event-bliss-planner.git
   cd indian-event-bliss-planner
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server
   ```bash
npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Styling**: Tailwind CSS, Shadcn UI
- **State Management**: React Context API
- **Routing**: React Router
- **Form Handling**: React Hook Form
- **Notifications**: Toast notifications

## 📁 Project Structure

```
indian-event-bliss-planner/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # Third-party integrations
│   ├── lib/             # Utility functions and libraries
│   ├── pages/           # Page components
│   ├── styles/          # Global styles
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── .env                 # Environment variables
├── package.json         # Project dependencies
└── vite.config.ts       # Vite configuration
```

## 🔐 Authentication Flow

The application uses Supabase Authentication with the following features:

- Email/Password authentication
- Google OAuth integration
- Secure session management
- Protected routes

## 🧪 Testing

```bash
# Run tests
npm run test
# or
yarn test
```

## 📦 Deployment

The application can be deployed to various platforms:

1. **Vercel**:
   ```bash
   npm run build
   vercel
   ```

2. **Netlify**:
   ```bash
   npm run build
   netlify deploy
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Atharva Patil** - Lead Developer

## 📞 Contact

For any questions or support, please contact:
- Email: atharvabodade@gmail.com
- GitHub: [atharvapatil1210](https://github.com/atharvapatil1210)

## 💳 Payment Integration

The application uses Razorpay for secure payment processing, which is one of India's leading payment gateways. Here's how to set it up:

### Prerequisites

- Razorpay account (https://razorpay.com)
- Razorpay API keys (Key ID and Key Secret)
- Business PAN card and bank account details

### Setup

1. Install Razorpay dependencies
   ```bash
   npm install razorpay
   # or
   yarn add razorpay
   ```

2. Add Razorpay environment variables to your `.env` file:
   ```
   VITE_RAZORPAY_KEY_ID=your_key_id
   VITE_RAZORPAY_KEY_SECRET=your_key_secret
   ```

3. Initialize Razorpay in your application:
   ```typescript
   import Razorpay from 'razorpay';

   const razorpay = new Razorpay({
     key_id: import.meta.env.VITE_RAZORPAY_KEY_ID,
     key_secret: import.meta.env.VITE_RAZORPAY_KEY_SECRET,
   });
   ```

### Payment Flow

1. **Client-Side**:
   - Create a payment order on your server
   - Initialize Razorpay checkout
   - Handle payment success/failure

2. **Server-Side** (using Supabase Edge Functions):
   - Create orders
   - Verify payments
   - Handle webhooks
   - Update payment status

### Example Implementation

```typescript
// PaymentButton.tsx
import { useEffect } from 'react';
import { loadScript } from '@razorpay/checkout';

export function PaymentButton({ amount, currency = 'INR' }) {
  const handlePayment = async () => {
    try {
      // 1. Create order on your server
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, currency }),
      });
      
      const { orderId } = await response.json();

      // 2. Initialize Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount * 100, // Amount in paise
        currency,
        name: "Indian Event Bliss Planner",
        description: "Event Payment",
        order_id: orderId,
        handler: function (response: any) {
          // Handle successful payment
          console.log(response);
          // Verify payment on your server
          verifyPayment(response);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <button 
      onClick={handlePayment}
      className="px-4 py-2 bg-primary text-white rounded-md"
    >
      Pay Now
    </button>
  );
}
```

### Payment Features

- **Multiple Payment Methods**: 
  - Credit/Debit Cards
  - UPI
  - Net Banking
  - Wallets (Paytm, PhonePe, etc.)
  - EMI
- **Subscription Management**: Handle recurring payments
- **Payment Status Tracking**: Real-time payment status updates
- **Refund Processing**: Handle refunds and cancellations
- **Payment Analytics**: Track payment metrics and revenue

### Security Considerations

1. **Environment Variables**: Never expose secret keys in client-side code
2. **Signature Verification**: Verify payment signatures
3. **Error Handling**: Implement proper error handling for failed payments
4. **Logging**: Maintain secure payment logs
5. **Compliance**: Follow RBI guidelines

### Testing Payments

1. **Test Mode**: Use Razorpay's test mode for development
   ```typescript
   const razorpay = new Razorpay({
     key_id: import.meta.env.VITE_RAZORPAY_KEY_ID,
     key_secret: import.meta.env.VITE_RAZORPAY_KEY_SECRET,
     test_mode: true // Enable test mode
   });
   ```

2. **Test Cards**:
   - Success: `4111 1111 1111 1111`
   - Decline: `5104 0600 0000 0008`
   - 3D Secure: `4012 0010 3714 1112`

### Webhook Handling

Set up webhook endpoints to handle payment events:

```typescript
// webhook.ts
import { createClient } from '@supabase/supabase-js';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function handleWebhook(event: any) {
  // Verify webhook signature
  const signature = event.headers['x-razorpay-signature'];
  const isValid = razorpay.validateWebhookSignature(
    event.body,
    signature,
    process.env.RAZORPAY_WEBHOOK_SECRET!
  );

  if (!isValid) {
    throw new Error('Invalid webhook signature');
  }

  switch (event.body.event) {
    case 'payment.captured':
      // Update payment status in database
      break;
    case 'payment.failed':
      // Handle failed payment
      break;
    // Add more event handlers as needed
  }
}
```

### Common Payment Scenarios

1. **One-time Payments**:
   - Event booking fees
   - Vendor payments
   - Service charges

2. **Recurring Payments**:
   - Subscription plans
   - Monthly maintenance fees
   - Premium features

3. **Split Payments**:
   - Multiple vendor payments
   - Commission handling
   - Service fees

### Best Practices

1. Always use HTTPS for payment processing
2. Implement proper error handling
3. Maintain audit logs
4. Follow RBI compliance guidelines
5. Regular security audits
6. Keep dependencies updated
7. Monitor payment failures
8. Implement rate limiting
9. Use proper validation
10. Regular testing of payment flows

### Indian-Specific Features

1. **UPI Integration**:
   - Support for all major UPI apps
   - QR code payments
   - Collect payments via UPI ID

2. **GST Compliance**:
   - Automatic GST calculation
   - GST invoice generation
   - Tax reporting

3. **Local Payment Methods**:
   - Net Banking for all major Indian banks
   - Wallets (Paytm, PhonePe, etc.)
   - EMI options
   - Bharat QR

---

Made with ❤️ for Indian event planners everywhere 
