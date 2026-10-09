import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PopularCarousel } from './components/PopularCarousel';
import { GroceryBundles } from './components/GroceryBundles';
import { ProductCatalog } from './components/ProductCatalog';
import { SpecialOffers } from './components/SpecialOffers';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminModal } from './components/AdminModal';
import { QuickParchiModal } from './components/QuickParchiModal';
import { UpiPaymentModal } from './components/UpiPaymentModal';
import { BillReceiptModal } from './components/BillReceiptModal';
import { UserProfileModal } from './components/UserProfileModal';
import { GoogleLoginScreen } from './components/GoogleLoginScreen';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

const StoreApp: React.FC = () => {
  const { user, loading } = useAuth();

  // Loading indicator while Firebase resolves auth state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1769E0] to-blue-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg mb-4 animate-pulse">
          AG
        </div>
        <div className="flex items-center gap-2 text-slate-800 font-bold text-base mb-1">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span>AG GENERAL STORE</span>
        </div>
        <p className="text-xs text-slate-500">किराना स्टोर लोड हो रहा है... कृपया प्रतीक्षा करें</p>
      </div>
    );
  }

  // MANDATORY LOGIN GATE:
  // If user is not logged in, they CANNOT enter the website.
  // ONLY the Google Login Screen is rendered.
  if (!user) {
    return <GoogleLoginScreen />;
  }

  // Once authenticated with Google, the full store is unlocked!
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#172033] selection:bg-blue-100 selection:text-blue-900 safe-bottom-padding">
      {/* Navigation & Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Popular Products Spotlight */}
        <PopularCarousel />

        {/* 3. Complete Product Catalogue with Search, Voice & Filters */}
        <ProductCatalog />

        {/* 5. Pre-configured Monthly Ration & Puja Bundles */}
        <GroceryBundles />

        {/* 6. Special Offers & Store Services */}
        <SpecialOffers />

        {/* 7. About Us */}
        <AboutSection />

        {/* 8. Customer Reviews */}
        <ReviewsSection />

        {/* 9. Contact & Map Location */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Fixed Bottom Navigation for Android & Smart Phones */}
      <MobileBottomNav />

      {/* Interactive Modals */}
      <CartDrawer />
      <CheckoutModal />
      <AdminModal />
      <QuickParchiModal />
      <UpiPaymentModal />
      <BillReceiptModal />
      <UserProfileModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AuthProvider>
        <StoreApp />
      </AuthProvider>
    </StoreProvider>
  );
}
