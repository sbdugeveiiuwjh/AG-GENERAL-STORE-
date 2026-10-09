import React, { useState, useMemo } from 'react';
import { Search, Phone, MessageCircle, Menu, X, Settings, MapPin, FileText, QrCode, User as UserIcon, Plus } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { VoiceSearch } from './VoiceSearch';
import { AnnouncementBanner } from './AnnouncementBanner';
import { matchesProductSearch } from '../utils/searchUtils';

export const Header: React.FC = () => {
  const {
    products,
    categories,
    addToCart,
    storeSettings,
    setIsAdminOpen,
    setIsParchiOpen,
    setIsUpiOpen,
    searchQuery,
    setSearchQuery
  } = useStore();

  const { user, setIsAuthModalOpen } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const directWhatsAppLink = getWhatsAppUrl(
    storeSettings.whatsappNumber,
    `Namaste ${storeSettings.storeName}! मुझे किराना सामान के बारे में जानकारी चाहिए और ऑर्डर देना है।`
  );

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Top matching products for instant live search dropdown
  const matchingProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products.filter(p => matchesProductSearch(p, searchQuery, categories)).slice(0, 5);
  }, [products, searchQuery, categories]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Real-time Announcement & Store Status Banner */}
      <AnnouncementBanner />

      {/* Top Bar for Phone & Closing Hours */}
      <div className="bg-[#1769E0] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-blue-200" />
              <span>भटनी बाजार, बिशनपुर सुंदर (बिहार)</span>
            </span>
            <span className="hidden sm:inline text-blue-200">·</span>
            <span className="hidden sm:inline text-blue-100">
              रात {storeSettings.closingTime} तक सेवा
            </span>
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
            <a
              href={`tel:${storeSettings.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1 hover:text-blue-100 transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-emerald-300" />
              <span>{storeSettings.phone}</span>
            </a>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-blue-100 hover:text-white flex items-center gap-1 text-[11px] bg-blue-700/60 hover:bg-blue-700 px-2 py-0.5 rounded transition-colors"
              title="Store Owner Admin Panel"
            >
              <Settings className="w-3 h-3" />
              <span>दुकानदार लॉगिन</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3">
        {/* Logo and Store Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#1769E0] to-blue-500 text-white flex items-center justify-center font-extrabold text-lg shadow-sm group-hover:scale-105 transition-transform">
              AG
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight leading-none group-hover:text-[#1769E0] transition-colors">
                {storeSettings.storeName}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-emerald-700 font-devanagari mt-0.5">
                किराना एवं राशन की दुकान
              </div>
            </div>
          </button>
        </div>

        {/* Desktop Search Bar with Bilingual Voice Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <div className="relative w-full flex items-center">
            <button
              type="button"
              onClick={() => scrollToSection('products')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1769E0] transition-colors"
              title="सर्च करें"
            >
              <Search className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  setIsSearchFocused(false);
                  scrollToSection('products');
                }
              }}
              placeholder="सर्च करें: धनिया, जीरा, चावल, चीनी, दाल, तेल..."
              className="w-full pl-10 pr-16 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1769E0] transition-all"
            />
            
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchFocused(false);
                  }}
                  className="text-xs text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
              {/* Voice recognition */}
              <VoiceSearch
                onTranscript={text => {
                  setSearchQuery(text);
                  setIsSearchFocused(true);
                  scrollToSection('products');
                }}
              />
            </div>
          </div>

          {/* Desktop Instant Live Search Results Dropdown */}
          {isSearchFocused && searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 p-2 overflow-hidden animate-in fade-in slide-in-from-top-1">
              {matchingProducts.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>सामान परिणाम ({matchingProducts.length})</span>
                    <button
                      type="button"
                      onClick={() => setIsSearchFocused(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {matchingProducts.map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setIsSearchFocused(false);
                        scrollToSection('products');
                      }}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
                    >
                      <img
                        src={p.image}
                        alt={p.nameHi}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#1769E0] transition-colors truncate">
                          {p.nameHi}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {p.nameEn} · <span className="font-bold text-slate-800">₹{p.variants[0]?.price}</span> ({p.variants[0]?.weight})
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p, p.variants[0].id);
                        }}
                        className="px-2.5 py-1 bg-blue-50 hover:bg-[#1769E0] text-[#1769E0] hover:text-white rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1 shadow-2xs"
                      >
                        <Plus className="w-3 h-3" />
                        <span>कार्ट</span>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchFocused(false);
                      scrollToSection('products');
                    }}
                    className="w-full text-center py-2 text-xs font-bold text-[#1769E0] hover:bg-blue-50 rounded-xl transition-colors block border-t border-slate-100 mt-1"
                  >
                    सभी सामान नीचे सूची में देखें →
                  </button>
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-500">
                  <p className="font-semibold text-slate-700">"{searchQuery}" नाम का सामान नहीं मिला</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">कृपया दूसरा नाम लिखकर देखें या नीचे पूरी लिस्ट देखें</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-700">
          <button
            onClick={() => scrollToSection('home')}
            className="hover:text-[#1769E0] transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('products')}
            className="hover:text-[#1769E0] transition-colors"
          >
            All Products
          </button>
          <button
            onClick={() => scrollToSection('offers')}
            className="hover:text-[#1769E0] transition-colors"
          >
            Offers
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-[#1769E0] transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="hover:text-[#1769E0] transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Action Buttons: Parchi, UPI, WhatsApp & Cart */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Parchi button */}
          <button
            onClick={() => setIsParchiOpen(true)}
            className="hidden lg:inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-3 py-2 rounded-lg font-bold text-xs transition-colors"
            title="राशन पर्ची लिखकर या बोलकर भेजें"
          >
            <FileText className="w-4 h-4 text-amber-600" />
            <span>राशन पर्ची</span>
          </button>

          {/* UPI Pay button */}
          <button
            onClick={() => setIsUpiOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-2 rounded-lg font-bold text-xs transition-colors"
            title="दुकानदार को UPI से भुगतान करें"
          >
            <QrCode className="w-4 h-4 text-[#1769E0]" />
            <span>UPI Pay</span>
          </button>

          {/* Mobile search trigger */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Prominent Green "Order on WhatsApp" button */}
          <a
            href={directWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-[#16A34A] hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm px-3.5 py-2 rounded-lg shadow-xs hover:shadow transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white text-transparent" />
            <span>WhatsApp Order</span>
          </a>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar toggle with Voice Search */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-slate-100 bg-slate-50 animate-in slide-in-from-top duration-200 relative">
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => {
                setMobileSearchOpen(false);
                scrollToSection('products');
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1769E0]"
            >
              <Search className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  setMobileSearchOpen(false);
                  scrollToSection('products');
                }
              }}
              placeholder="सर्च करें (या माइक दबाकर बोलें)..."
              className="w-full pl-9 pr-14 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
              autoFocus
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
              <VoiceSearch
                onTranscript={text => {
                  setSearchQuery(text);
                  setMobileSearchOpen(false);
                  scrollToSection('products');
                }}
              />
            </div>
          </div>

          {/* Mobile Live Suggestions Dropdown */}
          {searchQuery.trim() && matchingProducts.length > 0 && (
            <div className="mt-2 bg-white rounded-xl shadow-lg border border-slate-200 p-2 space-y-1 max-h-60 overflow-y-auto">
              <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>सामान परिणाम ({matchingProducts.length})</span>
                <span className="text-[#1769E0]">क्लिक करें</span>
              </div>
              {matchingProducts.map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    setMobileSearchOpen(false);
                    scrollToSection('products');
                  }}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 active:bg-slate-100 cursor-pointer"
                >
                  <img
                    src={p.image}
                    alt={p.nameHi}
                    className="w-9 h-9 rounded-md object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-xs text-slate-900 truncate">{p.nameHi}</div>
                    <div className="text-[10px] text-slate-500">
                      ₹{p.variants[0]?.price} ({p.variants[0]?.weight})
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p, p.variants[0].id);
                    }}
                    className="px-2 py-1 bg-blue-50 text-[#1769E0] text-[11px] font-bold rounded-md shrink-0"
                  >
                    + कार्ट
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileSearchOpen(false);
                  scrollToSection('products');
                }}
                className="w-full text-center py-1.5 text-xs font-bold text-[#1769E0] block border-t border-slate-100"
              >
                सभी परिणाम देखें ({matchingProducts.length}) →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile Dropdown Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          {/* User profile / login widget in mobile menu */}
          <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              {user ? (
                user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/40 shrink-0" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#1769E0] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )
              ) : (
                <div className="w-9 h-9 rounded-full bg-blue-100 text-[#1769E0] flex items-center justify-center font-bold shrink-0">
                  <UserIcon className="w-5 h-5" />
                </div>
              )}
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {user ? (user.displayName || user.email) : 'किराना ग्राहक खाता'}
                </div>
                <div className="text-[10px] text-slate-500">
                  {user ? 'Google सुरक्षित लॉगिन' : 'Google खाता लॉगिन'}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAuthModalOpen(true);
              }}
              className="px-3 py-1.5 bg-[#1769E0] hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-xs shrink-0"
            >
              {user ? 'प्रोफ़ाइल' : 'लॉगिन करें'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium text-slate-700">
            <button
              onClick={() => scrollToSection('home')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              🏠 Home
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              🛍️ All Products
            </button>
            <button
              onClick={() => scrollToSection('offers')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              🏷️ Offers
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              ℹ️ About Us
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              📞 Contact
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsParchiOpen(true);
              }}
              className="flex items-center justify-center gap-2 bg-amber-50 border border-amber-300 text-amber-900 py-2.5 px-4 rounded-lg font-bold text-sm"
            >
              <FileText className="w-4 h-4 text-amber-600" />
              <span>📝 राशन पर्ची लिखकर या बोलकर भेजें</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsUpiOpen(true);
              }}
              className="flex items-center justify-center gap-2 bg-slate-100 text-slate-800 py-2 px-4 rounded-lg font-bold text-sm"
            >
              <QrCode className="w-4 h-4 text-[#1769E0]" />
              <span>QR कोड से UPI पेमेंट करें</span>
            </button>

            <a
              href={directWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#16A34A] text-white py-2.5 px-4 rounded-lg font-medium text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white text-transparent" />
              <span>WhatsApp पर ऑर्डर भेजें</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminOpen(true);
              }}
              className="flex items-center justify-center gap-2 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg text-xs font-medium hover:bg-slate-50"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Store Owner Login (दुकानदार प्रबंधन)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
