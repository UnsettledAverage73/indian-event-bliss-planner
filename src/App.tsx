import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EventType from "./pages/EventType";
import WeddingCategory from "./pages/WeddingCategory";
import Services from "./pages/Services";
import VendorListing from "./pages/VendorListing";
import PackageBuilder from "./pages/PackageBuilder";
import BookingSummary from "./pages/BookingSummary";
import NotFound from "./pages/NotFound";
import Auth from "./pages/auth";
import { SupabaseAuthProvider } from "./hooks/useSupabaseAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SupabaseAuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/event-type" element={<EventType />} />
          <Route path="/wedding-category" element={<WeddingCategory />} />
          <Route path="/services" element={<Services />} />
          <Route path="/vendor-listing" element={<VendorListing />} />
          <Route path="/package-builder" element={<PackageBuilder />} />
          <Route path="/booking-summary" element={<BookingSummary />} />
          <Route path="/auth" element={<Auth />}></Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </SupabaseAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;