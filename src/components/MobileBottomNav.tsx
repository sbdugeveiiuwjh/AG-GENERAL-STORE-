import React from 'react';
import { Home, ShoppingBag, MessageCircle, User as UserIcon } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const MobileBottomNav: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    storeSettings
  } = useStore();

  const { user, userProfile, setIsAuthModalOpen } = useAuth();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsAppLink = getWhatsAppUrl(
    storeSettings.whatsappNumber,
    `Namaste ${storeSettings.storeName}! मुझे किराना सामान ऑर्डर करना है।`
  );

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] px-1.5 py-1 pb-[max(0.375rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-4 items-center justify-items-center">
        {/* 1. Home */}
        <button
          onClick={() => scrollTo('home')}
          className="flex flex-col items-center justify-center py-1 px-1 text-slate-600 hover:text-[#1769E0] transition-colors focus:outline-none min-h-[44px] w-full"
          title="मुख्य पृष्ठ"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium leading-none">Home</span>
        </button>

        {/* 2. Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 px-1 text-[#1769E0] transition-colors focus:outline-none min-h-[44px] w-full font-semibold"
          title="शॉपिंग कार्ट"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-red-600 text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] leading-none">कार्ट</span>
        </button>

        {/* 3. WhatsApp Order */}
        <a
          href={whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-1 text-[#16A34A] hover:text-emerald-700 transition-colors focus:outline-none min-h-[44px] w-full font-semibold"
          title="व्हाट्सएप पर ऑर्डर भेजें"
        >
          <MessageCircle className="w-5 h-5 mb-0.5 fill-[#16A34A] text-transparent" />
          <span className="text-[10px] leading-none">WhatsApp</span>
        </a>

        {/* 5. Dedicated User Profile Icon & Link */}
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 px-1 text-slate-700 hover:text-[#1769E0] active:text-[#1769E0] transition-colors focus:outline-none min-h-[44px] w-full"
          title="मेरी प्रोफ़ाइल (नाम व मोबाइल नंबर)"
        >
          <div className="relative mb-0.5">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-5 h-5 rounded-full object-cover ring-1.5 ring-[#1769E0] shadow-2xs"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-blue-100 text-[#1769E0] flex items-center justify-center font-bold text-[10px]">
                <UserIcon className="w-3.5 h-3.5" />
              </div>
            )}
            {userProfile?.phone && (
              <span
                className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-white"
                title="मोबाइल नंबर सुरक्षित है"
              />
            )}
          </div>
          <span className="text-[10px] font-bold leading-none text-slate-800">
            {user ? (userProfile?.displayName?.split(' ')[0] || user.displayName?.split(' ')[0] || 'प्रोफ़ाइल') : 'प्रोफ़ाइल'}
          </span>
        </button>
      </div>
    </nav>
  );
};
