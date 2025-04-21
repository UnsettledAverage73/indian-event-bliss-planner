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
- Email: atharvapatil1210@gmail.com
- GitHub: [atharvapatil1210](https://github.com/atharvapatil1210)

---

Made with ❤️ for Indian event planners everywhere 